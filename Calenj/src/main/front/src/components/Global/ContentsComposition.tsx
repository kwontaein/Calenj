import {FullScreen_div, RowFlexBox} from '../../style/FormStyle'
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {
    NavigateState,
    mapStateToNavigationProps,
} from '../../store/slice/NavigateByComponent'
import MessageContainer from "../MessageBox/MessageContainer";
import {ContentsByEventTopBar, ContentsScreen_div} from "../../style/Navigation/ContentComposition";
import GroupUserList from "../Group/GroupUserList"


interface qeuryProps {
    isLoading :boolean
}

const ContentsComposition :React.FC<NavigateState&qeuryProps>=({navigateInfo, isLoading})=>{



    //네비게이션의 상태가 변할 때마다 재랜더링을 위한 groupDetail
    return(

        <FullScreen_div>
            <ContentsByEventTopBar/>
            {navigateInfo.navigate ==="group"&&
                <ContentsScreen_div>
                    <MessageContainer target={navigateInfo.navigate} param ={navigateInfo.navigateParam}/>
                    <GroupUserList  isLoading={isLoading}/>
                </ContentsScreen_div>
            }
        </FullScreen_div>
    )
}
export default connect(mapStateToNavigationProps) (ContentsComposition);