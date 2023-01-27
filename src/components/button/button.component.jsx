import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

import './button.styles.scss';

const BasicButton = ({signInWithGoogle, text, google}) => {
    return (
        <div className='form__button'>
            <Button 
                type='submit' 
                variant="contained" 
                className='form__button--direct'
            >
                {text}
            </Button>
            
            <Button 
                type='button' 
                variant="contained" 
                className='form__button--google'
                onClick={signInWithGoogle}
            >
                <GoogleIcon /> {google}
            </Button>
        </div>
    )
}

export default BasicButton;