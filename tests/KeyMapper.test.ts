import { describe, it, expect } from "vitest";

import { KeyMapper } from "../src/KeyMapper";

import { Operation } from "../src/Evaluator";

/**
 * KeyMapper の単体テスト
 * 
 * 【テスト観点】
 * ・数字キー変換
 * ・演算子変換
 * ・不正入力
 */
describe("KeyMapper", () => {

  /**
   * TC-001
   * 正常系
   * digitキーを変換できること
   */
  it("digitキーを変換できる", () => {

    const mapper = new KeyMapper();

    const button = document.createElement("button");

    button.dataset.key = "digit:7";

    const result = mapper.resolve(button);

    expect(result).toEqual({
      kind: "digit",
      value: 7
    });

  });

  /**
   * TC-002
   * 正常系
   * add演算子を変換できること
   */
  it("加算キーを変換できる", () => {

    const mapper = new KeyMapper();

    const button = document.createElement("button");

    button.dataset.key = "op:add";

    const result = mapper.resolve(button);

    expect(result).toEqual({
      kind: "op",
      value: Operation.Add
    });

  });

  /**
   * TC-003
   * 異常系
   * data-keyが無い場合 null を返すこと
   */
  it("不正入力時はnullを返す", () => {

    const mapper = new KeyMapper();

    const button = document.createElement("button");

    const result = mapper.resolve(button);

    expect(result).toBeNull();

  });

});