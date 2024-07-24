import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const CustomButton = ({ text, routeTo, buttonStyle, type, onClick }) => {
  return (
    <Link to={routeTo}>
      <button
        type={type ? type : "text"}
        className={"p-3 m-1 rounded-3xl hover:shadow-xl " + buttonStyle}
        onClick={onClick}
      >
        {text}
      </button>
    </Link>
  );
};

export default CustomButton;
