import { validateLogin } from "../components/validation.ts";
import { useEffect, useState } from "react";
import NoUserCountdown from "../components/noUserCountdown.tsx";
import { twMerge } from "tailwind-merge";
import { sleep } from "../components/sleep.ts";
import ClientVehiclePage from "../components/clientVehiclePage.tsx";
import EmployeeVehiclePage from "../components/employeeVehiclePage.tsx";

function Veicoli() {
  const [userId, setUserId] = useState(-1);
  const [isEmployee, setIsEmployee] = useState<null | boolean>(null);
  const [error, setError] = useState("");
  const [closeClientEditWindow, setCloseClientEditWindow] =
    useState<boolean>(false);

  const handleError = async (errorText: string) => {
    setError(errorText);
    setCloseClientEditWindow((e) => !e);
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
      req
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

  useEffect(() => {
    setAuth().then(null);
  }, []);

  useEffect(() => {
    setEmployeeBool().then(null);
  }, [userId]);

  if (userId === -1 || isEmployee === null) return <NoUserCountdown />;

  return (
    <div className="text-white">
      <div
        className={twMerge(
          "bg-red-600 text-white duration-150 font-semibold text-lg",
          error !== "" && "px-2 py-1"
        )}
      >
        {error}
      </div>
      {isEmployee ? (
        <EmployeeVehiclePage userId={userId} handleError={handleError} />
      ) : (
        <ClientVehiclePage
          closeWindow={closeClientEditWindow}
          userId={userId}
          handleError={handleError}
        />
      )}
    </div>
  );
}

export default Veicoli;
