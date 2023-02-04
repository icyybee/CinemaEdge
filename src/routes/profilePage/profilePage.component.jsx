import { useState } from 'react';
import { useParams } from 'react-router-dom';

import AddToPhotosRoundedIcon from '@mui/icons-material/AddToPhotosRounded';

import Logo from '../../assets/logo-full.png';
import Emo from '../../assets/bg.jpg';
import Profile from '../../components/profile/profile.component';
import BasicModal from '../../components/modal/modal.component';

import './profilePage.styles.scss';

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
                    <img src={Logo} alt="profile--logo"/>
                    <h2>Who's Watching?</h2>
                </div>

                <div className="profile__body">
                    <div className='profile__body--box'>
                        {profiles.map((profile, index) => {
                            return (
                                <div className='profile__body--content'>
                                    <Profile 
                                        key={index} 
                                        image={profile.image} 
                                        nickname={profile.nickname}
                                    /> 
                                </div>
                            )
                        })}
                        
                        {profiles.length < 5 && (
                            <div className='profile__body--content'>
                                <AddToPhotosRoundedIcon onClick={() => setModal(true)}/>
                                {modal && (
                                    <BasicModal modal={modal} setModal={setModal}>
                                        <input type="file" onChange={handleImageChange} />
                                        <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Nickname" />
                                        <button onClick={handleAddProfile}>Save</button>
                                        <button onClick={() => setModal(false)}>Cancel</button>
                                    </BasicModal>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;