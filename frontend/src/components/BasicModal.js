import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -45%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const { textButton, textSecundary, Component, color } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{width: '50%'}}>
      <Button sx={{color: color,width:'100%', border:2, borderColor: color, opacity: '90%', marginBottom:1 }} onClick={handleOpen}>{textButton}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {textButton}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {textSecundary}
            </Typography>
            {Component}
        </Box>
      </Modal>
    </Box>
  );
}
