import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  [key: string]: any;
  label?: string;
  name?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
}

export default function TextArea({
  label,
  name,
  placeholder,
  register,
  ...rest
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor={name}
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        {...register}
        className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        placeholder={placeholder}
        rows={4}
        {...rest}
      />
    </div>
  );
}
