import { Operation } from "./Evaluator";

/**
 * 履歴表示を作る専用クラス
 */
export class HistoryFormatter {

/**
* 計算途中 or 完成の文字列を作る
*/

format(
    left: number,
    op: Operation,
    right?: number,
    isEqual: boolean = false
): string {

    const symbol = this.getSymbol(op);

    // まだ右側がない（途中）
    if (right === undefined) {
        return `${left} ${symbol}`;
    }

    // = のとき
    if (isEqual) {
        return `${left} ${symbol} ${right} =`;
    }

    return `${left} ${symbol} ${right}`;
    }

    private getSymbol(op: Operation): string {
        switch (op) {
            case Operation.Add: return "+";
            case Operation.Subtract: return "-";
            case Operation.Multiply: return "×";
            case Operation.Divide: return "÷";
        }
    }
}