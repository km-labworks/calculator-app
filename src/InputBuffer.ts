/**
 * 入力中の数値を管理するクラス
 * 
 * 【責務】
 * ・数字入力を管理する（文字列ベース）
 * ・桁数制限（最大8桁）を守る
 * ・小数点の制御（2回押し防止）
 * ・数値への変換を提供する
 */
export class InputBuffer {

  /**
   * @param maxDigits 最大桁数（例: 8）
   * @param value 現在の入力値（文字列）
   */
  constructor(
    private readonly maxDigits: number,
    private value: string = ""
  ) {}

  /**
   * マイナス入力（負数）
   */
  public pushMinus(): void {

    // すでにマイナスがあるなら無視
    if (this.value.startsWith("-")) return;

    // 空なら「-」だけ入れる
    if (this.value === "") {
      this.value = "-";
      return;
    }

    // 数字がある場合は先頭に付ける（例: 3 → -3）
    this.value = "-" + this.value;
  }
  /**
   * 数字を追加する
   * ・最大桁数を超えたら無視
   * ・先頭の「0」は適切に制御
   */
  public pushDigit(d: number): void {

    // 記号（. や -）を除いた純粋な桁数をカウント
    const digits = this.value.replace(/[.\-]/g, "");

    // 桁数オーバーなら追加しない
    if (digits.length >= this.maxDigits) return;

    // 「0」のときにさらに0を押しても増やさない
    if (this.value === "0") {
      this.value = String(d);
      return;
    }

    if (this.value === "-0") {
      this.value = "-" + d;
      return;
    }
    // 通常はそのまま追加
    this.value += d;
  }

  /**
   * 小数点を追加する
   * 
   * すでに「.」がある場合は無視
   * 空の場合は「0.」を補完
   */
  public pushDecimal(): void {

    // すでに小数点があるなら無視
    if (this.value.includes(".")) return;

    // 空なら「0.」をセット
    if (this.value === "" || this.value === "-") {
      this.value = this.value + "0.";
      return;
    }

    this.value += ".";
  }

  /**
   * 入力をリセットする
   */
  public clear(): void {
    this.value = "";
  }

  /**
   * 現在の値を数値に変換する
   * 空の場合は0として扱う
   */
  public toNumber(): number {
    return Number(this.value || 0);
  }

  /**
   * 入力が空かどうか
   */
  public isEmpty(): boolean {
    return this.value === "";
  }

  /**
   * 表示用に文字列として取得
   */
  public toString(): string {
    return this.value;
  }
}