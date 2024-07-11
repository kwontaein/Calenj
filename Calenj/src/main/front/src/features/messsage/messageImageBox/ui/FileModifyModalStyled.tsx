import styled from "styled-components";
import {PointColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const FileModifyModal_Container= styled.div`
    width: 400px;
    height: 180px;
    background-color: ${ThemeColor3};
    border-radius: 10px;
    padding: 40px;
`
export const FilePreview_Container = styled.div`
    margin-top: -80px;
`

export const FileName_Container = styled.div`
    width: calc(100% - 10px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 5px;
    color: ${TextColor};
    font-size: 15px;
`

export const MiniText_Container = styled.div`
    font-size: 13px;
    width: calc(100% - 10px);
    padding: 5px;
    margin-top: 20px;
`

export const FileNameModify_Container = styled.input`
    width: calc(100% - 16px);
    height: 30px;
    margin-block: 5px;
    border-radius: 5px;
    padding-left: 10px;
    font-size: 14px;
    color: ${TextColor};
    background-color: ${ThemeColor2};
    border: 2px solid ${ThemeColor2};

    &:focus {
        outline: none;
        border: 2px solid ${PointColor};
    }
`

export const ModifyButton_Container = styled.div`
    height: 30px;
    width: 100%;
    justify-content: right;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-left: 20px;
`