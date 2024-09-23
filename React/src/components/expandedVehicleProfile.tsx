import { Veicolo } from "../misc/classes/Veicolo.ts";
import { getMarcaFromSigla } from "../misc/marcheMezzi.ts";

interface Props {
  expandedVehicle: Veicolo;
}

function ExpandedVehicleProfile({ expandedVehicle }: Props) {
  return (
    <div className="border-2 p-4 w-2/3 mx-auto mt-5 bg-neutral-500">
      <p className="py-1.5 text-white px-5 w-fit text-lg font-semibold rounded-md bg-blue-500">
        {[
          getMarcaFromSigla(expandedVehicle.brand),
          expandedVehicle.model,
          expandedVehicle.reg_date.split("-")[0],
        ].join(" ")}
      </p>
      <div className="w-full mt-1.5 flex flex-wrap gap-y-1 select-none">
        <p className="text-lg w-full font-semibold">
          Targa: {expandedVehicle.tag}
        </p>
        {expandedVehicle.arrival_date !== "0000-00-00" && (
          <p className="text-lg w-full font-semibold">
            Data ingresso: {expandedVehicle.arrival_date}
          </p>
        )}
        <p className="text-lg w-full font-semibold">
          Immatricolazione: {expandedVehicle.reg_date}
        </p>
      </div>
      <div className="w-full mt-1.5 flex flex-wrap">
        <p className="text-lg w-full font-semibold">Status</p>
        <div className="w-full border p-1 rounded-md">
          {expandedVehicle.status === ""
            ? "Nessuno status presente per questo veicolo"
            : expandedVehicle.status}
        </div>
      </div>
    </div>
  );
}

export default ExpandedVehicleProfile;
