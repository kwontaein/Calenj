import React, {useEffect, useState} from 'react';
import axios from 'axios';

interface Group {
    groupid: string;
    grouptitle: string;


}interface ModalProps {
    onClose: () => void;
  }


//단순 그룹 생성을 위한 컴포넌트
const MakeGroup: React.FC<ModalProps> = ({onClose}) => {
    const [groupName,setGroupName] = useState<string>();

    const MakeGroup = () => {

        axios.post('/api/makeGroup',groupName)
            .then(() => window.alert(`${groupName}이름으로 방이 생성되었습니다.`))
            .catch(error => console.log(error));
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
            MakeGroup
          }else{
            onCancel(); //취소 누르면 실행
          }
        };
        return confrimAction;
      };

      const hold =() =>  console.log("생성 취소");
  
      const createGroup = useConfirm(`${setGroupName} 이름으로 방을 생성하시겠습니까?`, MakeGroup, hold);



   


    return (
        <div>
            <input type='text' placeholder='캘린룸 이름' onChange={(e)=>setGroupName(e.target.value)}></input>
            <button onClick={createGroup}></button><button onClick={onClose}>닫기</button>
        </div>
    );
}

export default MakeGroup;
