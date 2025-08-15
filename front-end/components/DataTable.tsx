'use client';
import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Box, Typography } from '@mui/material';

type Column<T> = { key: keyof T; header: string; render?: (value: any, row: T) => React.ReactNode };

export default function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  loading,
  error,
  emptyMessage = 'Sem dados',
  getRowId
}: {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  error?: boolean;
  emptyMessage?: string;
  getRowId?: (row: T) => string;
}) {
  if (loading) return (
    <Box display="flex" alignItems="center" gap={1}><CircularProgress size={20} /> <Typography>Carregando...</Typography></Box>
  );
  if (error) return <Typography color="error">Erro ao carregar dados.</Typography>;
  if (!rows?.length) return <Typography>{emptyMessage}</Typography>;

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {columns.map((c) => (
            <TableCell key={String(c.key)}>{c.header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((r, idx) => (
          <TableRow key={getRowId ? getRowId(r) : idx}>
            {columns.map((c) => (
              <TableCell key={String(c.key)}>
                {c.render ? c.render(r[c.key], r) : String(r[c.key] ?? '')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}