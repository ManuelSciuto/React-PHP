import { useEffect, useState } from "react";
import { Veicolo } from "../misc/classes/Veicolo.ts";
import { NavLink } from "react-router-dom";
import ProfiloVeicolo from "./profiloVeicolo.tsx";
import IconX from "./svgs/iconX.tsx";
import EditVehicleProfile from "./editVehicleProfile.tsx";
import ExpandedVehicleProfile from "./expandedVehicleProfile.tsx";

interface Props {
  userId: number;
  handleError: (error: string) => Promise<void>;
  closeWindow: boolean;
}

function ClientVehiclePage({ userId, handleError, closeWindow }: Props) {
  const [vehiclesNumber, setVehiclesNumber] = useState(0);
  const [vehicles, setVehicles] = useState<Veicolo[]>([]);
  const [reTrigger, setReTrigger] = useState(false);
  const [expandedVehicle, setExpandedVehicle] = useState<Veicolo | null>(null);
  const [editVehicle, setEditVehicle] = useState<boolean>(false);

  const closeEditWindow = () => {
    setEditVehicle(false);
    setExpandedVehicle(null);
  };

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
    getClientVehicles().then(null);
  }, []);

  useEffect(() => {
    if (userId !== -1) {
      getClientVehicles().then(null);
    }
  }, [reTrigger]);

  useEffect(() => {
    closeEditWindow();
  }, [closeWindow]);

  return (
    <>
      <div>
        {vehiclesNumber < 5 ? (
          <div className="flex my-2 py-2 px-4 gap-x-2 items-center">
            {vehiclesNumber === 1 ? (
              <p>Hai {vehiclesNumber} mezzo registrato</p>
            ) : (
              <p>Hai {vehiclesNumber} mezzi registrati</p>
            )}
            <NavLink
              to="./AggiungiVeicolo"
              className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-lg"
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
              isEmployee={false}
            />
          ) : (
            <ExpandedVehicleProfile expandedVehicle={expandedVehicle} />
          )}
        </div>
      )}
    </>
  );
}

export default ClientVehiclePage;
