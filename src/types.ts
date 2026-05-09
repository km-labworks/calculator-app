import { Operation } from "./Evaluator";

/**
 * 入力キーの意味を表す型
 * 
 * 【責務】
 * ・UIの入力をアプリ内部の意味に変換するための共通フォーマット
 */
export type KeyToken =
    /** 数字入力 */
    | { kind: "digit"; value: number }

    /** 小数点入力 */
    | { kind: "decimal" }

    /** 演算子入力 */
    | { kind: "op"; value: Operation }

    /** イコール入力 */
    | { kind: "equal" }

    /** クリア入力 */
    | { kind: "clear" };