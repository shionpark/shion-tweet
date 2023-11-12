import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  register?: UseFormRegisterReturn;
  required: boolean;
  type: string;
}

const Input = ({ label, name, register, required, type }: InputProps) => {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="rounded-md relative flex  items-center shadow-sm">
        <input
          className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          id={name}
          required={required}
          {...register}
          type={type}
        />
      </div>
    </div>
  );
};

export default Input;
