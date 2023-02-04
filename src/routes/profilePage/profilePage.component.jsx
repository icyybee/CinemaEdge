import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import AddToPhotosRoundedIcon from '@mui/icons-material/AddToPhotosRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

import styled, {keyframes} from "styled-components";
import { zoomIn, slideInUp, fadeInUp } from "react-animations";

import Logo from '../../assets/logo-full.png';
import Emo from '../../assets/bg.jpg';
import Profile from '../../components/profile/profile.component';
import BasicModal from '../../components/modal/modal.component';
import BasicBtn from '../../components/basicBtn/basicBtn.component';

import './profilePage.styles.scss';

const Zoom = styled.div`
    animation: 2s ${keyframes `${zoomIn}`};
` 

const Fade = styled.div`
    animation: 3s ${keyframes `${fadeInUp}`};
` 

const Slide = styled.div`
    animation: 5s ${keyframes `${slideInUp}`};
` 

const ProfilePage = () => {
    // const { id } = useParams();

    const [profiles, setProfiles] = useState([]);
    const [image, setImage] = useState(Emo);
    const [nickname, setNickname] = useState('');
    const [modal, setModal] = useState(false);
    
    const handleAddProfile = () => {
        if (profiles.length < 5) {
          setProfiles([...profiles, { image, nickname }]);
          setImage(Emo);
          setNickname('');
          setModal(false);
        }
    };

    const handleImageChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    };
    
    return (
        <div className="profile">
            <div className="profile__content">
                <div className="profile__head">
                    <Zoom>
                        <img src={Logo} alt="profile--logo"/>
                    </Zoom>
                    <Fade>
                        <h2>Who's Watching?</h2>
                    </Fade>
                    <BasicBtn icon= <OpenInNewRoundedIcon /> text='Edit' />
                </div>

                <div className="profile__body">
                    <Slide>
                        <div className='profile__body--box'>
                            {profiles.map((profile, index) => {
                                return (
                                    <Link to='/homepage' style={{textDecoration: 'none', color: 'inherit'}}>
                                        <div className='profile__body--container'>
                                            <div className='profile__body--content'>
                                                <Profile 
                                                    key={index} 
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
                                    </Link>
                                )
                            })}
                            
                            {profiles.length < 5 && (
                                <div className='profile__body--content'>
                                    <div className='profile-body'>
                                        <AddToPhotosRoundedIcon onClick={() => setModal(true)}/>
                                        {modal && (
                                            <BasicModal modal={modal} setModal={setModal}>
                                                <input type="file" onChange={handleImageChange} style={{marginBottom: '2rem', cursor: 'pointer'}}/>
                                                <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Nickname" />
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