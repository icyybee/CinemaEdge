import { useState } from "react";

import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    createAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import Form from "../../components/form/form.component";
import FormInput from '../../components/formInput/formInput.component';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

import './signUp.styles.scss';

const defaultFormFields = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, email, password, confirmPassword } = formFields;
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

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        } 

        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );
            
            await createUserDocumentFromAuth(user, {name});
            alert("Sign up successful!");
            resetFormFields();

        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use");
            } else {
                console.log("user creation encountered an error, error");
            }
        }
    };
    
    return (
        <div className="signup bg">
            <Form 
                logGoogleUser={logGoogleUser}
                handleSubmit={handleSubmit}
                text='Sign up'
                google='Sign up with google'
                rest
            >
                <div className='form__inputs'>
                    <FormInput     
                        type='name' 
                        placeholder='Username' 
                        required
                        onChange={handleChange} 
                        name='name' 
                        value={name}
                        icon= <PersonRoundedIcon />
                    />
                    
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
                    
                    <FormInput 
                        type={passwordType} 
                        placeholder='Confirm Password' 
                        required 
                        onChange={handleChange} 
                        name='confirmPassword' 
                        value={confirmPassword}
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

export default SignUp;