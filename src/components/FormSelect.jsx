import './FormSelect.css';

function FormSelect({ label, name, value, onChange, options = [], placeholder, required = false, isLoading = false }) {
  return (
    <div className="form-select-group">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="form-select"
        disabled={isLoading}
      >
        <option value="">{isLoading ? 'Loading...' : placeholder || 'Select an option'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;
