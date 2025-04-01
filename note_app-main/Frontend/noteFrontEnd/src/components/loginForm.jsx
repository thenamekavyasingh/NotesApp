import React, { useState } from 'react';
import { Button, Form, Card, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoaderAnimation from './LoaderAnimation';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            console.log("ahgd   ")
            const response = await axios.post('http://localhost:4000/user/login', { email, password });
            const token = response.data.token;
            const user = response.data.user;
            // Store the token in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('User', user);
            // console.log(response.data.status);
            console.log(email, password)
            if (response.data.status === 0) {
                setError('Invalid email or password. Please try again.');
                setEmail(email);
                setPassword(password);
                // handleSubmit();
                // navigate('/user/login')
            } else {
                // Set the token in the Authorization header
                axios.defaults.headers.common['Authorization'] = `${token}`;
                axios.defaults.headers.common['User'] = `${user}`;
                navigate('/note');
            }
        } catch (error) {
            console.error('There was an error while logging!', error.message);
            setError('An error occurred while logging in. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <h1 style={{ textAlign: "center" }}>Login Page</h1>
            <Container className="d-flex justify-content-center align-items-center vh-100" fluid >
                <Row className="justify-content-center">
                    <Card className="p-3" style={{ width: '380px', backgroundColor: '#28a745' }}>
                        <Form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    style={{ width: '350px' }}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    style={{ width: '350px' }}
                                    required
                                />
                            </Form.Group>

                            <Button variant="dark" onSubmit={handleSubmit} type="submit" disabled={loading}>
                                {loading ? <LoaderAnimation /> : 'Submit'}
                            </Button>

                            {error && <p className="text-dark  mt-3">{error}</p>}
                        </Form>
                    </Card>
                </Row>
            </Container>
        </>
    );
}

export default LoginForm;
