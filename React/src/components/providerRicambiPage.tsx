import { NavLink } from "react-router-dom";

interface Props {
  providerId: number;
}

function ProviderRicambiPage({ providerId }: Props) {
  return (
    <div className="px-2 py-4">
      <div className="w-full">
        <NavLink
          to="/AggiungiRicambi"
          className="bg-blue-500 hover:bg-blue-600 px-3 rounded-md text-white p-2"
        >
          Aggiungi prodotti
        </NavLink>
      </div>
      <p className="border-b-2 text-white text-center mt-4 font-bold text-xl">
        I TUOI PRODOTTI
      </p>
      <div className="border w-full"></div>
    </div>
  );
}

export default ProviderRicambiPage;
