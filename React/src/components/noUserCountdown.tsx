import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

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

  return (
    <div>
      <div className="w-full mt-5 flex flex-wrap justify-center gap-y-2 text-white">
        <NavLink
          className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 font-semibold"
          to="/Login"
        >
          Effettua il login
        </NavLink>
        <p className="w-full text-center">
          Verrai mandato alla pagina di login in {countdown}
        </p>
      </div>
    </div>
  );
}

export default NoUserCountdown;
