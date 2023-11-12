interface InputProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  title: string;
  type: string;
  value: string;
}

const Input = ({
  name,
  onChange,
  placeholder,
  title,
  type,
  value,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={name}>{title}</label>
      <input
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
};

export default Input;
