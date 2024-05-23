import { twMerge } from "tailwind-merge";
import { Veicolo } from "../misc/classes/Veicolo.ts";

interface Props {
  veicolo: Veicolo;
  className?: string;
}

function ProfiloVeicolo({ className, veicolo }: Props) {
  if (!veicolo) return;

  return (
    <div
      className={twMerge(
        className,
        "w-[calc(100%-32px)] md:w-[calc(50%-16px)] lg:w-[calc(33.33%-16px)] flex flex-wrap justify-between p-4 border-2 rounded-lg",
      )}
    >
      <p className="py-1.5 text-white px-5 w-fit text-lg font-semibold rounded-md bg-blue-500">
        {[veicolo.brand, veicolo.model, veicolo.reg_date.split("-")[0]].join(
          " ",
        )}
      </p>
      <div className="w-full mt-1.5 flex flex-wrap gap-y-1 select-none">
        <p className="text-lg w-full font-semibold">Targa: {veicolo.tag}</p>
        {veicolo.arrival_date !== "0000-00-00" && (
          <p className="text-lg w-full font-semibold">
            Arrivato il: {veicolo.arrival_date}
          </p>
        )}
        <p className="text-lg w-full font-semibold">
          Immatricolazione: {veicolo.reg_date}
        </p>
      </div>
      <div className="w-full mt-1.5 flex flex-wrap">
        <p className="text-lg w-full font-semibold">Status</p>
        <div className="w-full border p-1 rounded-md">
          {veicolo.status === ""
            ? "Nessuno status presente per questo veicolo"
            : veicolo.status}
        </div>
      </div>
    </div>
  );
}

export default ProfiloVeicolo;
