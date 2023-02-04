import './profile.styles.scss';

const Profile = ({image, nickname}) => {
    return (
        <div className="profile-body">
            <div className='profile-body--img'>
                <img src={image} alt={nickname}/>
            </div>
        </div>
    )
}

export default Profile;