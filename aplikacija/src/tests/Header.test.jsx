import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header'; // Adjust the import path if necessary

describe('Header Component', () => {

  

  // Test if clicking on "Moja evidenca" button calls onNavigate with 'mojaEvidenca'
  it('should call onNavigate with "mojaEvidenca" when "Moja evidenca" button is clicked', () => {
    const mockNavigate = jest.fn();
    render(<Header onNavigate={mockNavigate} />);

    // Simulate clicking the "Moja evidenca" button
    fireEvent.click(screen.getByText('Moja evidenca'));

    // Assert that the mockNavigate function was called with the correct argument
    expect(mockNavigate).toHaveBeenCalledWith('mojaEvidenca');
  });

  // Test if clicking on "Vnesi ure" button calls onNavigate with 'vnesiUre'
  it('should call onNavigate with "vnesiUre" when "Vnesi ure" button is clicked', () => {
    const mockNavigate = jest.fn();
    render(<Header onNavigate={mockNavigate} />);

    // Simulate clicking the "Vnesi ure" button
    fireEvent.click(screen.getByText('Vnesi ure'));

    // Assert that the mockNavigate function was called with the correct argument
    expect(mockNavigate).toHaveBeenCalledWith('vnesiUre');
  });

  // Test if clicking on "Pregled" button calls onNavigate with 'pregled'
  it('should call onNavigate with "pregled" when "Pregled" button is clicked', () => {
    const mockNavigate = jest.fn();
    render(<Header onNavigate={mockNavigate} />);

    // Simulate clicking the "Pregled" button
    fireEvent.click(screen.getByText('Pregled'));

    // Assert that the mockNavigate function was called with the correct argument
    expect(mockNavigate).toHaveBeenCalledWith('pregled');
  });

  

});
