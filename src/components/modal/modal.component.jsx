import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import './modal.styles.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  bgcolor: '#07041fcc',
  border: '1px solid #6052ff',
  boxShadow: 24,
  p: 4,
  borderRadius: 2.5
};

const BasicModal = ({children, modal, setModal}) => {
    const handleClose = () => setModal(false);
  
    return (
        <div>
            <Modal
                open={modal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='modal'>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}

export default BasicModal;