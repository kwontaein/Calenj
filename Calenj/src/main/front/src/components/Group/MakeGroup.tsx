import React, {useEffect, useState} from 'react';
import axios from 'axios';
;


interface ModalProps {
    onClose: () => void;
}


//단순 그룹 생성을 위한 컴포넌트
const MakeGroup: React.FC<ModalProps> = ({onClose}) => {
    const [groupTitle,setGroupTitle] = useState<string>("");

    const makeGroup = () => {

        axios.post('/api/makeGroup',{groupTitle:groupTitle})
            .then(() => 
            {
              onClose()
              window.alert(`${groupTitle}이름으로 방이 생성되었습니다.`)
            })
            .catch(error => {
              window.alert('세션이 만료되었습니다. 다시 로그인해주세요.')
              document.location.replace('./sign')
            });
    };

    

    const useConfirm = (massage =" ",onConfirm:()=>void, onCancel:()=>void)=>{
        if(typeof onConfirm !== "function" ){
          return;
        }
        if(typeof onCancel !== "function" ){
            return;
        }

          const confrimAction = () => { //취할 행동
          if(window.confirm(massage)){ //확신 시

            makeGroup();

          }else{
            onCancel(); //취소 누르면 실행
          }
        };
        return confrimAction();
      };

    
   
      const createGroup = ()=>{
        const cancle =() =>  console.log("생성 취소");
  
        if(groupTitle===""){
          window.alert("생성할 방이름을 지어주세요.")
        }else{
          useConfirm(`${groupTitle} 이름으로 방을 생성하시겠습니까?`, makeGroup, cancle);
         
        }
      }


    return (
        <div>
            <input type='text' placeholder='캘린룸 이름' onChange={(e)=>setGroupTitle(e.target.value)}></input>
            <button onClick={createGroup}>생성</button>
            <button onClick={onClose}>닫기</button>
        </div>
    );
}

export default MakeGroup;