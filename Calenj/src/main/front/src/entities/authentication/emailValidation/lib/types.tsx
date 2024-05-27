import {UserData} from '../../../../features/authentication/sign'
export interface SignFormData extends UserData{
    emailValidation?:boolean;
}