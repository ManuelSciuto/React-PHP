interface Props {
  className?: string;
}

const ExpandIcon = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    className={className}
  >
    <path d="M28 7c0 1.7.7 2 5.2 2h5.3L24 23.5 9.5 38l-.3-5c-.3-4.2-.6-5-2.3-5-1.7 0-1.9.7-1.9 8.5V45h8.5c7.8 0 8.5-.2 8.5-2 0-1.7-.7-2-5.2-2h-5.3L26 26.5 40.5 12l.3 5c.3 4.2.6 5 2.3 5 1.7 0 1.9-.7 1.9-8.5V5h-8.5c-7.8 0-8.5.2-8.5 2z" />
  </svg>
);
export default ExpandIcon;
