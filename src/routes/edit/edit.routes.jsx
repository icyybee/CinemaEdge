import { useState, useEffect, useContext } from 'react';
import { db } from '../../utils/firebase/firebase.utils';
import './edit.styles.scss';
import { doc, updateDoc, collection } from 'firebase/firestore';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/auth.context';

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
    const location = useLocation();
    const { index } = useParams();
    const { profile } = location.state;
    console.log(profile);
    const { image, nickname } = profile;

    return (
        <div className="edit" key={index}>
            <div className='edit__head'>
                <h2>Edit Profile</h2>
                <h3>Select what you want to change</h3>
            </div>
            <form>
                <div className='edit__body'>
                    <div className='edit__img'>
                        <img src={image} alt='' />
                    </div>
                    <div className='edit__name'>
                        <p>{nickname}</p>
                    </div>
                </div>
                <div className='edit__foot'>
                    <EditButtons />
                </div>
                <div className='edit__footer'>
                    <p>Changes made here apply to all devices</p>
                </div>
            </form>
        </div>
    )
}

export default Edit;