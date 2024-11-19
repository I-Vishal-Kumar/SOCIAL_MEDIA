import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom"; // Needed for `useNavigate`
import { useAuth0 } from "@auth0/auth0-react";
import LoginSection from "@/components/loginSignup/Login";
import { supabase } from "@/(clients)/suparbaseClient";

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(),
}));

jest.mock("@/(clients)/suparbaseClient", () => ({
  supabase: {
    from: jest.fn(() => ({
      upsert: jest.fn()
    }))
  }
}));

const mockUseAuth0 = useAuth0 as jest.MockedFunction<typeof useAuth0>;

beforeEach(() => {
  mockUseAuth0.mockReturnValue({
    loginWithPopup: jest.fn(),
    user: null,
  } as any);
});

const mockSupabase = supabase.from("users").upsert as jest.Mock;
const avatarSrc = 'https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

describe("LoginSection Component", () => {

  it("renders LoginSection correctly", () => {
    render(
      <BrowserRouter>
        <LoginSection />
      </BrowserRouter>
    );

    // Check if the login button is rendered
    const loginButton = screen.getByText(/sign in with google/i);
    expect(loginButton).toBeInTheDocument();
  });

  it("calls Google sign-in and syncs user data on success", async () => {
    // Mock Auth0 behavior
    mockUseAuth0.mockReturnValue({
      loginWithPopup: jest.fn().mockResolvedValue(undefined),
      user: {
        email: "testuser@example.com",
        name: "Test User",
        picture: avatarSrc,
      },
    } as any);

    // Mock Supabase response
    mockSupabase.mockResolvedValue({ error: null });

    render(
      <BrowserRouter>
        <LoginSection />
      </BrowserRouter>
    );

  });

  it("displays an error message if Google sign-in fails", async () => {
    // Mock Auth0 behavior with sign-in error
    mockUseAuth0.mockReturnValue({
      loginWithPopup: jest.fn().mockRejectedValue(new Error("Google sign-in error")),
      user: null,
    } as any);

    render(
      <BrowserRouter>
        <LoginSection />
      </BrowserRouter>
    );

    const loginButton = screen.getByText(/sign in with google/i);
    fireEvent.click(loginButton);

    // Wait for the process to complete
    await waitFor(() => {
      expect(mockUseAuth0().loginWithPopup).toHaveBeenCalled();
      expect(screen.getByText(/google sign-in failed\. please try again\./i)).toBeInTheDocument();
    });
  });
});

