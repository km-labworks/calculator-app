# Calculator App

TypeScript + Vite で作成した電卓アプリです。

四則演算・小数・負数・履歴表示・エラー制御などを実装し、
責務分離と状態管理を意識して設計しています。

---

# 画面イメージ

- 数値表示エリア
- 履歴表示エリア
- 数字ボタン
- 演算子ボタン
- Clearボタン

---

# 使用技術

| 技術 | 内容 |
|---|---|
| TypeScript | 型安全な実装 |
| Vite | 開発環境 |
| Vitest | 単体テスト |
| HTML/CSS | UI構築 |

---

# 機能一覧

## 入力機能

- 数字入力
- 小数入力
- 負数入力
- 8桁制限
- 演算子入力
- Clear機能

---

## 計算機能

- 加算
- 減算
- 乗算
- 除算
- 小数計算
- 負数計算
- 左から順番に計算

---

## 表示機能

- 履歴表示
- 指数表記
- エラー表示
- リアルタイム更新

---

# 設計方針

責務分離を意識してクラス設計を行っています。

| クラス | 責務 |
|---|---|
| Calculator | 状態管理・入力制御 |
| Evaluator | 計算処理 |
| InputBuffer | 数値入力管理 |
| NumberFormatter | 表示整形 |
| KeyMapper | UI入力変換 |
| HistoryFormatter | 履歴表示生成 |
| DomDisplay | DOM描画 |

---

# 状態管理

Calculator クラスでは状態遷移を使用しています。

```ts
Ready
InputtingFirst
OperatorEntered
InputtingSecond
ResultShown
Error
```

---

# ディレクトリ構成

```txt
vite-project/
├── src/
│   ├── Calculator.ts
│   ├── Evaluator.ts
│   ├── InputBuffer.ts
│   ├── NumberFormatter.ts
│   ├── KeyMapper.ts
│   ├── HistoryFormatter.ts
│   ├── DomDisplay.ts
│   ├── config.ts
│   └── main.ts
│
├── tests/
│   ├── Calculator.test.ts
│   ├── Evaluator.test.ts
│   ├── InputBuffer.test.ts
│   ├── NumberFormatter.test.ts
│   ├── KeyMapper.test.ts
│   └── HistoryFormatter.test.ts
│
├── package.json
├── vite.config.ts
└── README.md
```

---

# テスト

Vitest を使用して単体テストを実施しています。

## テスト内容

- 数値入力
- 小数入力
- 演算子入力
- 四則演算
- 0除算
- 状態遷移
- 履歴表示
- 桁数制限
- 指数表記

---

# テスト実行

```bash
npm run test
```

---

# Coverage実行

```bash
npm run coverage
```

---

# Coverage例

- Statements
- Branches
- Functions
- Lines

すべて高いカバレッジを維持。

---

# こだわったポイント

## 状態管理

状態遷移を明確に分離し、
不正操作でも破綻しないよう設計。

---

## 責務分離

各クラスを単一責務に分離。

保守性・可読性・テスト容易性を向上。

---

## エラー制御

0除算時には Error 状態へ遷移し、
不正な入力を防止。

---

# 今後の改善案

- キーボード操作対応
- レスポンシブ対応
- テーマ切替
- メモリ機能
- 演算履歴保存
- E2Eテスト導入

---

# ライセンス

MIT License
