import {Option_Container, Option_Item, OptionIcon_Wrapper} from "../../../../../shared/ui/SharedStyled";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useReducer} from "react";
import {CreateGroupEvent} from "../../create";
import {RootState} from "../../../../../entities/redux";


export const GroupEventOption :React.FC = () =>{
    const [createEventModal,setCreateEventModal] = useReducer((prev)=>!prev,false)

    return(
        <Option_Container>
            {createEventModal && <CreateGroupEvent onClose={setCreateEventModal}/>}
            <Option_Item onClick={setCreateEventModal}>
                <OptionIcon_Wrapper>
                    <i className="bi bi-plus-square"></i>
                </OptionIcon_Wrapper>
                생성하기
            </Option_Item>
            <Option_Item onClick={()=>{}}>
                <OptionIcon_Wrapper>
                    <i className="bi bi-pencil-square"></i>
                </OptionIcon_Wrapper>
                수정하기
            </Option_Item>
        </Option_Container>
    )
}