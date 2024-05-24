interface Props {
  className?: string;
}

const PencilIcon = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
  >
    <path d="M20.8 17.7C9.6 29.1 8 31.1 6.6 35.9c-.9 3-1.3 5.8-.8 6.3.4.4 3.2.1 6.2-.7 4.9-1.3 6.6-2.6 18.2-14.2C44 13.5 45.1 11.4 40.7 7.2 36.3 3 34.4 4.1 20.8 17.7zm10.2-.2 2.4 2.6-8.7 8.7-8.7 8.7-2.7-2.8-2.8-2.7 8.5-8.5c4.7-4.7 8.7-8.5 9.1-8.5.3 0 1.6 1.1 2.9 2.5z" />
  </svg>
);
export default PencilIcon;
