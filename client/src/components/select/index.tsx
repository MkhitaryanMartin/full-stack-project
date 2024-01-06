import * as React from 'react';
import {MenuItem, FormControl, Select, SelectChangeEvent} from '@mui/material';

type Props = {
    value:string;
    onChange: (e:string)=>void;
    options:  Array<Record<string, any>>;
    valueKey?:string, 
    title?: string;
}

export default function MySelect({
    value,
    onChange,
    options,
    valueKey="value",
    title="title",
}: Props) {

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value)
  };
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          value={value}
          onChange={handleChange}
        >
        {
           options.map((option)=>{
            return <MenuItem key={option.id} value={option[valueKey]}>{option[title]}</MenuItem>
           })
        }
        </Select>
      </FormControl>
    </div>
  );
}