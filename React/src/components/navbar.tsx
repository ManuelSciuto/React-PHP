import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {validateLogin} from "./validation.ts";
import eventEmitter from "../misc/eventEmitter.tsx";
import Logo1 from "./svgs/logo1.tsx";

function Navbar() {

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        async function setAuth() {
            setIsAuth(await validateLogin() !== null);
        }
        setAuth().then(null);

        const handleAuthChange = (authStatus: boolean) => {
            setIsAuth(authStatus);
        };

        eventEmitter.on('authChange', handleAuthChange);
        return () => {
            eventEmitter.off('authChange', handleAuthChange);
        };
    }, []);

    return (
        <div className="w-full text-xl border-b-2 font-semibold px-3 py-2.5 gap-x-3 flex">
            <NavLink to="/"><Logo1 className="w-8 h-8 mr-0.5 fill-white"/></NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-blue-500 pt-px" : "pt-px"} to="/Veicoli">Veicoli</NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-blue-500 pt-px" : "pt-px"} to="/Ricambi">Ricambi</NavLink>
            {isAuth ?
                <NavLink className={({ isActive }) => isActive ? "text-blue-500 pt-px ml-auto" : "pt-px ml-auto"} to="/Profilo">Profilo</NavLink> :
                <NavLink className={({ isActive }) => isActive ? "text-blue-500 pt-px ml-auto" : "pt-px ml-auto"} to="/Login">Login</NavLink>}
        </div>
    );
}

export default Navbar;