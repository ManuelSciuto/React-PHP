import {useEffect, useState} from "react";
import {validateLogin} from "../components/validation.ts";
import {useNavigate} from "react-router-dom";
import {ClientData} from "../misc/classes/ClientData.ts";
import {EmployeeData} from "../misc/classes/EmployeeData.ts";
import {tokenName} from "../../../config.ts";
import eventEmitter from "../misc/eventEmitter.tsx";
import {sleep} from "../components/sleep.ts";
import {daysSince} from "../misc/daysCalc.ts";
import OptionIcon from "../components/svgs/optionIcon.tsx";
import LoadingSpinner from "../components/svgs/loadingSpinner.tsx";

function Profilo() {

    const [showOpts, setShowOpts] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [optsError, setOptsError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [userId, setUserId] = useState(-1);
    const [user, setUser] = useState<ClientData|EmployeeData|null>(null);
    const nav = useNavigate();

    useEffect(() => {
        async function setAuth() {
            const id = await validateLogin();
            setIsAuth(id !== null);
            if (id) setUserId(id);
        }
        setAuth().then(null);
    }, []);

    useEffect(() => {
        async function getUser() {
            if (!isAuth) return;
            const req = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id:userId}),
            };
            const response = await fetch('http://localhost:8000/users/get_user.php', req);
            if (response.ok) {
                const data = await response.json();
                if (Object.prototype.hasOwnProperty.call(data, "tax_code") && (data.tax_code !== undefined)) {
                    setUser(new EmployeeData(data));
                } else if (Object.prototype.hasOwnProperty.call(data, "vat_number") && (data.vat_number !== undefined)){
                    setUser(new ClientData(data));
                } else {
                    window.alert("Errore nel caricamento dei dati, ci scusiamo per l'inconveniente. Verrai reindirizzato alla home");
                    nav("/")
                }
            }
        }
        getUser().then(null);
    }, [isAuth, userId]);

    useEffect(() => {
        if (!isAuth && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (!isAuth && countdown === 0) {
            nav("/Login");
        }
    }, [countdown]);

    const handleError = async (optsError: string) => {
        setOptsError(optsError);
        setIsLoading(false);
        await sleep(4000);
        setOptsError("");
    }

    const handleDisconnetti = () => {
        setIsAuth(false);
        setUserId(-1);
        setUser(null);
        localStorage.removeItem(tokenName);
        eventEmitter.emit('authChange', false);
        nav("/");
    }

    const handleDelete = async () => {
        if (!window.confirm("Sei sicuro di voler eliminare questo utente?")) return;
        setIsLoading(true);
        const req = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: 0}),
        };
        const response = await fetch('http://localhost:8000/users/delete_client.php', req);
        setIsLoading(false);
        if (response.ok) {
            const resText = await response.text();
            if (resText === "Utente eliminato con successo") {
                handleDisconnetti();
            } else {
                await handleError(resText);
            }
        } else {
            await handleError("Errore, si prega di riprovare");
        }
    }

    if (!isAuth) {
        return <div>
            <div className="w-full mt-5 text-center">
                <p>Effettua il login</p>
                <p>Verrai mandato alla pagina di login in {countdown}</p>
            </div>
        </div>
    }

    return (
        <div>
            {user &&
                <div
                    className="w-3/4 min-w-[26rem] max-w-[50rem] relative flex flex-wrap justify-between p-4 border-2 mx-auto my-5 rounded-lg">
                    <div>
                        <p className="py-1.5 text-white px-5 w-fit text-lg font-semibold rounded-md bg-blue-500">
                            {user.username}
                        </p>
                        {user instanceof EmployeeData && (
                            <div className="mt-1.5 flex flex-wrap gap-y-1 select-none">
                                <p className="text-lg w-full font-semibold">Posizione: {user.position}</p>
                                <p className="text-lg w-full font-semibold">Dipendente
                                    da: {daysSince(user.hiring_date)}</p>
                                <p className="text-lg w-full font-semibold">Stipendio
                                    Mensile: {user.monthly_salary + "\u20AC"}</p>
                            </div>
                        )}
                        {user instanceof ClientData && (
                            <div>
                                {user.company_name &&
                                    <p className="text-lg w-full font-semibold">Nome Azienda: {user.company_name}</p>}
                                <p className="text-lg w-full font-semibold">Partita IVA: {user.vat_number}</p>
                            </div>
                        )}
                    </div>
                    <OptionIcon onClick={() => setShowOpts((prevState) => !prevState)}
                                className="cursor-pointer fill-gray-600 w-7 h-7 absolute top-3 right-3"/>
                    <div className={"absolute duration-100 select-none flex flex-wrap flex-col top-11 right-3.5 border border-gray-400 rounded " + (!showOpts && "opacity-0")}>
                        <button onClick={handleDisconnetti}
                                className="px-1.5 py-1 rounded-t border-b border-gray-400 hover:bg-gray-200">Disconnetti
                        </button>
                        <button onClick={handleDelete}
                                className={"px-1.5 flex justify-center rounded-b hover:bg-gray-200 " + (isLoading ? "py-1.5" : "py-1")}
                                disabled={isLoading}>{isLoading ? <LoadingSpinner/> : "Elimina"}
                        </button>
                    </div>
                </div>
            }
            {optsError && <p className="w-full text-center mt-2 text-red-600 font-semibold text-lg">{optsError}</p>}
            {user && <div className="w-3/4 select-none min-w-[26rem] max-w-[50rem] relative flex flex-wrap justify-between p-4 pt-2  border-2 mx-auto my-5 gap-y-3 rounded-lg">
                <p className="w-full text-lg font-bold">INFO</p>
                <form className="w-full flex flex-wrap gap-y-3">
                    <div className="w-full">
                        <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">Nome<label
                            className="text-red-600">*</label></label>
                        <input type="text"
                               value={user.name}
                               onChange={(e) => setUser({...user, name: e.target.value})}
                               className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                               required={true}/>
                    </div>
                    <div className="w-full">
                        <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">Cognome<label
                            className="text-red-600">*</label></label>
                        <input type="text"
                               value={user.surname}
                               onChange={(e) => setUser({...user, surname: e.target.value})}
                               className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                               required={true}/>
                    </div>
                </form>
            </div>
            }
        </div>
    );
}

export default Profilo;