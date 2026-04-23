import { add, substract, multiply, divide } from "../calculator";

//add(2,3) = 5
//add(3,4) = 7

test("returns the sum of two positive numbers", () => {
    expect(add(2,3)).toBe(5);
})