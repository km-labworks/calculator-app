import { Calculator } from "./Calculator";

import { DomDisplay } from "./DomDisplay";

import { KeyMapper } from "./KeyMapper";

/**
 * エントリーポイント
 * 
 * 【責務】
 * ・DOMの取得
 * ・各クラスの初期化
 * ・イベントとアプリの接続
 */

const screenEl = document.getElementById("screen") as HTMLElement;

const historyEl = document.getElementById("history") as HTMLElement;

const display = new DomDisplay(screenEl, historyEl);

const calculator = new Calculator(display);

const mapper = new KeyMapper();

/**
 * 全ボタンにクリックイベントを設定
 * 
 * クリック → KeyTokenに変換
 * Calculatorへ渡して処理
*/

document.querySelectorAll(".calcButton").forEach(btn => {
  btn.addEventListener("click", () => {
    const token = mapper.resolve(btn as HTMLElement);
    if (token) {
      calculator.handle(token);
    }
  });
});
