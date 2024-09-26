/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import "../style/card.css"
const UserSearchResults = ({ users=[] }) => {
  return (
    <div className="row mt-4">
    {users?.map((user) => (
      <div className="col-md-4 col-lg-3 mb-4" key={user.id}>
        <div className="card shadow-sm h-100 text-center">
          <div className="card-img-wrapper p-3">
            <img
              className="card-img-top rounded-circle img-fluid avatar-img"
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{user.login}</h5>
            <p className="card-text">ID: {user.id}</p>
            <Link to={`/user/${user.login}`} className="btn btn-primary">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  );
};

export default UserSearchResults;
