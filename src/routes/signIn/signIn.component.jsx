import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils";

import Form from "../../components/form/form.component";
import FormInput from '../../components/formInput/formInput.component';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

import './signIn.styles.scss';

const defaultFormFields = {
    name: '',
    email: '',
    password: ''
}

const SignIn = () => {
    const navigate = useNavigate();
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, email, password } = formFields;
    const [passwordType, setPasswordType] = useState('password');

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
    
    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        alert('Signed in Successfully!');
        navigate('/profilepage');
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(
                email, 
                password
            );
            
            alert('Login Successful!');
            resetFormFields();
            navigate('/profilepage');
        } catch (error) {
            switch(error.code) {
                case "auth/wrong-password":
                    alert("incorrect password for email");
                    break
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                default:
                    console.log(error);
            }
        }
    };

    return (
        <div className="signin bg">
            <Form
                signInWithGoogle={signInWithGoogle}
                handleSubmit={handleSubmit} 
                text='Login'
                google='Sign in with google'
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
                </div>
            </Form>
        </div>
    )
}

export default SignIn;