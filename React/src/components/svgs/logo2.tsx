import logo2 from "../../../images/Logo 2.png";

interface Props {
    className?: string;
}

const Logo2 = ({ className = "w-8 h-8" }: Props) => (
    <div className={className}>
        <img className="w-full h-full" src={logo2} alt="Logo 2"/>
    </div>
)
export default Logo2
