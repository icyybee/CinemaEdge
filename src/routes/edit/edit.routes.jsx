import { useState, useContext } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';

import { db } from '../../utils/firebase/firebase.utils';
import { doc, updateDoc, collection } from 'firebase/firestore';
import { UserContext } from '../../context/auth.context';

import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import ProfilePicker from '../../components/profilePicker/profilePicker.component';

import './edit.styles.scss';

const EditButtons = () => {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="outlined" type='submit'>Done</Button>
            <Button variant="contained" style={{backgroundColor: '#6052ff'}}>Delete</Button>
            <Button variant="outlined"><Link to='/profilepage'>Cancel</Link></Button>
        </Stack>
    );
}

const Edit = () => {
    const location = useLocation();
    const { userAuth } = useContext(UserContext) || {};
    const { index } = useParams();
    const { profile } = location.state || {};
    console.log(profile);
    const navigate = useNavigate();
    const { image, nickname } = profile;
    const [newNickname, setNewNickname] = useState(nickname);
    const [newImage, setNewImage]= useState(image);
    const [open, setOpen] = useState(false);

    const handleImageChange = (selectedImage) => {
        setNewImage(selectedImage);
        setOpen(false);
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
          // Update Firestore document for the profile
          const userCollectionRef = collection(db, 'users');
          const userDocRef = doc(userCollectionRef, userAuth.uid);
          const profileDocRef = doc(collection(userDocRef, 'profiles'), profile.nickname);
      
          await updateDoc(profileDocRef, {
            image: newImage,
            nickname: newNickname,
          });
      
          // Navigate back to ProfilePage with new data
          navigate(-1, {
            state: {
              profileIndex: profile.index,
              newImage,
              newNickname,
            },
          });
        } catch (error) {
          console.error(error);
        }
    };
          
    return (
        <div className="edit" key={index}>
            <div className='edit__head'>
                <h2>Edit Profile</h2>
                <h3>Select what you want to change</h3>
            </div>
            <form onSubmit={updateProfile}>
                <div className='edit__body'>
                    <div className='edit__img'>
                        <img src={newImage} alt='' />
                        <div value={newImage} onClick={() => setOpen(true)}>
                            <CreateRoundedIcon />
                        </div>
                        <ProfilePicker open={open} handleImageChange={handleImageChange} setOpen={setOpen} />
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