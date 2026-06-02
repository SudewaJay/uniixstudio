---
title: "Hello from MDX — Publishing Blogs the Easy Way"
slug: "hello-from-mdx"
excerpt: "How we publish new posts at Uniix Studio: write Markdown, commit, deploy. No CMS, no friction."
metaDescription: "A quick walkthrough of how Uniix Studio publishes blog posts using Markdown files in the repo — fast, free, and version-controlled."
primaryKeyword: "publish blog markdown"
category: "Insights"
publishDate: "2026-06-02"
coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&q=80&auto=format&fit=crop"
author:
  name: "Sudewa Jayanath"
  role: "Founder · Uniix Studio"
  initial: "S"
---

Writing a blog post should feel as light as writing a note. No CMS to log into, no third-party platform to babysit. Just a markdown file, a commit, and a deploy.

## Why Markdown in the repo

We picked the simplest stack on purpose:

- **Free forever.** No SaaS bill, no per-seat pricing, no quotas to monitor.
- **Version-controlled.** Every edit is a git diff. Easy rollback, easy review.
- **Fast.** Posts ship as static HTML at deploy time — no extra DB hop.
- **Portable.** If we ever outgrow this, MDX moves to any other framework in an afternoon.

## How to publish a new post

1. Create a new file in `content/blog/` ending in `.md` or `.mdx`.
2. Copy the frontmatter block from this post (title, slug, excerpt, etc.).
3. Write the body in standard Markdown — headings, lists, links, images all work.
4. Commit and push. Vercel rebuilds and the post is live.

## What's coming next

We'll be expanding this into a proper writing library — design system case studies, growth experiments, and field notes on building digital brands from Colombo. If there's a topic you want covered, [drop us a line](/contact).
