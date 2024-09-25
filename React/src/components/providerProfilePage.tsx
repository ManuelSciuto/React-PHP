import { useEffect, useState } from "react";
import { ProviderData } from "../pages/profilo";
import LoadingSpinner from "./svgs/loadingSpinner";
import OptionIcon from "./svgs/optionIcon";
import { fornitoreTokenName } from "../config";
import eventEmitter from "../misc/eventEmitter";
import { useNavigate } from "react-router-dom";
import { sleep } from "./sleep";
import { providerValidateLogin } from "./providerValidation";

interface Props {
  providerDataProp: ProviderData;
}

function ProviderProfilePage({ providerDataProp }: Props) {
  const nav = useNavigate();
  const [providerData, setProviderData] = useState(new ProviderData(null));
  const [isModifying, setModifying] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [showOpts, setShowOpts] = useState(false);
  const [dataUpdateError, setDataUpdateError] = useState("");
  const [optsError, setOptsError] = useState("");

  const handleDataError = async (optsError: string) => {
    setDataUpdateError(optsError);
    setIsUpdatingData(false);
    await sleep(4000);
    setDataUpdateError("");
  };

  const handleOptsError = async (optsError: string) => {
    setOptsError(optsError);
    setDeleting(false);
    await sleep(4000);
    setOptsError("");
  };

  const handleDataUpdate = async (e: any) => {
    e.preventDefault();
    if (!window.confirm("Sei sicuro di voler aggiornare i dati?")) return;
    setIsUpdatingData(true);
    if (providerData.name === "") return;
    if (providerData.email.length === 0 || providerData.address.length === 0) {
      await handleDataError("Valori non validi");
      return;
    }
    const providerToken: {
      id_provider: number;
      name: string;
    } | null = await providerValidateLogin();
    if (providerToken) {
      const req = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_provider: providerToken.id_provider,
          email: providerData.email.trim(),
          address: providerData.address.trim(),
        }),
      };
      const response = await fetch(
        "http://localhost:8000/modificaProvider.php",
        req
      );
      if (response.ok) {
        const resText = await response.text();
        if (resText === "Account aggiornato con successo") {
          window.alert(resText);
          nav("/Profilo");
        } else {
          await handleDataError(resText);
        }
      } else {
        await handleDataError("Errore, si prega di riprovare");
      }
    } else {
      handleDataError("Account non trovato, riprovare");
    }
    setIsUpdatingData(false);
  };

  const handleDisconnetti = (e?: any) => {
    e.preventDefault();
    setProviderData(new ProviderData(null));
    localStorage.removeItem(fornitoreTokenName);
    eventEmitter.emit("authChange", false);
    nav("/");
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    if (!window.confirm("Sei sicuro di voler eliminare questo account?"))
      return;
    setDeleting(true);
    const providerToken: {
      id_provider: number;
      name: string;
    } | null = await providerValidateLogin();
    if (providerToken) {
      const req = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_provider: providerToken.id_provider }),
      };
      const response = await fetch(
        "http://localhost:8000/deleteProvider.php",
        req
      );
      setDeleting(false);
      if (response.ok) {
        const resText = await response.text();
        if (resText === "Account eliminato con successo") {
          handleDisconnetti();
        } else {
          await handleOptsError(resText);
        }
      } else {
        await handleOptsError("Errore, si prega di riprovare");
      }
    } else {
      handleDataError("Profilo non trovato, riprovare");
    }
  };

  useEffect(() => {
    setProviderData(providerDataProp);
  }, []);

  return (
    <div className="pb-4">
      <div className="w-3/4 text-white min-w-[26rem] max-w-[50rem] relative flex flex-wrap justify-between p-4 border-2 mx-auto my-5 rounded-lg">
        <OptionIcon
          onClick={() => setShowOpts((prevState) => !prevState)}
          className="cursor-pointer fill-gray-600 w-7 h-7 absolute top-3 right-3"
        />
        <div
          className={
            "absolute duration-100 text-white select-none flex flex-wrap flex-col top-11 right-3.5 border border-gray-400 rounded " +
            (!showOpts && "opacity-0")
          }
        >
          <button
            onClick={() => {
              setModifying((prevState) => !prevState);
              setShowOpts((prevState) => !prevState);
            }}
            className="px-1.5 py-0.5 rounded-t border-b border-gray-400 hover:bg-neutral-800"
          >
            Modifica
          </button>
          <button
            onClick={handleDisconnetti}
            className="px-1.5 py-0.5 rounded-t border-b border-gray-400 hover:bg-neutral-800"
          >
            Disconnetti
          </button>
          <button
            onClick={handleDelete}
            className={
              "px-1.5 flex justify-center rounded-b  hover:bg-neutral-800 " +
              (isDeleting ? "py-1" : "py-0.5")
            }
            disabled={isDeleting}
          >
            {isDeleting ? <LoadingSpinner /> : "Elimina"}
          </button>
        </div>
        <p className="py-1.5 text-white px-5 max-w-[50%] w-fit text-lg font-semibold rounded-md bg-blue-500">
          {providerData.name}
        </p>
        <div className="w-full mt-1.5 flex flex-wrap gap-y-1 select-none">
          <div className="w-full flex gap-x-1 items-center">
            <p className="text-lg w-fit font-semibold">Email:</p>
            {isModifying ? (
              <input
                type="text"
                value={providerData.email}
                onChange={(e) =>
                  setProviderData({ ...providerData, email: e.target.value })
                }
                className="mt-1 flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
                required={true}
              />
            ) : (
              <p className="text-lg w-full font-semibold">
                {providerData.email}
              </p>
            )}
          </div>
          <div className="w-full flex gap-x-1 items-center">
            <p className="text-lg w-fit font-semibold">Indirizzo:</p>
            {isModifying ? (
              <input
                type="text"
                value={providerData.address}
                onChange={(e) =>
                  setProviderData({ ...providerData, address: e.target.value })
                }
                className="mt-1 flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
                required={true}
              />
            ) : (
              <p className="text-lg w-full font-semibold">
                {providerData.address}
              </p>
            )}
          </div>
          {isModifying && (
            <button
              onClick={(e) => handleDataUpdate(e)}
              className={
                "mt-1.5 bg-blue-500 hover:bg-blue-600 px-3 rounded-md text-white " +
                (isUpdatingData ? "py-2.5" : "py-2")
              }
              disabled={isUpdatingData}
            >
              {isUpdatingData ? (
                <LoadingSpinner />
              ) : (
                "Aggiorna i tuoi dati personali"
              )}
            </button>
          )}
          {dataUpdateError && (
            <p className="w-full text-center mt-2 text-red-600 font-semibold text-lg">
              {dataUpdateError}
            </p>
          )}
        </div>
      </div>
      {optsError && (
        <p className="w-full text-center mt-2 text-red-600 font-semibold text-lg">
          {optsError}
        </p>
      )}
    </div>
  );
}

export default ProviderProfilePage;
