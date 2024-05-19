import logo1 from "../../../images/Logo 1.png";

interface Props {
    className?: string;
}

const Logo1 = ({ className = "w-8 h-8" }: Props) => (
    <div className={className}>
        <img className="w-full h-full" src={logo1} alt="Logo 1"/>
    </div>
)
export default Logo1
