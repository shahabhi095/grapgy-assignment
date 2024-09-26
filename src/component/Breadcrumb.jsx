
import { Link } from 'react-router-dom';
import "../style/style.css"
// eslint-disable-next-line react/prop-types
const Breadcrumb = ({ username, repoName }) => {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        <li>
          <Link className='linkstyle' to="/">Home Page</Link>
        </li>
        {username && (
          <>
            <li style={{ margin: '0 5px' }}>/</li>
            <li>
              <Link className='linkstyle' to={`/user/${username}`}>{username}</Link> {/* Link to Profile */}
            </li>
          </>
        )}
        {repoName && (
          <>
            <li style={{ margin: '0 5px' }}>/</li>
            <li>
              <Link className='linkstyle' to={`/user/${username}/repos`}>{repoName}</Link> {/* Link to Repository */}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
