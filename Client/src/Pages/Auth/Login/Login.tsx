import * as React from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import {
  FieldName,
  TChangeHandler,
  ILoginUser,
  THandleSubmit,
} from '../../../types';
import { isFormValid, notEmpty } from '../../../utils';

const userData: ILoginUser = {
  username: { value: '', isValid: true },
  password: { value: '', isValid: true },
};

const Login: React.FC<any> = () => {
  const [user, setUser] = React.useState(userData);
  const [errorMessage, setErrorMessage] = React.useState({
    username: '',
    password: '',
  });
  const history = useHistory();
  const logIn = async (user: ILoginUser) => {
    const userData = {
      username: user.username.value,
      password: user.password.value,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      userData
    );

    if (data.userId) history.push('/');

    console.log('{User Login}', data);

    return data;
  };
  const [mutate] = useMutation(logIn);

  const handleSubmit: THandleSubmit = async (event) => {
    event.preventDefault();

    if (isFormValid(user)) {
      try {
        await mutate(user);
      } catch (error) {}
    }
  };

  const validateField: TChangeHandler<ILoginUser> = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case FieldName.USERNAME:
        if (notEmpty(value) && value.length > 7) {
          setErrorMessage((current) => ({ ...current, [name]: '' }));
          return setUser((current) => ({
            ...current,
            [name]: { ...current[name], value, isValid: true },
          }));
        }

        setErrorMessage((current) => ({
          ...current,
          [name]: 'Must have at least 8 characters!',
        }));
        return setUser((current) => ({
          ...current,
          [name]: { ...current[name], value: '', isValid: false },
        }));

      case FieldName.PASSWORD:
        if (notEmpty(value) && value.length > 7) {
          setErrorMessage((current) => ({ ...current, [name]: '' }));
          return setUser((current) => ({
            ...current,
            [name]: { ...current[name], value, isValid: true },
          }));
        }

        setErrorMessage((current) => ({
          ...current,
          [name]: 'Must have at least 8 characters!',
        }));
        return setUser((current) => ({
          ...current,
          [name]: { ...current[name], value: '', isValid: false },
        }));

      default:
        return user;
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center align-items-center custom-height">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                <h3>Login</h3>
              </Card.Title>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group controlId="formBasicUsername">
                        <Form.Label className="required">Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="JDoe"
                          name={FieldName.USERNAME}
                          onChange={validateField}
                          isInvalid={!!errorMessage[FieldName.USERNAME]}
                          autoFocus
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errorMessage[FieldName.USERNAME]}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label className="required">Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name={FieldName.PASSWORD}
                          onChange={validateField}
                          isInvalid={!!errorMessage[FieldName.PASSWORD]}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errorMessage[FieldName.PASSWORD]}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-center mt-3">
                    <Button
                      variant="info"
                      type="submit"
                      className="font-weight-bold">
                      Log in
                    </Button>
                  </Row>
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
