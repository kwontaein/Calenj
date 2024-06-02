import {NavigationProps, updateNavigation} from "../../../../entities/redux/model/slice/NavigatgionSlice";
import {useDispatch} from "react-redux";

export const useNavigation = ():(navigate:string, groupId?: string)=>void =>{
    const dispatch = useDispatch()

    return (navigate:string, groupId?: string) => {
        if(navigate === "group") {
            dispatch(updateNavigation({navigate: "group", navigateParam: groupId}))
        }else if(navigate === "main"){
            dispatch(updateNavigation({navigate: "main", navigateParam: ""}))
        }
    }
}