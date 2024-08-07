import {useState} from "react";
import {LoginData} from "./types";



export const useLoginHandler = ():[(key: string, event: string)=> void ,data:LoginData ] =>{

    const [data, setData] = useState<LoginData>({
        userEmail: '',
        userPassword: '',
    });

    const signHandler = (key: string, event: string): void => {
        setData((prevState: LoginData) => {
            return {...prevState, [key]: event}
        })
    };

    return [signHandler, data];
}
