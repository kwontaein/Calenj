import {FullScreen_div} from '../../style/FormStyle'
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {
    NavigateState,
    mapStateToNavigationProps,
} from '../../store/slice/NavigateByComponent'
import MessageContainer from "../MessageBox/MessageContainer";

interface NavigationProps {
    target : string;
    param: string;
}

const ContentsComposition :React.FC<NavigateState>=({navigateInfo})=>{



    //네비게이션의 상태가 변할 때마다 재랜더링을 위한 groupDetail
    return(

        <FullScreen_div>

            {navigateInfo.navigate ==="group"&&
                <MessageContainer target={navigateInfo.navigate} param ={navigateInfo.navigateParam}/>
            }

        </FullScreen_div>
    )
}
export default connect(mapStateToNavigationProps) (ContentsComposition);