import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

// Mock components that are used in App to focus on navigation and state management
jest.mock("../components/Header", () => () => <div>Header</div>);
jest.mock("../components/EmployeeEntryForm", () => () => <div>EmployeeEntryForm</div>);
jest.mock("../components/EditEntryForm", () => () => <div>EditEntryForm</div>);
jest.mock("../components/LoginForm", () => ({ onLogin }) => (
  <div>
    <button onClick={onLogin}>Login</button>
  </div>
));
jest.mock("../components/EmployeeHoursTable", () => () => <div>EmployeeHoursTable</div>);
jest.mock("../components/Overview", () => () => <div>Overview</div>);

describe("App component", () => {
  it("should render login view initially", () => {
    render(<App />); // No need for Router wrapper here

    // Check if the login form is displayed by checking for the Login button
    const loginButton = screen.getByText("Login");
    expect(loginButton).not.toBeNull();
  });

  it("should navigate to employee entry form after login", async () => {
    render(<App />); // No need for Router wrapper here

    // Click the login button
    fireEvent.click(screen.getByText("Login"));

    // Wait for the EmployeeEntryForm to render after login
    await waitFor(() => {
      const employeeEntryForm = screen.queryByText("EmployeeEntryForm");
      expect(employeeEntryForm).not.toBeNull();
    });
  });

 
  

  
});
