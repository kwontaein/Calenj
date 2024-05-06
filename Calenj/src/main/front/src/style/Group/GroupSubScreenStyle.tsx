import styled from 'styled-components';
import {ScrollMin_width} from '../ChatBoxStyle'
import {ThemaColor3} from "../FormStyle";

export const GroupSubScreen_Container = styled.div`
    overflow-y: auto; /* 수직 스크롤을 활성화. */
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    padding: 5px;
    background-color: ${ThemaColor3};
`