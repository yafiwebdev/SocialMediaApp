import * as React from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import {
  FieldName,
  IUser,
  IErrorMessage,
  TChangeHandler,
  THandleSubmit,
} from '../../../types';
import { notEmpty, isValidEmail, isFormValid } from '../../../utils';

const Signup: React.FC<any> = () => {
  const user: IUser = {
    firstname: { value: '' },
    lastname: { value: '' },
    username: { value: '', isRequired: true, isValid: false },
    email: { value: '', isRequired: true, isValid: false },
    password: { value: '', isRequired: true, isValid: false },
    confirm_password: { value: '', isRequired: true, isValid: false },
  };
  const history = useHistory();

  const makeUser = async (user: object) => {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      user
    );

    if (data.userId) history.push('/');
    console.log('{User created!}', data);
    return data;
  };

  const [newUser, setNewUser] = React.useState<IUser>(user);
  const [errorMessage, setErrorMessage] = React.useState<IErrorMessage>({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  // const [invalidForm, setInvalidForm] = React.useState(true);
  const [mutate] = useMutation(makeUser);

  const validateField: TChangeHandler<IUser> = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case FieldName.USERNAME:
        if (notEmpty(value) && value.length > 7) {
          setErrorMessage((current) => ({ ...current, [name]: '' }));
          return setNewUser((current) => ({
            ...current,
            [name]: { ...current[name], value, isValid: true },
          }));
        }

        setErrorMessage((current) => ({
          ...current,
          [name]: 'Must have at least 8 characters!',
        }));
        return setNewUser((current) => ({
          ...current,
          [name]: { ...current[name], value: '', isValid: false },
        }));

      case FieldName.EMAIL:
        if (notEmpty(value) && isValidEmail(value)) {
          setErrorMessage((current) => ({ ...current, [name]: '' }));
          return setNewUser((current) => ({
            ...current,
            [name]: { ...current[name], value, isValid: true },
          }));
        }

        setErrorMessage((current) => ({
          ...current,
          [name]: 'Must be a valid email!',
        }));
        return setNewUser((current) => ({
          ...current,
          [name]: { ...current[name], value: '', isValid: false },
        }));

      case FieldName.PASSWORD:
        if (notEmpty(value) && value.length > 7) {
          setErrorMessage((current) => ({ ...current, [name]: '' }));
          return setNewUser((current) => ({
            ...current,
            [name]: { ...current[name], value, isValid: true },
          }));
        }

        setErrorMessage((current) => ({
          ...current,
          [name]: 'Must have at least 8 characters!',
        }));
        return setNewUser((current) => ({
          ...current,
          [name]: { ...current[name], value: '', isValid: false },
        }));

      case FieldName.CONFIRM_PASSWORD:
        if (notEmpty(value) && value === newUser.password.value) {
          setErrorMessage((current) => ({ ...current, [name]: '' }));
          return setNewUser((current) => ({
            ...current,
            [name]: { ...current[name], value, isValid: true },
          }));
        }

        setErrorMessage((current) => ({
          ...current,
          [name]: 'Passwords must be equals!',
        }));
        return setNewUser((current) => ({
          ...current,
          [name]: { ...current[name], value: '', isValid: false },
        }));

      default:
        return newUser;
    }
  };

  const handleChange: TChangeHandler<IUser> = (event) => {
    const { name, value, required } = event.target;

    if (required) {
      return validateField(event);
    }

    return setNewUser((current) => ({
      ...current,
      [name]: { value },
    }));
  };

  const handleSubmit: THandleSubmit = async (event) => {
    event.preventDefault();

    if (isFormValid(newUser)) {
      const user = {
        email: newUser.email.value,
        username: newUser.username.value,
        password: newUser.password.value,
        confirm_password: newUser.confirm_password.value,
        firstname: newUser?.firstname?.value,
        lastname: newUser?.lastname?.value,
      };

      try {
        await mutate(user);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center align-items-center custom-height">
          <Card>
            <Card.Body className="justify-content-center">
              <Card.Title className="text-center">
                <h3>Signup</h3>
              </Card.Title>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group controlId="formBasicFirstname">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="John"
                          autoFocus
                          name={FieldName.FIRSTNAME}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicLastname">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Doe"
                          name={FieldName.LASTNAME}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicUsername">
                        <Form.Label className="required">Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="JDoe"
                          name={FieldName.USERNAME}
                          onChange={handleChange}
                          isInvalid={!!errorMessage[FieldName.USERNAME]}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errorMessage[FieldName.USERNAME]}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label className="required">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="john_doe@mail.com"
                          name={FieldName.EMAIL}
                          onChange={handleChange}
                          isInvalid={!!errorMessage[FieldName.EMAIL]}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errorMessage[FieldName.EMAIL]}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label className="required">Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name={FieldName.PASSWORD}
                          onChange={handleChange}
                          isInvalid={!!errorMessage[FieldName.PASSWORD]}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errorMessage[FieldName.PASSWORD]}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label className="required">
                          ConfirmPassword
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="ConfirmPassword"
                          name={FieldName.CONFIRM_PASSWORD}
                          onChange={handleChange}
                          isInvalid={!!errorMessage[FieldName.CONFIRM_PASSWORD]}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errorMessage[FieldName.CONFIRM_PASSWORD]}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-center mt-3">
                    <Button
                      variant="info"
                      type="submit"
                      // disabled={invalidForm}
                      className="font-weight-bold">
                      Signup
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

export default Signup;
