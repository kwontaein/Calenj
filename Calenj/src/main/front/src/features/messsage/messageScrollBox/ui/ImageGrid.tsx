import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    gap: 10px;
    max-width: 400px;
`;
const Grid_Element = styled.div`
    display: flex;
    align-items: center;
`;
const Grid_Image = styled.img`
    max-width: 200px;
    width: 100%;
    height: auto;
    border-radius: 5px;
`
export const ImageGrid: React.FC<{ images: GridData[] }> = ({images}) => {
    return (
        <GridContainer>
            {images.map((image) => (
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