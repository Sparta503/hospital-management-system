import { InputHTMLAttributes, ReactNode } from 'react';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: ReactNode;
  isLoading?: boolean;
}

export const Field = ({
  id,
  name,
  label,
  icon,
  isLoading = false,
  ...props
}: FieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
        <input
          id={id}
          name={name}
          className={`
            w-full px-10 py-2 rounded-lg bg-gray-800 text-white
            border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500
            transition-all duration-200
            ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
          `}
          {...props}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};