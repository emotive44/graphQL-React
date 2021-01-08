import React, { FC } from 'react';
import './Input.css';


interface InputGroupProps {
  label: string;
  type: string;
  value: string | number;
  err?: string | number;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const InputGroup: FC<InputGroupProps> = ({ label, type, value, err, onChange }) => {
  const labelTLC = label.toLowerCase();
  return (
    <div className="input-container">
      <label htmlFor={labelTLC}>Your {label}</label>
      <input type={type} id={labelTLC} name={labelTLC} value={value} onChange={onChange} />
      <span className="err">{err}</span>
    </div>
  )
}

export default InputGroup;