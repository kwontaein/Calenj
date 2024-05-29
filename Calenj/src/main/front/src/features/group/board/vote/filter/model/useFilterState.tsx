import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux/store";
import {BoardFilterMap} from "../../../../../../entities/redux/module/StompMiddleware";
import {updateBoardFilter} from "../../../../../../entities/redux/slice/BoardOptionSlice";


export const useFilterState = ():[()=>void, (target:string)=>void,(target:string)=>void]=>{
    const {filter_setting} = useSelector((state:RootState) => state.boardOption)
    const {filterA, filterB} = filter_setting
    const { param } = useSelector((state:RootState) => state.subNavigateInfo)
    const dispatch = useDispatch()


    //필터 여부에 따른 토글 초기화 (로딩이 완료 된 이후 작동)
    useEffect(() => {
        const registerFilter = BoardFilterMap.get(param+"vote")
        if(registerFilter){
            dispatch(updateBoardFilter(registerFilter))
        }else{
            dispatch(updateBoardFilter({filterA:{isChecked:false,toggleState:false}, filterB:{isChecked:false,toggleState:false}}))
        }

    }, []);

    useEffect(() => {
        if((!filterA.isChecked) && (!filterB.isChecked)){
            BoardFilterMap.delete(param+"vote");
        }
    }, [filterA.isChecked,filterB.isChecked]);

    useEffect(() => {
        if((!filterA.isChecked) && (!filterB.isChecked)) return
        BoardFilterMap.set(param+"vote", filter_setting)
    }, [filter_setting]);

    const filterReset = () =>{
        if(!filterA.isChecked && !filterB.isChecked) return
        dispatch(updateBoardFilter({filterA:{isChecked:false,toggleState:false}, filterB:{isChecked:false,toggleState:false}}))
    }

    const updateCheckState = (target:string) =>{
        if(target==="A"){
            if(filterA.isChecked){
                dispatch(updateBoardFilter({filterA:{isChecked:!filterA.isChecked,toggleState:false},filterB}))

            }else{
                dispatch(updateBoardFilter({filterA:{isChecked:!filterA.isChecked,toggleState:filterA.toggleState},filterB}))
            }
        }else if(target ==="B"){
            if(filterB.isChecked){
                dispatch(updateBoardFilter({filterA,filterB:{isChecked:!filterB.isChecked,toggleState:false}}))
            }else{
                dispatch(updateBoardFilter({filterA,filterB:{isChecked:!filterB.isChecked,toggleState:filterB.toggleState}}))
            }
        }
    }

    const updateToggleState = (target:string)=>{
        if(target==="A"){
            dispatch(updateBoardFilter({filterA:{isChecked:filterA.isChecked,toggleState:!filterA.toggleState},filterB}))
        }else if(target ==="B"){
            dispatch(updateBoardFilter({filterA,filterB:{isChecked:filterB.isChecked,toggleState:!filterB.toggleState}}))
        }
    }

    return [filterReset,updateCheckState,updateToggleState]

}