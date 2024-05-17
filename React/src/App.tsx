import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.tsx";
import Home from "./pages/home.tsx";
import Login from "./pages/login.tsx";
import Veicoli from "./pages/veicoli.tsx";
import Profilo from "./pages/profilo.tsx";
import Registrazione from "./pages/registrazione.tsx";

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
            </Routes>
        </>
    );
}

export default App;
