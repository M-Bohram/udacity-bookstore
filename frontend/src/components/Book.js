import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

import star from "../assets/gold-star.svg";

function Book({ book }) {
  const getAuthorsString = (authors) => {
    let authorsStr = "";
    const authorsArr = authors.split('/')
    authorsArr.forEach(
      (author, index) =>
        (authorsStr +=
          index === authorsArr.length - 1 ? author : `${author} - `)
    );
    return authorsStr;
  };

  return (
    <Box
      sx={{
        border: "1px solid grey",
        display: "flex",
        flexDirection: "column",
        marginBottom: "0.5em",
        marginTop: "0.5em",
        justifyContent: "flex-start",
        padding: "1em",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          paddingTop: "0.5em",
        }}
      >
        <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
          {book.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: '.15em',
            marginLeft: "1.5em",
          }}
        >
          <img src={star} style={{ width: "1em", height: "1em" }} alt="star logo" />
          <Typography sx={{ fontSize: "0.8rem", paddingLeft: '.2em' }}>
            {book.average_rating}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          paddingTop: "0.5em",
        }}
      >
        <Typography sx={{ fontSize: "0.8rem" }}>
          Authors:{" "}
          <span style={{ fontWeight: "bold" }}>
            {getAuthorsString(book.authors)}
          </span>
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", marginLeft: "1.5em" }}>
          Published Date: {book.publication_date}
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", marginLeft: "1.5em" }}>
          {book.num_pages} Pages
        </Typography>
      </Box>
    </Box>
  );
}

export default Book;
