# stripe-fixtures-skills

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

Agent Skill pack for Claude Code, Cursor, and compatible clients. It ships **`stripe-fixtures`**: tooling for generating and validating Stripe CLI **`stripe fixtures`** JSON through guided conversation—not one-off API calls.

**Japanese README:** [`README.ja.md`](README.ja.md)

## What problem this solves

[`stripe fixtures`](https://stripe.com/docs/cli/fixtures) runs a sequenced list of Stripe API requests from JSON, wiring prior responses into later steps via `${fixture_name:json.path}` references. Useful patterns include **`test_helpers` / test clocks**, multi-step subscriptions, **`expected_error_type`** for failure paths, Connect destination charges, and **bulk** creation of identical resources.

Writing these files by hand is painful: response shapes must be known ahead of time, array indexing quirks exist, there is no built-in repeat syntax for **N copies**, and pitfalls are documented mainly in tooling behavior (see [`skills/stripe-fixtures/pitfalls.md`](skills/stripe-fixtures/pitfalls.md)).

This skill pushes that burden into an assistant: clarify requirements briefly, choose a **`reference/`** template, mutate it for your scenario, run **static validation**, then you execute **`stripe fixtures`** locally.

## What the skill handles vs what you handle

The skill **helps with**:

- Requirement triage (`stripe trigger` vs fixture—see Phase 0 in `SKILL.md`)
- Fixture JSON authoring and refactoring from reference fixtures
- Static checks (reference integrity, `_meta.template_version`, path prefixes, pitfalls callouts)

The skill **does not**:

- Execute `stripe fixtures` for you (run it in your environment)
- Dynamically validate against live API responses
- Prevent live keys—that remains your Stripe CLI responsibility (prefer **`sk_test_*`** keys)

## Prerequisites

- [Stripe CLI](https://stripe.com/docs/stripe-cli) installed
- **`STRIPE_API_KEY`** pointing at **test mode** (`sk_test_...`) whenever you apply fixtures

## Installation

Replace `<owner>` with the GitHub org or username that publishes this repo (for example **`hideokamoto`**).

### `gh skill` CLI

```bash
gh skill install <owner>/stripe-fixtures-skills stripe-fixtures --pin v0.1.0
```

### `npx skills`

```bash
npx skills add <owner>/stripe-fixtures-skills --skill stripe-fixtures
```

## Repository layout

```text
stripe-fixtures-skills/
├── README.md                     # This file (English)
├── README.ja.md                   # Japanese README
├── LICENSE
└── skills/
    └── stripe-fixtures/
        ├── SKILL.md              # Agent protocol: phases, validation, output shape
        ├── README.md             # Human-oriented skill overview (Japanese)
        ├── pitfalls.md          # Known Stripe CLI fixture gotchas
        ├── reference/
        │   ├── INDEX.md          # Scenario index — read before picking a JSON base
        │   └── *.json            # Scenario templates (not guaranteed exercised on CLI)
        └── evals/
            └── evals.json
```

## Reference scenarios (starting points)

| File | Highlights |
|------|------------|
| `failing-subscription.json` | Test clock × failing card × billing cycle |
| `successful-checkout.json` | Happy-path checkout-style flow |
| `refund-and-dispute.json` | Refund / dispute-related paths |
| `connect-destination-jpy.json` | Connect + JPY destination charge |
| `bulk-customers.json` | Repeated customer pattern for bulk scaling |
| `subscription-with-trial.json` | Trial expiry and advancement |

Agents should choose the closest reference in **`reference/INDEX.md`** and adapt it—not copy verbatim.

## Example prompts

- “Build a Stripe fixture JSON that advances a test clock so the subscription invoices and fails.”
- “Expand this to bulk-create 80 test customers with the same metadata tag.”
- “Should I use `stripe trigger` or a fixture for X?”

## Contributing & issues

Open issues or PRs on this repository when reference JSON drifts against current Stripe APIs or CLI behavior changes.

## License

Apache License 2.0 — see [`LICENSE`](LICENSE).
