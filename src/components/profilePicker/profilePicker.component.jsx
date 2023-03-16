import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';

import { profPic } from '../../image';
import './profilePicker.styles.scss';

const ProfilePicker = ({open, handleImageChange, setOpen}) => {
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setOpen(open);
    };
    
    return (
        <SwipeableDrawer anchor='right' open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
            <div onClick={toggleDrawer(false)} className='prof__pic--svg'>
                <FirstPageRoundedIcon />
            </div>
            <div className='prof__pic'>
                {profPic.map((pic) => (
                    <div className='prof__pic--img' onClick={() => handleImageChange(pic.img)}>
                        <img src={pic.img} />
                    </div>
                ))}
            </div>
        </SwipeableDrawer>
    )
}

export default ProfilePicker;