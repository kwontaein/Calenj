import SubNavigationbar from "./SubNavigationbar";
import {FullScreen_div} from '../../style/FormStyle'
import React from "react";
import {connect} from 'react-redux'
import {
    NavigateState,
    DispatchNavigationProps,
    mapStateToNavigationProps,
    mapDispatchToNavigationProps,
} from '../../store/slice/NavigateByComponent'
import ContentsComposition from "./ContentsComposition";
import {useFetchGroupDetail} from '../../store/ReactQuery/queryManagement'


const NavigationComposition :React.FC<NavigateState&DispatchNavigationProps>=({navigateInfo})=>{




    const grooupDetailState =useFetchGroupDetail(navigateInfo.navigate,navigateInfo.navigateParam)

    return(
        <FullScreen_div style = {{ display:"flex", flexDirection:"row"}}>
                    <SubNavigationbar isLoading={grooupDetailState.isLoading}/>
                    <ContentsComposition isLoading={grooupDetailState.isLoading}/>

        </FullScreen_div>
    )

}
export default connect(mapStateToNavigationProps,mapDispatchToNavigationProps)(NavigationComposition);