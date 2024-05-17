import {useEffect, useState} from "react";
import {validateLogin} from "../components/validation.ts";
import {useNavigate} from "react-router-dom";
import {ClientData} from "../misc/classes/ClientData.ts";
import {EmployeeData} from "../misc/classes/EmployeeData.ts";
import {tokenName} from "../../../config.ts";
import eventEmitter from "../misc/eventEmitter.tsx";

function Profilo() {

    const [isAuth, setIsAuth] = useState(false);
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
    }, [isAuth, nav]);

    const handleDisconnetti = () => {
        setIsAuth(false);
        setUserId(-1);
        setUser(null);
        localStorage.removeItem(tokenName);
        eventEmitter.emit('authChange', false);
        nav("/");
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
            <div className="w-3/4 flex justify-between p-2 border-2 mx-auto mt-5 rounded-lg">
                {user && <p className="py-1.5 px-5 text-lg font-semibold rounded-md  bg-blue-500">{user!.username}</p>}
                <button onClick={handleDisconnetti}>Disconnetti</button>
            </div>
        </div>
    );
}

export default Profilo;