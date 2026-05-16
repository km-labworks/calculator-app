import { describe, it, expect, vi } from "vitest";

import { Calculator } from "../src/Calculator";

import { Operation } from "../src/Evaluator";

import type { IDisplay } from "../src/DomDisplay";

/**
 * Calculator の単体テスト
 * 
 * 【テスト観点】
 * ・数字入力
 * ・加算
 * ・クリア
 * ・表示更新
 */
describe("Calculator", () => {

  /**
   * Mock Display
   * 
   * UI依存を切り離すための偽物
   */
  const createMockDisplay = (): IDisplay => ({
    render: vi.fn(),
    renderHistory: vi.fn(),
    renderError: vi.fn(),
  });

  /**
   * TC-001
   * 正常系
   * 数字入力を表示できること
   */
  it("数字入力を表示できる", () => {

    const display = createMockDisplay();

    const calculator = new Calculator(display);

    calculator.handle({
      kind: "digit",
      value: 1
    });

    expect(display.render).toHaveBeenLastCalledWith("1");

  });

  /**
   * TC-002
   * 正常系
   * 加算結果を表示できること
   */
  it("加算結果を表示できる", () => {

    const display = createMockDisplay();

    const calculator = new Calculator(display);

    calculator.handle({
      kind: "digit",
      value: 1
    });

    calculator.handle({
      kind: "op",
      value: Operation.Add
    });

    calculator.handle({
      kind: "digit",
      value: 2
    });

    calculator.handle({
      kind: "equal"
    });

    expect(display.render).toHaveBeenLastCalledWith("3");

  });

  /**
   * TC-003
   * 正常系
   * clearでリセットできること
   */
  it("clearでリセットできる", () => {

    const display = createMockDisplay();

    const calculator = new Calculator(display);

    calculator.handle({
      kind: "digit",
      value: 9
    });

    calculator.handle({
      kind: "clear"
    });

    expect(display.render).toHaveBeenLastCalledWith("0");

  });

});