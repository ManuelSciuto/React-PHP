import {useEffect, useState} from "react";
import {validateLogin} from "../components/validation.ts";
import {useNavigate} from "react-router-dom";
import {ClientData} from "../misc/classes/ClientData.ts";
import {EmployeeData} from "../misc/classes/EmployeeData.ts";

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
            console.log(1)
            const req = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id:userId}),
            };
            const response = await fetch('http://localhost:8000/users/get_user.php', req);
            if (response.ok) {
                const data = await response.json();
                if (Object.prototype.hasOwnProperty.call(data, "tax_code")) {
                    setUser(new EmployeeData(data));
                } else {
                    setUser(new ClientData(data));
                }
                console.log(user)
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
            <div className="w-3/4 flex p-2 border-2 mx-auto mt-5 rounded-lg">
                {user && <p>{user!.username}</p>}
            </div>
        </div>
    );
}

export default Profilo;