import "./toggleButton.scss"

export default function ToggleButton({onToggle, value, className}) {

  return (
    <button className={`toggle-button ${className}`}
            onClick={onToggle}>
      {value}
    </button>
  );
}