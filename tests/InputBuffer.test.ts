import { describe, it, expect } from "vitest";

import { InputBuffer } from "../src/InputBuffer";

/**
 * InputBuffer の単体テスト
 * 
 * 【テスト観点】
 * ・数字入力
 * ・桁数制限
 * ・小数点制御
 * ・負数入力
 * ・入力クリア
 * ・空判定
 */
describe("InputBuffer", () => {

  /**
   * TC-001
   * 正常系
   * 数字を連続入力できること
   */
  it("数字を追加できる", () => {

    // Arrange（準備）
    const buffer = new InputBuffer(8);

    // Act（実行）
    buffer.pushDigit(1);
    buffer.pushDigit(2);

    // Assert（検証）
    expect(buffer.toString()).toBe("12");

  });

  /**
   * TC-002
   * 境界値テスト
   * 最大桁数を超えた入力が無視されること
   */
  it("最大桁数を超えない", () => {

    // 最大3桁まで
    const buffer = new InputBuffer(3);

    // 4桁入力
    buffer.pushDigit(1);
    buffer.pushDigit(2);
    buffer.pushDigit(3);
    buffer.pushDigit(4);

    // 4は無視される
    expect(buffer.toString()).toBe("123");

  });

  /**
   * TC-003
   * 異常系
   * 小数点を2回入力できないこと
   */
  it("小数点を2回入力できない", () => {

    const buffer = new InputBuffer(8);

    buffer.pushDecimal();
    buffer.pushDecimal();

    // 2回目は無視
    expect(buffer.toString()).toBe("0.");

  });

  /**
   * TC-004
   * 正常系
   * 負数を入力できること
   */
  it("負数を入力できる", () => {

    const buffer = new InputBuffer(8);

    buffer.pushMinus();
    buffer.pushDigit(5);

    expect(buffer.toString()).toBe("-5");

  });

  /**
   * TC-005
   * 正常系
   * clearで入力をリセットできること
   */
  it("clearで入力をリセットできる", () => {

    const buffer = new InputBuffer(8);

    buffer.pushDigit(1);

    buffer.clear();

    expect(buffer.toString()).toBe("");

  });

  /**
   * TC-006
   * 正常系
   * 空状態で isEmpty が true を返すこと
   */
  it("空ならtrueを返す", () => {

    const buffer = new InputBuffer(8);

    expect(buffer.isEmpty()).toBe(true);

  });

});