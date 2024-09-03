import {useState} from "react";
import {createGroupApi} from "../api/createGroupApi";
import {AxiosError} from "axios";
import {jwtFilter} from "../../../../entities/authentication/jwt";
import {useConfirm} from "../../../../shared/model";
import {EventTagDTO, useFetchDateEventTag, useFetchGroupList} from "../../../../entities/reactQuery";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {createDateEventTag} from "../../../../entities/redux/model/slice/DateEventTagSlice";

export const useCreateGroup = (onClose:()=>void):[ groupTitle:string, React.Dispatch<React.SetStateAction<string>>, ()=>void] =>{
    const [groupTitle, setGroupTitle] = useState<string>("");
    const stomp = useSelector((state: RootState) => state.stomp); // 리덕스 상태 구독
    const groupListState = useFetchGroupList(stomp.isOnline)
    const userId = localStorage.getItem('userId')||''
    const {refetch} = useFetchDateEventTag(userId);
    const dispatch = useDispatch();
    const createGroup = () => {
        const create = ()=>{
            createGroupApi(groupTitle)
                .then(() => {
                    refetch().then(({data})=>{
                        if(data){
                            data.forEach((tag:EventTagDTO)=>{
                                dispatch(createDateEventTag({tagId:tag.id,name:tag.name, color:tag.color, defaultTag:tag.defaultTag, groupTag:tag.groupTag}))
                            })
                        }
                    })
                    onClose()
                    window.alert(`${groupTitle}이름으로 방이 생성되었습니다.`)
                })
                .catch(error => {
                    const axiosError = error as AxiosError;
                    console.log(axiosError);
                    if (axiosError.response?.status) {
                        console.log(axiosError.response.status);
                        jwtFilter((axiosError.response.status).toString());
                    }
                });
        }
        const cancel = () => console.log("생성 취소");

        if (groupTitle === "") {
            window.alert("생성할 방이름을 지어주세요.")
        } else {
            useConfirm(`${groupTitle} 이름으로 방을 생성하시겠습니까?`, create, cancel,groupListState);
        }
    }

    return [groupTitle, setGroupTitle, createGroup]
}