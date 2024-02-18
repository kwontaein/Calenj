import * as yup from 'yup';
import axios, { AxiosResponse} from 'axios';


interface UserData {
    nick_name: string;
    accountid: string;
    user_password: string;
    password_check?: string;
    user_email: string;
    id_duplication?:boolean;
    email_validation?:boolean;
  }

   const schema: yup.ObjectSchema<UserData> = yup.object().shape({
    nick_name: yup.string()
        .min(2, "닉네임은 최소 2글자 이상입니다!")
        .max(10, "닉네임은 최대 10글자입니다!")
        .matches(
            /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\\d\s]*$/,
            "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!")
        .required('닉네임을 입력해주세요'),
    // checkNickname: yup.boolean().required('중복체크해주세요'),
    accountid: yup.string()
        .required('아이디를 입력해주세요.')
        .min(3, '3자 이상 입력해주세요.')
        .matches(
            /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\\d\s]*$/,
            "아이디는 특수문자가 들어가면 안되며 영문이어야 합니다."),
    user_password: yup.string()
        .required('비밀번호를 입력해주세요')
        .max(16, "비밀번호는 최대 16자리입니다!")
        .matches(
            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}[^\s]*$/,
            "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함한 8자리 이상 입력해주세요"
        ),
        // .matches(regexPasswd, '비밀번호를 8~16자로 영문 대소문자, 숫자, 특수기호를 조합해서 사용하세요.')
        
    password_check: yup
        .string()
        .oneOf([yup.ref('user_password'), undefined], '비밀번호가 일치하지 않습니다')
        .required('비밀번호를 한번 더 입력해주세요'),
    user_email: yup.string()
        .required('이메일을 입력하세요')
        .email('이메일형식이 적합하지 않습니다.'),
    email_validation : yup.boolean()
    .test('이메일 인증 스키마','이메일 인증을 해주세요',(value)=>{
        return value;
    }),
    id_duplication : yup.boolean()
    .test('아이디 중복체크 스키마','중복된 아이디입니다.',async(value,{parent})=>{
            const response = await axios.post('/api/IdDuplicated' , null,{
                params: {
                    userName: parent.accountid
                }
            });
        return response.data;
    })

  })
  


  export default schema;