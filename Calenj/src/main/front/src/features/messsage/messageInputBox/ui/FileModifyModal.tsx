import {Modal_Background, Modal_Condition_Button} from "../../../../shared/ui/SharedStyled";
import {
    FileModifyModal_Container,
    FileName_Container,
    FileNameModify_Container,
    FilePreview_Container,
    MiniText_Container,
    ModifyButton_Container
} from "./FileModifyModalStyled";
import React, {ChangeEvent, useRef, useState} from "react";
import {MultiImageScreenProps} from "../model/types";
import {ImagePreview} from "../../../../shared/ui/MultiImageUploadStyled";
import {PreviewData} from "../../../../shared/model/types";

export const FileModifyModal :React.FC<MultiImageScreenProps> = ({setModifyIndex,previews,index,setPreviews, setSelectedFiles}) =>{
    const modalBackground = useRef<HTMLDivElement>(null);
    const [newName,setNewName] = useState<string>(previews[index].name)

    const changeFileName = ()=>{
        //이전 이름이랑 다르면 바꾸기
        if(previews[index].name !== newName){
            setPreviews((prev)=>
                prev.map((preview,i) => i === index ?  {image: preview.image, name: newName} : preview)
            )

            setSelectedFiles(prevFiles => {
                const newFiles = [...prevFiles];
                const file = newFiles[index];
                newFiles[index] = new File([file], newName, {type: file.type});
                return newFiles;
            });
        }
        setModifyIndex(-1)
    }
    return(
        <Modal_Background ref={modalBackground} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.target === modalBackground.current) {
                setModifyIndex(-1)
            }
        }}>
            <FileModifyModal_Container>
                <FilePreview_Container>
                    <ImagePreview src={previews[index].image} alt={`Preview ${index}`} style={{maxWidth:'200px', maxHeight:'100px'}} />
                </FilePreview_Container>
                <FileName_Container>
                    {previews[index].name}
                </FileName_Container>
                <MiniText_Container>
                    파일 이름
                </MiniText_Container>

                <FileNameModify_Container value={newName} onChange={(e:ChangeEvent<HTMLInputElement>)=>setNewName(e.target.value)}/>
                <ModifyButton_Container>
                    <Modal_Condition_Button onClick={()=> setModifyIndex(-1)} style={{marginRight:'10px'}}>
                        취소
                    </Modal_Condition_Button>
                    <Modal_Condition_Button $isAble={true} onClick={changeFileName}>
                        저장
                    </Modal_Condition_Button>
                </ModifyButton_Container>
            </FileModifyModal_Container>
        </Modal_Background>
    )
}