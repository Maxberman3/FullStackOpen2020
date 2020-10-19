import React from "react";
import {ALL_BOOKS} from "../queries";
import {useQuery} from "@apollo/client";
import {Table} from "react-bootstrap";

const Books = () => {
  const result = useQuery(ALL_BOOKS);
  if (result.loading) {
    return <h3>loading...</h3>;
  }
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year Published</th>
          </tr>
        </thead>
        <tbody>
          {result.data.allBooks.map(book => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.published}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
export default Books;
