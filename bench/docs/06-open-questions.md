# What to settle before someone builds this

Same list as the prototype's `#/h/open` screen, grouped by blast radius.

## Changes the build

**Does an agent run as the user, or as a service account?**
Per-user OAuth is what the prototype draws and what a regulated broker's compliance team
will accept — an agent can never read what its installer can't. But every install
triggers a consent screen, and a scheduled agent silently breaks when a token expires.
A service account is smoother and much harder to defend. This is the biggest fork.

**What happens when an admin publishes a breaking change?**
Drawn as: installs auto-advance, params never migrate silently, a removed key is dropped
and a new key takes its default. The alternative — users opt into each version —
fragments the team's practice, which is the thing the whole thesis is against.

**Who owns an agent when its author leaves?**
Four people authored half the agents in this prototype. The object has one `author_id`.
Team ownership with a named maintainer is probably right; it changes the permissions model.

**Is the outcome metric computed by the platform or read from the source system?**
Reading from HubSpot / Gmail / policy-admin is credible but means a connector per metric.
Computing from the platform's own run data is easy and unconvincing. Drawn as
source-system, which is the harder build.

## Changes the pitch

**Replacing individual AI seats, or layering on top?**
The cost screen argues replacement. But the top performers will keep their own seats to
build with — which makes the real story "10 builder seats + 78 platform licences". That's
a better story and a different price card.

**Whose logo is on this — Sarvam's or the customer's?**
Decides whether there's a store across customers (one broker installs an agent another
broker built) or strictly per-tenant. Cross-tenant is a much bigger moat and a much harder
sell in insurance.

**What is a licence metered on?**
Per seat is legible. Per run is fair. Per outcome — Sierra's model — is the most aligned
and the hardest to contract. The prototype assumes per seat plus metered runs.

## Changes the first team

**Sales or Account Management first?**
AM's metrics are already numbers in a system — endorsement TAT, CD balance, renewal
retention. Sales has the better story and the more visible top performer. AM is the
easier pilot; Sales is the better case study.

**Does the pilot need WhatsApp on day one?**
Two of the three dormant users in the prototype blame WhatsApp. In Indian B2B sales this
may not be optional.

**Who at the customer actually authors agents?**
Everything here assumes a top performer who *wants* to build. If that person doesn't
exist, the platform needs a services motion for the first five agents — and that is a
different company.

## Deliberately not drawn

| | |
|---|---|
| **Mobile** | The feed and approvals are obviously phone surfaces. Everything else isn't. The prototype lays out at phone width but isn't designed for it. |
| **Day-one onboarding** | Someone with zero installs. Probably the highest-leverage screen in the product, and it isn't drawn. |
| **The agent runtime** | No tool-calling UI, no error states, no retry. A run that fails halfway is drawn as if it can't happen. |
| **Search** | Eleven agents don't need it. Two hundred do. |
| **Billing** | No plan page, no usage meter, no overage. The cost comparison is an argument, not a bill. |
