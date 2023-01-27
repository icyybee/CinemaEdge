import { useState } from "react";

import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import Form from "../../components/form/form.component";
import FormInput from '../../components/formInput/formInput.component';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

import './signIn.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const [passwordType, setPasswordType] = useState('password');

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    // const resetFormFields = () => {
    //     setFormFields(defaultFormFields);
    // }
    
    // const signInWithGoogle = async () => {
    //     await signInWithGooglePopup();
    // };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        // try {
        //     const {user} = await signInAuthUserWithEmailAndPassword(
        //         email, 
        //         password
        //     );
        
        //     resetFormFields();
        // } catch (error) {
        //     switch(error.code) {
        //         case "auth/wrong-password":
        //             alert("incorrect password for email");
        //             break
        //         case "auth/user-not-found":
        //             alert("no user associated with this email");
        //             break;
        //         default:
        //             console.log(error);
        //     }
        // }
    };

    return (
        <div className="signin bg">
            <Form
                logGoogleUser={logGoogleUser}
                handleSubmit={handleSubmit} 
                text='Login'
                google='Sign in with google'
            >
                <div className='form__inputs'>
                    <FormInput     
                        type='email' 
                        placeholder='Email' 
                        required
                        onChange={handleChange} 
                        name='email' 
                        value={email}
                        icon= <EmailRoundedIcon />
                    />
                    
                    <FormInput 
                        type={passwordType} 
                        placeholder='Password' 
                        required 
                        onChange={handleChange} 
                        name='password' 
                        value={password}
                        icon= {passwordType === 'password' ? (
                            <VisibilityOffRoundedIcon onClick= {togglePassword}/>
                        ) : (
                            <VisibilityRoundedIcon onClick={togglePassword} />
                        )}
                    />
                </div>
            </Form>
        </div>
    )
}

export default SignIn;