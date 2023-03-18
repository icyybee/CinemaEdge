import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/auth.context';
import { collection, setDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase.utils';

import AddToPhotosRoundedIcon from '@mui/icons-material/AddToPhotosRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

import styled, {keyframes} from "styled-components";
import { zoomIn, slideInUp, fadeInUp } from "react-animations";

import Logo from '../../assets/logo-full.png';
import Profile from '../../components/profile/profile.component';
import BasicModal from '../../components/modal/modal.component';
import BasicBtn from '../../components/basicBtn/basicBtn.component';
import ProfilePicker from '../../components/profilePicker/profilePicker.component';
import './profilePage.styles.scss';

const Zoom = styled.div`
    animation: 2s ${keyframes `${zoomIn}`};
` 

const Fade = styled.div`
    animation: 3s ${keyframes `${fadeInUp}`};
` 

const Slide = styled.div`
    animation: 3s ${keyframes `${slideInUp}`};
` 

const ProfilePage = () => {
    const { userAuth, userDocRef } = useContext(UserContext) || {};
    const navigate = useNavigate();
    const location = useLocation();
    
    const title = 'Who\'s Watching?';

    const [initialState, setInitialState] = useState({});
    const [profiles, setProfiles] = useState([]);
    const [image, setImage] = useState('');
    const [nickname, setNickname] = useState('');
    const [openPicker, setOpenPicker] = useState(false);
    const [modal, setModal] = useState(false);
    const [titleChange, setTitleChange] = useState(title);
    const [buttonChange, setButtonChange] = useState('Edit');
    const [animation, setAnimation] = useState(false);

    useEffect(() => {
        const profilesCollectionRef = collection(userDocRef, 'profiles');
        const profilesListener = onSnapshot(profilesCollectionRef, (snapshot) => {
          const profilesData = snapshot.docs.map((doc) => doc.data());
          setProfiles(profilesData);
        });
    
        return () => {
          profilesListener();
        };
    }, [userDocRef]);

    useEffect(() => {
        if (!location.state) return;
    
        const { profileIndex, newImage, newNickname } = location.state;
    
        const updatedProfiles = [...profiles];
        updatedProfiles[profileIndex] = { ...updatedProfiles[profileIndex], image: newImage, nickname: newNickname };
        setProfiles(updatedProfiles);
    
        const userCollectionRef = collection(db, 'users');
        const userDocRef = doc(userCollectionRef, userAuth.uid);
        const profileDocRef = doc(collection(userDocRef, 'profiles'), newNickname);
    
        updateDoc(profileDocRef, {
          image: newImage,
          nickname: newNickname,
        });
    }, [location.state, profiles, userAuth.uid]);
       
    const handleAddProfile = async () => {
        try {
          if (profiles.length < 5 && userDocRef) {
            const userCollectionRef = collection(db, 'users');
            const userDocRef = doc(userCollectionRef, userAuth.uid);
      
            const profilesCollectionRef = collection(userDocRef, 'profiles');
            const profileDocRef = doc(profilesCollectionRef, nickname);
      
            await setDoc(profileDocRef, { image, nickname });
            setProfiles([...profiles, { image, nickname }]);
            setImage();
            setNickname('');
            setModal(false);
          } else {
            console.log('Cannot create more than 5 profiles');
          }
        } catch (error) {
          console.error(error);
        }
    };       
            
    const handleDeleteProfile = () => {

    }

    const handleEdit = (index, image, nickname) => {
        navigate(`/editprofile/${index}`, {
            state: {
                profile: { index, image, nickname }
            },
        });
    };
             
    const handleHome = (index, image, nickname) => {
        navigate(`/homepage/${index}`, { state: { profile: {index, image, nickname} } });
    }

    const handleRoute = (index, image, nickname) => {
        if (buttonChange === 'Done') {
            handleEdit(index, image, nickname);
        } else {
            handleHome(index, image, nickname);
        }
    }
    
    const handleEditProfile = () => {
        if (Object.keys(initialState).length === 0) {
            // store the initial state of the profile
            setInitialState({
                image,
                nickname
            });
            setTitleChange('Edit Profile');
            setButtonChange('Done');
            setAnimation(animate => !animate);
        } else {
            // reset the state of the profile to the initial state
            setImage(initialState.image);
            setNickname(initialState.nickname);
            setTitleChange(title);
            setButtonChange('Edit');
            setAnimation(animate => !animate);
            setInitialState({});
        }
    }
    
    const handleImageChange = (selectedImage) => {
        setImage(selectedImage);
        setOpenPicker(false);
    };      
              
    return (
        <div className="profile">
            <div className="profile__content">
                <div className="profile__head">
                    <Zoom>
                        <img src={Logo} alt="profile--logo"/>
                    </Zoom>
                    <Fade>
                        <h2>{titleChange}</h2>
                    </Fade>
                    <BasicBtn icon= <OpenInNewRoundedIcon /> text={buttonChange} functions={handleEditProfile} />
                </div>

                <div className="profile__body">
                    <Slide>
                        <div className={animation ? 'profile__body--box-animate' : 'profile__body--box'}>
                            {profiles.map((profile, index) => {
                                return (           
                                    <div 
                                        className='profile__body--container' 
                                        onClick={() => handleRoute(index, profile.image, profile.nickname)}
                                    >
                                        <div className='profile__body--content'>
                                            <Profile 
                                                key={profile.nickname} 
                                                image={profile.image} 
                                            /> 
                                        </div>
                                        <div className='profile__body--text'>
                                            {profile.nickname.length > 10 ? (
                                                profile.nickname.substr(0, 10) + '...'
                                            ) : (
                                                profile.nickname
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                            
                            {profiles.length < 5 && (
                                <div className='profile__body--content'>
                                    <div className='profile-body'>
                                        <AddToPhotosRoundedIcon onClick={() => setModal(true)}/>
                                        {modal && (
                                            <BasicModal modal={modal} setModal={setModal}>
                                                {image ? (
                                                    <div className='modal__img'>
                                                        <img src={image} />
                                                    </div>
                                                ): (
                                                    <div className='modal__input' value={image} onClick={() => setOpenPicker(true)}>Select Profile Picture</div>
                                                )}
                                                <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Nickname" />
                                                <ProfilePicker open={openPicker} handleImageChange={handleImageChange} setOpen={setOpenPicker} />
                                                <div className='modal__btn'>
                                                    <BasicBtn functions={handleAddProfile} text='Save' />
                                                    <BasicBtn functions={() => setModal(false)} text='Cancel' />
                                                </div>
                                            </BasicModal>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Slide>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;