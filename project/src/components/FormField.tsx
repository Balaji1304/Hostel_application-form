import React from 'react';
import { clsx } from 'clsx';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, name, type = 'text', required = false, error, className, ...props }, ref) => {
    return (
      <div className={className}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          type={type}
          id={name}
          name={name}
          required={required}
          className={clsx(
            "mt-1 block w-full rounded-md shadow-sm sm:text-sm",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';