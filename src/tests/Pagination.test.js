import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../products/ProductsList/components/Pagination/Pagination';

describe('Pagination', () => {
  test('Next button calls handlePageChange with correct argument', () => {
    const handlePageChangeMock = jest.fn();
    render(<Pagination currentPage={1} totalPages={3} handlePageChange={handlePageChangeMock} />);
    fireEvent.click(screen.getByText(/Next/i));
    expect(handlePageChangeMock).toHaveBeenCalledWith(2);
  });
});
