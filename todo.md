# MisyarMatch — Project TODO

## Phase 1: Design System & Foundation
- [x] Configure Valentine romantic design system (deep rose #9f1239, blush, cream, burgundy)
- [x] Add Playfair Display + Inter fonts via Google Fonts CDN
- [x] Update index.css with full CSS variable palette and global typography
- [x] Update index.html with full SEO: OG tags, Twitter Card, JSON-LD, hreflang, theme-color
- [x] Add robots.txt and sitemap.xml to client/public

## Phase 2: Database & Backend
- [x] Extend drizzle/schema.ts: profiles, interests, matches, private_messages, chat_queue, chat_sessions, chat_messages, notifications, compatibility_insights tables
- [x] Run migration and apply SQL
- [x] Add all DB helper functions in server/db.ts
- [x] Add profile tRPC router (create, update, get, list, getByUserId)
- [x] Add interests tRPC router (express, check, list)
- [x] Add matches tRPC router (list, getMatch)
- [x] Add messages tRPC router (send, list for match)
- [x] Add notifications tRPC router (list, markRead, unreadCount)
- [x] Add speedChat tRPC router (join queue, start session, send message, connect, skip)
- [x] Add compatibility insights tRPC router (generate, get)
- [x] Add admin tRPC router (CSV import + stats)
- [x] Add photo upload tRPC router (S3-backed)
- [x] Add browse tRPC router (list with filters, interest status)
- [x] Add payments tRPC router (Stripe Checkout Session + status)
- [x] Stripe webhook handler at /api/stripe/webhook

## Phase 3: Global Layout & Navigation
- [x] Build Navbar with logo, nav links, auth state, notification badge
- [x] Build Footer with links and support emails
- [x] Build Layout wrapper component
- [x] Configure all 16 routes in App.tsx
- [x] Install and configure react-helmet-async
- [x] SEOHead component for per-page Helmet blocks
- [x] CircumstancesBadge reusable component

## Phase 4: Informational & Marketing Pages
- [x] Home / Landing page (hero, how it works, testimonials, CTA)
- [x] /auth — login page with Manus OAuth
- [x] /what-is-misyar — Islamic scholarly explanation
- [x] /how-it-works — step-by-step platform guide
- [x] /why-misyar-works — editorial content
- [x] /faq — comprehensive FAQ
- [x] /safety — Safety Center with red flags, tips, guidelines
- [x] /pricing — tiered pricing (sisters free, brothers freemium/premium) with Stripe CTA

## Phase 5: Profile System
- [x] /profile/create — 4-step wizard (gender → age → circumstances → intention)
- [x] /profile/edit — edit existing profile
- [x] /profile/:userId — view member profile
- [x] S3-backed photo uploader component
- [x] Circumstances badge component (reusable)
- [x] Photo blur/reveal logic based on mutual interest

## Phase 6: Browse Page
- [x] /browse — opposite-gender profile cards with circumstances badges
- [x] Filters: location, marital status, circumstances
- [x] Blurred photo cards (reveal on mutual interest)
- [x] Express interest button on profile cards

## Phase 7: Speed Chat, Matches, Messages, Notifications
- [x] /speed-chat — Omegle-style anonymous 5-minute chat
- [x] Circumstances badge shown before chat starts
- [x] 5-minute countdown timer with early end option
- [x] Skip and Connect buttons at session end
- [x] /matches — list of mutual matches with AI compatibility insight
- [x] /messages — private messaging for matched couples (no read receipts)
- [x] /notifications — notification center with unread count in navbar

## Phase 8: Payments, LLM Insights, Admin
- [x] Stripe Checkout Session for brothers premium tier (£19.99/month)
- [x] Stripe webhook upgrades user on checkout.session.completed
- [x] LLM Islamic compatibility insight generation (server-side, <150 words)
- [x] CompatibilityInsight component displayed on Matches page
- [x] Admin CSV import tool (/admin/import) with role guard
- [x] Admin stats dashboard

## Phase 9: SEO Assets
- [x] Generate 1200x630 branded OG social preview image
- [x] Upload OG image and wire into index.html
- [x] sitemap.xml covers all public pages
- [x] All pages have unique Helmet blocks

## Phase 10: Tests & Delivery
- [x] Write Vitest tests (20 tests across auth, circumstances, tiered access, speed chat, CSV import, SEO, Stripe)
- [x] All 20 tests passing
- [x] TypeScript compiles with zero errors
- [x] Dev server running and healthy
- [x] Checkpoint saved

## Phase 11: Site Improvements (Paste Instructions)

### Privacy Features
- [ ] Invisible Mode toggle (browse without appearing in Who Viewed Me)
- [ ] Hide from Search option (profile only visible to liked/matched users)
- [ ] Self-destructing messages (1h / 24h / 7d timer)
- [ ] End-to-end encryption trust badge on chat windows
- [ ] Homepage "Your Privacy is Sacred" section with 5 bullet points
- [ ] Confirm display name / alias enforced (no real name required)

### Geo-Based Pricing & VIP Tier
- [ ] IP geolocation via ip-api.com to detect user country
- [ ] Localized pricing display: SAR, AED, KWD, QAR, BHD, EGP, USD
- [ ] VIP tier: $29.99/month (priority placement, see who liked you, unlimited likes, VIP badge)
- [ ] Update Stripe products.ts with Premium + VIP tiers
- [ ] Update Pricing page with geo-detected local currency and two-tier cards
- [ ] Khatba comparison table on homepage

### Women-First UX
- [ ] Women-only first message (Bumble-style enforcement in messages router)
- [ ] "Who Liked Me" page — free for women, premium-gated for men
- [ ] Profile verification badge (optional, free for women)
- [ ] Block & Report with instant hide from feed
- [ ] Homepage "Built for Sisters First" section

### Arabic / RTL Support
- [ ] Language context (EN/AR) with localStorage persistence
- [ ] Auto-detect Arabic browser language or Gulf IP → default to Arabic
- [ ] Language toggle in Navbar
- [ ] RTL layout support (dir="rtl", Tailwind RTL classes)
- [ ] Full Arabic translations for all marketing copy
- [ ] Arabic hero copy on homepage
- [ ] SAR default pricing for Arabic users

### Trust Signals & Social Proof
- [ ] "18+ Verified" and "Shariah-Compliant" badges in hero
- [ ] Animated member counter ("Join 10,000+ Muslims")
- [ ] Testimonials section with anonymous success stories
- [ ] "Success Stories" section on homepage
- [ ] Blog posts: 3 SEO-targeted articles at /blog
