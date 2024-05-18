interface Props {
    className?: string;
    onClick?: () => void;
}

const OptionIcon = ({ className = "fill-gray-500 w-8 h-8", onClick }: Props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className}
        onClick={onClick}
    >
        <path d="M11 3.1c0 .5-1 .9-2.2.7C7.3 3.6 6.5 4 6.5 5c0 .8-.7 1.5-1.5 1.5-.9 0-1.4.8-1.2 1.9.2 1-.2 2.3-1 2.7-1.1.8-1.1 1 0 1.8.8.4 1.2 1.7 1 2.7-.2 1.1.3 1.9 1.2 1.9.8 0 1.5.7 1.5 1.5 0 .9.8 1.4 1.9 1.2 1-.2 2.3.2 2.7 1 .8 1.1 1 1.1 1.8 0 .4-.8 1.7-1.2 2.7-1 1.1.2 1.9-.3 1.9-1.2 0-.8.7-1.5 1.5-1.5.9 0 1.4-.8 1.2-1.9-.2-1 .2-2.3 1-2.7 1.1-.8 1.1-1 0-1.8-.8-.4-1.2-1.7-1-2.7.2-1.1-.3-1.9-1.2-1.9-.8 0-1.5-.7-1.5-1.5 0-1-.8-1.4-2.3-1.2C14 4 13 3.6 13 3.1c0-.6-.4-1.1-1-1.1-.5 0-1 .5-1 1.1zM9.9 9.9C8.3 13.6 6 14.8 6 12c0-2.1 3.8-6.6 4.7-5.6.3.2-.1 1.9-.8 3.5zm7.1-.8c1.4 2.4 1.2 3.9-.2 3.9-1.2 0-3.8-4.3-3.8-6.2 0-1.3 3 .4 4 2.3zM13 12c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm3 3.9c0 1.4-3.7 2.3-6 1.6-3.4-1.1-2.2-2.5 2-2.5 2.2 0 4 .4 4 .9z" />
    </svg>
)
export default OptionIcon
