import styled from "styled-components";

export const Valid_Button = styled.div`
    font-size :15px;
    border: 1.8px solid;
    text-align: center;
    width:50px;
    margin-left: 10px;
    border-radius: 3px;
    cursor: pointer;
`

export const CheckCodeValid_Button = styled(Valid_Button)`
    position:absolute;;
    margin-left: 420px;
    margin-top: -35px;
`

export const RequestEmailCode_Button = styled(Valid_Button)`
    width:180px;
    margin-bottom: 20px;
`