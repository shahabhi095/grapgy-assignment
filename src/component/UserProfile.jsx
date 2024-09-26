import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from './Breadcrumb';
import '../style/style.css'
import { Loader } from './Loader';

function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setUser(response.data);
      } catch (err) {
        console.log(err)
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  if (loading) return <><Loader/></>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container my-5">
  <Breadcrumb username={username} />
  {user && (
    <div className="card shadow-lg bg-dark text-light p-4">
      <div className="row g-0">
        <div className="col-md-4 text-center">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="img-fluid rounded-circle mb-3"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">{user.login}</h3>
            <p className="card-text">
              <strong>Username:</strong> {user.login}
            </p>
            <p className="card-text">
              <strong>Bio:</strong> {user.bio || 'N/A'}
            </p>
            <p className="card-text">
              <strong>Followers:</strong> {user.followers}
            </p>
            <p className="card-text">
              <strong>Repositories:</strong> {user.public_repos}
            </p>
            <Link
              className="btn btn-outline-light mt-3"
              to={`/user/${username}/repos`}
            >
              View Repositories
            </Link>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

  
  );
}

export default UserProfile;
