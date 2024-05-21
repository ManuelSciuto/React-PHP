import { validateLogin } from "../components/validation.ts";
import { useEffect, useRef, useState } from "react";
import NoUserCountdown from "../components/noUserCountdown.tsx";
import LeftArrow from "../components/svgs/leftArrow.tsx";
import { NavLink } from "react-router-dom";

function AggiungiVeicolo() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [userId, setUserId] = useState(-1);
  const [file, setFile] = useState<string | null>(null);
  const [showFullImage, setShowFullImage] = useState<boolean>(false);

  async function setAuth() {
    const id = await validateLogin();
    if (id) setUserId(id);
  }

  useEffect(() => {
    setAuth().then(null);
  }, []);

  if (userId === -1) return <NoUserCountdown />;

  return (
    <div>
      <div className="cursor-pointer w-fit m-2 mr-auto">
        <NavLink to="/Veicoli">
          <LeftArrow className={"fill-gray-500 w-8 h-8"} />
        </NavLink>
      </div>
      <div className="w-11/12 h-fit flex flex-wrap min-w-[23rem] p-2 rounded-lg mt-5 mx-auto border-2 max-w-4xl">
        <div className="w-3/5 flex flex-wrap h-20">
          <p className="w-full font-bold">FOTO</p>
          <div className="flex w-full h-12 -mb-4 items-center">
            <button
              className="w-[90px] max-w-xs py-2 bg-blue-500 text-white rounded-l"
              onClick={() => fileInputRef.current!.click()}
            >
              Scegli file
            </button>
            <input
              type="text"
              className="outline-0 w-[calc(100%-90px)] p-2 w- bg-gray-500 rounded-r"
            />
            <input
              type="file"
              ref={fileInputRef}
              hidden
              onChange={(e) => {
                setFile(URL.createObjectURL(e.target.files![0]));
              }}
            />
          </div>
        </div>
        {file && (
          <div className="w-2/5 flex justify-center">
            <img
              className="h-20 w-20 cursor-zoom-in"
              onClick={() => {
                setShowFullImage(true);
              }}
              src={file}
              alt={"Img"}
            />
          </div>
        )}
        {showFullImage && file && (
          <div
            onClick={() => setShowFullImage(false)}
            className="absolute cursor-zoom-out top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex justify-center items-center"
          >
            <img src={file} className="w-3/4 h-3/4" alt="Img" />
          </div>
        )}
      </div>
    </div>
  );
}

export default AggiungiVeicolo;
