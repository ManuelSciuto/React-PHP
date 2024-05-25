interface Props {
  className?: string;
}
const MinusIcon = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
  >
    <path d="M21.5 4.5c-.5.2-2.2.6-3.7.9-3.5.8-9.4 5.9-11.5 10-2 3.7-2.1 13.1-.3 16.6 3.7 7.3 10.1 11.3 18 11.3s14.3-4 18-11.3c1.8-3.4 1.7-12.9-.2-16.5-1.8-3.3-6.2-7.7-9.3-9.3-2.3-1.1-9.5-2.3-11-1.7zM34 24v3H14v-6h20v3z" />
  </svg>
);
export default MinusIcon;
