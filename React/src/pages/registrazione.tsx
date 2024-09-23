import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/svgs/loadingSpinner.tsx";
import { tokenName } from "../config.ts";
import eventEmitter from "../misc/eventEmitter.tsx";
import { sleep } from "../components/sleep.ts";
import { NavLink, useNavigate } from "react-router-dom";

function Registrazione() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [phone_num, setPhoneNum] = useState("");
  const [vat_number, setVatNumber] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleError = async (error: string) => {
    setError(error);
    setIsLoading(false);
    await sleep(4000);
    setError("");
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      !username ||
      !password ||
      !name ||
      !surname ||
      !address ||
      !phone_num ||
      !vat_number
    ) {
      await handleError("Inserire tutti i valori segnati con l'asterisco");
      return;
    }
    if (username.length < 6) {
      await handleError("Il tuo username dev'essere lungo almeno 6 caratteri");
      return;
    } else if (password.length < 6) {
      await handleError("La tua password dev'essere lunga almeno 6 caratteri");
      return;
    }
    const req: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        name: name,
        surname: surname,
        address: address,
        phone_num: phone_num,
        vat_number: vat_number,
        company_name: company_name,
        client_since: getCurrentDate(),
      }),
    };
    const response = await fetch(
      "http://localhost:8000/users/add_client.php",
      req
    );
    if (response.ok) {
      let responseData = await response.text();
      if (responseData === "Utente inserito con successo") {
        const req = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username.trim(),
            password: password.trim(),
            rememberMe: false,
          }),
        };
        const response = await fetch("http://localhost:8000/login.php", req);
        setIsLoading(false);
        if (response.ok) {
          const responseData = await response.json();
          if (Object.prototype.hasOwnProperty.call(responseData, "token")) {
            localStorage.setItem(tokenName, responseData.token);
            eventEmitter.emit("authChange", true);
            nav("/");
          } else if (
            Object.prototype.hasOwnProperty.call(responseData, "error")
          ) {
            await handleError(responseData.error);
          }
        } else {
          await handleError("Errore, si prega di riprovare");
        }
      } else {
        await handleError("Errore, si prega di riprovare");
      }
    }
  };

  // Ritorno alla home se la pagina ci sta troppo a rispondere o si bugga
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        nav("/");
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="pb-5">
      <div className="w-1/2 rounded-lg min-w-[23rem] mt-5 mx-auto border-2 max-w-md">
        <div className="w-full text-center pb-5 pt-2 bg-blue-500 text-3xl rounded-t-md font-bold text-white">
          BENVENUTO
        </div>
        <form className="w-full p-3 -mt-3 flex flex-wrap gap-y-1.5 bg-[rgb(30,30,30)] text-lg rounded-md">
          <div className="w-full">
            <label className="block pl-px mb-0.5 text-sm font-medium text-white">
              Username <label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full flex flex-wrap">
            <label className="block w-full pl-px mb-0.5 text-sm font-medium text-white">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[85%] bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-black rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block p-2"
              required={true}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prevState) => !prevState)}
              className="w-[15%] bg-neutral-300 hover:bg-neutral-400 border border-gray-700 border-l-0 rounded-r-lg text-gray-900"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="border border-gray-300 w-full mt-2.5 mb-1.5"></div>
          <div className="w-full">
            <label className="block pl-px mb-0.5 text-sm font-medium text-white">
              Nome <label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full">
            <label className="block pl-px mb-0.5 text-sm font-medium text-white">
              Cognome <label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              onChange={(e) => setSurname(e.target.value)}
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full">
            <label className="block pl-px mb-0.5 text-sm font-medium text-white">
              Indirizzo <label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full">
            <label className="block pl-px mb-0.5 text-sm font-medium text-white">
              Numero di telefono <label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              onChange={(e) => setPhoneNum(e.target.value)}
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full">
            <label className="block pl-px mb-0.5 text-sm font-medium text-white">
              Partita IVA <label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              onChange={(e) => setVatNumber(e.target.value)}
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full">
            <label className="block pl-px mb-0.5 text-sm font-medium text-white">
              Nome azienda
            </label>
            <input
              type="text"
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          {error && (
            <p className="text-red-600 w-full mt-1 font-semibold text-lg text-center">
              {error}
            </p>
          )}
          <button
            disabled={isLoading}
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="bg-blue-500 flex justify-center mt-2.5 hover:bg-blue-600 text-white p-3 rounded-lg text-xl font-bold w-full"
          >
            {isLoading ? <LoadingSpinner /> : "Registrati"}
          </button>
        </form>
      </div>
      <div className="w-1/2 min-w-[23rem] text-white flex mt-2 justify-center max-w-md font-medium gap-x-1 rounded-lg p-2 mx-auto border-2">
        Vuoi diventare un fornitore?{" "}
        <NavLink
          to="/FornitoreRegistrazione"
          className="text-blue-500 hover:text-blue-600"
        >
          Inoltra la richiesta
        </NavLink>
      </div>
    </div>
  );
}

export default Registrazione;
