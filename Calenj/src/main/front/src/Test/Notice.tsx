import { useState } from "react";
import NoticeModal from "./NoticeModal";

const Notice :React.FC =()=>{
    const[showAlert,setShowAlert] = useState(false);

    
    const closeModal = () => {
        setShowAlert(false);
    };

    return(
        <div>
            <button onClick={()=>setShowAlert(true)}>생성하기</button>
            <div>{showAlert && <NoticeModal onClose={closeModal}/>}</div>
        </div>
    )
}
export default Notice;