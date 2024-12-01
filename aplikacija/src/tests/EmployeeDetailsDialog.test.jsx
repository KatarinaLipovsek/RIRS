import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeDetailsDialog from '../components/EmployeeDetailsDialog';

// Mock the Gauge component from '@mui/x-charts/Gauge' to avoid unnecessary rendering
jest.mock('@mui/x-charts/Gauge', () => () => <div>Gauge</div>);

describe('EmployeeDetailsDialog component', () => {
  const employee = {
    name: 'John Doe',
    id: '123',
    email: 'john.doe@example.com',
    total_hours: 120,
  };

  

  it('should not render the dialog when open is false', () => {
    render(<EmployeeDetailsDialog open={false} onClose={() => {}} employee={employee} />);
    const dialogTitle = screen.queryByText('Podrobnosti zaposlenega');
    expect(dialogTitle).toBeNull();
  });

  it('should not render employee details when employee prop is null', () => {
    render(<EmployeeDetailsDialog open={true} onClose={() => {}} employee={null} />);
    
    // Check that the employee's details are not displayed
    expect(screen.queryByText('Ime:')).toBeNull();
    expect(screen.queryByText('ID zaposlenega:')).toBeNull();
    expect(screen.queryByText('Email:')).toBeNull();
    expect(screen.queryByText('Št. oddelanih ur:')).toBeNull();
  });
  
  it('should not render the dialog when open is false', () => {
    render(<EmployeeDetailsDialog open={false} onClose={() => {}} employee={employee} />);
    
    // Ensure the dialog title is not present when the dialog is closed
    const dialogTitle = screen.queryByText('Podrobnosti zaposlenega');
    expect(dialogTitle).toBeNull();
  });
  
  

  

  

 
  
  
  
  
  
  
});
