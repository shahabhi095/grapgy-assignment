import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import UserSearchResults from "./userDetailCard";
import SearchBox from "./SearchBox";
// import Breadcrumb from "./Breadcrumb";
import { Loader } from "./Loader";
import "../style/usersearch.css"
import ErrorComponent from "./Error";

function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const usersPerPage = 20;
  const searchUsers = async (debouncedSearchTerm, currentPage) => {
    if (!debouncedSearchTerm.trim()) {
      setUsers([]);
      setTotalCount(0);
      return;
    }

    setLoading(true);
    setError("");
    setUsers([]);

    try {
      const response = await axios.get(`https://api.github.com/search/users`, {
        params: {
          q: debouncedSearchTerm,
          per_page: usersPerPage,
          page: currentPage,
        },
      });
      setUsers(response.data.items);
      if(response.data.items.length === 0){
        setError('The username you searched for does not exist.');
      }
      setTotalCount(response.data.total_count);
    } catch (err) {
      console.log(err);
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    searchUsers(debouncedSearchTerm, currentPage);
  }, [debouncedSearchTerm, currentPage]);

  const totalPages = Math.ceil(totalCount / usersPerPage);
//   console.log(totalCount, totalPages);
  return (
    <div >
    
      <div className="search-container">
      {/* <Breadcrumb /> */}
        <SearchBox username={searchTerm} setUsername={setSearchTerm} />
      </div>
      {searchTerm === '' &&  <div className="initialpage">
      <h2>Welcome to GitHub User Search</h2>
      <p>Type a GitHub username in the search box above to get started.</p>
    </div>}
      {loading && <Loader/>}
      {error && <ErrorComponent message={error} />}
      <UserSearchResults users={users} />
     {users?.length>0&& <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />}
    </div>
  );
}

export default UserSearch;
