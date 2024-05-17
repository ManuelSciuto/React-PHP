import React, {useState} from "react";
import {EmployeesRoles} from "../misc/roles.ts";

function Registrazione() {

    const firstRole = EmployeesRoles[Object.keys(EmployeesRoles)[0] as keyof typeof EmployeesRoles];
    const [isEmployee, setIsEmployee] = useState(false);
    const [selectedRole, setSelectedRole] = useState<EmployeesRoles>(firstRole);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [address, setAddress] = useState("");
    const [phone_num, setPhoneNum] = useState("");
    const [error, setError] = useState("");

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(e.target.value as EmployeesRoles);
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {e}

    return (
        <div>
            <div className="w-1/2 rounded-lg min-w-80 mt-5 mx-auto border-2 max-w-md">
                <div
                    className="w-full text-center pb-5 pt-2 bg-blue-500 text-3xl rounded-t-md font-bold text-white">BENVENUTO
                </div>
                <form className="w-full p-3 -mt-3 flex flex-wrap gap-y-1.5 bg-white rounded-md">
                    <div className="w-full">
                        <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">Nome</label>
                        <input type="text"
                               onChange={(e) => setName(e.target.value)}
                               className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                               required={true}/>
                    </div>
                    <div className="w-full">
                        <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">Cognome</label>
                        <input type="text"
                               onChange={(e) => setSurname(e.target.value)}
                               className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                               required={true}/>
                    </div>
                    <div className="w-full">
                        <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">Indirizzo</label>
                        <input type="text"
                               onChange={(e) => setAddress(e.target.value)}
                               className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                               required={true}/>
                    </div>
                    <div className="w-full">
                        <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">Numero di telefono</label>
                        <input type="text"
                               onChange={(e) => setPhoneNum(e.target.value)}
                               className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                               required={true}/>
                    </div>
                    <div className="flex items-center gap-x-1.5 text-lg justify-start">
                        <p>Sei un dipendente di quest'azienda?</p>
                        <input
                            type="checkbox"
                            className="scale-125"
                            checked={isEmployee}
                            onChange={() => setIsEmployee(prevState => !prevState)}
                        />
                    </div>

                    {isEmployee ?
                        <div className="flex flex-wrap gap-y-1.5">
                            <div className="flex w-full gap-x-1.5">
                                <p>Seleziona il tuo ruolo nell'azienda</p>
                                <select className="text-center" value={selectedRole} onChange={handleRoleChange}>
                                    {Object.keys(EmployeesRoles).map((role, index) => (
                                        <option key={index} value={EmployeesRoles[role as keyof typeof EmployeesRoles]}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">Numero di
                                    telefono</label>
                                <input type="text"
                                       onChange={(e) => setPhoneNum(e.target.value)}
                                       className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                                       required={true}/>
                            </div>
                            <div className="w-full">
                                <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">Numero di
                                    telefono</label>
                                <input type="text"
                                       onChange={(e) => setPhoneNum(e.target.value)}
                                       className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                                       required={true}/>
                            </div>
                        </div>
                        : null}
                    {error && <p className="text-red-600 mt-1 font-semibold text-lg text-center">{error}</p>}
                    <button type="submit" onClick={(e) => handleSubmit(e)}
                            className="bg-blue-500 mt-2 hover:bg-blue-600 text-white p-3 rounded-lg text-xl font-bold w-full">Registrati
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Registrazione;