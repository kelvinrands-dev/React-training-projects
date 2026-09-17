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
});
