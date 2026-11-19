import { describe, expect, it } from "vitest";
import { getProductById } from "@/data/products";

describe("preços informados pela Wbass", () => {
  it.each([
    ["210d", 5882.18],
    ["210dp", 6070.68],
    ["212d", 6751.21],
    ["410dp", 7457.33],
    ["112d", 5792.09],
    ["112nd", 4546.08],
    ["115d", 6048.50],
    ["115nd", 4820.51],
    ["easy-1x10d", 3147.90],
    ["easy-2x10d", 3778.95],
    ["easy-1x12d", 3568.95],
    ["easy-1x12nd", 2833.95],
  ])("%s custa R$ %s", (id, price) => {
    expect(getProductById(String(id))?.price).toBe(price);
  });
});