import * as React from 'react';
import { Container, Row, Card, Form, Button } from 'react-bootstrap';

import { Topbar } from '../../../components/SocialMediaApp/components';

const Login: React.FC<any> = () => {
  return (
    <>
      <Topbar />
      <Container>
        <Row className="justify-content-center align-items-center custom-height">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                <h3>Login</h3>
              </Card.Title>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Button variant="info" type="submit">
                    Log in
                  </Button>
                </Form>
              </Card.Body>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default Login;
