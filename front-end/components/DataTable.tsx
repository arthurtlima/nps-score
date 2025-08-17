'use client';
import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Typography,
  TableContainer,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Stack,
} from '@mui/material';

type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
};

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  error?: boolean;
  emptyMessage?: string;
  getRowId?: (row: T) => string;
}

export default function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  loading,
  error,
  emptyMessage = 'Sem dados',
  getRowId,
}: DataTableProps<T>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (loading)
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <CircularProgress size={20} /> <Typography>Carregando...</Typography>
      </Box>
    );
  if (error) return <Typography color="error">Erro ao carregar dados.</Typography>;
  if (!rows?.length) return <Typography>{emptyMessage}</Typography>;

  if (isMobile) {
    return (
      <Stack spacing={2}>
        {rows.map((row, idx) => (
          <Card key={getRowId ? getRowId(row) : idx} variant="outlined">
            <CardContent>
              <Stack spacing={1}>
                {columns.map(column => (
                  <Box key={String(column.key)} display="flex" justifyContent="space-between">
                    <Typography variant="body2" fontWeight="bold">
                      {column.header}:
                    </Typography>
                    <Box>
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] ?? '')}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map(c => (
              <TableCell key={String(c.key)} sx={{ width: c.width, minWidth: c.width }}>
                {c.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, idx) => (
            <TableRow key={getRowId ? getRowId(r) : idx}>
              {columns.map(c => (
                <TableCell key={String(c.key)} sx={{ width: c.width, minWidth: c.width }}>
                  {c.render ? c.render(r[c.key], r) : String(r[c.key] ?? '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
