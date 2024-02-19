import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import FilterInput from '../products/ProductsList/components/FilterInput/FilterInput';

describe('FilterInput', () => {
  test('renders FilterInput component', () => {
    render(<FilterInput value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/Product ID Filter/i)).toBeInTheDocument();
  });
});
