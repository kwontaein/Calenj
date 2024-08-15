import styled from "styled-components";

export const GridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 400px;
    justify-content: flex-start;
    
`;

export const Grid_Element = styled.div`
    flex: 1 1 calc(33.333% - 10px);
    margin: 5px;
    max-width: calc(33.333% - 10px);

    &:nth-child(3n) {
        margin-right: 0;
    }
`;

export const Grid_Image = styled.img`
    width: 100%;
    height: auto;
`;