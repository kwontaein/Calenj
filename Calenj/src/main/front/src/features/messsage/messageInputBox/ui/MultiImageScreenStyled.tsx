import styled from "styled-components";

export const MultiImage_Container = styled.div<{ $maxWidth: number }>`
    overflow: auto;
    white-space: nowrap;
    max-width: ${props => props.$maxWidth}px;
`