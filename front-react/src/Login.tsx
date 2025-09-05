import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('pass123');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: Event) => {
        console.log("hello")
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                redirect: 'manual', // リダイレクトを手動処理
                body: JSON.stringify({ email, password })
            });
            
            if (response.status === 302) {
                console.log('ログイン成功、リダイレクト中...');
                window.location.href = '/dashboard';
            } else if (response.ok) {
                const data = await response.json();
                console.log('ログイン成功:', data);
                window.location.href = '/dashboard';
            } else {
                console.error('ログイン失敗');
            }
        } catch (error) {
            console.error('エラー:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleEmailChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setEmail(target.value);
    };

    const handlePasswordChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setPassword(target.value);
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
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'ログイン中...' : 'ログイン'}
                </button>
            </form>
        </div>
    );
};
export default Login;