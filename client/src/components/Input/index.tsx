import React, { useState } from 'react';
import { ChangeHandler, RefCallBack } from 'react-hook-form';
import "./style.scss"
import CreateIcon from '../icon/createIcon';
import { eyeJson } from '../../assets/icon-json';
import { IconButton } from '@mui/material';

interface MyInputProps {
  name: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: ChangeHandler;
  ref?: RefCallBack;
}

type Props = {
  type?: string;
  errorText?: string;
  name: MyInputProps;
  defaultValue?: string;
  placeholder?:string
};

export default function Input({
  type = 'text',
  errorText = '',
  name: { name, onBlur, onChange, ref },
  defaultValue = '',
  placeholder
}: Props) {

  const [passType, setPassType] = useState<"text" | "password">("password")
  const onEye = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (passType === "password") {
      setPassType("text")
    } else {
      setPassType("password")
    }
  }
  return (
    <label className="input-container">
      <span>
        {name.toUpperCase()}
        <i className={errorText ? 'notValid' : 'valid'}>*</i>
      </span>
      <div className='input-block'>
        <input
          defaultValue={defaultValue}
          type={type === "password" ? passType : type}
          className="input"
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          placeholder={placeholder}
        />
        {
          type === "password" ? <IconButton onClick={(e) => onEye(e)} disableTouchRipple>
            <CreateIcon icon={eyeJson} size={30} event='click' checked={passType === "text" ? false : true} />
          </IconButton> : null
        }
      </div>
      <p className={errorText ? 'errorText' : ''}>{errorText}</p>
    </label>
  );
}
