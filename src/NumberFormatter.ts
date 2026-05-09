/**
 * 表示用の数値フォーマットを担当するクラス
 * 
 * 【責務】
 * ・数値を画面表示用に整形する
 * ・桁数制限に応じて指数表記に切り替える
 */

export class NumberFormatter {
    constructor(private readonly maxDigits: number) {}

    /**
   * 表示用に整形
   * 不要な末尾0を削除
   * 桁数超過時は指数表記に変換
   */
    public formatForDisplay(n: number): string {

        let normal = n.toString();
        // 不要な0削除
        normal = normal.replace(/\.0+$|(\.\d*?)0+$/, "$1");
        
        //記号を除外した桁数チェック
        const digits = normal.replace(/[.\-]/g, "").length;

        //8桁以内ならそのまま返す
        if (digits <= this.maxDigits) {
            return normal;
        }

        //指数表記の調整
        for (let precision = this.maxDigits; precision >= 0; precision--) {
            const exp = n.toExponential(precision);
            
            if (exp.length <= this.maxDigits) {
                return exp;
            }
        }
        return n.toExponential(0);
    }
}