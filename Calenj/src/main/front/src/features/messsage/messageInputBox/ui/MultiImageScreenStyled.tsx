import styled from "styled-components";

export const MultiImage_Container = styled.div<{$maxWidth:number}>`
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    max-width: ${props=>props.$maxWidth};
`