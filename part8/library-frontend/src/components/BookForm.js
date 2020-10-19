import React, {useState} from "react";
import {useField} from "../hooks/index";
import {CREATE_BOOK, ALL_BOOKS} from "../queries";
import {Form, Button} from "react-bootstrap";
import {useMutation} from "@apollo/client";
import {useHistory} from "react-router-dom";

const BookForm = ({setError}) => {
  const [title, resetTitle] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [published, resetPublished] = useField("number");
  const [genre, resetGenre] = useField("text");
  const [genres, setGenres] = useState([]);
  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{query: ALL_BOOKS}],
    onError: error => {
      console.log(error.message);
      setError(error.graphQLErrors[0].message);
    }
  });
  const history = useHistory();
  const resetForm = () => {
    resetTitle();
    resetAuthor();
    resetPublished();
    resetGenre();
    setGenres([]);
  };
  const addGenre = () => {
    setGenres(genres.concat(genre.value));
    resetGenre();
  };
  const onSubmit = async e => {
    e.preventDefault();
    await addBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres: genres
      }
    });
    resetForm();
    history.push("/Books");
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control type={title.type} onChange={title.onChange} />
        <Form.Label>Author:</Form.Label>
        <Form.Control type={author.type} onChange={author.onChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Published:</Form.Label>
        <Form.Control type={published.type} onChange={published.onChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Add Genre:</Form.Label>
        <Form.Control type={genre.type} onChange={genre.onChange} />
        <Button variant="secondary" onClick={addGenre}>
          {" "}
          Add Genre{" "}
        </Button>
        <Form.Label>Genres:</Form.Label>
        <Form.Control plaintext readOnly defaultValue={genres.toString()} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
export default BookForm;
