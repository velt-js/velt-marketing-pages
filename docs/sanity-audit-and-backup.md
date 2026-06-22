# Sanity audit logging and backups

Project: `fk9mezqa`  
Dataset: `production`

## What is already implemented in this repo

- `POST /api/sanity-audit`
  - Receives Sanity webhook events.
  - Accepts `create`, `update`, and `delete` events.
  - Posts an audit message to Slack when `SANITY_AUDIT_SLACK_WEBHOOK_URL` is set.
  - Requires `SANITY_AUDIT_WEBHOOK_SECRET`.
- `.github/workflows/sanity-backup.yml`
  - Exports the `production` dataset every day.
  - Stores the `.tar.gz` export as a GitHub Actions artifact for 30 days.
  - Can also be run manually from GitHub Actions.

## Required Vercel environment variables

Add these to the production Vercel project:

```text
SANITY_AUDIT_WEBHOOK_SECRET=<random long secret>
SANITY_AUDIT_SLACK_WEBHOOK_URL=<Slack incoming webhook URL>
```

`SANITY_AUDIT_WEBHOOK_SECRET` is the value the Sanity webhook must send either as:

- `Authorization: Bearer <secret>`
- `x-sanity-audit-secret: <secret>`
- or, if custom headers are not available in the Sanity UI, as `?secret=<secret>` in the webhook URL.

Prefer headers over query params when the dashboard supports custom headers.

## Required GitHub secret

Add this secret to the GitHub repository:

```text
SANITY_BACKUP_TOKEN=<Sanity token with permission to export the production dataset>
```

A viewer/read token is preferred if Sanity allows exports with it. If export fails with viewer access, use an editor token dedicated only to backups.

## Sanity webhook setup

In Sanity Manage:

1. Open project `fk9mezqa`.
2. Go to **API → Webhooks**.
3. Create a webhook named `Velt audit log`.
4. URL:

   ```text
   https://velt.dev/api/sanity-audit
   ```

   If custom headers are not available:

   ```text
   https://velt.dev/api/sanity-audit?secret=<SANITY_AUDIT_WEBHOOK_SECRET>
   ```

5. Trigger on:
   - `create`
   - `update`
   - `delete`
6. Filter:

   ```groq
   _type in ["featurePage", "blogPost", "integrationPage", "libraryPage", "migrationPage", "useCasePage"]
   ```

7. Projection:

   ```groq
   {
     "projectId": sanity::projectId(),
     "dataset": sanity::dataset(),
     "_id": _id,
     "_type": _type,
     "operation": delta::operation(),
     "title": coalesce(title, name),
     "slug": slug.current,
     "_rev": _rev,
     "_updatedAt": _updatedAt,
     "before": before() {
       _type,
       title,
       name,
       slug
     },
     "after": after() {
       _type,
       title,
       name,
       slug
     }
   }
   ```

8. Add the auth header if the UI supports it:

   ```text
   Authorization: Bearer <SANITY_AUDIT_WEBHOOK_SECRET>
   ```

9. Save and use the webhook attempts log to verify delivery.

## Free-plan limitation

The Free Sanity plan does not allow custom roles. Editor tokens can mutate content and may still be able to delete documents. This setup does not prevent all deletes; it makes them visible quickly and gives us daily backups to restore from.

To prevent Maintouch from deleting while still allowing updates, Velt needs either:

- a Sanity plan with custom roles, or
- a controlled internal API where Maintouch submits changes and our code decides which mutations are allowed.

## Restore command

Download a backup artifact from GitHub Actions, then run:

```bash
npx sanity@latest datasets import sanity-production-YYYY-MM-DDTHH-MM-SSZ.tar.gz production --project-id fk9mezqa
```
