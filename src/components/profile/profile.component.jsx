const Profile = ({image, nickname}) => {
    return (
        <div className="profile__body">
            <div className='profile__body--img'>
                <img src={image} alt={nickname} />
            </div>
            <div className='profile__body--text'>
                {nickname}
            </div>
        </div>
    )
}

export default Profile;