import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useCallback, ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GitHubUserTable from '../components/GitHubUserTable';
import { GetGitHubUsersResponse, GitHubUser } from '../interfaces';

export function GitHubUserSearch() {
  const [searchParams, setSearchParams] = useSearchParams({ q: '' });
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [error, setError] = useState('');

  const fetchQueryResults = useCallback(() => {
    setIsLoading(true);
    axios
      .get<GetGitHubUsersResponse>('http://localhost:3000/github/search/users', {
        params: searchParams
      })
      .then((response) => setUsers(response.data.items))
      .catch(({ message }) => {
        setError(message);
        setIsSnackbarOpen(true);
      })
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  const handleQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: e.target.value });
  }, []);

  const closeSnackbar = useCallback(() => {
    setIsSnackbarOpen(false);
  }, []);

  return (
    <Box
      sx={{ maxWidth: '600px' }}
      m="auto"
      my={3}
      px={3}
      display="flex"
      flexDirection="column"
      rowGap={3}>
      <Typography variant="h5">GitHub User Search</Typography>
      <TextField label="Username" value={searchParams.get('q')} onChange={handleQueryChange} />

      <Button
        variant="contained"
        disabled={isLoading || !searchParams.get('q')}
        onClick={fetchQueryResults}>
        Search
      </Button>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      <GitHubUserTable rows={users} />
    </Box>
  );
}
