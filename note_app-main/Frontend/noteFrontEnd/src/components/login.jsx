import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const login = () => {
    const navigate = useNavigate();

    function handleLogin() {
        navigate('/user/login');
    }

    return (
        <>
            <Button onClick={handleLogin} size="lg">login</Button>
        </>
    );
};

export default login;
