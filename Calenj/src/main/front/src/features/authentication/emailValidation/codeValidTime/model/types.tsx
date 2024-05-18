
export interface ComponentProps {
    email: string;
    onClose: () => void;
}


export interface ValidAbleMenagement{
    showAlert:boolean ,
    eamilInputLimit:boolean,
    validation:boolean ,
    closeModal:()=>void ,
    updateValidAble:()=>void,
    updateEmailValidateState :()=>void
}