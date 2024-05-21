import Logo3 from "../components/svgs/logo3.tsx";
import { validateLogin } from "../components/validation.ts";
import { useEffect, useState } from "react";
import NoUserCountdown from "../components/noUserCountdown.tsx";
import ProfiloVeicolo from "../components/profiloVeicolo.tsx";
import { twMerge } from "tailwind-merge";
import { sleep } from "../components/sleep.ts";
import { NavLink } from "react-router-dom";

function Veicoli() {
  const [userId, setUserId] = useState(-1);
  const [isEmployee, setIsEmployee] = useState<null | boolean>(null);
  const [error, setError] = useState("");
  const [vehiclesNumber, setVehiclesNumber] = useState(0);

  const handleError = async (errorText: string) => {
    setError(errorText);
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

  async function getClientNumOfVehicles() {
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    };
    const response = await fetch(
      "http://localhost:8000/vehicles/get_user_vehicles_number.php",
      req,
    );
    if (response.ok) {
      const responseData = await response.text();
      if (responseData === "Utente non trovato") {
        await handleError(
          "Errore, utente non trovato, ricaricare la pagina, grazie.",
        );
      } else {
        setVehiclesNumber(parseInt(responseData));
      }
    }
  }

  useEffect(() => {
    setAuth().then(null);
  }, []);

  useEffect(() => {
    setEmployeeBool().then(null);
    if (!isEmployee && userId !== -1) {
      getClientNumOfVehicles().then(null);
    }
  }, [userId]);

  if (userId === -1 || isEmployee === null) return <NoUserCountdown />;

  return (
    <div>
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
              <p>Hai {vehiclesNumber} mezzi registrati</p>
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
        </div>
      )}
    </div>
  );
}

export default Veicoli;
