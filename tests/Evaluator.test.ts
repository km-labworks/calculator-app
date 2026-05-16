import { describe, it, expect } from "vitest";

import {
    Evaluator,
    Operation,
    DivisionByZeroError
} from "../src/Evaluator";

/**
 * Evaluator の単体テスト
 * 
 * 【テスト観点】
 * ・加算
 * ・減算
 * ・乗算
 * ・除算
 * ・0除算
 */
describe("Evaluator", () => {

/**
   * TC-001
   * 正常系
   * 加算できること
*/
it("加算できる", () => {

    // Arrange
    const evaluator = new Evaluator();

    // Act
    const result = evaluator.compute(
        1,
        Operation.Add,
        2
);

    // Assert
    expect(result).toBe(3);

    });

/**
   * TC-002
   * 正常系
   * 減算できること
*/
it("減算できる", () => {

    const evaluator = new Evaluator();

    const result = evaluator.compute(
        5,
        Operation.Subtract,
        2
);

    expect(result).toBe(3);

});

/**
   * TC-003
   * 正常系
   * 乗算できること
 */
it("乗算できる", () => {

    const evaluator = new Evaluator();

    const result = evaluator.compute(
        3,
        Operation.Multiply,
        4
);

    expect(result).toBe(12);

});

/**
   * TC-004
   * 正常系
   * 除算できること
   */
it("除算できる", () => {

    const evaluator = new Evaluator();

    const result = evaluator.compute(
        10,
        Operation.Divide,
        2
);

    expect(result).toBe(5);

});

/**
   * TC-005
   * 異常系
   * 0除算時に例外が発生すること
*/
it("0除算でエラーになる", () => {

    const evaluator = new Evaluator();

    expect(() => {

    evaluator.compute(
        10,
        Operation.Divide,
        0
    );

    }).toThrow(DivisionByZeroError);

});

});