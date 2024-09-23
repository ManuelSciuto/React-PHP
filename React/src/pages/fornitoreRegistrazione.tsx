import { useEffect, useState } from "react";
import LoadingSpinner from "../components/svgs/loadingSpinner";
import { useNavigate } from "react-router-dom";
import { sleep } from "../components/sleep";

function FornitoreRegistrazione() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");

  const handleError = async (error: string) => {
    setError(error);
    setIsLoading(false);
    await sleep(4000);
    setError("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(key);
    sleep(100);
    setKey("");
    nav("/Login");
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        city: city.trim(),
        address: indirizzo.trim(),
        company_name: companyName.trim(),
      }),
    };
    console.log(req.body);

    try {
      const response = await fetch(
        "http://localhost:8000/aggiungiProvider.php",
        req
      );
      setIsLoading(false);
      if (response.ok) {
        try {
          const responseData = await response.json();
          if (Object.prototype.hasOwnProperty.call(responseData, "error")) {
            await handleError(responseData.error);
          } else if (
            Object.prototype.hasOwnProperty.call(responseData, "key")
          ) {
            setKey(responseData.key);
          } else {
            await handleError("Errore nella ricezione della risposta");
          }
        } catch (error) {
          await handleError("Errore nella ricezione della risposta");
        }
      } else {
        await handleError("Errore, si prega di riprovare");
      }
    } catch (error) {
      console.error("Errore: ", error);
    }
  };

  // Ritorno alla home se la pagina ci sta troppo a rispondere o si bugga
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        nav("/");
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {});

  return (
    <div className="pb-5 h-full">
      {key && (
        <div>
          <div className="w-full pt-3 absolute h-full bg-black opacity-60" />
          <div className="w-full flex justify-center">
            <div className="w-[calc(50%+50px)] flex flex-wrap justify-center items-center absolute mt-3 ml-1/2 h-2/3 min-w-[23.5rem] border-2 max-w-md rounded-lg bg-gray-600 ">
              <div>
                <p className="w-full font-semibold text-white text-xl">
                  La tua chiave: {key}
                </p>
                <button
                  onClick={handleCopy}
                  className="bg-blue-500 flex justify-center mt-2.5 hover:bg-blue-600 text-white p-3 rounded-lg text-xl font-bold w-full"
                >
                  Copia e chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <p className="pt-3 text-white font-semibold w-1/2 min-w-[23rem] mx-auto">
        Dopo aver completato il form ti verrà fornita una chiave di
        autenticazione, che ti permetterà di aggiungere ricambi quando verrai
        accettato
      </p>
      <div className="w-1/2 rounded-lg min-w-[23rem] mt-3 mx-auto border-2 max-w-md">
        <div className="w-full text-center pb-5 pt-2 bg-blue-500 text-3xl rounded-t-md font-bold text-white">
          BENVENUTO
        </div>
        <form className="w-full p-3 -mt-3 flex flex-wrap gap-y-1.5 bg-[rgb(30,30,30)] text-lg rounded-md">
          <div className="w-full">
            <label className="block pl-px mb-0.5 text-sm font-medium text-white">
              Nome azienda <label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full">
            <label className="block pl-px mb-0.5 text-sm font-medium text-white">
              E-mail <label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full">
            <label className="block pl-px mb-0.5 text-sm font-medium text-white">
              Città <label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full">
            <label className="block pl-px mb-0.5 text-sm font-medium text-white">
              Indirizzo <label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              onChange={(e) => setIndirizzo(e.target.value)}
              className="bg-neutral-300 hover:bg-neutral-400 border border-gray-700 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>

          {error && (
            <p className="text-red-600 w-full mt-1 font-semibold text-lg text-center">
              {error}
            </p>
          )}
          <button
            disabled={isLoading}
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="bg-blue-500 flex justify-center mt-2.5 hover:bg-blue-600 text-white p-3 rounded-lg text-xl font-bold w-full"
          >
            {isLoading ? <LoadingSpinner /> : "Inoltra"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FornitoreRegistrazione;
