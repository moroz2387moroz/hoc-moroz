import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders sliders and supports slide and autoplay controls', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument();
  expect(screen.getByText(/Active slide 10/)).toBeInTheDocument();
  expect(screen.getByText(/Active slide 20/)).toBeInTheDocument();

  fireEvent.click(screen.getAllByRole('button', { name: '+1' })[0]);
  expect(screen.getByText(/Active slide 11/)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'toggle autoplay' }));
  expect(screen.getByText(/Active slide 20/)).toHaveTextContent(/auto/);
});
