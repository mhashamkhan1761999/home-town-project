import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const athlete = localStorage.getItem('athleteUser');

        if (athlete) {
            // ✅ Session exists — go to countdown
            navigate('/athlete/dashboard');
        } else {
            // ❌ No session — go to signup
            navigate('/athlete-signup');
        }
    }, [navigate]);

    return null; // Don't render anything
};

export default Login;
