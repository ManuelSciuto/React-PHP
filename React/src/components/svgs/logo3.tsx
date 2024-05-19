import logo3 from "../../../images/Logo 3.png";

interface Props {
    className?: string;
}

const Logo3 = ({ className = "w-8 h-8" }: Props) => (
    <div className={className}>
        <img className="w-full h-full" src={logo3} alt="Logo 3"/>
    </div>
)
export default Logo3
