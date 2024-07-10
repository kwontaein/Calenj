import {Modal_Background} from "../../../../shared/ui/SharedStyled";
import React, {useRef} from "react";
import {ImagePreviewProps, MultiImageScreenProps} from "../../messageInputBox/model/types";
import {ImagePreview} from "../../../../shared/ui/MultiImageUploadStyled";
import {ImagePreView_Container} from "./ImagePreViewStyled";

export const ImagePreView :React.FC<ImagePreviewProps> = ({setPreviewIndex,preview}) =>{
    const modalBackground = useRef<HTMLDivElement>(null);

    return(
        <Modal_Background ref={modalBackground} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.target === modalBackground.current) {
                setPreviewIndex(-1)
            }
        }}>
            <ImagePreView_Container>
                <ImagePreview src={preview.image} alt={`Preview`} style={{maxWidth:'700px', maxHeight:'700px'}}/>
            </ImagePreView_Container>
        </Modal_Background>
    )
}