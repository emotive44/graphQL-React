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
  const inputClasses = ['input-container'];

  if(err === 'correct') {
    inputClasses.push('correct');
  }
  return (
    <div className={inputClasses.join(' ')}>
      <label htmlFor={labelTLC}>Your {label}</label>
      <div className='input'>
        <input type={type} id={labelTLC} name={labelTLC} value={value} onChange={onChange} />
        {err === 'correct' && (
          <small><i className="far fa-check-circle"/> Correct</small>
        )}
      </div>
      <span className="err">{err === 'correct' ? '' : err}</span>
    </div>
  )
}

export default InputGroup;