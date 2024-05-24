import Logo3 from "../components/svgs/logo3.tsx";
import { validateLogin } from "../components/validation.ts";
import { useEffect, useState } from "react";
import NoUserCountdown from "../components/noUserCountdown.tsx";
import ProfiloVeicolo from "../components/profiloVeicolo.tsx";
import { twMerge } from "tailwind-merge";
import { sleep } from "../components/sleep.ts";
import { NavLink } from "react-router-dom";
import { Veicolo } from "../misc/classes/Veicolo.ts";
import IconX from "../components/svgs/iconX.tsx";
import ExpandedVehicleProfile from "../components/expandedVehicleProfile.tsx";
import EditVehicleProfile from "../components/editVehicleProfile.tsx";

function Veicoli() {
  const [userId, setUserId] = useState(-1);
  const [isEmployee, setIsEmployee] = useState<null | boolean>(null);
  const [error, setError] = useState("");
  const [vehiclesNumber, setVehiclesNumber] = useState(0);
  const [vehicles, setVehicles] = useState<Veicolo[]>([]);
  const [reTrigger, setReTrigger] = useState(false);
  const [expandedVehicle, setExpandedVehicle] = useState<Veicolo | null>(null);
  const [editVehicle, setEditVehicle] = useState<boolean>(false);

  const closeEditWindow = () => {
    setEditVehicle(false);
    setExpandedVehicle(null);
  };

  const handleError = async (errorText: string) => {
    setError(errorText);
    closeEditWindow();
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
      req,
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

  async function getClientVehicles() {
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    };
    const response = await fetch(
      "http://localhost:8000/vehicles/get_client_vehicles.php",
      req,
    );
    if (response.ok) {
      const responseData = await response.json();
      if (Object.prototype.hasOwnProperty.call(responseData, "error")) {
        await handleError(
          "Errore, utente non trovato, ricaricare la pagina, grazie.",
        );
      } else {
        setVehiclesNumber(responseData.length);
        const resArray: Veicolo[] = [];
        for (const vehicle of responseData) {
          resArray.push(new Veicolo(vehicle));
        }
        setVehicles(resArray);
      }
    }
  }

  useEffect(() => {
    setAuth().then(null);
  }, []);

  useEffect(() => {
    setEmployeeBool().then(null);
    if (!isEmployee && userId !== -1) {
      getClientVehicles().then(null);
    }
  }, [userId]);

  useEffect(() => {
    if (!isEmployee && userId !== -1) {
      getClientVehicles().then(null);
    }
  }, [reTrigger]);

  if (userId === -1 || isEmployee === null) return <NoUserCountdown />;

  return (
    <div className="text-white">
      <div
        className={twMerge(
          "bg-red-600 text-white duration-150 font-semibold text-lg",
          error !== "" && "px-2 py-1",
        )}
      >
        {error}
      </div>
      <div className="flex w-fit mx-auto mt-4 justify-center items-center gap-x-2 select-none">
        <Logo3 />
        <h1 className="h-fit text-3xl uppercase font-lato">I tuoi veicoli</h1>
        <Logo3 />
      </div>
      {isEmployee ? (
        <div className="flex justify-center flex-wrap gap-4 p-4"></div>
      ) : (
        <div>
          {vehiclesNumber < 5 ? (
            <div className="flex my-2 py-2 px-4 gap-x-2">
              {vehiclesNumber === 1 ? (
                <p>Hai {vehiclesNumber} mezzo registrato</p>
              ) : (
                <p>Hai {vehiclesNumber} mezzi registrati</p>
              )}
              <NavLink
                to="./AggiungiVeicolo"
                className="text-blue-500 hover:text-blue-600"
              >
                Aggiungi un mezzo
              </NavLink>
            </div>
          ) : (
            <p className="my-2 py-2 px-4">
              Hai 5 mezzi registati, eliminane uno per aggiungerne altri
            </p>
          )}
          <div className="w-full flex flex-wrap justify-center gap-2 p-4">
            {vehicles.map((veicolo, idx) => (
              <ProfiloVeicolo
                handleError={handleError}
                veicolo={veicolo}
                reTrigger={setReTrigger}
                setExpandVeicolo={setExpandedVehicle}
                setEditVeicolo={setEditVehicle}
                key={idx}
              />
            ))}
          </div>
        </div>
      )}
      {expandedVehicle !== null && (
        <div
          id="ProfiloVeicoloFullscreen"
          className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-90 z-20"
        >
          <div className="w-full pt-5 pr-5 flex justify-end">
            <button
              onClick={() => {
                setExpandedVehicle(null);
                setEditVehicle(false);
              }}
            >
              <IconX className="w-10 h-10 fill-white" />
            </button>
          </div>
          {editVehicle ? (
            <EditVehicleProfile
              closeWindow={closeEditWindow}
              veicolo={expandedVehicle}
              handleError={handleError}
              reTrigger={setReTrigger}
            />
          ) : (
            <ExpandedVehicleProfile expandedVehicle={expandedVehicle} />
          )}
        </div>
      )}
    </div>
  );
}

export default Veicoli;
