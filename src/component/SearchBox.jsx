/* eslint-disable react/prop-types */
import '../style/style.css';

const SearchBox = ({ username, setUsername }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search for a GitHub user"
        className="search-input"
      />
    </div>
  );
};

export default SearchBox;
