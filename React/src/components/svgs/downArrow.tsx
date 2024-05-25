interface Props {
  className?: string;
}

const DownArrow = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    className={className}
  >
    <path d="M3.4 14.1c-.4.7 4 5.8 10.5 12.3L25 37.5l11.2-11.2c8.9-9 11-11.5 10-12.5s-3.3.8-11.2 8.7l-10 10-9.8-9.8C9.9 17.4 5.2 13 4.8 13c-.4 0-1 .5-1.4 1.1z" />
  </svg>
);
export default DownArrow;
