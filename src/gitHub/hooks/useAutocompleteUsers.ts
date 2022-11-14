import { useCallback, useState } from 'react';
import { httpClient } from '../../clients/http';
import { AutocompleteUser } from '../interfaces';

export function useAutocompleteUsers() {
  const [queryCache, setQueryCache] = useState(new Map<string, AutocompleteUser[]>());
  const [autocompleteOptions, setAutocompleteOptions] = useState<AutocompleteUser[]>([]);

  const fetchAutocomplete = useCallback((q: string) => {
    httpClient
      .get<AutocompleteUser[]>('/autocomplete/users', {
        params: { q }
      })
      .then(({ data }) => {
        setQueryCache((cache) => cache.set(q, data));
        return data;
      })
      .then((users) => setAutocompleteOptions(users));
  }, []);

  const clearAutocompleteOptions = useCallback(() => setAutocompleteOptions([]), []);

  const refreshAutocompleteOptions = useCallback((q: string) => {
    if (!q) {
      setAutocompleteOptions([]);
      return;
    }

    if (!queryCache.has(q)) {
      fetchAutocomplete(q);
    }

    if (queryCache.has(q)) {
      setAutocompleteOptions(queryCache.get(q) as AutocompleteUser[]);
    }
  }, []);

  return {
    fetchAutocomplete,
    autocompleteOptions,
    queryCache,
    refreshAutocompleteOptions,
    clearAutocompleteOptions
  };
}
