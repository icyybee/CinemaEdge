import './edit.styles.scss';

import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const EditButtons = () => {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="outlined">Done</Button>
            <Button variant="contained">Delete</Button>
            <Button variant="outlined">Cancel</Button>
        </Stack>
    );
}

const Edit = () => {
    const { id } = useParams();

    return (
        <div className="edit" key={id}>
            <div className='edit__head'>
                <h2>Edit Profile</h2>
                <h3>Select what you want to change</h3>
            </div>
            <div className='edit__body'>
                <div className='edit__img'>
                    <img src='' alt='' />
                </div>
                <div className='edit__name'>
                    <p>Beatrice</p>
                </div>
            </div>
            <div className='edit__foot'>
                <EditButtons />
            </div>
            <div className='edit__footer'>
                <p>Changes made here apply to all devices</p>
            </div>
        </div>
    )
}

export default Edit;