import React, {useEffect, useRef, useState} from 'react';

const ScrollComponent = () => {
    const [position, setScroll] = useState(0);

    function onScroll() {
        setScroll(window.scrollY);
        console.log(position);
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);

    return (
        <div>

        </div>
    );
};

export default ScrollComponent;
