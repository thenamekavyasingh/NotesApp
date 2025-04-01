import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    function handleRegister() {
        navigate('/user/register');
    }

    return (
        <>
            <Button onClick={handleRegister} size="lg">Register</Button>
        </>
    );
};

export default Register;
