interface Props {
  className?: string;
}
const PlusIcon = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
  >
    <path
      fill="#4caf50"
      d="M44 24c0 11.045-8.955 20-20 20S4 35.045 4 24 12.955 4 24 4s20 8.955 20 20z"
    />
    <path fill="#fff" d="M21 14h6v20h-6V14z" />
    <path fill="#fff" d="M14 21h20v6H14v-6z" />
  </svg>
);
export default PlusIcon;
