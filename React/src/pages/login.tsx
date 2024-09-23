import React, { useState } from "react";
import { fornitoreTokenName, tokenName } from "../config.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { sleep } from "../components/sleep.ts";
import eventEmitter from "../misc/eventEmitter.tsx";
import LoadingSpinner from "../components/svgs/loadingSpinner.tsx";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ricordami, setRicordami] = useState(false);
  const [error, setError] = useState("");
  const [isFornitoreLoading, setIsFornitoreLoading] = useState(false);
  const [fornitoreError, setFornitoreError] = useState("");
  const [isFornitore, setIsFornitore] = useState(false);
  const [fornitoreKey, setFornitoreKey] = useState("");
  const [fornitoreMail, setFornitoreMail] = useState("");
  const nav = useNavigate();

  const handleError = async (error: string) => {
    setError(error);
    setIsLoading(false);
    await sleep(4000);
    setError("");
  };

  const handleFornitoreError = async (error: string) => {
    setFornitoreError(error);
    setIsFornitoreLoading(false);
    await sleep(4000);
    setFornitoreError("");
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.trim(),
        password: password.trim(),
        rememberMe: ricordami,
      }),
    };
    try {
      const response = await fetch("http://localhost:8000/login.php", req);
      setIsLoading(false);
      if (response.ok) {
        try {
          const responseData = await response.json();
          if (responseData && responseData.token) {
            localStorage.setItem(tokenName, responseData.token);
            eventEmitter.emit("authChange", true);
            nav("/");
          } else if (responseData && responseData.error) {
            await handleError(responseData.error);
          }
        } catch (error) {
          await handleError("Errore nella ricezione della risposta");
        }
      } else {
        await handleError("Errore, si prega di riprovare");
      }
    } catch (error) {
      console.error("Errore: ", error);
    }
  };

  const handleFornitoreLogin = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fornitoreMail.trim(),
        key: fornitoreKey.trim(),
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:8000/loginFornitore.php",
        req
      );
      setIsLoading(false);
      if (response.ok) {
        try {
          const responseData = await response.json();
          console.log(responseData);

          if (Object.prototype.hasOwnProperty.call(responseData, "token")) {
            localStorage.setItem(fornitoreTokenName, responseData.token);
            eventEmitter.emit("authChange", true);
            nav("/");
          } else if (responseData && responseData.error) {
            await handleFornitoreError(responseData.error);
          }
        } catch (error) {
          await handleFornitoreError("Errore nella ricezione della risposta");
        }
      } else {
        await handleFornitoreError("Errore, si prega di riprovare");
      }
    } catch (error) {
      console.error("Errore: ", error);
    }
  };

  return (
    <div>
      <div className="w-1/2 min-w-[23rem] rounded-lg mt-5 mx-auto border-2 max-w-md">
        <div className="w-full text-center pb-5 pt-2 bg-blue-500 text-3xl rounded-t-md font-bold text-white">
          BENTORNATO
        </div>
        <form className="w-full p-3 text-lg -mt-3 rounded-md bg-[rgb(30,30,30)]">
          <div>
            <label className="block pl-px mb-0.5 text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full mt-2 flex flex-wrap">
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
          <div
            onClick={() => setRicordami(!ricordami)}
            className="flex mt-2 pl-px items-center gap-x-1 text-lg font-medium"
          >
            <input
              type="checkbox"
              onChange={() => {}}
              checked={ricordami}
              className="scale-125"
            />
            <label className="select-none text-white">Ricordami</label>
          </div>
          {error && (
            <p className="text-red-600 mt-1 font-semibold text-lg text-center">
              {error}
            </p>
          )}
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="bg-blue-500 mt-2 hover:bg-blue-600 text-white p-3 rounded-lg text-xl font-bold w-full flex justify-center"
          >
            {isLoading ? <LoadingSpinner /> : "Log in"}
          </button>
        </form>
      </div>
      <div className="w-1/2 min-w-[23rem] text-white flex mt-2 justify-center max-w-md font-medium gap-x-1 rounded-lg p-2 mx-auto border-2">
        Non hai un account?{" "}
        <NavLink
          to="/Registrazione"
          className="text-blue-500 hover:text-blue-600"
        >
          Registrati
        </NavLink>
      </div>
      <div className="flex flex-wrap gap-y-1 w-1/2 min-w-[23rem] text-white mt-2 justify-center max-w-md font-medium gap-x-1 rounded-lg p-2 mx-auto border-2">
        <div className="w-full flex justify-center gap-x-1">
          Sei un fornitore?{" "}
          <button
            onClick={() => setIsFornitore(!isFornitore)}
            className="text-blue-500 hover:text-blue-600"
          >
            {isFornitore ? "Chiudi" : "Inserisci la chiave"}
          </button>
        </div>
        {isFornitore && (
          <div className="w-full flex flex-wrap gap-y-0.5">
            <div className="w-full">
              <label className="block pl-px mb-0.5 text-sm font-medium text-white">
                Email
              </label>
              <input
                type="text"
                value={fornitoreMail}
                onChange={(e) => setFornitoreMail(e.target.value)}
                className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                required={true}
              />
            </div>
            <label className="block mt-1 w-full pl-px mb-0.5 text-sm font-medium text-white">
              Chiave d'accesso
            </label>
            <input
              type="text"
              value={fornitoreKey}
              onChange={(e) => setFornitoreKey(e.target.value)}
              className="w-[75%] bg-neutral-300 font-semibold hover:bg-neutral-400 border border-neutral-300 text-black rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block p-2"
              required={true}
            />
            <button
              type="button"
              onClick={(e) => handleFornitoreLogin(e)}
              className="w-[25%] bg-blue-500 hover:bg-blue-600 rounded-r-lg"
            >
              {isFornitoreLoading ? <LoadingSpinner /> : "Inserire"}
            </button>
          </div>
        )}
        {fornitoreError && (
          <p className="text-red-600 mt-1 font-semibold text-lg text-center">
            {fornitoreError}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
