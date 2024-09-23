import { useEffect, useState } from "react";
import { validateLogin } from "../components/validation.ts";
import { useNavigate } from "react-router-dom";
import { ClientData } from "../misc/classes/ClientData.ts";
import { EmployeeData } from "../misc/classes/EmployeeData.ts";
import { tokenName } from "../config.ts";
import eventEmitter from "../misc/eventEmitter.tsx";
import { sleep } from "../components/sleep.ts";
import OptionIcon from "../components/svgs/optionIcon.tsx";
import LoadingSpinner from "../components/svgs/loadingSpinner.tsx";
import NoUserCountdown from "../components/noUserCountdown.tsx";
import { providerValidateLogin } from "../components/providerValidation.ts";
import ProviderProfilePage from "../components/providerProfilePage.tsx";

export class ProviderData {
  city: string;
  name: string;
  address: string;
  email: string;
  constructor(data: ProviderData | null) {
    this.city = data ? data.city : "";
    this.name = data ? data.name : "";
    this.address = data ? data.address : "";
    this.email = data ? data.email : "";
  }
}

function Profilo() {
  const [showOpts, setShowOpts] = useState(false);
  const [optsError, setOptsError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [dataUpdateError, setDataUpdateError] = useState("");
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [userId, setUserId] = useState(-1);
  const [providerId, setProviderId] = useState(-1);
  const [providerData, setProviderData] = useState<ProviderData>(
    new ProviderData(null)
  );
  const [isEmployee, setIsEmployee] = useState(false);
  const [user, setUser] = useState<ClientData | EmployeeData | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const nav = useNavigate();

  async function setAuth() {
    const id = await validateLogin();
    if (id) setUserId(id);
  }

  async function getUser() {
    if (userId === -1) return;
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    };
    const response = await fetch(
      "http://localhost:8000/users/get_user.php",
      req
    );
    if (response.ok) {
      const data = await response.json();
      if (data.isEmployee) {
        setIsEmployee(true);
        setUser(new EmployeeData(data));
      } else if (!data.isEmployee) {
        setIsEmployee(false);
        setUser(new ClientData(data));
      } else {
        window.alert(
          "Errore nel caricamento dei dati, ci scusiamo per l'inconveniente. Verrai reindirizzato alla home"
        );
        nav("/");
      }
    }
  }

  async function getProvider() {
    if (providerId === -1) return;
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: providerId }),
    };
    const response = await fetch("http://localhost:8000/get_provider.php", req);
    if (response.ok) {
      const data = await response.json();
      if (!Object.prototype.hasOwnProperty.call(data, "error")) {
        setProviderData(new ProviderData(data));
      } else {
        window.alert(
          "Errore nel caricamento dei dati, ci scusiamo per l'inconveniente. Verrai reindirizzato alla home"
        );
        nav("/");
      }
    }
  }

  useEffect(() => {
    setAuth().then(null);
    async function setProviderAuth() {
      const providerToken: {
        id_provider: number;
        name: string;
      } | null = await providerValidateLogin();
      if (providerToken) {
        setProviderId(providerToken.id_provider);
      }
    }
    if (userId === -1) {
      setProviderAuth().then(null);
    }
  }, []);

  useEffect(() => {
    getUser().then(null);
  }, [userId]);

  useEffect(() => {
    getProvider().then(null);
  }, [providerId]);

  const handleOptsError = async (optsError: string) => {
    setOptsError(optsError);
    setIsDeleting(false);
    await sleep(4000);
    setOptsError("");
  };

  const handleDataError = async (optsError: string) => {
    setDataUpdateError(optsError);
    setIsUpdatingData(false);
    await sleep(4000);
    setDataUpdateError("");
  };

  const handlePasswordError = async (optsError: string) => {
    setPasswordError(optsError);
    setIsUpdatingData(false);
    await sleep(4000);
    setPasswordError("");
  };

  const handleDisconnetti = () => {
    setUserId(-1);
    setUser(null);
    localStorage.removeItem(tokenName);
    eventEmitter.emit("authChange", false);
    nav("/");
  };

  const handleDelete = async () => {
    if (!window.confirm("Sei sicuro di voler eliminare questo utente?")) return;
    setIsDeleting(true);
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    };
    const response = await fetch(
      "http://localhost:8000/users/delete_client.php",
      req
    );
    setIsDeleting(false);
    if (response.ok) {
      const resText = await response.text();
      if (resText === "Utente eliminato con successo") {
        handleDisconnetti();
      } else {
        await handleOptsError(resText);
      }
    } else {
      await handleOptsError("Errore, si prega di riprovare");
    }
  };

  const handleDataUpdate = async () => {
    if (!window.confirm("Sei sicuro di voler aggiornare i dati?")) return;
    setIsUpdatingData(true);
    if (!user) return;
    if (
      user.name.length === 0 ||
      user.surname.length === 0 ||
      user.address.length === 0 ||
      user.phone_num.length === 0
    ) {
      await handleDataError("Valori non validi");
      return;
    }
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userId,
        name: user.name.trim(),
        surname: user.surname.trim(),
        address: user.address.trim(),
        phone_num: user.phone_num.trim(),
      }),
    };
    const response = await fetch(
      "http://localhost:8000/users/modify_data.php",
      req
    );
    setIsUpdatingData(false);
    if (response.ok) {
      const resText = await response.text();
      if (resText === "Utente aggiornato con successo") {
        window.alert(resText);
      } else {
        await handleDataError(resText);
      }
    } else {
      await handleDataError("Errore, si prega di riprovare");
    }
    await setAuth();
    await getUser();
  };

  const handlePasswordUpdate = async () => {
    if (!window.confirm("Sei sicuro di voler aggiornare la tua password?"))
      return;
    if (!user) return;
    if (newPassword.length < 6) {
      await handlePasswordError(
        "La tua password dev'essere lunga almeno 6 caratteri"
      );
      return;
    }
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userId,
        password: currentPassword.trim(),
        new_password: newPassword.trim(),
      }),
    };
    const response = await fetch(
      "http://localhost:8000/users/update_password.php",
      req
    );
    if (response.ok) {
      const resText = await response.text();
      if (resText === "Password aggiornata con successo") {
        window.alert(resText);
      } else {
        await handlePasswordError(resText);
      }
    } else {
      await handlePasswordError("Errore, si prega di riprovare");
    }
    await setAuth();
    await getUser();
  };

  if (providerData.name !== "")
    return <ProviderProfilePage providerDataProp={providerData} />;

  if (userId === -1) return <NoUserCountdown />;

  return (
    <div className="pb-4">
      {user && (
        <div className="w-3/4 text-white min-w-[26rem] max-w-[50rem] relative flex flex-wrap justify-between p-4 border-2 mx-auto my-5 rounded-lg">
          <div>
            <p className="py-1.5 text-white px-5 w-fit text-lg font-semibold rounded-md bg-blue-500">
              {user.username}
            </p>
            {isEmployee && user instanceof EmployeeData && (
              <div className="mt-1.5 flex flex-wrap gap-y-1 select-none">
                <p className="text-lg w-full font-semibold">
                  Posizione: {user.position}
                </p>
                <p className="text-lg w-full font-semibold">
                  Data Assunzione: {user.hiring_date}
                </p>
              </div>
            )}
            {!isEmployee && user instanceof ClientData && (
              <div className="mt-1.5 text-white flex flex-wrap gap-y-1 select-none">
                {user.company_name && (
                  <p className="text-lg w-full font-semibold">
                    Nome Azienda: {user.company_name}
                  </p>
                )}
                <p className="text-lg w-full font-semibold">
                  Cliente dal: {user.client_since}
                </p>
                <p className="text-lg w-full font-semibold">
                  Partita IVA: {user.vat_number}
                </p>
              </div>
            )}
          </div>
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
              onClick={handleDisconnetti}
              className="px-1.5 py-1 rounded-t border-b border-gray-400 hover:bg-neutral-800"
            >
              Disconnetti
            </button>
            <button
              onClick={handleDelete}
              className={
                "px-1.5 flex justify-center rounded-b  hover:bg-neutral-800 " +
                (isDeleting ? "py-1.5" : "py-1")
              }
              disabled={isDeleting}
            >
              {isDeleting ? <LoadingSpinner /> : "Elimina"}
            </button>
          </div>
        </div>
      )}
      {optsError && (
        <p className="w-full text-center mt-2 text-red-600 font-semibold text-lg">
          {optsError}
        </p>
      )}
      {user && (
        <div className="w-3/4 select-none min-w-[26rem] max-w-[50rem] relative flex flex-wrap justify-between p-4 pt-2  border-2 mx-auto my-5 gap-y-3 rounded-lg">
          <p className="w-full text-lg font-bold text-white">INFO</p>
          <form className="w-full flex flex-wrap gap-y-3 md:justify-between">
            <div className="w-full md:w-[calc(50%-6px)]">
              <label className="block pl-px mb-0.5 text-sm font-medium text-white">
                Nome<label className="text-red-600">*</label>
              </label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                required={true}
              />
            </div>
            <div className="w-full md:w-[calc(50%-6px)]">
              <label className="block pl-px mb-0.5 text-sm font-medium text-white">
                Cognome<label className="text-red-600">*</label>
              </label>
              <input
                type="text"
                value={user.surname}
                onChange={(e) => setUser({ ...user, surname: e.target.value })}
                className="bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                required={true}
              />
            </div>
            <div className="w-full md:w-[calc(50%-6px)]">
              <label className="block pl-px mb-0.5 text-sm font-medium text-white">
                Numero di telefono<label className="text-red-600">*</label>
              </label>
              <input
                type="text"
                value={user.phone_num}
                onChange={(e) =>
                  setUser({ ...user, phone_num: e.target.value })
                }
                className="bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                required={true}
              />
            </div>
            <div className="w-full md:w-[calc(50%-6px)]">
              <label className="block pl-px mb-0.5 text-sm font-medium text-white">
                Indirizzo<label className="text-red-600">*</label>
              </label>
              <input
                type="text"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                className="bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                required={true}
              />
            </div>
            <button
              onClick={handleDataUpdate}
              className={
                "bg-blue-500 hover:bg-blue-600 px-3 rounded-md text-white " +
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
          </form>
        </div>
      )}
      {dataUpdateError && (
        <p className="w-full text-center mt-2 text-red-600 font-semibold text-lg">
          {dataUpdateError}
        </p>
      )}
      {user && (
        <div className="w-3/4 select-none min-w-[26rem] max-w-[50rem] relative flex flex-wrap justify-between p-4 pt-2  border-2 mx-auto my-5 gap-y-3 rounded-lg">
          <p className="w-full text-lg font-bold text-white">PASSWORD</p>
          <form className="w-full flex flex-wrap gap-y-3 md:justify-between">
            <div className="w-full md:w-[calc(50%-6px)]">
              <label className="block pl-px mb-0.5 text-sm font-medium text-white">
                Current Password<label className="text-red-600">*</label>
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                required={true}
              />
            </div>
            <div className="w-full md:w-[calc(50%-6px)]">
              <label className="block pl-px mb-0.5 text-sm font-medium text-white">
                New Password<label className="text-red-600">*</label>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                required={true}
              />
            </div>
            <button
              onClick={handlePasswordUpdate}
              className={
                "bg-blue-500 hover:bg-blue-600 px-3 rounded-md text-white " +
                (isUpdatingData ? "py-2.5" : "py-2")
              }
              disabled={isUpdatingData}
            >
              {isUpdatingData ? <LoadingSpinner /> : "Aggiorna la tua password"}
            </button>
          </form>
        </div>
      )}
      {passwordError && (
        <p className="w-full text-center mt-2 text-red-600 font-semibold text-lg">
          {passwordError}
        </p>
      )}
    </div>
  );
}

export default Profilo;
