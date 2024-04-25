import {useState} from "react";
import {SubNavigation_Container} from '../../style/Navigation/SubNavigationContainer'
import {NavigateState,DispatchNavigationProps,mapStateToNavigationProps,mapDispatchToNavigationProps} from '../../store/slice/NavigateByComponent'
import {connect} from 'react-redux'

interface NavigateProps{
    navigate:string;
}

const SubNavigationbar:React.FC<NavigateProps> =({navigate})=>{
    return  (
        <SubNavigation_Container>
            {navigate === "group" &&
                <div></div>
            }

        </SubNavigation_Container>
    )
}
export default SubNavigationbar;