# stripe-fixtures-skills

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

Claude Code、Cursor、その他対応エージェント向けの **Agent Skill** パッケージです。収録されている **`stripe-fixtures`** は、単発 API ではなく Stripe CLI の **`stripe fixtures`** 用 JSON を対話で整理・生成・静的検証するためのものです。

**English README:** [`README.md`](README.md)

## 何を解決するか

[`stripe fixtures`](https://stripe.com/docs/cli/fixtures) は、複数の Stripe API を JSON に並べ、`${名前:json.path}` で前レスポンスを参照しながら連続実行できる仕組みです。**`test_helpers` / test_clock** による時間進行、複数ステップのサブスクリプション、失敗経路は **`expected_error_type`** で表現したり、Connect の Destination charge、同一構造リソースを **bulk** で増やしたりする用途と相性が良いです。

一方で、レスポンス形を頭に入れて参照を書く必要がある、配列インデックス表記などのツール挙動の落とし穴がある、`N` 件の繰り返し構文がない（手でコピペが現実的でない）、といった理由で、そのまま人間だけで書くのは負荷が高いです。詳しくは [`skills/stripe-fixtures/pitfalls.md`](skills/stripe-fixtures/pitfalls.md)。

この Skill は **要件の短いすり合わせ → `reference/` から最適なひな型選択 → 改変 → 静的検証 → 実行はユーザー側の `stripe fixtures`**、という分担を狙います。

## Skill が担うこと／担わないこと

**担うこと**

- **`stripe trigger` で足りるか**の撤退判定（SKILL.md Phase 0）
- fixture JSON の生成・ひな型からの合成
- 静的検証（参照の順序、`${name}` 整合、`path` の形式、`_meta.template_version` など）
- pitfalls への警告

**担わないこと**

- `stripe fixtures` の実機実行（利用者の環境で実行）
- 実 API との動的検証
- Live キーの強制ブロック（Stripe CLI とキーの取り扱いは利用者側。推奨は **`sk_test_*`** のテストモード鍵）

## 前提条件

- [Stripe CLI](https://stripe.com/docs/stripe-cli) が利用可能であること
- fixture を適用するとき **`STRIPE_API_KEY`** は **テストモード（`sk_test_...`）** を利用すること（本 Skill の意図に合わせる）

## インストール

`<owner>` をこのリポジトリをホストしている GitHub のユーザーまたは組織名に置き換えます（例: **`hideokamoto`**）。

### `gh skill` CLI

```bash
gh skill install <owner>/stripe-fixtures-skills stripe-fixtures --pin v0.1.0
```

### `npx skills`

```bash
npx skills add <owner>/stripe-fixtures-skills --skill stripe-fixtures
```

## リポジトリ構成

```text
stripe-fixtures-skills/
├── README.md                     # 英語 README
├── README.ja.md                  # このファイル（日本語）
├── LICENSE
└── skills/
    └── stripe-fixtures/
        ├── SKILL.md              # エージェント用プロトコル（フェーズ、検証、出力形式）
        ├── README.md             # スキルの人間向け概要
        ├── pitfalls.md           # 既知の Stripe CLI fixtures 周りの落とし穴
        ├── reference/
        │   ├── INDEX.md          # JSON ひな型の索引（フェーズ 2 で参照）
        │   └── *.json            # シナリオ別テンプレート（実行検証済みとは限らない）
        └── evals/
            └── evals.json
```

## 参照シナリオ（ひな型）

| ファイル | 主な軸 |
|----------|--------|
| `failing-subscription.json` | 時系列 × 失敗カード × サブスク請求 |
| `successful-checkout.json` | 即時 × Checkout 的成功系寄り |
| `refund-and-dispute.json` | 返金・ディスピュート系 |
| `connect-destination-jpy.json` | Connect × JPY Destination charge |
| `bulk-customers.json` | 顧客の bulk 構造参考 |
| `subscription-with-trial.json` | トライアル終了〜初回請求 |

エージェントは **`reference/INDEX.md`** で最も近い 1 本を選び、ユーザー要件に合わせて改変することが前提です（そのまま貼らない）。

## 依頼例

- 「失敗するサブスクの請求サイクルを test_clock と fixture で作りたい」
- 「同じ構造でテスト顧客を 80 件 bulk で作る JSON をほしい」
- 「このケースは `stripe trigger` と fixture どっちが適切？」

## コントリビューション・不具合

Stripe API／CLI と参照 JSON のずれ、`pitfalls` に載っていない挙動の変化などは Issue または PR で歓迎します。

## ライセンス

Apache License 2.0 — [`LICENSE`](LICENSE) を参照してください。
