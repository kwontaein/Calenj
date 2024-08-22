import {ThemeColor3} from "../../../../shared/ui/SharedStyled";
import styled from "styled-components";

export const VoteMessage_Container = styled.div`
    width: auto;
    min-width: 200px;
    background-color: ${ThemeColor3};
    border-radius: 8px;
    overflow: hidden;
    margin-top: 10px;
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, .14),
    0 9px 46px 8px rgba(0, 0, 0, .12),
    0 11px 15px -7px rgba(0, 0, 0, .2);
    transition: opacity 0.2s ease-in-out;
`