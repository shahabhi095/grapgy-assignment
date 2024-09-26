import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Pagination from './Pagination';
import Breadcrumb from './Breadcrumb';
import '../style/style.css'
import { Loader } from './Loader';
function Repositories() {
  const { username } = useParams();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const reposPerPage = 20;

  useEffect(() => {
    const fetchRepos = async () => {
      if (!username) return;

      setLoading(true);
      setError('');
      setRepos([]);

      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
          params: {
            per_page: reposPerPage,
            page: currentPage,
          },
        });
        setRepos(response.data);
        setTotalCount(response.headers['x-total-count'] || response.data.length);
      } catch (err) {
        console.log(err)
        setError('Error fetching repositories');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, currentPage]);

  const totalPages = Math.ceil(totalCount / reposPerPage);
  if (loading) return <><Loader/></>;
  return (
    <div className="container my-5">
    <Breadcrumb username={username} repoName={"Repositories"} />
  
    <h2 className="mb-4">{`${username}'s Repositories`}</h2>
    {error && <p className="text-danger text-center">{error}</p>}
  
    <div className="row">
      {repos.map((repo) => (
        <div className="col-md-6 col-lg-4 mb-4" key={repo.id}>
          <div className="card bg-dark text-light h-100 shadow-lg">
            <div className="card-body">
              <h5 className="card-title">{repo.name}</h5>
              <p className="card-text">
                <strong>Description:</strong> {repo.description || 'No description available'}
              </p>
              <a
                className="btn btn-outline-light"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Repository
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  
    <div className="d-flex justify-content-center mt-4">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  </div>
  
  
  );
}

export default Repositories;
