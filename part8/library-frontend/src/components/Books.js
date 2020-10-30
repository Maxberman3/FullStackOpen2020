import React, {useState} from "react";
import {ALL_BOOKS} from "../queries";
import {useQuery} from "@apollo/client";
import {Table} from "react-bootstrap";
import FilterSelect from "./FilterSelect";

const Books = ({token}) => {
  const [filter, setFilter] = useState(null);
  const result = useQuery(ALL_BOOKS);
  if (result.loading) {
    return <h3>loading...</h3>;
  }
  const genres = Array.from(
    new Set(result.data.allBooks.map(book => book.genres).flat())
  );
  const filterBooks = () => {
    if (!filter) {
      return result.data.allBooks;
    } else {
      return result.data.allBooks.filter(book => book.genres.includes(filter));
    }
  };
  const filteredBooks = filterBooks();
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
          {filteredBooks.map(book => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <FilterSelect genres={genres} setFilter={setFilter} token={token} />
    </div>
  );
};
export default Books;
