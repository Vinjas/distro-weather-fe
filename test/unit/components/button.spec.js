import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from '../../../src/components/button/button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Test Button</Button>);
  
    const button = screen.getByText('Test Button');

    console.log('button :>> ', button);

    expect(button).toBeInTheDocument();
  });

  it('handles onClick correctly', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Test Button</Button>);
    fireEvent.click(getByText('Test Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies primary class when primary prop is true', () => {
    const { getByText } = render(<Button primary>Test Button</Button>);
    expect(getByText('Test Button')).toHaveClass('button__primary');
  });

  it('applies secondary class when secondary prop is true', () => {
    const { getByText } = render(<Button secondary>Test Button</Button>);
    expect(getByText('Test Button')).toHaveClass('button__secondary');
  });

  it('applies disabled class and attribute when disabled prop is true', () => {
    const { getByText } = render(<Button disabled>Test Button</Button>);
    const button = getByText('Test Button');
    expect(button).toHaveClass('button__disabled');
    expect(button).toBeDisabled();
  });
});