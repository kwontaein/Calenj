import {
    SubNavigateTopBar_Container,
    SubNavigateTopBar_Content_Container,
    SubNavigateTopBar_EventSelecter_Container,
    SubNavigateTopBar_leftContent, SubNavigateTopBar_rightContent_item
} from "../../../style/Navigation/SubNavigationStyle";
import GrouypByNavigationSelectBox from "./GroupByNavigationSelectBox";
import {useEffect, useRef, useState} from "react";
import {FullScreen_div} from "../../../style/FormStyle";

interface subNaviationTopProps{
    groupTitle:string,
}
const GroupSubNavigateTopItems:React.FC<subNaviationTopProps> = ({groupTitle})=>{
    const [showEventSelecter,setShowEventSelecter] = useState<boolean>(false);
    const selectBox = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectBox.current && !selectBox.current.contains(e.target as Node)) {
                setShowEventSelecter(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectBox]);


    useEffect(() => {
        setShowEventSelecter(false)
    }, [groupTitle]);


    return(
        <SubNavigateTopBar_Container $isClick={showEventSelecter} >

            <SubNavigateTopBar_Content_Container>
                <FullScreen_div onClick={()=>{setShowEventSelecter((prev)=>!prev)}} style={{display:"flex"}}>
                    <SubNavigateTopBar_leftContent>
                        {groupTitle}
                    </SubNavigateTopBar_leftContent>
                    <SubNavigateTopBar_EventSelecter_Container>
                        {showEventSelecter ?
                            <SubNavigateTopBar_rightContent_item>
                                ×
                            </SubNavigateTopBar_rightContent_item> :
                            <i style={{fontSize:'21px', marginTop:'5px', cursor:'pointer'}} className="fi fi-rr-angle-small-down">
                            </i>
                        }
                    </SubNavigateTopBar_EventSelecter_Container>
                </FullScreen_div>
            </SubNavigateTopBar_Content_Container>
            {showEventSelecter &&
                <div ref={selectBox}>
                    <GrouypByNavigationSelectBox/>
                </div>}
        </SubNavigateTopBar_Container>

    )
}
export default  GroupSubNavigateTopItems;