import { SearchOutlined } from '@mui/icons-material';
import { Autocomplete, AutocompleteInputChangeReason, IconButton, TextField } from '@mui/material';
import { AutocompleteUser } from '../interfaces';

export function GitHubUserSearchForm({
  handleInputChange,
  handleSearch,
  options,
  isLoading,
  value
}: GitHubUserSearchFormProps) {
  return (
    <Autocomplete
      options={options}
      onInputChange={handleInputChange}
      value={value}
      freeSolo
      sx={{ width: 200 }}
      disableClearable
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.username)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="User Search"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.code === 'Enter') handleSearch();
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <IconButton disabled={isLoading} onClick={handleSearch}>
                <SearchOutlined />
              </IconButton>
            )
          }}
        />
      )}
    />
  );
}

export interface GitHubUserSearchFormProps {
  handleInputChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  options: AutocompleteUser[];
  handleSearch: () => void;
  isLoading: boolean;
  value: string;
}
