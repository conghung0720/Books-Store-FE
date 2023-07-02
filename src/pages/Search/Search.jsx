import { useState } from "react";
import Autocomplete from "react-autocomplete";
import DisplayListBooks from "../../components/DisplayListBooks/DisplayListBooks";
import { useGetAllBooksQuery } from "../../api/api";
import { Link } from "react-router-dom";
import Category from "../../components/Category/Category";
import Headers from "../../components/Header/Headers";

const Search = () => {
  const { data: isData, isSuccess } = useGetAllBooksQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredBooks = () => {
    if (!isData) {
      return [];
    }

    const filteredBooks = isData
      .filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => b.buyQuantity - a.buyQuantity);

    return filteredBooks.slice(0, 4);
  };

  return (
    <>
      <Headers />
      <main className="px-[3%]">
        {isSuccess && <Category data={isData} />}
        {isSuccess && <DisplayListBooks displayNumRowBooks={3} data={isData} />}
      </main>
    </>
  );
};

export default Search;
