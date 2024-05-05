import {
    Hr_SubNavigation, ListToggleDiv, SubNavigateContents_Container,
    SubNavigateItem_Container,
    SubNavigateItem_Content,
    SubNavigateItem_Icon
} from "../../../style/Navigation/SubNavigationStyle";
import { useEffect, useState} from "react";
import {toggleCurrentMap} from "../../../store/module/StompMiddleware";
import {connect} from "react-redux";
import {
    SubNavigateState,
    DispatchSubNavigationProps,
    mapDispatchToSubNavigationProps,
    mapStateToSubNavigationProps
} from "../../../store/slice/SubNavigationSlice";

interface subNaviationProps{
    groupId:string,
}

type SubNavProps = SubNavigateState & DispatchSubNavigationProps &subNaviationProps;
const GroupSubNavigateItems:React.FC<SubNavProps> = ({groupId,updateSubClickState}) =>{
    const [toggleState,setToggleState] = useState<boolean>()
    const [clickState, setClickState] = useState<string>("");
    const toggleMutationHandler : ()=>void = () =>{
        if(groupId){
            const subNavgationState =toggleCurrentMap.get(groupId);
            subNavgationState.toggleState = !(subNavgationState.toggleState);
            setToggleState(subNavgationState.toggleState);
            toggleCurrentMap.set(groupId,subNavgationState)
        }
    }
    //클릭에따라 설정
    const toggleItemClickHandler : (target:string) => void
        = (target:string) =>{
        if(groupId){
            const subNavgationState =toggleCurrentMap.get(groupId);
            if(subNavgationState.clickState===target){
                subNavgationState.clickState = "";
                setClickState("")
            }else{
                subNavgationState.clickState = target;
                setClickState(target)
            }
            toggleCurrentMap.set(groupId,subNavgationState)
        }
    }

    useEffect(() => { //초기 값 세팅 - 토글 정보를 가져옴(투표/공지)
        if(!toggleCurrentMap.get(groupId)){
            toggleCurrentMap.set(groupId,{toggleState: true, clickState: "", screenHeight:0})
        }
        setToggleState(toggleCurrentMap.get(groupId).toggleState);
        setClickState(toggleCurrentMap.get(groupId).clickState);
    }, [groupId]);

    //클릭한 상태 변경 시 dispatch
    useEffect(() => {
        updateSubClickState({clickState:clickState})
    }, [clickState]);


    return(
        <SubNavigateContents_Container>
            <SubNavigateItem_Container
                $isClick={clickState==="그룹일정"}
                onClick={()=>toggleItemClickHandler("그룹일정")}>
                <SubNavigateItem_Icon>
                    <i className="fi fi-ss-calendar" style={{marginTop:'4px'}}></i>
                </SubNavigateItem_Icon>
                <SubNavigateItem_Content>
                    그룹일정
                </SubNavigateItem_Content>
            </SubNavigateItem_Container>
            <Hr_SubNavigation/>

            <ListToggleDiv onClick={toggleMutationHandler}>
                {toggleState ?
                    <i style={{marginRight: '5px'}} className="fi fi-rr-angle-small-down"/> :
                    <i style={{marginRight: '5px'}} className="fi fi-sr-angle-small-right"/>
                }
                공지/투표
            </ListToggleDiv>
            {toggleState&&
                <div>
                    <SubNavigateItem_Container
                        $isClick={clickState==="공지"}
                        onClick={()=>toggleItemClickHandler("공지")}>
                        <SubNavigateItem_Icon>
                            <i className="fi fi-ss-megaphone" style={{marginTop:'4px'}}></i>
                        </SubNavigateItem_Icon>
                        <SubNavigateItem_Content>
                            공지
                        </SubNavigateItem_Content>
                    </SubNavigateItem_Container>
                    <SubNavigateItem_Container
                        $isClick={clickState==="투표"}
                        onClick={()=>toggleItemClickHandler("투표")}>
                        <SubNavigateItem_Icon>
                            <i className="fi fi-ss-vote-yea" style={{marginTop:'4px'}}></i>
                        </SubNavigateItem_Icon>
                        <SubNavigateItem_Content>
                            투표
                        </SubNavigateItem_Content>
                    </SubNavigateItem_Container>
                </div>}

        </SubNavigateContents_Container>
    )
}
export default connect(mapStateToSubNavigationProps,mapDispatchToSubNavigationProps) (GroupSubNavigateItems);