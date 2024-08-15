import React from "react";
import {Grid_Element, Grid_Image, GridContainer} from "./ImageGridStyled";

export const ImageGrid: React.FC<{ images: GridData[] }> = ({images}) => {
    return (
        <GridContainer>
            {images.map((image, index) => (
                <Grid_Element key={image.id}>
                    <Grid_Image
                        src={`/image/savedImage/${image.id}.${image.extension}`}  // 이미지 경로를 환경에 맞게 수정
                        alt={image.filename}
                        draggable="false"
                        //온클릭 추가 -> 클릭시 크게 보기
                    />
                </Grid_Element>
            ))}
        </GridContainer>
    );
}