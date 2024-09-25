interface Props {
  className: string;
}

const Arrow = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 490 490"
    className={className}
  >
    <path d="M249.888 490 8.139 244.996 249.888 0h231.973L239.71 244.996 481.861 490z" />
  </svg>
);
export default Arrow;
