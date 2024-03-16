import styled from 'styled-components'


interface UnfocusBackgroundProps {
  focus: string;
}

export const SignUpFormContainer = styled.div<UnfocusBackgroundProps>`

  position: relative;
  z-index : ${props => (props.focus ==="true" ? -1 : 1)}
`;

export const UnfocusBackgound = styled.div<UnfocusBackgroundProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${props => props.focus ==="true"? 'black' : 'transparent'};
  opacity: ${props => props.focus==="true" ? '60%' : '100%'};
`


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



