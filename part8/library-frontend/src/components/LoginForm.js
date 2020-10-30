import React, {useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import {useMutation} from "@apollo/client";
import {useHistory} from "react-router-dom";
import {useField} from "../hooks/index";
import {LOGIN} from "../queries";

const LoginForm = ({setError, setToken}) => {
  const history = useHistory();
  const [userName, resetUserName] = useField("text");
  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      console.log(error);
      setError(error.graphQLErrors[0].message);
    }
  });
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      history.push("/");
    }
  }, [result.data]); // eslint-disable-line
  const submit = async event => {
    event.preventDefault();
    login({variables: {username: userName.value, password: "secred"}});
    resetUserName();
  };
  return (
    <Form onSubmit={submit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type={userName.type} onChange={userName.onChange} />
        <Button type="submit">Login</Button>
      </Form.Group>
    </Form>
  );
};
export default LoginForm;
