import { useState } from "react";
import SubmitButton from "../components/Button";

const Login = () => {
    const [isError, setisError] = useState("")

    const handleSubmit = async (formdata: FormData) => {

        const email = formdata.get("email")
        const password = formdata.get("password")
        if (!email || !password) {
            alert("メールアドレスかパスワードがありません")
            return
        }
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                redirect: "manual",
                body: JSON.stringify({ email, password })
            });
            const { status, ok } = response;
            console.log(response)
            if (ok) {
                const data = await response.json();
                console.log('ログイン成功:', data);
                window.location.href = '../dashboard';
            } else {
                console.log("response", status)
                if (status === 401) {
                    setisError("メールアドレスかパスワードが違います")
                    console.error('ログイン失敗');
                    return
                }
                setisError("想定外のエラー")
            }
        } catch (error) {
            console.error('エラー:', error);
        }
    };

    return (
        <div>
            <h1>ログイン</h1>
            <form action={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                    required
                    />
                </div>
                <SubmitButton />
            </form>
            <p style={{ color: "red" }}>{isError}</p>
        </div>
    );
};
export default Login;