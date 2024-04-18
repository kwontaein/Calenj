import SignState from "./components/Auth/SignState";
import GroupList from "./components/Group/GroupList";
import GroupDetail from "./components/Group/GroupDetail";
import {RowFlexBox} from "./style/FormStyle";
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavigateState,DispatchNavigationProps,mapStateToNavigationProps,mapDispatchToNavigationProps} from './store/slice/NavigateByComponent'
const DefaultNavigation :React.FC<NavigateState &DispatchNavigationProps>=({updateNavigation,navigateInfo})=>{


    const redirectDetail = (navigate:string, groupId?: string) => {

        if(navigate === "group" && groupId){
            updateNavigation({navigate:"group",param:''})
            updateNavigation({navigate:"group",param:groupId})
        }

    }

    return(
        <div>
            <SignState/>
            <RowFlexBox>
                <GroupList redirectDetail={redirectDetail}/>
                {(navigateInfo.navigate==="group" && navigateInfo.param!=='') &&

                    <GroupDetail groupId={navigateInfo.param}/>
                }
            </RowFlexBox>

        </div>
    )
}
export default connect(mapStateToNavigationProps,mapDispatchToNavigationProps) (DefaultNavigation);