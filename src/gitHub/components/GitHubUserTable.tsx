import * as React from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { GitHubUser } from '../interfaces';
import { Avatar, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const columns: GridColDef[] = [
  { field: 'login', headerName: 'Username', width: 150 },
  {
    field: 'avatar_url',
    headerName: 'Avatar',
    renderCell: (params: GridCellParams<string>) =>
      params.value ? <Avatar src={params.value} /> : '-',
    sortable: false,
    width: 100
  },
  {
    field: 'html_url',
    headerName: 'Repository',
    renderCell: (params: GridCellParams<string>) =>
      params.value ? (
        <IconButton size="medium" onClick={() => window.open(params.value, '_blank')}>
          <GitHubIcon fontSize="large" />
        </IconButton>
      ) : (
        '-'
      )
  },
  { field: 'type', headerName: 'Type', sortable: false, width: 75 },
  { field: 'score', headerName: 'Score', width: 75 }
];

export function GitHubUserTable({ rows = [] }: GitHubUserTableProps) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
}

export type GitHubUserTableProps = {
  rows: GitHubUser[];
};
