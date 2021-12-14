import { useState } from 'react'
import SearchBar from "material-ui-search-bar";


function Search ({ onChange }) {
    const [query, setQuery] = useState("")

    const handleChange = (newValue) => {
      setQuery(newValue)
      onChange(newValue)
    }

    return (
        <SearchBar
          value={query}
          onChange={handleChange}
          onCancelSearch={() => handleChange('')}
        />
      );
}

export default Search
