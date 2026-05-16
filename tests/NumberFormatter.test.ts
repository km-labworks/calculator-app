import { describe, it, expect } from "vitest";

import { NumberFormatter } from "../src/NumberFormatter";

/**
 * NumberFormatter の単体テスト
 * 
 * 【テスト観点】
 * ・通常表示
 * ・不要な0削除
 * ・指数表記
 * ・桁数制限
 */
describe("NumberFormatter", () => {

  /**
   * TC-001
   * 正常系
   * 通常の数値を表示できること
   */
  it("通常の数値を表示できる", () => {

    const formatter = new NumberFormatter(8);

    const result = formatter.formatForDisplay(123);

    expect(result).toBe("123");

  });

  /**
   * TC-002
   * 正常系
   * 不要な末尾0を削除できること
   */
  it("不要な0を削除できる", () => {

    const formatter = new NumberFormatter(8);

    const result = formatter.formatForDisplay(1.5000);

    expect(result).toBe("1.5");

  });

  /**
   * TC-003
   * 境界値テスト
   * 桁数超過時に指数表記へ変換されること
   */
  it("指数表記へ変換できる", () => {

    const formatter = new NumberFormatter(8);

    const result = formatter.formatForDisplay(123456789);

    expect(result).toContain("e");

  });

});