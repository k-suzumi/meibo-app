import { useState, useEffect } from 'react';

interface ProfileData {
    user: {
        role: string;
    };
}

const Dashboard = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/profile', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                } else {
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('エラー:', error);
                window.location.href = '/login';
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div>読み込み中...</div>;

    return (
        <div>
            <h1>ダッシュボード</h1>
            <p>ようこそ！これは保護されたページです。</p>
            {profile?.user?.role === 'admin' && (
                <p><strong>あなたは管理者です。</strong></p>
            )}
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
    );
};

export default Dashboard;