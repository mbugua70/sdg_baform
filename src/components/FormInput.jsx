import './FormInput.css';

function FormInput({ label, type = 'text', name, value, onChange, placeholder, required = false }) {
  return (
    <div className="form-input-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="form-input"
      />
    </div>
  );
}

export default FormInput;
