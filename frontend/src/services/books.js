import axios from "axios";

const cancelTokenSource = axios.CancelToken.source();

const API_URL = process.env.REACT_APP_API_URL;

export const queryBooks = async (page, search) => {
  const {
    data: { books, totalPages },
  } = await axios.get(`${API_URL}/books?page=${page}&search=${search}`, {
    cancelToken: cancelTokenSource.token,
  });
  return {
    books,
    totalPages,
  };
};
