import React from "react";
import {FilterContent_Container} from "./VoteFilterStytled";
import {VoteFilerProps} from "../model/types";


export const VoteFilterCheckBox : React.FC<VoteFilerProps> = ({content, target, isChecked, updateCheckState}) =>{

    return(
        <FilterContent_Container $isClick={isChecked}>
            <input type="checkbox" style={{marginRight:'5px'}} checked={isChecked}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {updateCheckState(target)}}/>
            {content}
        </FilterContent_Container>
    )
}