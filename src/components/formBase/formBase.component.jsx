import { Link } from "react-router-dom";

import './formBase.styles.scss';

const FormBase = () => {
    return (
        <div className="form__rest">
            <div className='remember'>
                <input type='checkbox' />
                <label>Remember my login</label>
            </div>
            
            <div className='signup__form'>
                <p>Already on CinemaEdge? <Link to='/signin'>Sign in</Link></p>
            </div>
        </div>        
    )
}

export default FormBase;