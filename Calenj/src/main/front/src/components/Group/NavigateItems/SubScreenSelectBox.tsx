import {
    SubNavigateState,
    DispatchSubNavigationProps,
    mapStateToSubNavigationProps,
    mapDispatchToSubNavigationProps,
} from "../../../store/slice/SubNavigationSlice";
import {connect} from "react-redux";
import {SubScreenIcon_Container, SubScreenSelecter_Container} from "../../../style/Group/SubScreenSelcetBoxStyle";
import {useEffect, useState} from "react";
import {stateOptionMap} from '../../../store/module/StompMiddleware';

const SubScreenSelectBox:React.FC<SubNavigateState & DispatchSubNavigationProps> =({subNavigateInfo,updateSubScreenStateOption})=>{
    const [filter, setFilter] = useState<boolean>(false);


    /**
     * 1. 랜더링 시 Option의 저장된 상태가 있으면 가져옴
     * 2. 이후 subNav의 stateOption이 변경되면 옵션에 따른 저장 clickState+Option ({state: true/false ,+@})
     * 3. 상태를 저장하고 1번을 반복 ( 페이지 전환 시 처리 )
     * 3-1 페이지 전환 (subNav의 param이 변경 된 경우) => param별로 설정된 filter 및 Search옵션을 가져옴
     * 만약 설정된 filter및 search를 취소하면 원래대로 다시 세팅
     */

    //랜더링 시 처리 - 2번
    useEffect(() => {

        return ()=>{
            updateSubScreenStateOption({stateOption:""})
        }
    }, []);

    //랜더링 이후 Option에 따른 후속처리() //filter 및 search면 상태를 창을 띄우고 지정한 상태를 저장
    useEffect(() => {
        console.log(subNavigateInfo.stateOption)
    }, [subNavigateInfo.stateOption]);

    return(
        <div>
            {(subNavigateInfo.clickState ==="투표" || subNavigateInfo.clickState ==="공지") &&
            <SubScreenSelecter_Container $option={subNavigateInfo.stateOption}>
                {(subNavigateInfo.stateOption ==="" ||subNavigateInfo.stateOption !=="search")  &&
                <SubScreenIcon_Container onClick={()=>{updateSubScreenStateOption({stateOption:"filter"})}}>
                    <i className="fi fi-rs-filter" style={{marginTop: "3px"}}></i>
                </SubScreenIcon_Container>
                }
                {subNavigateInfo.stateOption !=="filter"  &&
                <SubScreenIcon_Container onClick={()=>{updateSubScreenStateOption({stateOption:"search"})}}>
                    <i className="fi fi-br-search" style={{marginTop: "3px"}}></i>
                </SubScreenIcon_Container>
                }
                {(subNavigateInfo.stateOption===""|| subNavigateInfo.stateOption==="add")  &&
                <SubScreenIcon_Container onClick={()=>{updateSubScreenStateOption({stateOption:"add"})}}>
                    <i className="fi fi-sr-plus-small" style={{marginTop: "3px", fontSize:"20px"}}></i>
                </SubScreenIcon_Container>
                }

            </SubScreenSelecter_Container>
            }
        </div>

    )
}
export default connect(mapStateToSubNavigationProps, mapDispatchToSubNavigationProps) (SubScreenSelectBox);