import {Info_Container, InfoContent, InfoTail} from "./SharedStyled";
import {useComponentSize} from "../model";
interface InfoTextProps{
    text:string,
    marginLeft:number,
    marginTop:number,
}

export const InfoBox: React.FC<InfoTextProps> = ({text,marginLeft, marginTop}) =>{
    const [contentRef, contentSize]= useComponentSize()

    return(
        <Info_Container ref={contentRef}
                        style={{marginLeft: `${marginLeft}px`, marginTop:`${marginTop}px`}}>
            <InfoContent>
                {text}
            </InfoContent>
            <InfoTail style={{marginLeft:`-${contentSize.width-50}px`}}/>
        </Info_Container>
    )
}