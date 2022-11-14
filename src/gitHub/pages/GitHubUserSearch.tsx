import { Alert, Box, Snackbar, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { httpClient } from '../../clients/http';
import { GitHubUserSearchForm } from '../components/GitHubUserSearchForm';
import { GitHubUserTable } from '../components/GitHubUserTable';
import { useAutocompleteUsers } from '../hooks/useAutocompleteUsers';
import { GetGitHubUsersResponse, GitHubUser } from '../interfaces';

export function GitHubUserSearch() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [error, setError] = useState('');
  const { autocompleteOptions, refreshAutocompleteOptions, clearAutocompleteOptions } =
    useAutocompleteUsers();

  const fetchQueryResults = useCallback(() => {
    setIsLoading(true);
    httpClient
      .get<GetGitHubUsersResponse>('/github/search/users', {
        params: searchParams
      })
      .then((response) => setUsers(response.data.items))
      .catch(({ message }) => {
        setError(message);
        setIsSnackbarOpen(true);
      })
      .finally(() => {
        clearAutocompleteOptions();
        setIsLoading(false);
      });
  }, [searchParams]);

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

      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <GitHubUserSearchForm
          handleInputChange={(_, value) => {
            setSearchParams(value ? { q: value } : {});
            refreshAutocompleteOptions(value);
          }}
          handleSearch={fetchQueryResults}
          options={autocompleteOptions}
          isLoading={isLoading}
          value={searchParams.get('q') || ''}
        />
      </Box>

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
