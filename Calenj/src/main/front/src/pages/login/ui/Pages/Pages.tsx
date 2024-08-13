import React, {useEffect, useRef} from 'react';
import {useLoginHandler, requestLoginApi} from '../../../../features/authentication/login';
import {
    Back_Div, Button_Div, Ear, Ear_Bottom, Ear_Bottom_Container, Ear_Container, Eye, Eye_Container,
    ID_Container,
    ID_Input, Inner_div, Item_Ex_Div,
    Login_Container,
    Login_div,
    Password_Container,
    Password_Input, SignUp_Btn, Tail_Div
} from "./styledPages";
import {Link} from "react-router-dom";
import {SignState_Button} from "../../../../shared/ui/SharedStyled";

export const LoginFormPages: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [signHandler, data] = useLoginHandler();

    //페이지 로딩 시 자동으로 id input에 focus
    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    return (
        <Login_Container>
            <div>
                <Ear_Container>
                    <Ear></Ear>
                    <Ear></Ear>
                </Ear_Container>
                <Back_Div>
                    <Ear_Bottom_Container>
                        <Ear_Bottom></Ear_Bottom>
                        <Ear_Bottom></Ear_Bottom>
                    </Ear_Bottom_Container>
                    <Login_div>
                        <Eye_Container>
                            <Eye/><Eye/>
                        </Eye_Container>
                        <Inner_div>
                            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                                requestLoginApi(e, data)
                            }}>
                                <ID_Container> <Item_Ex_Div>Email</Item_Ex_Div>
                                    <ID_Input ref={inputRef} onChange={(event) => {
                                        signHandler("userEmail", event.target.value)
                                    }}></ID_Input>
                                </ID_Container>
                                <Password_Container> <Item_Ex_Div>Password</Item_Ex_Div>
                                    <Password_Input type="password" onChange={(event) => {
                                        signHandler("userPassword", event.target.value)
                                    }}></Password_Input>
                                </Password_Container>
                                <Button_Div>
                                    <Link to="/signup" style={{textDecoration: "none"}}>
                                        <SignUp_Btn>회원가입</SignUp_Btn>
                                    </Link>
                                    <button type="submit">로그인</button>
                                </Button_Div>
                            </form>
                        </Inner_div>
                    </Login_div>
                </Back_Div>
                <Tail_Div/>
            </div>
        </Login_Container>
    );

}
