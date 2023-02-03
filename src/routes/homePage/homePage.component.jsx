import { useState } from 'react';
import { useParams } from 'react-router-dom';

import AddToPhotosRoundedIcon from '@mui/icons-material/AddToPhotosRounded';

import Logo from '../../assets/logo-full.png';
import Emo from '../../assets/bground.jpg';
import Profile from '../../components/profile/profile.component';
import BasicModal from '../../components/modal/modal.component';

const HomePage = () => {
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
        <div className="home">
            <div className="home__content">
                <div className="home__head">
                    <img src={Logo} alt="home--logo" style={{width: '20%'}} />
                    <h2>Who's Watching?</h2>
                </div>

                <div className="home__body">
                    <div className='home__body--box'>
                        {profiles.map((profile, index) => {
                            return (
                                <div className='home__body--content'>
                                    <Profile 
                                        key={index} 
                                        image={profile.image} 
                                        nickname={profile.nickname}
                                    /> 
                                </div>
                            )
                        })}
                        
                        {profiles.length < 5 && (
                            <div className='home__body--content'>
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

export default HomePage;