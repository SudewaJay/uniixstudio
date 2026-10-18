# Blog 03: Payment Gateways for Sri Lankan Websites: A Practical 2026 Guide

> **Source of truth:** `content/blog/payment-gateway-sri-lanka-website.mdx`. This file is a generated snapshot of that MDX for review and handover. If you edit the article, edit the MDX (or the post in the CMS), not this file.

## SEO metadata

| Field | Value |
|---|---|
| H1 | Payment Gateways for Sri Lankan Websites: A Practical 2026 Guide |
| Search title (`seoTitle`, also the meta title) | Payment Gateway for Websites in Sri Lanka: 2026 Guide (53 chars) |
| URL | `https://www.uniixstudio.com/blog/payment-gateway-sri-lanka-website/` |
| Slug | `payment-gateway-sri-lanka-website` |
| Meta description | How to accept online payments on a Sri Lankan website: local gateways compared, published fees, what to ask providers and how to integrate them safely. (151 chars) |
| Primary keyword | payment gateway Sri Lanka |
| Secondary keywords | online payment gateway Sri Lanka, PayHere vs WEBXPAY, accept card payments website Sri Lanka, internet payment gateway Sri Lanka, Stripe Sri Lanka alternative, WooCommerce payment gateway Sri Lanka |
| Category | Technology |
| Planned go-live | 2026-11-03 |
| Canonical | `https://www.uniixstudio.com/blog/payment-gateway-sri-lanka-website/` (set by the template) |
| Robots | index, follow (template default) |
| Open Graph image | `/blog/payment-gateway-sri-lanka-website/og.jpg` (1200×630) |
| Cover image | `/blog/payment-gateway-sri-lanka-website/hero.webp` (1600×900). Alt: "Illustration of a phone checkout showing an LKR total with card, mobile wallet and online banking options, beside a diagram of the website, payment gateway and bank behind it" |
| Structured data | BlogPosting + BreadcrumbList. FAQPage off. |
| Author | Uniix Studio (organisation byline) |
| Body length | about 1,583 words, plus 6 FAQs |

## Strategy brief

