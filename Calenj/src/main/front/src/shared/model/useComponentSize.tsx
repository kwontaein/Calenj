import {useState, useEffect, useRef} from 'react';

interface ComponentSize {
    width: number;
    height: number;
};

export const useComponentSize = (): [React.RefObject<HTMLDivElement>, ComponentSize] => {
    const [size, setSize] = useState<ComponentSize>({width: 0, height: 0});
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                const {width, height} = entries[0].contentRect;
                setSize({width, height});
            }
        });

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
        };
    }, []);

    return [componentRef, size];
}