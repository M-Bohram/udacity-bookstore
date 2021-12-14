import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";

import Logo from "./assets/logo.png";
import { queryBooks } from "./services/books";

function App() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const styles = {
    outerContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    logo: { width: "15em", height: "5em", padding: "2em" },
    innerContainer: { width: "60vw" },
    paginationContainer: {
      display: "flex",
      justifyContent: "end",
      margin: "2em 0",
    },
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleQueryChange = (query) => {
    setQuery(query);
    setPage(1);
  };

  useEffect(() => {
    setLoading(true);
    queryBooks(page, query).then(({ books, totalPages }) => {
      setBooks(books);
      setPageCount(totalPages);
      setLoading(false);
    });
  }, [page, query]);

  return (
    <Box sx={styles.outerContainer}>
      <img src={Logo} style={styles.logo} alt="logo" />
      <Box sx={styles.innerContainer}>
        <SearchBar onChange={handleQueryChange} />
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20em",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <BookList books={books} />
            <Box sx={styles.paginationContainer}>
              <Pagination
                count={pageCount}
                shape="rounded"
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;
