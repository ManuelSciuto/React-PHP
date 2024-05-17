import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {validateLogin} from "./validation.ts";

function Navbar() {

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        async function setAuth() {
            setIsAuth(await validateLogin() !== null);
        }
        setAuth().then(null);
    }, []);

    return (
        <div className="w-full text-xl border-b-2 font-semibold px-3 py-2.5 gap-x-3 flex">
            <NavLink className={({ isActive }) => isActive ? "text-blue-500" : ""} to="/Veicoli">Veicoli</NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-blue-500" : ""} to="/Ricambi">Ricambi</NavLink>
            {isAuth ?
                <NavLink className={({ isActive }) => isActive ? "text-blue-500 ml-auto" : "ml-auto"} to="/Profilo">Profilo</NavLink> :
                <NavLink className={({ isActive }) => isActive ? "text-blue-500 ml-auto" : "ml-auto"} to="/Login">Login</NavLink>}
        </div>
    );
}

export default Navbar;