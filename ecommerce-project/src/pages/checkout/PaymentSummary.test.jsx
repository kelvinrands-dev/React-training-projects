import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";

vi.mock("axios");

describe("tests payment summary component", () => {
  let loadCart;
  let user;

  function Location() {
    const location = useLocation();

    return <div data-testid="url-path">{location.pathname}</div>;
  }

  beforeEach(() => {
    const paymentSummary = {
      totalItems: 6,
      productCostCents: 7545,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 7545,
      taxCents: 755,
      totalCostCents: 8300,
    };
    loadCart = vi.fn();

    user = userEvent.setup();

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>,
    );
  });

  it("checks payment amounts", () => {
    const allPaymentsRow = screen.getAllByTestId("payment-row");
    //expect(within(allPaymentsRow[4]).getByText("$83.00")).toBeInTheDocument();

    expect(allPaymentsRow[4]).toHaveTextContent("$83.00");
  });

  it("checks if place order btn works", async () => {
    const placeOrderBtn = screen.getByTestId("place-order-btn");
    await user.click(placeOrderBtn);

    expect(axios.post).toHaveBeenCalledWith("/api/orders");
    expect(loadCart).toHaveBeenCalled();

    expect(screen.getByTestId("url-path")).toHaveTextContent("/orders");
  });
});
