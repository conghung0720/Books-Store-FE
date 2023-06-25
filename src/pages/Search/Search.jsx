import { useState } from "react";
import Autocomplete from "react-autocomplete";
import DisplayListBooks from "../../components/DisplayListBooks/DisplayListBooks";
import { useGetAllBooksQuery } from "../../api/api";
import { Link } from "react-router-dom";

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
      <div>
        <Autocomplete
          getItemValue={(item) => item.title}
          items={getFilteredBooks()}
          renderItem={(item, isHighlighted) => (
            <div
              key={item._id}
              className={`p-2 ${isHighlighted ? "bg-blue-200" : ""}`}
            >
              {item.title}
            </div>
          )}
          value={searchTerm}
          onChange={handleSearch}
          renderInput={(props) => (
            <div className="flex items-center justify-center">
              <Autocomplete
                getItemValue={(item) => item.title}
                items={getFilteredBooks()}
                renderItem={(item, isHighlighted) => (
                  <Link to={`/details/${item._id}`}>
                    <div
                      key={item._id}
                      className={`p-2 ${isHighlighted ? "bg-blue-200" : ""}`}
                    >
                      {item.title}
                    </div>
                  </Link>
                )}
                value={searchTerm}
                onChange={handleSearch}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-[300px] h-[50px] px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                )}
              />
            </div>
          )}
        />

        {isSuccess && <DisplayListBooks displayNumRowBooks={3} data={isData} />}
      </div>
    </>
  );
};

export default Search;
