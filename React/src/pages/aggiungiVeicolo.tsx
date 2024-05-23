import { validateLogin } from "../components/validation.ts";
import { useEffect, useState } from "react";
import NoUserCountdown from "../components/noUserCountdown.tsx";
import LeftArrow from "../components/svgs/leftArrow.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { Veicolo } from "../misc/classes/Veicolo.ts";
import { twMerge } from "tailwind-merge";
import { sleep } from "../components/sleep.ts";

function AggiungiVeicolo() {
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(-1);
  const [dataVeicolo, setDataVeicolo] = useState<Veicolo>(new Veicolo(null));
  const nav = useNavigate();

  async function setAuth() {
    const id = await validateLogin();
    if (id) setUserId(id);
  }

  const handleError = async (errorText: string) => {
    setError(errorText);
    await sleep(4000);
    setError("");
  };

  useEffect(() => {
    setAuth().then(null);
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("vehicle_id", dataVeicolo.vehicle_id.toString());
    formData.append("arrival_date", dataVeicolo.arrival_date);
    formData.append("status", dataVeicolo.status);
    formData.append("client_id", userId.toString());
    formData.append("model", dataVeicolo.model);
    formData.append("tag", dataVeicolo.tag);
    formData.append("brand", dataVeicolo.brand);
    formData.append("reg_date", dataVeicolo.reg_date);
    const req = {
      method: "POST",
      body: formData,
    };
    const response = await fetch(
      "http://localhost:8000/vehicles/add_vehicle.php",
      req,
    );
    if (response.ok) {
      const responseData = await response.text();
      console.log(responseData);
      if (responseData === "Veicolo aggiunto con successo") {
        nav("/Veicoli");
      } else {
        await handleError(responseData);
      }
    }
  };

  if (userId === -1) return <NoUserCountdown />;

  return (
    <div className="pb-4">
      <div
        className={twMerge(
          "bg-red-600 text-white duration-150 font-semibold text-lg",
          error !== "" && "px-2 py-1",
        )}
      >
        {error}
      </div>
      <div className="cursor-pointer w-fit m-2 mr-auto">
        <NavLink to="/Veicoli">
          <LeftArrow className={"fill-gray-500 w-8 h-8"} />
        </NavLink>
      </div>
      <div className="w-11/12 h-fit flex flex-wrap min-w-[23rem] p-4 rounded-lg mt-3 mx-auto border-2 max-w-4xl">
        <p className="w-full font-bold text-xl mb-2">DATI VEICOLO</p>
        <form className="w-full flex flex-wrap gap-y-3 md:justify-between">
          <div className="w-full md:w-[calc(50%-6px)]">
            <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">
              Marca<label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              value={dataVeicolo.brand}
              onChange={(e) =>
                setDataVeicolo({ ...dataVeicolo, brand: e.target.value })
              }
              className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full md:w-[calc(50%-6px)]">
            <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">
              Modello<label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              value={dataVeicolo.model}
              onChange={(e) =>
                setDataVeicolo({ ...dataVeicolo, model: e.target.value })
              }
              className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full md:w-[calc(50%-6px)]">
            <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">
              Targa<label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              value={dataVeicolo.tag}
              onChange={(e) =>
                setDataVeicolo({ ...dataVeicolo, tag: e.target.value })
              }
              className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full md:w-[calc(50%-6px)]">
            <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">
              Data d'immatricolazione<label className="text-red-600">*</label>
            </label>
            <input
              type="date"
              value={dataVeicolo.reg_date}
              onChange={(e) =>
                setDataVeicolo({ ...dataVeicolo, reg_date: e.target.value })
              }
              className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
        </form>
      </div>
      <div className="w-11/12 mt-3 mx-auto min-w-[23rem] max-w-4xl">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 py-2 px-3 rounded-lg"
        >
          Aggiungi veicolo
        </button>
      </div>
    </div>
  );
}

export default AggiungiVeicolo;
