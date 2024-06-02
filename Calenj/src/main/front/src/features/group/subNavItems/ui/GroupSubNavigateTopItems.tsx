import {
    SubNavigateTopBar_Container,
    SubNavigateTopBar_Content_Container,
    SubNavigateTopBar_EventSelecter_Container,
    SubNavigateTopBar_leftContent, SubNavigateTopBar_rightContent_item
} from "./GroupSubNavigationStyle";
import {SubNavigationSelectBox} from "./SubNavigationSelectBox";
import {useEffect, useRef, useState} from "react";
import {FullScreen_div} from "../../../../shared/ui/SharedStyled";

interface subNaviationTopProps{
    groupTitle:string,
}
export const GroupSubNavigateTopItems:React.FC<subNaviationTopProps> = ({groupTitle})=>{
    const [showEventSelector, setShowEventSelector] = useState<boolean>(false);
    const selectBox = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectBox.current && !selectBox.current.contains(e.target as Node)) {
                setShowEventSelector(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectBox]);


    useEffect(() => {
        setShowEventSelector(false)
    }, [groupTitle]);


    return(
        <SubNavigateTopBar_Container ref={selectBox} $isClick={showEventSelector} >

            <SubNavigateTopBar_Content_Container>
                <FullScreen_div onClick={()=>{setShowEventSelector((prev)=>!prev)}} style={{display:"flex"}}>
                    <SubNavigateTopBar_leftContent>
                        {groupTitle}
                    </SubNavigateTopBar_leftContent>
                    <SubNavigateTopBar_EventSelecter_Container>
                        {showEventSelector ?
                            <SubNavigateTopBar_rightContent_item>
                                ×
                            </SubNavigateTopBar_rightContent_item> :
                            <i style={{fontSize:'21px', marginTop:'5px', cursor:'pointer'}} className="fi fi-rr-angle-small-down">
                            </i>
                        }
                    </SubNavigateTopBar_EventSelecter_Container>
                </FullScreen_div>
            </SubNavigateTopBar_Content_Container>
            {showEventSelector && <SubNavigationSelectBox/>}
        </SubNavigateTopBar_Container>

    )
}
