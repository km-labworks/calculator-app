/**
 * 利用可能な演算子の種類
 */

export enum Operation {
    Add,
    Subtract,
    Multiply,
    Divide,
}

/**
 * 0除算エラー
 */
export class DivisionByZeroError extends Error {}

/**
 * 計算処理を担当するクラス
 * 
 * 【責務】
 * ・四則演算を実行する
 * ・不正な計算（0除算）を検出する
 */
export class Evaluator {

    /**
   * 計算を実行
   * @param a 左辺
   * @param op 演算子
   * @param b 右辺
   * @throws DivisionByZeroError
   */
    compute(a: number, op: Operation, b: number): number {
        switch (op) {
            case Operation.Add:
                return a + b;
            case Operation.Subtract:
                return a - b;
            case Operation.Multiply:
                return a * b;
            case Operation.Divide:
                if (b === 0) throw new DivisionByZeroError();
                    return a / b;
        }
    }
}