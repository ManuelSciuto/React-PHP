import { validateLogin } from "../components/validation.ts";
import { MouseEvent, useEffect, useState } from "react";
import NoUserCountdown from "../components/noUserCountdown.tsx";
import { twMerge } from "tailwind-merge";
import { sleep } from "../components/sleep.ts";
import DownArrow from "../components/svgs/downArrow.tsx";
import { getMarcaFromSigla, MarcheMezzi } from "../misc/marcheMezzi.ts";
import { CategorieRicambi } from "../misc/categorieRicambi.ts";
import { providerValidateLogin } from "../components/providerValidation.ts";
import { ProviderData } from "./profilo.tsx";
import { useNavigate } from "react-router-dom";
import ProviderRicambiPage from "../components/providerRicambiPage.tsx";
import { fornitoreTokenName } from "../config.ts";

function Ricambi() {
  const nav = useNavigate();
  const [userId, setUserId] = useState(-1);
  const [providerId, setProviderId] = useState(-1);
  const [providerData, setProviderData] = useState(new ProviderData(null));
  const [isEmployee, setIsEmployee] = useState<null | boolean>(null);
  const [error, setError] = useState("");
  const [userBrands, setUserBrands] = useState<string>("");
  const [filtri, setFiltri] = useState({
    brands: userBrands,
    categoria: "Tutte",
  });
  const [openFiltri, setOpenFiltri] = useState<boolean>(true);

  const handleError = async (errorText: string) => {
    setError(errorText);
    await sleep(4000);
    setError("");
  };

  async function setAuth() {
    const id = await validateLogin();
    if (id) setUserId(id);
  }

  async function setEmployeeBool() {
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    };
    const response = await fetch(
      "http://localhost:8000/users/is_employee.php",
      req
    );
    if (response.ok) {
      const responseData = await response.text();
      if (responseData === "Utente non trovato") {
        setIsEmployee(null);
      } else {
        setIsEmployee(responseData === "true");
      }
    } else setIsEmployee(null);
  }

  async function getBrands() {
    while (isEmployee === null) {
      await sleep(100);
    }
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    };
    const response = isEmployee
      ? await fetch(
          "http://localhost:8000/vehicles/get_employee_brands.php",
          req
        )
      : await fetch(
          "http://localhost:8000/vehicles/get_client_brands.php",
          req
        );
    if (response.ok) {
      const responseData = await response.json();
      if (Object.prototype.hasOwnProperty.call(responseData, "error")) {
        await handleError(
          "Errore, utente non trovato, ricaricare la pagina, grazie."
        );
      } else if (Object.prototype.hasOwnProperty.call(responseData, "brands")) {
        setUserBrands(responseData.brands);
        setFiltri({ ...filtri, brands: responseData.brands });
      } else {
        await handleError("Errore, ricaricare la pagina, grazie.");
      }
    }
  }

  const handleFilter = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    console.log(filtri);
  };

  async function getProvider() {
    if (providerId === -1) return;
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: providerId }),
    };
    const response = await fetch("http://localhost:8000/get_provider.php", req);
    if (response.ok) {
      const data = await response.json();
      if (!Object.prototype.hasOwnProperty.call(data, "error")) {
        setProviderData(new ProviderData(data));
      } else {
        window.alert(
          "Errore nel caricamento dei dati, ci scusiamo per l'inconveniente. Verrai reindirizzato alla home"
        );
        nav("/");
      }
    }
  }

  useEffect(() => {
    setAuth().then(null);
    async function setProviderAuth() {
      const providerToken: {
        id_provider: number;
        name: string;
      } | null = await providerValidateLogin();
      if (providerToken) {
        setProviderId(providerToken.id_provider);
      }
    }
    if (userId === -1) {
      setProviderAuth().then(null);
    }
  }, []);

  useEffect(() => {
    setEmployeeBool().then(null);
  }, [userId]);

  useEffect(() => {
    getBrands().then(null);
  }, [isEmployee]);

  useEffect(() => {
    getProvider().then(null);
  }, [providerId]);

  if (providerData.name !== "")
    return <ProviderRicambiPage providerId={providerId} />;

  if ((userId === -1 || isEmployee === null) && providerId === -1)
    return <NoUserCountdown />;

  return (
    <div className="text-white">
      <div
        className={twMerge(
          "bg-red-600 text-white duration-150 font-semibold text-lg",
          error !== "" && "px-2 py-1"
        )}
      >
        {error}
      </div>
      <div className="w-full overflow-hidden relative flex flex-wrap bg-neutral-500">
        <div
          className={twMerge(
            "w-11/12 flex flex-wrap min-w-[23rem] duration-500 mx-auto max-w-4xl overflow-hidden",
            openFiltri ? "max-h-[214px]" : "max-h-0"
          )}
        >
          <form className="w-full flex flex-wrap gap-y-3 py-2 md:justify-between md:items-end">
            <div className="w-full md:w-[calc(50%-35.5px)]">
              <label className="block pl-px mb-0.5 text-sm font-medium">
                Marca
              </label>
              <select
                value={filtri.brands}
                onChange={(e) => {
                  setFiltri({ ...filtri, brands: e.target.value });
                  console.log(e.target.value);
                }}
                className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                required={true}
              >
                <option value={userBrands}>I tuoi mezzi</option>
                {Object.entries(MarcheMezzi).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-[calc(50%-35.5px)]">
              <label className="block pl-px mb-0.5 text-sm font-medium">
                Categoria
              </label>
              <select
                value={filtri.categoria}
                onChange={(e) => {
                  setFiltri({ ...filtri, categoria: e.target.value });
                  console.log(e.target.value);
                }}
                className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                required={true}
              >
                <option value="Tutte">Tutte</option>
                {Object.entries(CategorieRicambi).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={(e) => handleFilter(e)}
              className="bg-blue-600 hover:bg-blue-700 py-2 mb-1.5 md:mb-0 h-fit px-3 rounded-lg"
            >
              Filtra
            </button>
          </form>
        </div>
        <div
          onClick={() => setOpenFiltri((e) => !e)}
          className="w-full cursor-pointer py-0.5 pl-2 flex items-center fill-white gap-x-1 bg-neutral-700 uppercase text-lg font-bold"
        >
          <DownArrow
            className={twMerge(
              "h-6 w-6 duration-500",
              openFiltri && "rotate-180"
            )}
          />{" "}
          Filtri
        </div>
      </div>
    </div>
  );
}

export default Ricambi;
