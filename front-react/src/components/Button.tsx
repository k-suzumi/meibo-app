import { useFormStatus } from "react-dom"

const SubmitButton = ()=> {
 const status = useFormStatus();
 const{pending} = status;
 return <button disabled ={pending}>
    {pending? "ログイン中": "ログイン"}
    </button>
}

export default SubmitButton;