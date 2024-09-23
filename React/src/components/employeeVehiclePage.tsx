import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Veicolo } from "../misc/classes/Veicolo.ts";
import ProfiloVeicolo from "./profiloVeicolo.tsx";
import IconX from "./svgs/iconX.tsx";
import EditVehicleProfile from "./editVehicleProfile.tsx";
import ExpandedVehicleProfile from "./expandedVehicleProfile.tsx";

interface Props {
  userId: number;
  handleError: (error: string) => Promise<void>;
}

function EmployeeVehiclePage({ userId, handleError }: Props) {
  const [vehicles, setVehicles] = useState<Veicolo[]>([]);
  const [expandedVehicle, setExpandedVehicle] = useState<Veicolo | null>(null);
  const [editVehicle, setEditVehicle] = useState<boolean>(false);
  const [reTrigger, setReTrigger] = useState(false);

  const closeEditWindow = () => {
    setEditVehicle(false);
    setExpandedVehicle(null);
  };

  const getEmployeevehicles = async () => {
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mech_id: userId }),
    };
    const response = await fetch(
      "http://localhost:8000/vehicles/get_employee_vehicles.php",
      req
    );
    if (response.ok) {
      const responseData = await response.json();
      if (Object.prototype.hasOwnProperty.call(responseData, "error")) {
        await handleError(responseData);
        return;
      }
      const resArray: Veicolo[] = [];
      for (const vehicle of responseData.vehicles) {
        resArray.push(new Veicolo(vehicle));
      }
      setVehicles(resArray);
    } else await handleError("Impossibile ottenere i veicoli richiesti");
  };

  const handleRemoveJob = async (vehicle_id: number) => {
    const check = window.confirm(
      "Vuoi rimuovere questo veicolo da quelli su cui stai lavorando?"
    );
    if (!check) return;
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mech_id: userId,
        vehicle_id: vehicle_id,
      }),
    };
    const response = await fetch(
      "http://localhost:8000/vehicles/remove_job.php",
      req
    );
    if (response.ok) {
      const responseData = await response.text();
      if (responseData === "Veicolo eliminato con successo") {
        setReTrigger((e) => !e);
        setVehicles(vehicles.filter((v) => v.vehicle_id != vehicle_id));
      } else {
        await handleError(responseData);
      }
    } else await handleError("Impossibile eliminare il veicolo");
  };

  useEffect(() => {
    getEmployeevehicles().then(null);
  }, []);

  useEffect(() => {
    if (userId !== -1) {
      getEmployeevehicles().then(null);
    }
  }, [reTrigger]);

  return (
    <div>
      <div className="flex mt-2 py-2 px-4 gap-x-3 items-center">
        <p className="text-lg">
          Stai lavorando su {vehicles.length} veicol
          {vehicles.length === 1 ? "o" : "i"}
        </p>
        <NavLink
          to="./AggiungiJob"
          className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-lg"
        >
          Aggiungi un veicolo
        </NavLink>
      </div>
      <div className="p-4 pt-2 flex flex-wrap justify-center gap-2">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle, idx) => (
            <ProfiloVeicolo
              key={idx}
              className={"xl:w-[calc(33.33%-4px)]"}
              veicolo={vehicle}
              handleError={handleError}
              setExpandVeicolo={setExpandedVehicle}
              setEditVeicolo={setEditVehicle}
              handleRemoveJob={handleRemoveJob}
              showOwnerName={true}
            />
          ))
        ) : (
          <p className="text-center text-xl font-semibold">
            Non stai lavorando su nessun veicolo
          </p>
        )}
      </div>
      {expandedVehicle !== null && (
        <div
          id="ProfiloVeicoloFullscreen"
          className="absolute top-0 right-0 w-full h-fit bg-black bg-opacity-90 z-20 min-h-full pb-4"
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
              isEmployee={true}
            />
          ) : (
            <ExpandedVehicleProfile expandedVehicle={expandedVehicle} />
          )}
        </div>
      )}
    </div>
  );
}

export default EmployeeVehiclePage;
