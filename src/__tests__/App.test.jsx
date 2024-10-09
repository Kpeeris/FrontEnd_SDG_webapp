import { it, expect, describe } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "@/App";

//carousel components was causing issues for some reason so this is a mock
//component so i can only test navigation logic
vi.mock("@/components/ui/carousel", () => ({
  Carousel: ({ children }) => <div>{children}</div>,
  CarouselContent: ({ children }) => <div>{children}</div>,
  CarouselItem: ({ children }) => <div>{children}</div>,
  CarouselPrevious: () => <button>Previous</button>,
  CarouselNext: () => <button>Next</button>,
}));

describe("Navigation tests for App", async () => {
  it("should navigate to Home page when root route is accessed", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("should navigate to About page when about link is clicked in the Navbar", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const aboutLink = screen.getByTestId("about-button");
    userEvent.click(aboutLink);

    await waitFor(() => {
      expect(screen.getByTestId("about-page")).toBeInTheDocument();
    });
  });
  it("should navigate to SDG11 page when image in the banner is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    const bannerImage = screen.getByAltText("SDG11 City");
    userEvent.click(bannerImage);
    await waitFor(() => {
      expect(screen.getByTestId("sdg11-page")).toBeInTheDocument();
    });
  });

  it("should navigate to SDG11 page when goal11 card is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    const goalCard = screen.getByAltText(
      "11 Sustainable Cities and Communities"
    );
    userEvent.click(goalCard);
    await waitFor(() => {
      expect(screen.getByTestId("sdg11-page")).toBeInTheDocument();
    });
  });

  it("should navigate to Home page when home button is clicked in Navbar", async () => {
    render(
      <MemoryRouter initialEntries={["/sdg11"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("sdg11-page")).toBeInTheDocument();
    screen.debug();
    const homeButton = screen.getByTestId("home-button");
    userEvent.click(homeButton);
    await waitFor(() => {
      expect(screen.getByTestId("home-page")).toBeInTheDocument();
    });
  });

  it("should navigate to Home page when SDG scolar logo is clicked in Navbar", async () => {
    render(
      <MemoryRouter initialEntries={["/sdg11"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("sdg11-page")).toBeInTheDocument();
    screen.debug();
    const logo = screen.getByAltText("SDG logo");
    userEvent.click(logo);
    await waitFor(() => {
      expect(screen.getByTestId("home-page")).toBeInTheDocument();
    });
  });
});

// TODO: still need to add test for login, signup, and announcement page when the links are added
