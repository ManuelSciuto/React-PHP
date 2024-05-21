interface Props {
  className?: string;
}

const LeftArrow = ({ className = "h-8 w-8" }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    className={className}
  >
    <path d="m13.5 19-6 6 6.3 6.2c4.8 4.9 6.4 6 7.4 5 .9-.9.4-2-2.7-5.2l-3.8-3.9 13.4-.3c11.1-.3 13.4-.6 13.4-1.8 0-1.2-2.3-1.5-13.4-1.8l-13.4-.3 3.7-3.8c3.3-3.4 4.1-6.1 1.8-6.1-.4 0-3.4 2.7-6.7 6z" />
  </svg>
);
export default LeftArrow;
