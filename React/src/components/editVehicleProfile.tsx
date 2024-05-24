import { Veicolo } from "../misc/classes/Veicolo.ts";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  veicolo: Veicolo;
  handleError: (errorText: string) => Promise<void>;
  closeWindow: () => void;
  reTrigger: Dispatch<SetStateAction<boolean>>;
}

function EditVehicleProfile({
  veicolo,
  handleError,
  closeWindow,
  reTrigger,
}: Props) {
  const [dataVeicolo, setDataVeicolo] = useState<Veicolo>(veicolo);

  const handleUpdate = async () => {
    if (
      dataVeicolo.brand === "" ||
      dataVeicolo.model === "" ||
      dataVeicolo.tag === "" ||
      dataVeicolo.reg_date === ""
    ) {
      await handleError("Inserire tutti i valori richiesti");
      return;
    }
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicle_id: dataVeicolo.vehicle_id,
        brand: dataVeicolo.brand,
        model: dataVeicolo.model,
        tag: dataVeicolo.tag,
        reg_date: dataVeicolo.reg_date,
      }),
    };
    const response = await fetch(
      "http://localhost:8000/vehicles/update_vehicle_data.php",
      req,
    );
    if (response.ok) {
      const responseData = await response.text();
      if (responseData === "Veicolo aggiornato con successo") {
        reTrigger((prev) => !prev);
        closeWindow();
      } else {
        await handleError(responseData);
      }
    }
  };

  return (
    <div>
      <div className="w-11/12 h-fit flex flex-wrap min-w-[23rem] p-4 rounded-lg mt-3 mx-auto border-2 max-w-4xl  bg-neutral-500 bg-opacity-100">
        <p className="w-full font-bold text-xl mb-2">DATI VEICOLO</p>
        <form className="w-full flex flex-wrap gap-y-3 md:justify-between">
          <div className="w-full md:w-[calc(50%-6px)]">
            <label className="block pl-px mb-0.5 text-sm font-medium">
              Marca<label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              value={dataVeicolo.brand}
              onChange={(e) =>
                setDataVeicolo({ ...dataVeicolo, brand: e.target.value })
              }
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full md:w-[calc(50%-6px)]">
            <label className="block pl-px mb-0.5 text-sm font-medium">
              Modello<label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              value={dataVeicolo.model}
              onChange={(e) =>
                setDataVeicolo({ ...dataVeicolo, model: e.target.value })
              }
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full md:w-[calc(50%-6px)]">
            <label className="block pl-px mb-0.5 text-sm font-medium">
              Targa<label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              value={dataVeicolo.tag}
              onChange={(e) =>
                setDataVeicolo({ ...dataVeicolo, tag: e.target.value })
              }
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full md:w-[calc(50%-6px)]">
            <label className="block pl-px mb-0.5 text-sm font-medium">
              Data d'immatricolazione<label className="text-red-600">*</label>
            </label>
            <input
              type="date"
              value={dataVeicolo.reg_date}
              onChange={(e) =>
                setDataVeicolo({ ...dataVeicolo, reg_date: e.target.value })
              }
              className="cursor-pointer bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
        </form>
      </div>
      <div className="w-11/12 mt-3 mx-auto min-w-[23rem] max-w-4xl">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 py-2 px-3 rounded-lg"
        >
          Modifica Veicolo
        </button>
      </div>
    </div>
  );
}

export default EditVehicleProfile;
