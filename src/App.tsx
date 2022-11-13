import { Box } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GitHubUserSearch } from './gitHub/pages/GitHubUserSearch';

function App() {
  return (
    <Box sx={{ height: '100%' }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<GitHubUserSearch />}></Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
