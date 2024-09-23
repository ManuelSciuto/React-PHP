import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.tsx";
import Home from "./pages/home.tsx";
import Login from "./pages/login.tsx";
import Veicoli from "./pages/veicoli.tsx";
import Profilo from "./pages/profilo.tsx";
import Registrazione from "./pages/registrazione.tsx";
import AggiungiVeicolo from "./pages/aggiungiVeicolo.tsx";
import AggiungiJob from "./pages/aggiungiJob.tsx";
import Ricambi from "./pages/ricambi.tsx";
import FornitoreRegistrazione from "./pages/fornitoreRegistrazione.tsx";
import AggiungiRicambi from "./pages/aggiungiRicambi.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/Veicoli" element={<Veicoli />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profilo" element={<Profilo />} />
        <Route path="/Registrazione" element={<Registrazione />} />
        <Route path="Veicoli/AggiungiVeicolo" element={<AggiungiVeicolo />} />
        <Route path="Veicoli/AggiungiJob" element={<AggiungiJob />} />
        <Route path="/Ricambi" element={<Ricambi />} />
        <Route
          path="/FornitoreRegistrazione"
          element={<FornitoreRegistrazione />}
        />
        <Route path="/AggiungiRicambi" element={<AggiungiRicambi />} />
      </Routes>
    </>
  );
}

export default App;
