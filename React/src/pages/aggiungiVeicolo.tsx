import { validateLogin } from "../components/validation.ts";
import { useEffect, useRef, useState } from "react";
import NoUserCountdown from "../components/noUserCountdown.tsx";
import LeftArrow from "../components/svgs/leftArrow.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { Veicolo } from "../misc/classes/Veicolo.ts";
import { twMerge } from "tailwind-merge";
import { sleep } from "../components/sleep.ts";

function AggiungiVeicolo() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(-1);
  const [files, setFiles] = useState<string[]>([]);
  const [showFullImage, setShowFullImage] = useState<boolean>(false);
  const [fullImageShown, setFullImageShown] = useState<string | null>(null);
  const [dataVeicolo, setDataVeicolo] = useState<Veicolo>(new Veicolo(null));
  const nav = useNavigate();

  async function setAuth() {
    const id = await validateLogin();
    if (id) setUserId(id);
  }

  const handleError = async (errorText: string) => {
    setError(errorText);
    await sleep(4000);
    setError("");
  };

  useEffect(() => {
    setAuth().then(null);
  }, []);

  const handleSubmit = async () => {
    setDataVeicolo({ ...dataVeicolo, client_id: userId });
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataVeicolo),
    };
    const response = await fetch(
      "http://localhost:8000/vehicles/add_vehicle.php",
      req,
    );
    console.log(req.body);
    console.log(response);
    if (response.ok) {
      const responseData = await response.text();
      console.log(responseData);
      if (responseData === "Veicolo aggiunto con successo") {
        nav("/Veicoli");
      } else {
        await handleError(responseData);
      }
    }
  };

  if (userId === -1) return <NoUserCountdown />;

  return (
    <div className="pb-4">
      <div
        className={twMerge(
          "bg-red-600 text-white duration-150 font-semibold text-lg",
          error !== "" && "px-2 py-1",
        )}
      >
        {error}
      </div>
      <div className="cursor-pointer w-fit m-2 mr-auto">
        <NavLink to="/Veicoli">
          <LeftArrow className={"fill-gray-500 w-8 h-8"} />
        </NavLink>
      </div>
      <div className="w-11/12 h-fit flex flex-wrap min-w-[23rem] p-2 rounded-lg mt-5 mx-auto border-2 max-w-4xl">
        <div className="w-[90px] flex flex-wrap h-20">
          <p className="w-full font-bold text-xl">FOTO</p>
          <div className="flex w-[90px] h-12 -mb-3 items-center">
            <button
              className="w-full max-w-xs py-2 bg-blue-500 text-white rounded-lg disabled:bg-blue-900 disabled:cursor-not-allowed"
              disabled={files.length >= 3}
              onClick={() => fileInputRef.current!.click()}
            >
              Scegli file
            </button>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              ref={fileInputRef}
              hidden
              onChange={(e) => {
                setFiles([...files, URL.createObjectURL(e.target.files![0])]);
              }}
            />
          </div>
        </div>
        <div className="w-[calc(100%-90px)] flex gap-x-2 justify-center">
          {files.map((file, idx) => (
            <div className="relative" key={idx}>
              <img
                className="h-20 w-20 cursor-zoom-in"
                onClick={() => {
                  setShowFullImage(true);
                  setFullImageShown(file);
                }}
                src={file}
                alt={"Img"}
              />
              <button
                onClick={() => {
                  setFiles(files.slice(0, idx).concat(files.slice(idx + 1)));
                }}
                className="bg-gray-600 px-1.5 absolute top-1 right-1 rounded-full z-30"
              >
                X
              </button>
            </div>
          ))}
        </div>
        {showFullImage && fullImageShown && (
          <div
            onClick={() => setShowFullImage(false)}
            className="absolute cursor-zoom-out z-40 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex justify-center items-center"
          >
            <img src={fullImageShown} className="w-3/4 h-3/4" alt="Img" />
          </div>
        )}
      </div>
      <div className="w-11/12 h-fit flex flex-wrap min-w-[23rem] p-4 rounded-lg mt-3 mx-auto border-2 max-w-4xl">
        <p className="w-full font-bold text-xl mb-2">DATI VEICOLO</p>
        <form className="w-full flex flex-wrap gap-y-3 md:justify-between">
          <div className="w-full md:w-[calc(50%-6px)]">
            <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">
              Marca<label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              value={dataVeicolo.brand}
              onChange={(e) =>
                setDataVeicolo({ ...dataVeicolo, brand: e.target.value })
              }
              className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full md:w-[calc(50%-6px)]">
            <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">
              Modello<label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              value={dataVeicolo.model}
              onChange={(e) =>
                setDataVeicolo({ ...dataVeicolo, model: e.target.value })
              }
              className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full md:w-[calc(50%-6px)]">
            <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">
              Targa<label className="text-red-600">*</label>
            </label>
            <input
              type="text"
              value={dataVeicolo.tag}
              onChange={(e) =>
                setDataVeicolo({ ...dataVeicolo, tag: e.target.value })
              }
              className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
          <div className="w-full md:w-[calc(50%-6px)]">
            <label className="block pl-px mb-0.5 text-sm font-medium text-gray-900">
              Data d'immatricolazione<label className="text-red-600">*</label>
            </label>
            <input
              type="date"
              value={dataVeicolo.reg_date}
              onChange={(e) =>
                setDataVeicolo({ ...dataVeicolo, reg_date: e.target.value })
              }
              className="bg-gray-200 hover:bg-[rgb(219,222,227)] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required={true}
            />
          </div>
        </form>
      </div>
      <div className="w-11/12 mt-3 mx-auto min-w-[23rem] max-w-4xl">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 py-2 px-3 rounded-lg"
        >
          Aggiungi veicolo
        </button>
      </div>
    </div>
  );
}

export default AggiungiVeicolo;
