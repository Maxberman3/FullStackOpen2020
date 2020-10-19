import React from "react";
import {ALL_AUTHORS} from "../queries";
import {useQuery} from "@apollo/client";
import {Table} from "react-bootstrap";

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);
  if (result.loading) {
    return <h3>loading...</h3>;
  }
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th># of Books</th>
          </tr>
        </thead>
        <tbody>
          {result.data.allAuthors.map(author => {
            return (
              <tr>
                <td>{author.name}</td>
                <td>{author.born}</td>
                <td>{author.bookCount}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
export default Authors;
