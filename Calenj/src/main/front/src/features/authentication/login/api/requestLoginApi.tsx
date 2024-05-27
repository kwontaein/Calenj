import React from "react";
import axios from "axios";
import {jwtFilter} from "../../../../entities/authentication/jwt";
import {LoginData} from '../model/types'
import {useLoginFilter} from '../model/useLoginFilter'

export const requestLoginApi = (e: React.FormEvent<HTMLFormElement>, data:LoginData) : void =>{
    e.preventDefault();
    axios.post('/api/login', data)
        .then(() => {
            document.location.replace("/");
        })

        .catch(error => {
            useLoginFilter(error.response?.data || "An unexpected error occurred");
            jwtFilter(error.response?.data || "An unexpected error occurred");
        })
};
