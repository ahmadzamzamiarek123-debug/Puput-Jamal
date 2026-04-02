import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-sage-800 mb-2 font-nunito">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border-2 border-sage-300 bg-cream-50 text-sage-800 placeholder-sage-400 font-inter transition-all duration-200 focus:outline-none focus:border-dino-yellow focus:ring-2 focus:ring-dino-yellow/20 ${error ? "border-red-400" : ""} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-sage-800 mb-2 font-nunito">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border-2 border-sage-300 bg-cream-50 text-sage-800 placeholder-sage-400 font-inter transition-all duration-200 focus:outline-none focus:border-dino-yellow focus:ring-2 focus:ring-dino-yellow/20 resize-none ${error ? "border-red-400" : ""} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-sage-800 mb-2 font-nunito">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border-2 border-sage-300 bg-cream-50 text-sage-800 font-inter transition-all duration-200 focus:outline-none focus:border-dino-yellow focus:ring-2 focus:ring-dino-yellow/20 cursor-pointer ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

Select.displayName = "Select";
