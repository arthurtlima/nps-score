import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';

describe('DataTable', () => {
  const mockColumns = [
    { key: 'name' as const, header: 'Name' },
    { key: 'email' as const, header: 'Email' },
  ];

  const mockRows = [
    { name: 'John', email: 'john@test.com' },
    { name: 'Jane', email: 'jane@test.com' },
  ];

  it('renders table with data', () => {
    render(<DataTable columns={mockColumns} rows={mockRows} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('jane@test.com')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable columns={mockColumns} rows={[]} loading />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('shows empty message when no data', () => {
    render(<DataTable columns={mockColumns} rows={[]} emptyMessage="No data" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
