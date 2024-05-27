import {
    FilterContent_Container,
    FilterItem_Container, FilterToggle_Container, FilterToggleItem, SubScreenFilter_Btn,
    SubScreenFilter_Container, SubScreenFilterButton_Container
} from "../../../../style/Group/SubScreenSelcetBoxStyle";
import React, {useEffect, useState} from "react";
import {BoardFilterMap} from "../../../../store/module/StompMiddleware";
import {
    BoardOptionState,
    DispatchBoardOptionProps,
    mapDispatchToBoardOptionProps,
    mapStateToBoardOptionProps
} from "../../../../store/slice/BoardOptionSlice";
import {connect} from "react-redux";

interface SubScreenSelectBoxProps{
    groupId:string,
}


const VoteFilterItems :React.FC<BoardOptionState & DispatchBoardOptionProps & SubScreenSelectBoxProps> = ({updateBoardFilter, groupId}) =>{
    const [filterCheckA,setFilterCheckA] = useState<boolean>(false);
    const [filterCheckB,setFilterCheckB] = useState<boolean>(false);
    const [toggleA,setToggleA] = useState<boolean>(false);
    const [toggleB,setToggleB] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(true);


    //필터 여부에 따른 토글 초기화 (로딩이 완료 된 이후 작동)
    useEffect(() => {
        if(loading) return
        if(!filterCheckA){
            setToggleA(false)
        }
        if(!filterCheckB){
            setToggleB(false)
        }
    }, [filterCheckA,filterCheckB]);


    useEffect(() => {
        const filterRegister =BoardFilterMap.get(groupId+"vote")

        if(filterRegister){//Filter Setting의 기록이 있으면 세팅
            updateBoardFilter(filterRegister)
            setFilterCheckA(filterRegister.filterA.isCheck);
            setFilterCheckB(filterRegister.filterB.isCheck);
            setToggleA(filterRegister.filterA.toggleState);
            setToggleB(filterRegister.filterB.toggleState);
        }else{
            //없으면 초기화
            updateBoardFilter({filterA:{isCheck:false,toggleState:false}, filterB:{isCheck:false,toggleState:false}})
        }
        setLoading(false); //로딩완료
    }, []);


    const filterReset = () =>{
        if(!filterCheckA && !filterCheckB) return
        setFilterCheckA(false)
        setFilterCheckB(false)
        updateBoardFilter({filterA:{isCheck:false,toggleState:false}, filterB:{isCheck:false,toggleState:false}})
        if(BoardFilterMap.get(groupId+"vote")){
            BoardFilterMap.delete(groupId+"vote");
        }
    }

    const updateFilter =()=>{
        //기존 세팅이랑 같으면 return
        if(!filterCheckA && !filterCheckB) {
            BoardFilterMap.delete(groupId+"vote");
            updateBoardFilter({filterA:{isCheck:false,toggleState:false}, filterB:{isCheck:false,toggleState:false}})
            return
        }
        BoardFilterMap.set(groupId+"vote",
            {filterA:{isCheck:filterCheckA,toggleState:toggleA},
                filterB:{isCheck:filterCheckB,toggleState:toggleB}})
        updateBoardFilter({filterA:{isCheck:filterCheckA,toggleState:toggleA}, filterB:{isCheck:filterCheckB,toggleState:toggleB}})
    }


    return(
        <SubScreenFilter_Container>
            <FilterItem_Container>
                <FilterContent_Container $isClick={filterCheckA}>
                    <input type="checkbox" style={{marginRight:'5px'}} checked={filterCheckA}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               if(!e.target.checked) setToggleA(false)
                               setFilterCheckA(e.target.checked)}}/>
                    진행/마감
                </FilterContent_Container>
                <FilterToggle_Container $isClick={filterCheckA}
                                        onClick={()=> {
                                            if(filterCheckA) setToggleA((prev) => !prev)
                                        }}>
                    <FilterToggleItem $isClick={filterCheckA}
                                      $toggleState={toggleA}/>
                </FilterToggle_Container>
            </FilterItem_Container>
            <FilterItem_Container>
                <FilterContent_Container $isClick={filterCheckB}>
                    <input type={"checkbox"} style={{marginRight:'5px'}} checked={filterCheckB}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               if(!e.target.checked) setToggleB(false)
                               setFilterCheckB(e.target.checked)}}/>
                    참여/미참여
                </FilterContent_Container>
                <FilterToggle_Container $isClick={filterCheckB}
                                        onClick={()=> {
                                            if(filterCheckB) setToggleB((prev) => !prev)
                                        }}>
                    <FilterToggleItem $isClick={filterCheckB}
                                      $toggleState={toggleB}/>
                </FilterToggle_Container>
            </FilterItem_Container>
            <SubScreenFilterButton_Container>
                <SubScreenFilter_Btn onClick={updateFilter}
                                     style={{marginRight:'5px'}}>
                    적용
                </SubScreenFilter_Btn>
                <SubScreenFilter_Btn onClick={filterReset}>
                    초기화
                </SubScreenFilter_Btn>
            </SubScreenFilterButton_Container>
        </SubScreenFilter_Container>
    )
}
export default connect(mapStateToBoardOptionProps,mapDispatchToBoardOptionProps) (VoteFilterItems);