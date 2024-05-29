import {
    FilterItem_Container,
    SubScreenFilter_Btn,
    SubScreenFilter_Container,
    SubScreenFilterButton_Container
} from "./VoteFilterStytled";
import React from "react";
import {connect, useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux/store";
import {VoteFilterCheckBox} from "./VoteFilterCheckBox";
import {VoteFilterToggleBox} from "./VoteFilterToggleBox";
import {useFilterState} from "../model/useFilterState";




export const VoteFilter :React.FC = () =>{
    const [filterReset,updateCheckState,updateToggleState] = useFilterState();
    const {filter_setting} = useSelector((state:RootState) => state.boardOption)
    const {filterA, filterB} = filter_setting


    return(
        <SubScreenFilter_Container>
            <FilterItem_Container>
                <VoteFilterCheckBox  content={'진행/마감'}
                                     target={"A"}
                                     isChecked={filterA.isChecked}
                                     updateCheckState={updateCheckState}/>

                <VoteFilterToggleBox target={"A"}
                                     isChecked={filterA.isChecked}
                                     toggleState={filterA.toggleState}
                                     updateToggle={updateToggleState}/>
            </FilterItem_Container>
            <FilterItem_Container>
                <VoteFilterCheckBox  content={'참여/미참여'}
                                     target={"B"}
                                     isChecked={filterB.isChecked}
                                     updateCheckState={updateCheckState}/>

                <VoteFilterToggleBox target={"B"}
                                     isChecked={filterB.isChecked}
                                     toggleState={filterB.toggleState}
                                     updateToggle={updateToggleState}/>
            </FilterItem_Container>
            <SubScreenFilterButton_Container>

                <SubScreenFilter_Btn onClick={filterReset}>
                    초기화
                </SubScreenFilter_Btn>
            </SubScreenFilterButton_Container>
        </SubScreenFilter_Container>
    )
}