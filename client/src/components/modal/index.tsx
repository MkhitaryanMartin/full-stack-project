import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

type Props ={
    isOpen: boolean;
    title?: string;
    handleClose: ()=>void;
    children: React.ReactNode;
    footer?: React.ReactNode
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MyModal({
    isOpen, 
    handleClose,
    title,
    children,
    footer
}: Props) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
        <Box component="header"> <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography></Box>
        <Box sx={style}>
          {children}
        </Box>
        <Box component="footer">{footer}</Box>
        </>
      </Modal>
    </div>
  );
}