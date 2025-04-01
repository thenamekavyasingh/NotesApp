import React, { useState } from 'react';
import { Button, Form, Card, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:4000/user/register', {
                name: name,
                email: email,
                password: password
            });
            console.log(response.data);
            setSuccess(true);
            alert(response.data.message);
            navigate('/user/login'); // Redirect to login page
        } catch (error) {
            console.error('There was an error!', error.message);
            setError(error.message);
            alert(error.message); // Show the error message in an alert
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Register Page</h1>
            <Container className="d-flex justify-content-center align-items-center vh-100" fluid>
                <Row className="justify-content-center">
                    <Card className="p-3" style={{ width: '380px', backgroundColor: '#007bff' }}>
                        <Form className="d-flex flex-column align-items-center" onSubmit={handleRegisterSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    onChange={(e) => setName(e.target.value)}
                                    name="name"
                                    type="text"
                                    placeholder="Enter name"
                                    style={{ width: '350px' }}
                                    required
                                />
                            </Form.Group>

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

                            <Button variant="dark" type="submit" disabled={loading}>
                                {loading ? 'Loading...' : 'Submit'}
                            </Button>

                            {error && <p className="text-danger mt-3">Error: {error}</p>}
                            {success && <p className="text-dark mt-3">Successfully registered!</p>}
                        </Form>
                    </Card>
                </Row>
            </Container>
        </>
    );
}

export default RegisterForm;
