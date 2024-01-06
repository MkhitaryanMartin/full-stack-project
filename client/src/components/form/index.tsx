import React from 'react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../Input';
import {Box, Button} from '@mui/material';
import FileInput from '../file-input';
import "./style.css"


type ModeType = 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';

type Props = {
  schema: yup.AnyObjectSchema;
  mode?: ModeType;
  onSubmit: SubmitHandler<any>;
  submit: string;
  inputList: { name: string; type?: string, placeholder?:string }[];
  className?: string;
  children?: React.ReactNode,
  variant?: "contained" | "text" | "outlined"
};

const Form = ({
  schema,
  mode = 'onChange',
  onSubmit,
  submit,
  className,
  inputList,
  children,
  variant = "contained"
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    mode: mode,
  });

  const onSubmitHandler = (data: any) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className={`${className}-form auth-form`}
    >
      {inputList.map((el) => {
        const { name, type, placeholder} = el;
        if (type === "file") {
          return <FileInput key={type + "photo"} name={register(name)} />
        }else if(type === "textarea"){
          return <textarea className='textarea' {...register(name)} placeholder={placeholder} key={name} />
        } else {
          return <Input
            key={name}
            type={type}
            defaultValue=""
            name={register(name)}
            placeholder={placeholder || ""}
            errorText={errors[name] && errors[name]?.message?.toString()}
          />
        }
      })}
      <Box className='form__button-block' >
        <Button
          className={`${className}-form__button auth-form__button`}
          disabled={!(isValid && isDirty)}
          type="submit"
          variant={variant}
        >
          {submit}
        </Button>
        {children}
      </Box>
    </form>
  );
};

export default Form;
