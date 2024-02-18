import styled from 'styled-components'


export const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const Input = styled.input`
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 450px;
`;


export const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: skyblue;
  color: white;
  cursor: pointer;
  width: 470px;
`;

//에러메시지
export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  margin-left: 10px;
  margin-bottom:10px;
`;


export const FormLable = styled.label`
    font-size : 12px;
    font-weight: 550;
    margin-left :5px;
`;