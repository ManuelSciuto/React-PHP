import {twMerge} from "tailwind-merge";

interface Props {
    veicolo: Veicolo;
    className?: string;
}

function ProfiloVeicolo({ className }: Props) {
    return (
        <div className={twMerge(className, "w-[calc(100%-32px)] md:w-[calc(50%-16px)] lg:w-[calc(33.33%-16px)] p-2 border-2")}></div>
    );
}

export default ProfiloVeicolo;