import {useEffect, useRef} from "react";

export const useClickOutSideCheck = (showModal:boolean,setShowModal:()=>void)=>{
    const showModalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (showModalRef.current && !showModalRef.current.contains(e.target as Node)) {
                setShowModal();
            }
        };
        const scrollObserver = ()=>{
            setShowModal()
        }
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', scrollObserver,true);
        if (!showModal) {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', scrollObserver,true);
        }
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', scrollObserver,true);

        }
    }, [showModalRef, showModal]);


    return showModalRef
}