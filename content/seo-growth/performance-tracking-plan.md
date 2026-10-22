# Performance tracking plan

Goal: connect each article's search visibility to qualified enquiries, not just traffic.

## 1. Baseline (honest status)

| Source | Status on 18 Oct 2026 | Baseline recorded |
|---|---|---|
| Google Search Console | Not accessible to this work (the Supermetrics connector is present but not authenticated) | **None.** Record it yourself (below) |
| Google Analytics 4 | Tag `G-JFLVMPFLKR` is live on the site; no API access | **None** |
| Vercel Analytics / Speed Insights | Installed in the app; no dashboard access | **None** |
| Lead source in the CMS | Contact submissions store a `source` field | Available in Payload admin → Enquiries |

The five URLs are new, so their own baseline is zero by definition. What's worth recording before launch is the **site-level** baseline, so later growth can be put in context.

### Record before 20 Oct 2026 (10 minutes)

In Search Console → Performance → Search results, last 28 days, web search:
- Total clicks, impressions, average CTR, average position
- Queries tab: filter for queries containing `booking`, `payment gateway`, `clinic`, `lab`, `sinhala`, `tamil`, `domain`, `.lk`, and note any existing impressions. These show whether older pages already get impressions for the new topics.

In GA4 → Reports → Engagement → Landing page, last 28 days: organic sessions and engaged sessions to `/blog/`.

Paste the figures into the table in section 5.

## 2. Tracking setup

### Built in this branch

| Event | Fires when | Parameters | Code |
|---|---|---|---|
| `generate_lead` | The contact form submits successfully | `form_name: "contact"`, `lead_source` | `components/ContactForm.tsx` |
| `contact_click` | Any click on a WhatsApp (`wa.me`, `api.whatsapp.com`), `tel:` or `mailto:` link | `method` (whatsapp, phone or email), `page_path` | `components/ThirdPartyScripts.tsx` |
| Lead `source` in the CMS | Every contact submission | Form page plus the same-site page the visitor came from, e.g. `/contact/ ← /blog/payment-gateway-sri-lanka-website/` | `components/ContactForm.tsx` |

These fire only where GA4 is loaded, and they were not exercised at runtime in testing (GA4 isn't configured locally, and a test submission would send real email). Verify them after deployment with GA4 DebugView.

### To do in GA4 (once, about 15 minutes)

1. **Admin → Events:** after the events start arriving (allow 24 hours), mark `generate_lead` and `contact_click` as **key events**.
2. **Admin → Custom definitions:** create event-scoped dimensions for `method`, `lead_source` and `form_name`.
3. **Explore → Free form:** rows = Landing page, columns = Event name, filter Session default channel group = Organic Search, values = Event count. Save as "Organic articles → enquiries".
4. **Link Search Console** to GA4 (Admin → Product links) so landing pages show queries.

### To do in Search Console

1. Confirm `https://www.uniixstudio.com/sitemap.xml` is submitted and processed.
2. On each go-live date, URL Inspection → Request indexing for the new URL.
3. Optional: connect Search Console to the Supermetrics connector so future reviews can pull query data directly.

## 3. Metrics per article

| Layer | Metric | Source |
|---|---|---|
| Discovery | Indexed (yes/no), first impression date | Search Console URL Inspection, Performance |
| Visibility | Impressions, average position, top 10 queries | Search Console, filtered by page |
| Click-through | Clicks, CTR | Search Console |
| Engagement | Organic landing sessions, engaged sessions, average engagement time | GA4 landing page report |
| Intent | `contact_click` by method, from sessions landing on the article | GA4 exploration |
| Conversion | `generate_lead` from sessions landing on the article; CMS submissions whose `source` includes the article path | GA4, Payload admin |
| Quality | Qualified leads (fits services and budget) | Manual tag in the CMS or a spreadsheet; this is the number that matters |
| AI visibility | Whether ChatGPT, Perplexity, Gemini or Google AI Overviews cite the article for its target question | Manual spot checks (see below) |

### AI answer spot checks (monthly, manual)

Ask each assistant the article's main question in plain words, for example "How do I accept online payments on a website in Sri Lanka?" Record whether uniixstudio.com is cited or linked. Use a logged-out or private session where possible. These checks are anecdotal and can't be guaranteed or controlled; treat them as a signal, not a KPI.

## 4. Review schedule

Count from each article's real go-live date.

| Review | When | What to look at | Typical actions |
|---|---|---|---|
| Indexing check | Day 3–7 | Indexed? Any coverage errors? | Request indexing; check internal links were added |
| **Day 28** | ~4 weeks | First impressions and queries; unexpected queries | Fix title or description if CTR is far below the site average for similar positions; add a section for a strong unexpected query |
| **Day 60** | ~8 weeks | Positions 5–20 (page one is within reach); engagement | Strengthen the sections that match the ranking queries; add internal links from relevant high-traffic pages |
| **Day 90** | ~13 weeks | Enquiries and qualified leads attributed to the article | Keep, improve, merge or refocus. Update dated facts (fees, prices, legal dates) |

### Decision rules

- **Impressions but CTR well below similar pages:** rewrite the title and description to match the dominant query. Don't change the URL.
- **Positions 8–20 for a relevant query:** improve the section that answers it and add two or three internal links with descriptive anchors.
- **Traffic but no enquiries:** check that the CTA matches the reader's stage. Top-of-funnel posts (.lk domains) should point to a next article or the packages guide, not only the contact form.
- **Irrelevant traffic** (e.g. job seekers, students): tighten the intro and headings to the business audience.
- **Two Uniix pages swapping positions for the same query:** consolidate them, or clearly differentiate them and link from one to the other.
- **Facts age quickly:** re-check gateway fees, domain prices and PDPA dates every quarter and update `updatedDate` when the content changes substantively.

## 5. Results log

| Article | Go-live | Indexed | D28 impr. / clicks / pos. | D60 impr. / clicks / pos. | D90 impr. / clicks / pos. | Contact clicks (90d) | Leads (90d) | Qualified (90d) |
|---|---|---|---|---|---|---|---|---|
| Online booking systems | 20 Oct 2026 | | | | | | | |
| Medical lab & clinic websites | 27 Oct 2026 | | | | | | | |
| Payment gateways | 3 Nov 2026 | | | | | | | |
| Multilingual websites | 10 Nov 2026 | | | | | | | |
| .lk domain registration | 17 Nov 2026 | | | | | | | |
| *Site baseline (28 days before 20 Oct)* | — | — | | — | — | | | |
