
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RepositoryList from './component/RepositoriesList';
import UserSearch from './component/UserSearch';
import UserProfile  from './component/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<UserSearch />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/user/:username/repos" element={<RepositoryList />} />
      </Routes>
    </Router>
  );
}

export default App;
