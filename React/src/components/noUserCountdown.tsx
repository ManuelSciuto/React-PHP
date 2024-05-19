import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function NoUserCountdown() {

    const [countdown, setCountdown] = useState(5);
    const nav = useNavigate();

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (countdown === 0) {
            nav("/Login");
        }
    }, [countdown]);

    return <div>
        <div className="w-full mt-5 text-center">
            <p>Effettua il login</p>
            <p>Verrai mandato alla pagina di login in {countdown}</p>
        </div>
    </div>
}

export default NoUserCountdown;