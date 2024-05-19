import Logo3 from "../components/svgs/logo3.tsx";
import {validateLogin} from "../components/validation.ts";
import {useEffect, useState} from "react";
import NoUserCountdown from "../components/noUserCountdown.tsx";
import ProfiloVeicolo from "../components/profiloVeicolo.tsx";

function Veicoli() {

    const [userId, setUserId] = useState(-1);
    const [isEmployee, setIsEmployee] = useState<null | boolean>(null);

    async function setAuth() {
        const id = await validateLogin();
        if (id) setUserId(id);
    }

    async function setEmployeeBool() {
        const req = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: userId}),
        };
        const response = await fetch('http://localhost:8000/users/is_employee.php', req);
        if (response.ok) {
            const responseData = await response.text();
            console.log(responseData)
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

    if (userId === -1 || isEmployee === null) return <NoUserCountdown/>

    return (
        <div>
            <div className="flex w-fit mx-auto mt-4 justify-center items-center gap-x-2 select-none">
                <Logo3/>
                <h1 className="h-fit text-3xl uppercase font-lato">I tuoi veicoli</h1>
                <Logo3/>
            </div>
            {isEmployee ?
                <div className="flex justify-center flex-wrap gap-4 p-4">
                    <ProfiloVeicolo/>
                    <ProfiloVeicolo/>
                    <ProfiloVeicolo/>
                    <ProfiloVeicolo/>
                    <ProfiloVeicolo/>
                </div> :
                <p>Client</p>
            }
        </div>
    );
}

export default Veicoli;