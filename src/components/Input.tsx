// Input.tsx
import React from 'react';

type InputProps = {
  type: string;
  id: string;
  name: string;
  label: string;
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ type, id, name, label, value, error, onChange }) => {
  return (
    <div className="mb-4 space-y-4">
      <label htmlFor={id} className="text-lm-heading dark:text-dm-heading">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border dark:bg-lm-heading ${error && 'border-red-400'} rounded-lg`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
