import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Stars from './Stars';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Stars', () => {
  it('should render 5 stars', () => {
    renderWithTheme(<Stars value={3} onChange={() => {}} />);
    const stars = screen.getAllByRole('button');
    expect(stars).toHaveLength(5);
  });

  it('should call onChange when star is clicked', () => {
    const mockOnChange = jest.fn();
    renderWithTheme(<Stars value={3} onChange={mockOnChange} />);

    const firstStar = screen.getAllByRole('button')[0];
    fireEvent.click(firstStar);

    expect(mockOnChange).toHaveBeenCalledWith(1);
  });

  it('should not be clickable when readOnly is true', () => {
    renderWithTheme(<Stars value={3} onChange={() => {}} readOnly />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });
});
