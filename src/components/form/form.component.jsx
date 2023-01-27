import Logo from '../../assets/logo.png';

import BasicButton from '../button/button.component';
import FormBase from '../formBase/formBase.component';

import './form.styles.scss';

const Form = ({logGoogleUser, logGoogleRedirectUser, text, rest, handleSubmit, children, google}) => {
    return (
        <form onSubmit={handleSubmit} className='form'>
            <div className='form__container'>
                <div className='form__content'>
                    <div className='logo__container'>
                        <img src={Logo} alt='logo'/>
                    </div>
                    {children}
                    <BasicButton logGoogleRedirectUser={logGoogleRedirectUser} logGoogleUser={logGoogleUser} text={text} google={google} />
                    {rest && (
                        <FormBase />
                    )}
                </div>
            </div>
        </form>
    )
}

export default Form;