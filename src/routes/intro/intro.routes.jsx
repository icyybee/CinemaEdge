import { Link } from 'react-router-dom';

import './intro.styles.scss';

import BasicBtn from '../../components/basicBtn/basicBtn.component';
import Logo from '../../assets/logo-full.png';

const Intro = () => {
    return (
        <div className="bg intro">
            <div className='intro__container'>
                <div className='intro__head'>
                    <div className='intro__img'>
                        <img src={Logo} alt='logo' />
                    </div>
                    <div className='intro__text'>
                        <h2>Unlimited Movies, TV Shows and More</h2>
                        <h3>Watch Anywhere!</h3>
                    </div>
                </div>

                <div className='intro__foot'>
                    <Link to='/signup' style={{textDecoration: 'none'}}>
                        <BasicBtn text='Start Now!' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Intro;