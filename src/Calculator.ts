import { InputBuffer } from "./InputBuffer";

import { Evaluator, Operation, DivisionByZeroError } from "./Evaluator";

import { NumberFormatter } from "./NumberFormatter";

import type { IDisplay } from "./DomDisplay";

import type { KeyToken } from "./types";

import { Config } from "./config";

import { HistoryFormatter } from "./HistoryFormatter";

/**
 * 電卓の司令塔クラス
 * 
 * 【責務】
 * ・UIからの入力（KeyToken）を受け取る
 * ・状態（state）を管理する
 * ・必要に応じて計算を実行する
 * ・表示内容を決定してUIへ渡す
 */

export const CalcState = {
    Ready: "Ready",
    InputtingFirst: "InputtingFirst",
    OperatorEntered: "OperatorEntered",
    InputtingSecond: "InputtingSecond",
    ResultShown: "ResultShown",
    Error: "Error",
} as const;

export type CalcState = (typeof CalcState)[keyof typeof CalcState];

export class Calculator {

  /** 現在の状態（入力フェーズ管理） */
    private state: CalcState = CalcState.Ready;
  /** 左側の値（次の計算に使う） */
    private left: number | null = null;
  /** 現在選択されている演算子 */
    private operator: Operation | null = null;
  /** 入力中の数値（文字列ベース） */
    private buffer = new InputBuffer(Config.MAX_DIGITS);
  /** 計算ロジック */
    private evaluator = new Evaluator();
  /** 表示フォーマット調整 */
    private formatter = new NumberFormatter(Config.MAX_DIGITS);

  /** 表示用の計算式（履歴） */
    private history: string = "";
    private historyFormatter = new HistoryFormatter();

    constructor(private display: IDisplay){
        this.display.render("0");
    }

    /**
   * UIから渡された入力を処理する
   * 
   * @param token 入力キーの意味（数字・演算子など）
   */
    handle(token: KeyToken): void {

        // Error状態の処理
        if (this.state === CalcState.Error) {
            if (token.kind === "clear") {
                this.clearAll();
                return;
            }
            if (token.kind === "digit") {
                this.clearAll(); // 新規開始
            } else {
                return; // 無視
            }
        }

        try {
        switch (token.kind) {
            case "digit":
            this.handleDigit(token.value);
            break;
            case "decimal":
            this.buffer.pushDecimal();
            this.state = this.operator === null
            ? CalcState.InputtingFirst : CalcState.InputtingSecond;
            break;
            case "op":
            this.handleOperator(token.value);
            break;
            case "equal":
            this.handleEqual();
            break;
            case "clear":
            this.clearAll();
            break;
        }
      // 状態に応じて画面更新
        this.updateDisplay();
    } catch (e) {
      // 0除算などのエラー処理
        if (e instanceof DivisionByZeroError) {
            this.display.renderError(Config.ERROR_MESSAGE);
            //this.state = CalcState.Error;
            this.state = CalcState.Error;
        }
    }
}

    /**
     * 数字入力処理
     * 
     * ・結果表示後なら新しい入力としてリセット
     * ・bufferに数字を追加
     */
    private handleDigit(d: number){
        if (this.state === CalcState.ResultShown) {
            this.buffer.clear();
            this.history = "";
        }
        this.buffer.pushDigit(d);

    // 演算子の有無で状態を切り替える
        this.state =
            this.operator === null
        ? CalcState.InputtingFirst : CalcState.InputtingSecond;
    }

    /**
   * 演算子入力処理
   * 
   * ・leftとbufferが揃っていれば即時計算（左から順評価）
   * ・結果を新たなleftとして保持
   */
private handleOperator(op: Operation) {

    const current = this.buffer.toNumber();
  // 負の数入力対応
    if (
        op === Operation.Subtract &&
        this.buffer.isEmpty()
    ) {

    if (
        this.state === CalcState.Ready || this.state === CalcState.OperatorEntered
    ) {
        this.buffer.pushMinus();

      // 状態更新
    if (this.operator === null) {
        this.state = CalcState.InputtingFirst;
        } else {
        this.state = CalcState.InputtingSecond;
    }

        this.updateDisplay();
        return;
    }
} 

  //演算子連打対応
    if (this.buffer.isEmpty()) {

    // leftがあるときだけ意味がある
    if (this.left !== null) {
        this.operator = op;

      // 履歴を上書き
        this.history = this.historyFormatter.format(this.left, op);
        this.display.renderHistory(this.history);
    }

    return;
    }

  // 左から順評価
    if (this.left !== null && this.operator !== null) {

    const result = this.evaluator.compute(
        this.left,
        this.operator,
        current
    );

    this.left = result;

    // 途中履歴
    this.history = this.historyFormatter.format(result, op);

    } else {

    // 最初の入力
    this.left = current;

    this.history = this.historyFormatter.format(current, op);
    }

    this.buffer.clear();
    this.operator = op;
    this.state = CalcState.OperatorEntered;

    this.display.renderHistory(this.history);
}

    /**
     * イコール処理
     * 
     * ・left / operator / buffer が揃っている場合のみ計算
     */
    private handleEqual() {
        if (this.left !== null && this.operator !== null ) {

            const right = this.buffer.toNumber(); // ←先に保存

            const result = this.evaluator.compute(
            this.left,
            this.operator,
            right
            );

            const formatted = this.formatter.formatForDisplay(result);

            // 履歴完成
            this.history = this.historyFormatter.format(
                this.left,
                this.operator,
                right,
                true
            );

            this.display.renderHistory(this.history);
            this.display.render(formatted);

            // リセット
            this.left = null;
            this.operator = null;
            this.buffer.clear();
            this.state = CalcState.ResultShown;
        }
    }

            /**
             * 全クリア処理
             */
            private clearAll() {
                this.left = null;
                this.operator = null;
                this.buffer.clear();
                this.state = CalcState.Ready;
                this.history = "";
                this.display.render("0");
                this.display.renderHistory("");
    }

    /**
     * 表示更新
     * 
     * ・結果表示中でない場合のみbufferを表示
     */
    private updateDisplay() {
        if (this.state !== CalcState.ResultShown) {
            this.display.render(this.buffer.toString() || "0");
        }
    }
}
