import type { KeyToken } from "./types";
import { Operation } from "./Evaluator";

/**
 * UI入力をKeyTokenへ変換するクラス
 * 
 * 【責務】
 * ・DOMの文字列をアプリ内部の意味に変換
 */
export class KeyMapper {

    /**
   * 要素から入力トークンを生成
   * 
   * @param el ボタン要素
   */

    resolve(el: HTMLElement): KeyToken | null {
        //data-keyを取得
        const key = el.dataset.key;

        if (!key) return null;

        const [type, value] = key.split(":");
            // digit:7 の形式を分解
        switch (type) {
            case "digit":
                return {
                    kind: "digit",
                    value: Number(value)
                };
            case "decimal":
                return { kind: "decimal" };
            case "equal":
                return { kind: "equal" };
            case "clear":
                return { kind: "clear" };
            case "op":
        
        switch (value) {
            case "add":
                return { kind: "op", value: Operation.Add };
            case "sub":
                return { kind: "op", value: Operation.Subtract };
            case "mul":
                return { kind: "op", value: Operation.Multiply };
            case "div":
                return { kind: "op", value: Operation.Divide };
        }
    }
    return null;
    }
}