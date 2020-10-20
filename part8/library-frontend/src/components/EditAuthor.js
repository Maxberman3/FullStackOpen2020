import React, {useEffect} from "react";
import {useField} from "../hooks/index";
import {Form, Button} from "react-bootstrap";
import {useMutation} from "@apollo/client";
import {EDIT_BORN} from "../queries";

const EditAuthor = ({setError, authors}) => {
  const [name, resetName] = useField("text");
  const [born, resetBorn] = useField("number");

  const resetForm = () => {
    resetBorn();
    resetName();
  };

  const [changeBorn, result] = useMutation(EDIT_BORN);
  const submit = event => {
    event.preventDefault();

    changeBorn({variables: {name: name.value, born: Number(born.value)}});

    resetForm();
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("person not found");
    }
  }, [result.data]); //eslint-disable-line

  return (
    <div>
      <h3>Edit Author</h3>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control type={name.type} onChange={name.onChange} as="select">
            {authors.map(author => (
              <option key={author.id}>{author.name}</option>
            ))}
          </Form.Control>
          <Form.Label>Birth Year</Form.Label>
          <Form.Control type={born.type} onChange={born.onChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit{" "}
        </Button>
      </Form>
    </div>
  );
};

export default EditAuthor;
