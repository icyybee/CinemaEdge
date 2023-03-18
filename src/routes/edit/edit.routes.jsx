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

    // const handleUpdateProfile = async () => {
    //     try {
    //       // get userDocRef and profileDocRef using the index passed through the URL
    //       const userCollectionRef = collection(db, 'users');
    //       const userDocRef = doc(userCollectionRef, userAuth.uid);
          
    //       const profilesCollectionRef = collection(userDocRef, 'profiles');
    //       const profileDocRef = doc(profilesCollectionRef, nickname);
      
    //       // update the profile document with the new nickname and image
    //       await updateDoc(profileDocRef, {
    //         image: newImage,
    //         nickname: newNickname
    //       });
      
    //       // update the profiles state in the ProfilePage component
    //       handleUpdateProfileState({ index: parseInt(index), nickname: newNickname, image: newImage });
      
    //       // navigate back to the profile page
    //       navigate('/profilepage');
    //     } catch (error) {
    //       console.error(error);
    //     }
    // }
      

    return (
        <div className="edit" key={index}>
            <div className='edit__head'>
                <h2>Edit Profile</h2>
                <h3>Select what you want to change</h3>
            </div>
            <form>
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