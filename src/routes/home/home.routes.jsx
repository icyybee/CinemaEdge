import { useState, useEffect } from "react";

import Loading from "../loading/loading.routes";
import Intro from "../intro/intro.routes";

const Home = () => {
    const [isLoading, setLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const onLoadEffect = () => {
        setTimeout(() => {
            setLoading(false);
        }, 5000);

        setTimeout(() => {
            setIsLoaded(true);
        });
    };

    useEffect(onLoadEffect, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            {isLoaded ? (
                <Intro />
                ) : (
                    <div style={{ color: "red" }}>Something went wrong</div>
                )
            }   
        </>
    )
}

export default Home;