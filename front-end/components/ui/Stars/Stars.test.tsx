import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/__tests__/utils/test-utils'; // Usa nosso render customizado
import Stars from './Stars';

describe('Stars Component', () => {
  it('renders correctly with theme and providers', () => {
    render(<Stars value={3} onChange={() => {}} />);

    const stars = screen.getAllByRole('button');
    expect(stars).toHaveLength(5);
  });

  it('handles click events', () => {
    const mockOnChange = jest.fn();
    render(<Stars value={3} onChange={mockOnChange} />);

    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(mockOnChange).toHaveBeenCalledWith(1);
  });
});
