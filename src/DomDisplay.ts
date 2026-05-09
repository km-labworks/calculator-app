/**
 * 表示インターフェース
 * 
 * 【責務】
 * ・表示処理の抽象化
 * ・テストや差し替えを容易にする
 */

export interface IDisplay {
    render(text: string): void;
    renderHistory(text: string): void;
    renderError(message: string): void;
}

/**
 * DOM操作による表示クラス
 * 
 * 【責務】
 * ・HTML要素へ表示内容を書き込む
 */
export class DomDisplay implements IDisplay {

  constructor(
    private screen: HTMLElement, private historyEl: HTMLElement
  ) {}

  render(text: string): void {
    this.screen.textContent = text;
  }

  renderError(message: string): void {
    this.screen.textContent = message;
  }

  renderHistory(text: string): void {
    this.historyEl.textContent = text;
  }
}