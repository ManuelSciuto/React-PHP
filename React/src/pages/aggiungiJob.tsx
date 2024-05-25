import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../components/validation.ts";
import { sleep } from "../components/sleep.ts";
import { twMerge } from "tailwind-merge";
import NoUserCountdown from "../components/noUserCountdown.tsx";
import DownArrow from "../components/svgs/downArrow.tsx";
import { Veicolo } from "../misc/classes/Veicolo.ts";
import ProfiloVeicolo from "../components/profiloVeicolo.tsx";

function AggiungiJob() {
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(-1);
  const [filtri, setFiltri] = useState({
    brand: "",
    model: "",
  });
  const [openFiltri, setOpenFiltri] = useState<boolean>(true);
  const [vehicles, setVehicles] = useState<Veicolo[]>([]);
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

  const handleFilter = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...filtri, mech_id: userId }),
    };
    const response = await fetch(
      "http://localhost:8000/vehicles/search_vehicles.php",
      req,
    );
    if (response.ok) {
      const responseData = await response.json();
      const resArray: Veicolo[] = [];
      for (const vehicle of responseData) {
        resArray.push(new Veicolo(vehicle));
      }
      setVehicles(resArray);
    } else await handleError("Impossibile ottenere i veicoli richiesti");
  };

  const handleAddJob = async (vehicle_id: number) => {
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mech_id: userId,
        vehicle_id: vehicle_id,
      }),
    };
    const response = await fetch(
      "http://localhost:8000/vehicles/add_job.php",
      req,
    );
    if (response.ok) {
      const responseData = await response.text();
      if (responseData === "Veicolo aggiunto con successo") {
        nav("/Veicoli");
      } else {
        await handleError(responseData);
      }
    } else await handleError("Impossibile aggiungere il veicolo richiesto");
  };

  useEffect(() => {
    setAuth().then(null);
  }, []);

  if (userId === -1) return <NoUserCountdown />;

  return (
    <div className="pb-4 text-white">
      <div
        className={twMerge(
          "bg-red-600 text-white duration-150 font-semibold text-lg",
          error !== "" && "px-2 py-1",
        )}
      >
        {error}
      </div>
      <div className="w-full overflow-hidden relative flex flex-wrap bg-neutral-500">
        <div
          className={twMerge(
            "w-11/12 flex flex-wrap min-w-[23rem] duration-500 mx-auto max-w-4xl overflow-hidden",
            openFiltri ? "max-h-[214px]" : "max-h-0",
          )}
        >
          <form className="w-full flex flex-wrap gap-y-3 py-2 md:justify-between md:items-end">
            <div className="w-full md:w-[calc(50%-35.5px)]">
              <label className="block pl-px mb-0.5 text-sm font-medium">
                Marca
              </label>
              <input
                type="text"
                value={filtri.brand}
                onChange={(e) =>
                  setFiltri({ ...filtri, brand: e.target.value })
                }
                className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              />
            </div>
            <div className="w-full md:w-[calc(50%-35.5px)]">
              <label className="block pl-px mb-0.5 text-sm font-medium">
                Modello
              </label>
              <input
                type="text"
                value={filtri.model}
                onChange={(e) =>
                  setFiltri({ ...filtri, model: e.target.value })
                }
                className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              />
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
              openFiltri && "rotate-180",
            )}
          />{" "}
          Filtri
        </div>
      </div>
      <div className="p-4 flex flex-wrap justify-center gap-2">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle, idx) => (
            <ProfiloVeicolo
              className={"xl:w-[calc(33.33%-4px)]"}
              key={idx}
              veicolo={vehicle}
              handleError={handleError}
              handleAddJob={handleAddJob}
            />
          ))
        ) : (
          <p className="w-2/3 mx-auto text-center text-xl font-semibold">
            Non sono presenti veicoli su cui tu non stia già lavorando con i
            seguenti filtri
          </p>
        )}
      </div>
    </div>
  );
}

export default AggiungiJob;
