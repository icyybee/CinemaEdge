import { useState, useEffect, useContext } from 'react';
import { db } from '../../utils/firebase/firebase.utils';
import './edit.styles.scss';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { doc, updateDoc, collection } from 'firebase/firestore';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { UserContext } from '../../context/auth.context';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const EditButtons = () => {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="outlined">Done</Button>
            <Button variant="contained" style={{backgroundColor: '#6052ff'}}>Delete</Button>
            <Button variant="outlined"><Link to='/profilepage'>Cancel</Link></Button>
        </Stack>
    );
}

const Edit = () => {
    const location = useLocation();
    const { index } = useParams();
    const { profile } = location.state;
    console.log(profile);
    const { image, nickname } = profile;
    const [newNickname, setNewNickname] = useState(nickname);

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
                        <div>
                            <CreateRoundedIcon />
                        </div>
                    </div>
                    <div className='edit__name'>
                        <input type="text" value={newNickname} placeholder={nickname} onChange={e => setNewNickname(e.target.value)} />
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