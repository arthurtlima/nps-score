import { render, screen, fireEvent } from '@testing-library/react';
import Notification from './Notification';

describe('Notification', () => {
  const defaultProps = {
    open: true,
    message: 'Test message',
    type: 'success' as const,
    onClose: jest.fn(),
  };

  it('renders notification when open', () => {
    render(<Notification {...defaultProps} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<Notification {...defaultProps} open={false} />);
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<Notification {...defaultProps} onClose={onClose} />);
    
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
