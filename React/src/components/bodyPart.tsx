import { twMerge } from "tailwind-merge";
import DownArrow from "./svgs/downArrow";
import { useState } from "react";

interface Props {
  ricambio: any;
}

function BodyPart({ ricambio }: Props) {
  const [openDescription, setOpenDescription] = useState(false);

  return (
    <div
      onClick={() => setOpenDescription(!openDescription)}
      key={ricambio.bd_id}
      className="flex flex-wrap h-fit w-full p-2.5 bg-black bg-opacity-65 justify-between border-b border-white"
    >
      <p className="w-4/5">{ricambio.bd_name + " " + ricambio.year}</p>
      <div className="w-1/5 flex justify-end">
        <DownArrow
          className={twMerge(
            "h-6 w-6 duration-500 fill-white",
            openDescription && "rotate-180"
          )}
        />
      </div>
      <p
        className={twMerge(
          "mx-auto w-full rounded-lg text-black bg-gray-300 transition-all duration-500",
          openDescription
            ? "max-h-[500px] mt-2 p-1 border-2 border-gray-500 opacity-100 visible"
            : "max-h-0 mt-0 p-0 border-0 opacity-0 invisible"
        )}
      >
        {ricambio.bd_description}
      </p>
    </div>
  );
}

export default BodyPart;
