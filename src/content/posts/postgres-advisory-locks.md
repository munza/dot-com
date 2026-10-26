---
title: Postgres advisory locks for one-off jobs
description: You probably don't need a distributed lock service to stop a cron job running twice.
pubDate: 2026-10-15
tags: [postgres, guide, Background jobs]
---

We run the same container on three nodes, and every node runs the nightly billing export. We only want one of them to do it. Before reaching for Redis or ZooKeeper, check the database you already have.

## Try the lock, don't wait for it

`pg_try_advisory_lock` takes a 64-bit key and returns immediately: `true` if you got the lock, `false` if another session holds it.

```sql
SELECT pg_try_advisory_lock(hashtext('billing-export'));
```

The lock belongs to the database session, so it's released when the job's connection closes, even if the process crashes.

## In application code

```python
def run_exclusively(conn, name, job):
    with conn.cursor() as cur:
        cur.execute("SELECT pg_try_advisory_lock(hashtext(%s))", (name,))
        if not cur.fetchone()[0]:
            return  # another node is already running it
        try:
            job()
        finally:
            cur.execute("SELECT pg_advisory_unlock(hashtext(%s))", (name,))
```

## Watch out for

- **Connection poolers.** In PgBouncer's transaction mode your session can change between statements, so the lock may not be yours when you unlock it. Use a direct connection for the job.
- **Hash collisions.** `hashtext` returns 32 bits. With a handful of job names that's fine; with thousands, assign keys yourself.
