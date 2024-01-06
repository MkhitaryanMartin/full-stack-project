import React, { ChangeEvent, useState } from 'react';
import { Button, Typography, CardMedia, Box } from '@mui/material';
import { ChangeHandler, RefCallBack } from 'react-hook-form';

interface MyInputProps {
  name: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: ChangeHandler;
  ref?: RefCallBack;
}

type Props = {
  name: MyInputProps;
};

const FileInput = ({ name: { name, onBlur, onChange, ref } }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setSelectedFile(fileList[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(fileList[0]);
    }
  };

  return (
    <div style={{width:"100%", textAlign:"start"}}>
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <input
          accept="image/*"
          id="file-input"
          type="file"
          onBlur={onBlur}
          onChange={(e) => {
            handleFileChange(e);
            if (typeof onChange === 'function') {
              onChange(e);
            }
          }}
          ref={ref}
          style={{ display: 'none' }}
          name={name}
        />
        <label htmlFor="file-input">
          <Button variant="outlined" component="span">
            Choose File
          </Button>
        </label>
        {previewUrl && (
          <CardMedia
            component="img"
            image={previewUrl}
            alt="Selected File"
            style={{ width: '50px', height: 'auto', marginLeft: '10px' }}
          />
        )}
      </Box>
      {selectedFile && (
        <Typography variant="body1">
          Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
        </Typography>
      )}
    </div>
  );
};

export default FileInput;
