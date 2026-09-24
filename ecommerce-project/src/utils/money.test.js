import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

describe("for formatMoney function", () => {
  it("formats formats cents into dollars", () => {
    expect(formatMoney(1999)).toBe("$19.99");
    expect(formatMoney(1000)).toBe("$10.00");
  });
  it("displays 2 decimals", () => {
    expect(formatMoney(2000)).toBe("$20.00");
  });
  it("works with 0", () => {
    expect(formatMoney(0)).toBe("$0.00");
  });
  it("works with negative numbers", () => {
    expect(formatMoney(-100)).toBe("$-1.00");
  });
});
