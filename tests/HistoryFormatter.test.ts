import { describe, it, expect } from "vitest";

import { HistoryFormatter } from "../src/HistoryFormatter";

import { Operation } from "../src/Evaluator";

/**
 * HistoryFormatter の単体テスト
 * 
 * 【テスト観点】
 * ・途中履歴
 * ・完成履歴
 * ・演算子表示
 */
describe("HistoryFormatter", () => {

  /**
   * TC-001
   * 正常系
   * 加算途中履歴を作れること
   */
  it("途中履歴を作れる", () => {

    const formatter = new HistoryFormatter();

    const result = formatter.format(
      1,
      Operation.Add
    );

    expect(result).toBe("1 +");

  });

  /**
   * TC-002
   * 正常系
   * 完成履歴を作れること
   */
  it("完成履歴を作れる", () => {

    const formatter = new HistoryFormatter();

    const result = formatter.format(
      1,
      Operation.Add,
      2,
      true
    );

    expect(result).toBe("1 + 2 =");

  });

});