| | |
|---|---|
| Search intent | Informational with commercial follow-through: how to take online payments and which gateway to choose. |
| Target reader | Online shops, service businesses taking deposits, booking platforms and tour operators. |
| Reader's problem | International advice says 'use Stripe', which isn't available; local options and fees are unclear. |
| Unique angle | Verified, dated facts (Stripe and Shopify Payments availability, PayHere's published fees), a cost formula, ten questions for providers and safe integration practice. |
| Funnel stage | Middle |
| Primary conversion | Payment integration quote via /contact/ (CTA: Get a payment integration quote). |
| Supporting service page | `/services/technology/ecommerce/` |
| Related services (template block) | `/services/technology/ecommerce/`, `/services/technology/web-development/`, `/services/technology/wordpress/` |
| Related posts (template block) | `/blog/ecommerce-website-development-sri-lanka-guide/`, `/blog/shopify-vs-woocommerce-sri-lanka/`, `/blog/online-booking-system-sri-lanka/` |
| Why selected | Outdated and vendor-dominated SERP; supports e-commerce and booking work; corrects unverified claims in older posts. |

## Images

| File (`public/blog/payment-gateway-sri-lanka-website/`) | Shows |
|---|---|
| `hero.webp / og.jpg` | Checkout in LKR with payment options and the flow behind it |
| `payment-flow.svg` | Six-step payment flow showing server notification versus browser redirect |

All images are original vector illustrations in the brand palette, rendered by a script. No stock photography.

## Key takeaways (shown beside the intro)

- Stripe doesn't list Sri Lanka as a supported country, and Shopify Payments isn't available here, so Sri Lankan businesses use a local internet payment gateway.
- The main choices are non-bank gateways such as PayHere, WEBXPAY and PAYable, or a bank's own gateway. Compare total cost, supported payment methods, settlement time and how well each fits your platform.
- Integrate safely: let the gateway handle card details, confirm orders from its server notification rather than the browser redirect, and test refunds as well as payments.

## CTA block

- **Heading:** Adding online payments to your website?
- **Copy:** Tell us what you sell and how customers pay today. We'll recommend a gateway setup that fits your platform and integrate it properly, including refunds and failed payments.
- **Button:** Get a payment integration quote → `/contact/`

---

# Payment Gateways for Sri Lankan Websites: A Practical 2026 Guide

You've built a website that sells something: products, bookings, courses, memberships or services. Now you want customers to pay online. If you've read international guides, they all say "just add Stripe". In Sri Lanka, you can't.

Stripe doesn't list Sri Lanka among its [supported countries](https://stripe.com/global), and Shopify's own payment service isn't [available here](https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries) either. Sri Lankan businesses accept online payments through a local internet payment gateway, and choosing one involves trade-offs that international guides don't cover.

This guide explains how online payments work here, how the main options compare, what fees look like and how to integrate a gateway so it doesn't cause problems later.

## How do you accept online payments on a Sri Lankan website?

To accept online payments on a Sri Lankan website, you sign up with a local internet payment gateway (IPG), either a non-bank provider such as PayHere, WEBXPAY or PAYable, or your bank's own gateway. After verification, you integrate it into your website through a plugin or API. Customers pay on the gateway's secure page by card, mobile wallet or online banking, and the money is settled to your Sri Lankan bank account, minus the gateway's fee.

## How online payments work in Sri Lanka

Four parties are involved in every online card payment:

1. **Your customer**, paying with a card, wallet or bank account.
2. **Your website**, which sends the order total to the gateway.
3. **The payment gateway**, which collects the payment details securely and processes the transaction.
4. **The acquiring bank**, which receives the money from the card networks and settles it to you.

Non-bank gateways work with partner banks behind the scenes. PayHere, for example, describes itself as operating with Central Bank approval in partnership with local banks, and WEBXPAY refers to its partner banks and adherence to Central Bank of Sri Lanka regulations. For you, the difference is mostly practical: how quickly you're approved, what it costs, which payment methods are supported and how easy it is to integrate.

![Diagram of an online payment in Sri Lanka: the customer pays on the gateway's hosted page, the gateway processes the payment with its partner bank, notifies your website's server, and settles funds to your bank account](/blog/payment-gateway-sri-lanka-website/payment-flow.svg "Your website should confirm the order when the gateway's server notification arrives, not when the customer's browser returns.")

## Your main options

### Non-bank payment gateways

These providers focus on online businesses and usually offer ready-made plugins, clear onboarding and support for local payment methods.

- **PayHere** says it accepts major credit cards, mobile wallets and internet banking, and lists plugins for WooCommerce, Shopify, Magento, OpenCart, PrestaShop and WHMCS, plus mobile and JavaScript SDKs and a recurring-payments API. It is one of the few providers that publishes its fees.
- **WEBXPAY** lists cards, LankaQR and mobile wallets including FriMi, mCash, eZ Cash and JustPay, as well as instalment plans and tokenisation for returning customers. It doesn't publish pricing on its homepage.
- **PAYable IPG** lists Visa, Mastercard, American Express, Diners Club, UnionPay and Discover cards and says it works with plugins such as WooCommerce. Pricing is by enquiry. On [CricBook](/portfolio/cricbook/), the sports booking platform we built, players pay through PAYable by card, FriMi or eZ Cash, or pay cash at the venue where allowed.

These descriptions come from each provider's own website in October 2026. Features change, so confirm the details with them directly.

### Bank internet payment gateways

Several Sri Lankan commercial banks offer their own internet payment gateways to merchants. They can make sense if you already bank there, process high volumes or need a direct relationship with the acquiring bank. Integration often involves more developer work than a plugin-based provider, so ask what documentation, test environment and plugins are available.

### Payment links and invoices

If you don't need a full checkout, many gateways offer payment links or invoices you can send by WhatsApp or email. This works well for service businesses, deposits and custom orders, and needs no website integration at all.

## What do payment gateways cost?

Most gateways charge a percentage of each transaction. Some offer plans with a monthly fee in exchange for a lower rate. As an example of how pricing is structured, these are the rates published on PayHere's fees page when we checked in October 2026:

| PayHere plan | Monthly fee | Local payments | Foreign-currency payments |
|---|---|---|---|
| Lite | None | 3.30% | 3.30% + 1.0% |
| Plus | LKR 3,990 | 2.99% | 2.99% + 1.0% |
| Premium | LKR 9,990 | 2.69% | 2.69% + 1.0% |

PayHere's page also lists separate plans for education and government organisations, an extra 0.5% for American Express, Discover and Diners Club cards, and per-payment and monthly limits on some plans. Check the [current PayHere fees](https://www.payhere.lk/fees/) before relying on these figures, and get written quotes from the other providers.

To compare fairly, estimate your monthly sales and work out the total cost on each plan:

> Monthly cost = monthly fee + (monthly sales × transaction rate)

At low volumes, a plan with no monthly fee is usually cheaper even with a higher rate. As sales grow, a monthly plan can pay for itself. Also check for setup fees, refund fees, chargeback fees and any minimum monthly charge.

### Platform fees count too

If your store runs on Shopify, remember that Shopify charges a [third-party transaction fee](https://help.shopify.com/en/manual/payments/third-party-gateways/fees) when you use an external gateway, on top of the gateway's own fee. WooCommerce doesn't add a platform transaction fee. Our comparison of [Shopify and WooCommerce in Sri Lanka](/blog/shopify-vs-woocommerce-sri-lanka/) covers this in more detail.

## Questions to ask every provider

Before you sign up, ask each gateway the same questions and get the answers in writing:

1. **What is the total cost** at our expected monthly sales, including monthly, setup, refund and chargeback fees?
2. **Which payment methods are supported?** Local and foreign cards, American Express, mobile wallets, LankaQR, online banking, instalments?
3. **Can we accept foreign cards and currencies,** and what extra fees apply?
4. **How long does settlement take,** and to which banks?
5. **What documents are needed,** and how long does approval usually take?
6. **Is there a plugin for our platform,** and who maintains it?
7. **Is there a sandbox** for testing before we go live?
8. **How do refunds and disputes work,** and can we issue refunds from our own admin?
9. **Do you support recurring payments or saved cards,** if we need subscriptions or repeat bookings?
10. **What support do we get** when a payment fails at 9 pm on a Saturday?

<aside data-tone="insight">

**Choose with your customers in mind.** If most of your buyers pay by mobile wallet, a gateway with a cheaper card rate but no wallet support may cost you sales. Look at how your customers pay today, through WhatsApp orders, bank transfers and cash, before comparing rates.

</aside>

## How to integrate a gateway safely

A gateway that's integrated badly causes lost orders, double charges and angry customers. These are the practices we follow on every [e-commerce](/services/technology/ecommerce/) and booking project.

**Let the gateway handle card details.** Use the gateway's hosted checkout page or its secure embedded form, so card numbers never pass through or get stored on your server. This keeps your security responsibilities much smaller.

**Confirm orders from the server notification.** Gateways send your server a notification when a payment succeeds or fails, usually with a signature you can verify. Mark the order as paid only when that verified notification arrives. Don't rely on the customer returning to your "thank you" page, because they may close the tab, lose signal or try to fake a success URL.

**Handle every outcome.** Design for success, failure, cancellation and "pending". Tell the customer clearly what happened and what to do next. For bookings, release any held slot when payment fails.

**Test refunds, not just payments.** Run test transactions in the sandbox, then a few real low-value payments and refunds before launch.

**Show prices in LKR,** and be clear about any fees or currency conversion before the customer pays.

**Keep other payment methods working.** Cash on delivery, cash at the counter and bank transfers are still common in Sri Lanka. Record them in the same system as card payments so your reports are complete.

## Which setup fits your business?

| Business | A sensible starting setup |
|---|---|
| Small online shop on WooCommerce or Shopify | A non-bank gateway with a ready-made plugin, plus cash on delivery |
| Service business taking deposits | Payment links or invoices, sent after a WhatsApp conversation |
| Booking platform or venue | A gateway integrated with holds and server notifications, plus cash at the venue |
| Tour operator selling to foreign customers | A gateway that accepts foreign cards, with currency fees priced in |
| High-volume retailer | Compare non-bank providers with your bank's gateway on total cost and settlement |

Our [e-commerce development guide](/blog/ecommerce-website-development-sri-lanka-guide/) covers platform choice in more depth, and our guide to [online booking systems](/blog/online-booking-system-sri-lanka/) covers payments for bookings.

## The short version

Stripe isn't an option for Sri Lankan businesses, but local gateways cover cards, mobile wallets and online banking well. Choose based on how your customers pay, your expected sales and your platform, compare the total cost in writing, and integrate carefully: hosted checkout, server-side confirmation and tested refunds.

If you'd like help choosing and integrating a gateway, our [web development](/services/technology/web-development/) team can set it up and test it end to end.

## Frequently asked questions

### Can I use Stripe in Sri Lanka?

Not with a Sri Lankan business. Stripe's global availability page doesn't list Sri Lanka as a supported country. Sri Lankan businesses usually integrate a local gateway such as PayHere, WEBXPAY, PAYable or a bank's internet payment gateway instead.

### Which payment gateway is best in Sri Lanka?

There isn't one best gateway for every business. The right choice depends on your expected monthly sales, the payment methods your customers use, whether you sell to foreign customers, your website platform and how quickly you need money settled. Get current quotes from at least two providers and compare the total cost.

### How much do Sri Lankan payment gateways charge?

Most charge a percentage of each transaction, and some add a monthly fee on plans with lower rates. When we checked PayHere's published fees in October 2026, its plans listed rates between 2.69% and 3.30% for local payments, with an extra 1% for foreign-currency payments. Other providers quote on request, so ask for a written quote.

### Do I need a registered business to get a payment gateway?

Generally, yes. Gateways must verify who they are paying, so expect to provide business registration documents, owner identification, bank account details and information about your website. Requirements differ by provider, so ask for their document list before you apply.

### Does Shopify work with Sri Lankan payment gateways?

Yes, through third-party payment providers, because Shopify Payments isn't available in Sri Lanka. Shopify charges a third-party transaction fee on those payments in addition to the gateway's own fee, so include both when comparing Shopify with WooCommerce.

### Should I still offer cash on delivery or bank transfer?

Often, yes. Many Sri Lankan customers still prefer cash on delivery, cash at the counter or a bank transfer, especially for first purchases. Offer the options your customers actually use, and make sure your website records every payment method in one place.
