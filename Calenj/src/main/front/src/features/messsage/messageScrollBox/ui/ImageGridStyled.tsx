import styled from "styled-components";

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(126px, auto));
    gap: 10px;
    max-width: 400px;
`;

export const Grid_Element = styled.div`
    display: flex;
    align-items: center;
`;

export const Grid_Image = styled.img`
    max-width: 127px;
    width: 100%;
    height: auto;
    border-radius: 5px;
`;