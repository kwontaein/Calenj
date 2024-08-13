import {Info_Container, InfoContent, InfoTail} from "./SharedStyled";
import {useComponentSize} from "../model";
interface InfoTextProps{
    text:string,
    marginLeft:number,
    marginTop:number,
    tailCenter?:boolean
}

export const InfoBox: React.FC<InfoTextProps> = ({text,marginLeft, marginTop, tailCenter}) =>{
    const [contentRef, contentSize]= useComponentSize()

    return(
        <Info_Container ref={contentRef}
                        style={{marginLeft: `${marginLeft}px`, marginTop:`${marginTop}px`}}>
            <InfoContent>
                {text}
            </InfoContent>
            <InfoTail style={{marginLeft: tailCenter? '0px' :`-${contentSize.width-50}px`}}/>
        </Info_Container>
    )
}