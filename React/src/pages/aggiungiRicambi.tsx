import { useEffect, useState } from "react";
import { providerValidateLogin } from "../components/providerValidation";
import NoUserCountdown from "../components/noUserCountdown";
import { BodyPartData } from "../misc/classes/BodyPartData";
import { coloriRicambi } from "../misc/coloriRicambi";
import { MechPartData } from "../misc/classes/MechPartData";
import { MarcheMezziOpts } from "../misc/marcheMezzi";
import ReactSelect from "react-select";
import { sleep } from "../components/sleep";
import { useNavigate } from "react-router-dom";

function AggiungiRicambi() {
  const nav = useNavigate();
  const [providerId, setProviderId] = useState(-1);
  const [isBodyPart, setIsBodyPart] = useState(true);
  const [bodyPartData, setBodyPartData] = useState(new BodyPartData(null));
  const [mechPartData, setMechPartData] = useState(new MechPartData(null));
  const [error, setError] = useState("");
  const [dimensions, setDimensions] = useState<{
    length: number;
    height: number;
    thickness: number;
    weight: number;
  }>({ length: 0, height: 0, thickness: 0, weight: 0 });
  const [storageData, setStorageData] = useState<{
    price: number;
    availability: number;
    ship_time: number;
  }>({ price: 0, availability: 0, ship_time: 0 });

  const handleError = async (error: string) => {
    setError(error);
    await sleep(4000);
    setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      dimensions.length <= 0 ||
      dimensions.height <= 0 ||
      dimensions.thickness <= 0 ||
      dimensions.weight <= 0 ||
      storageData.price <= 0 ||
      storageData.availability <= 0 ||
      storageData.ship_time <= 0
    )
      return;
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        is_body_part: isBodyPart,
        length: dimensions.length,
        height: dimensions.height,
        thickness: dimensions.thickness,
        weight: dimensions.weight,
        price: storageData.price,
        ship_time: storageData.ship_time,
        availability: storageData.availability,
        ...mechPartData,
        ...bodyPartData,
      }),
    };
    const response = await fetch(
      "http://localhost:8000/parts/add_part.php",
      req
    );
    const resData = await response.text();
    if (resData === "Impossibile inserire il prodotto") {
      handleError(resData);
    } else {
      window.alert(resData);
      nav("/");
    }
  };

  useEffect(() => {
    async function setProviderAuth() {
      const providerToken: {
        id_provider: number;
        name: string;
      } | null = await providerValidateLogin();
      if (providerToken) {
        setProviderId(providerToken.id_provider);
      }
    }
    setProviderAuth().then(null);
  }, []);

  if (providerId <= 0) return <NoUserCountdown />;

  return (
    <div className="p-2">
      <div className="w-full h-full p-2.5 border-2 rounded-lg">
        <div className="w-full flex items-center justify-between">
          <div
            onClick={() => setIsBodyPart(true)}
            className="flex px-1.5 gap-x-2"
          >
            <input type="checkbox" className="scale-125" checked={isBodyPart} />
            <label className="text-white">
              Carrozzeria(plastiche, grafiche, ecc...)
            </label>
          </div>
          <div
            onClick={() => setIsBodyPart(false)}
            className="flex px-1.5 gap-x-2"
          >
            <input
              type="checkbox"
              onChange={() => setIsBodyPart(false)}
              className="scale-125"
              checked={!isBodyPart}
            />
            <label className="text-white">Parte meccanica</label>
          </div>
        </div>
        <div className="w-full border mt-1.5"></div>
        {isBodyPart ? (
          <div className="w-full py-2">
            <p className="text-lg font-semibold text-white">Nome prodotto:</p>
            <input
              type="text"
              value={bodyPartData.bd_name}
              onChange={(e) =>
                setBodyPartData({ ...bodyPartData, bd_name: e.target.value })
              }
              className="flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
              required={true}
            />
            <p className="mt-1 text-lg font-semibold text-white">
              Descrizione prodotto:
            </p>
            <input
              type="text"
              value={bodyPartData.bd_description}
              onChange={(e) =>
                setBodyPartData({
                  ...bodyPartData,
                  bd_description: e.target.value,
                })
              }
              className="flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
            />
            <div className="flex w-full justify-between gap-x-4">
              <div className="w-1/2">
                <p className="w-full text-white pl-0.5 mt-1 text-lg font-semibold">
                  Anno:
                </p>
                <select
                  className="w-full p-1 rounded-md bg-neutral-300 hover:bg-neutral-400"
                  onChange={(e) =>
                    setBodyPartData({
                      ...bodyPartData,
                      year: parseInt(e.target.value),
                    })
                  }
                >
                  {Array.from(
                    { length: new Date().getFullYear() - 1959 },
                    (_, i) => (
                      <option key={i} value={1960 + i}>
                        {1960 + i}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="w-1/2">
                <p className="w-full pl-0.5 mt-1 text-lg font-semibold text-white">
                  Colore:
                </p>
                <select
                  className="w-full p-1 rounded-md bg-neutral-300 hover:bg-neutral-400"
                  onChange={(e) =>
                    setBodyPartData({
                      ...bodyPartData,
                      color: e.target.value,
                    })
                  }
                >
                  {coloriRicambi.map((colore, i) => (
                    <option key={i} value={colore}>
                      {colore}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="mt-1 text-lg font-semibold text-white">
              Modello mezzo:
            </p>
            <input
              type="text"
              value={bodyPartData.vehicle_model}
              onChange={(e) =>
                setBodyPartData({
                  ...bodyPartData,
                  vehicle_model: e.target.value,
                })
              }
              className="flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
              required={true}
            />
          </div>
        ) : (
          <div className="w-full py-2">
            <p className="text-lg font-semibold text-white">Nome prodotto:</p>
            <input
              type="text"
              value={mechPartData.mp_name}
              onChange={(e) =>
                setMechPartData({ ...mechPartData, mp_name: e.target.value })
              }
              className="flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
              required={true}
            />
            <p className="mt-1 text-lg font-semibold text-white">
              Descrizione prodotto:
            </p>
            <input
              type="text"
              value={mechPartData.mp_description}
              onChange={(e) =>
                setMechPartData({
                  ...mechPartData,
                  mp_description: e.target.value,
                })
              }
              className="flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
              required={true}
            />
            <div className="flex w-full justify-between gap-x-4">
              <div className="w-1/2">
                <p className="w-full pl-0.5 mt-1 text-lg font-semibold text-white">
                  Compatibile dal:
                </p>
                <select
                  className="w-full rounded-md p-1 bg-neutral-300 hover:bg-neutral-400"
                  onChange={(e) =>
                    setMechPartData({
                      ...mechPartData,
                      year_from: parseInt(e.target.value),
                      year_to: Math.max(
                        parseInt(e.target.value) + 1,
                        mechPartData.year_to
                      ),
                    })
                  }
                >
                  {Array.from(
                    { length: new Date().getFullYear() - 1959 },
                    (_, i) => (
                      <option key={i} value={1960 + i}>
                        {1960 + i}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="w-1/2">
                <p className="w-full pl-0.5 mt-1 text-lg font-semibold text-white">
                  Compatibile fino al:
                </p>
                <select
                  className="w-full rounded-md p-1 bg-neutral-300 hover:bg-neutral-400"
                  onChange={(e) =>
                    setMechPartData({
                      ...mechPartData,
                      year_to: parseInt(e.target.value),
                    })
                  }
                  value={mechPartData.year_to}
                >
                  {Array.from(
                    {
                      length: new Date().getFullYear() - mechPartData.year_from,
                    },
                    (_, i) => (
                      <option key={i} value={mechPartData.year_from + 1 + i}>
                        {mechPartData.year_from + 1 + i}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <p className="w-full pl-0.5 mt-1 text-lg font-semibold text-white">
              Marche compatibili:
            </p>
            <ReactSelect
              onChange={(e) =>
                setMechPartData({
                  ...mechPartData,
                  builds_on: e.map((item) => item.value).join(","),
                })
              }
              isMulti
              options={MarcheMezziOpts}
            ></ReactSelect>
          </div>
        )}
        <div className="w-full border mt-1.5"></div>
        <div className="flex w-full justify-between gap-x-4">
          <div className="w-1/2">
            <p className="w-full pl-0.5 mt-1 text-lg font-semibold text-white">
              Lunghezza (mm):
            </p>
            <input
              type="number"
              min={0}
              max={100000}
              value={dimensions.length}
              onChange={(e) =>
                setDimensions({
                  ...dimensions,
                  length: parseInt(e.target.value),
                })
              }
              className="flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
              required={true}
            />
          </div>
          <div className="w-1/2">
            <p className="w-full pl-0.5 mt-1 text-lg font-semibold text-white">
              Altezza (mm):
            </p>
            <input
              type="number"
              min={0}
              max={100000}
              value={dimensions.height}
              onChange={(e) =>
                setDimensions({
                  ...dimensions,
                  height: parseInt(e.target.value),
                })
              }
              className="flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
              required={true}
            />
          </div>
        </div>
        <div className="mt-1 flex w-full justify-between gap-x-4">
          <div className="w-1/2">
            <p className="w-full pl-0.5 mt-1 text-lg font-semibold text-white">
              Spessore (mm):
            </p>
            <input
              type="number"
              min={0}
              max={100000}
              value={dimensions.thickness}
              onChange={(e) =>
                setDimensions({
                  ...dimensions,
                  thickness: parseInt(e.target.value),
                })
              }
              className="flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
              required={true}
            />
          </div>
          <div className="w-1/2">
            <p className="w-full pl-0.5 mt-1 text-lg font-semibold text-white">
              Peso (g):
            </p>
            <input
              type="number"
              min={0}
              max={1000000}
              value={dimensions.weight}
              onChange={(e) =>
                setDimensions({
                  ...dimensions,
                  weight: parseInt(e.target.value),
                })
              }
              className="flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
              required={true}
            />
          </div>
        </div>
      </div>
      <div className="mt-1 px-2 flex w-full justify-between gap-x-4">
        <div className="w-1/2">
          <p className="w-full pl-0.5 mt-1 text-lg font-semibold text-white">
            Quantità:
          </p>
          <input
            type="number"
            min={1}
            max={1000}
            value={storageData.availability}
            onChange={(e) =>
              setStorageData({
                ...storageData,
                availability: parseInt(e.target.value),
              })
            }
            className="flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
            required={true}
          />
        </div>
        <div className="w-1/2">
          <p className="w-full pl-0.5 mt-1 text-lg font-semibold text-white">
            Prezzo unitario:
          </p>
          <input
            type="number"
            min={1}
            max={10000}
            value={storageData.price}
            onChange={(e) =>
              setStorageData({
                ...storageData,
                price: parseInt(e.target.value),
              })
            }
            className="flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
            required={true}
          />
        </div>
      </div>
      <div className="mt-1 px-2 flex w-full justify-between gap-x-4">
        <div className="w-1/2">
          <p className="w-full pl-0.5 mt-1 text-lg font-semibold text-white">
            Tempo spedizione (h):
          </p>
          <input
            type="number"
            min={0}
            max={1000}
            value={storageData.ship_time}
            onChange={(e) =>
              setStorageData({
                ...storageData,
                ship_time: parseInt(e.target.value),
              })
            }
            className="flex-grow bg-neutral-300 hover:bg-neutral-400 border border-neutral-600 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
            required={true}
          />
        </div>
        <div className="mt-5 w-1/2 flex flex-col">
          <button
            onClick={(e) => handleSubmit(e)}
            className="w-full h-full text-xl font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Aggiungi
          </button>
        </div>
      </div>
      {error && (
        <p className="w-full text-center mt-2 text-red-600 font-semibold text-lg">
          {error}
        </p>
      )}
    </div>
  );
}

export default AggiungiRicambi;
