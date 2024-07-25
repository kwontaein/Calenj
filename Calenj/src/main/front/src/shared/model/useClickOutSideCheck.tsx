import {useEffect, useRef} from "react";

export const useClickOutSideCheck = (showModal:boolean,setShowModal:()=>void)=>{
    const showModalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (showModalRef.current && !showModalRef.current.contains(e.target as Node)) {
                setShowModal();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        if (!showModal) {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showModalRef, showModal]);


    return showModalRef
}