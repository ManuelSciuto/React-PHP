import { twMerge } from "tailwind-merge";
import { Veicolo } from "../misc/classes/Veicolo.ts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Pencil from "./svgs/pencil.tsx";
import Expand from "./svgs/expand.tsx";
import IconX from "./svgs/iconX.tsx";
import PlusIcon from "./svgs/plusIcon.tsx";
import MinusIcon from "./svgs/minusIcon.tsx";
import { MarcheMezzi } from "../misc/marcheMezzi.ts";

interface Props {
  veicolo: Veicolo;
  className?: string;
  handleError: (errorText: string) => Promise<void>;
  reTrigger?: Dispatch<SetStateAction<boolean>>;
  setExpandVeicolo?: Dispatch<SetStateAction<Veicolo | null>>;
  setEditVeicolo?: Dispatch<SetStateAction<boolean>>;
  handleAddJob?: (vehicle_id: number) => Promise<void>;
  handleRemoveJob?: (vehicle_id: number) => Promise<void>;
  showOwnerName?: boolean;
}

function ProfiloVeicolo({
  handleError,
  className,
  reTrigger,
  veicolo,
  setExpandVeicolo,
  setEditVeicolo,
  handleAddJob,
  handleRemoveJob,
  showOwnerName,
}: Props) {
  const [ownerName, setOwnerName] = useState("");

  const handleDelete = async (idVeicolo: number) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo veicolo?")) {
      return;
    }
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vehicle_id: idVeicolo }),
    };
    const response = await fetch(
      "http://localhost:8000/vehicles/delete_vehicle.php",
      req
    );
    if (response.ok) {
      const resText = await response.text();
      if (resText === "Veicolo eliminato con successo") {
        reTrigger && reTrigger((prev) => !prev);
      } else {
        await handleError(resText);
      }
    } else {
      await handleError("Errore, si prega di riprovare");
    }
  };

  const getOwnerName = async () => {
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: veicolo.client_id }),
    };
    const response = await fetch(
      "http://localhost:8000/vehicles/get_vehicle_owner.php",
      req
    );
    if (response.ok) {
      const resText = await response.text();
      if (resText === "Errore utente non trovato") {
        setOwnerName("");
      } else {
        setOwnerName(resText);
      }
    } else {
      setOwnerName("");
    }
  };

  useEffect(() => {
    getOwnerName().then(null);
  }, []);

  if (!veicolo) return;

  return (
    <div
      className={twMerge(
        className,
        "w-full relative md:w-[calc(50%-4px)] flex flex-wrap justify-between p-4 border-2 rounded-lg overflow-hidden"
      )}
    >
      {handleAddJob && (
        <button
          onClick={() => handleAddJob(veicolo.vehicle_id)}
          className="absolute top-3 right-3"
        >
          <PlusIcon className="h-12 w-12" />
        </button>
      )}
      {handleRemoveJob && (
        <button
          onClick={() => handleRemoveJob(veicolo.vehicle_id)}
          className="absolute top-3 right-12"
        >
          <MinusIcon className="h-12 w-12 fill-red-600" />
        </button>
      )}
      {setExpandVeicolo && setEditVeicolo && (
        <div className="absolute top-0 right-0 w-8 border-l border-transparent">
          <button
            onClick={() => handleDelete(veicolo.vehicle_id)}
            className="w-full bg-red-600 hover:bg-red-700 h-8 flex justify-center items-center"
          >
            <IconX className="w-5 h-5" />
          </button>
          <button
            onClick={() => setExpandVeicolo(veicolo)}
            className="w-full bg-green-500 hover:bg-green-600 h-8 flex justify-center items-center"
          >
            <Expand className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              setEditVeicolo(true);
              setExpandVeicolo(veicolo);
            }}
            className="w-full bg-yellow-400 hover:bg-yellow-500 h-8 flex justify-center items-center rounded-bl-md"
          >
            <Pencil className="h-6 w-6" />
          </button>
        </div>
      )}
      <p className="py-1.5 text-white px-5 w-fit text-lg font-semibold rounded-md bg-blue-500">
        {[
          MarcheMezzi[veicolo.brand as keyof typeof MarcheMezzi],
          veicolo.model,
          veicolo.reg_date.split("-")[0],
        ].join(" ")}
      </p>
      <div className="w-full mt-1.5 flex flex-wrap gap-y-1 select-none">
        <p className="text-lg w-full font-semibold">
          Targa: {veicolo.tag ? veicolo.tag : "Assente"}
        </p>
        {veicolo.arrival_date !== "0000-00-00" && (
          <p className="text-lg w-full font-semibold">
            Data ingresso: {veicolo.arrival_date}
          </p>
        )}
        {showOwnerName && ownerName ? (
          <p className="text-lg w-full font-semibold">
            Proprietario: {ownerName}
          </p>
        ) : (
          <p className="text-lg w-full font-semibold">
            Immatricolazione: {veicolo.reg_date}
          </p>
        )}
      </div>
      <div className="w-full mt-1.5 flex flex-wrap">
        <p className="text-lg w-full font-semibold">Status</p>
        <div className="w-full border p-1 min-h-[82px] rounded-md line-clamp-3">
          {veicolo.status === ""
            ? "Nessuno status presente per questo veicolo"
            : veicolo.status}
        </div>
      </div>
    </div>
  );
}

export default ProfiloVeicolo;
