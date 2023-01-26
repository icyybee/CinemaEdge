import Typical from "react-typical";

import './loading.styles.scss';

const Loading = () => {
    return (
        <div className="loading">
            <Typical
                steps={['CINEMAEDGE', 5000]}
                wrapper="h1"
                loop={Infinity}
            />
        </div>
    )
}

export default Loading;