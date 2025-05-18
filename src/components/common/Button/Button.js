import "./Button.css";

const Button = ({
  text = "Submit",
  onClick,
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      className={`custom-button ${disabled || loading ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <span className="loader" /> : text}
    </button>
  );
};

export default Button;
