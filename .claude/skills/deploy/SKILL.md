---
name: deploy
description: Run the full deployment pipeline. lint/tests → production build → push to staging.
---

Run the full deployment pipeline: lint/tests → production build → push to staging.

## Steps

1. **Run tests** — execute `npm run lint` (no test runner is configured; swap this for `npm test` once one is added). Abort if this fails.

2. **Build production bundle** — run `npm run build`. Abort if the build fails.

3. **Push to staging** — run `git push staging main`. If a `staging` remote doesn't exist, inform the user and show the command to add one:
   ```
   git remote add staging <STAGING_REMOTE_URL>
   ```

After each step, report success or failure clearly. If any step fails, stop immediately and show the full error output so the user can fix it before retrying.
