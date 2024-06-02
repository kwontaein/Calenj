import {FilterToggle_Container, FilterToggleItem} from "./VoteFilterStytled";
import React from "react";
import {VoteToggleProps} from "../model/types";




export const VoteFilterToggleBox : React.FC<VoteToggleProps> = ({target, toggleState, isChecked, updateToggle}) =>{

    return(
        <FilterToggle_Container $isClick={isChecked}
                                onClick={()=> {
                                    if(isChecked) updateToggle(target)
                                }}>
            <FilterToggleItem $isClick={isChecked}
                              $toggleState={toggleState}/>
        </FilterToggle_Container>
    )
}