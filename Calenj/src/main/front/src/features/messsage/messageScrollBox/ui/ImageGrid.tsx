import React, {useEffect, useReducer, useRef, useState} from "react";
import styled from "styled-components";
import {FullScreen_div, Modal_Background} from "../../../../shared/ui/SharedStyled";
import {useComponentSize} from "../../../../shared/model";
import {ImagePreView} from "../../messageImageBox/ui/ImagePreView";
import {ImagePreView_Container} from "../../messageImageBox/ui/ImagePreViewStyled";
import {ImagePreview} from "../../../../shared/ui/MultiImageUploadStyled";

const GridContainer = styled.div.attrs<{$widthSize:number, $imageLength:number}>(props=>({
    style:{
        gridTemplateColumns : `repeat(auto-fit, minmax(${(props.$widthSize/props.$imageLength) >400 ? "400px" :(props.$widthSize/props.$imageLength) >300 ? "300px" : "250px"}, auto))`,
        maxWidth: props.$widthSize >1200 ? 1200: props.$widthSize >900 ? 900: props.$widthSize >600 ? 600 : 300,
    }
}))`
    display: grid;
    gap: "10px";
`;

const Grid_Element = styled.div`
    display: flex;
    align-items: center;
`;
const Grid_Image = styled.img.attrs<{$widthSize:number, $imageLength:number}>(props=>({
    style:{
        maxWidth : `${(props.$widthSize/props.$imageLength) >400 ? "400px" : (props.$widthSize/props.$imageLength) >300 ? "300px" : "250px"}`,
    }
}))`
    width: 100%;
    height: auto;
    border-radius: 5px;
`
export const ImageGrid: React.FC<{ images: GridData[] }> = ({images}) => {
    const [contentRef, contentSize] = useComponentSize()
    const modalBackground = useRef<HTMLDivElement>(null);
    const [imagePreview, setImagePreview] = useState<GridData|null>(null);

    return (
        <FullScreen_div ref={contentRef}>
            {imagePreview &&
                <Modal_Background ref={modalBackground} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    if (e.target === modalBackground.current) {
                        setImagePreview(null)
                    }
                }}>
                    <ImagePreView_Container>
                        <ImagePreview src={`/image/savedImage/${imagePreview.id}.${imagePreview.extension}`} alt={`Preview`} style={{maxWidth:'800px', maxHeight:'800px'}}/>
                    </ImagePreView_Container>
                </Modal_Background>
            }

            <GridContainer $widthSize={contentSize.width} $imageLength={images.length}>
                {images.map((image) => (
                    <Grid_Element key={image.id}>
                        <Grid_Image $widthSize={contentSize.width} $imageLength={images.length}
                            src={`/image/savedImage/${image.id}.${image.extension}`}  // 이미지 경로를 환경에 맞게 수정
                            alt={image.filename}
                            draggable="false"
                            onClick={()=>setImagePreview(image)}
                        />
                    </Grid_Element>
                ))}
            </GridContainer>
        </FullScreen_div>
    );
}