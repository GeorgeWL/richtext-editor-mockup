import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test.todo('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Markdown with Preview/i);
  expect(linkElement).toBeInTheDocument();
});
