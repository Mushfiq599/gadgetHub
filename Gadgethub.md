# GadgetHub Next.js Assessment Prompt

Build a polished **Tech Gadget Showcase** website using **Next.js App Router** and **Firebase Authentication**. The goal is to satisfy every requirement in the assessment PDF while keeping the UI modern, responsive, and consistent.

## App concept
Create a small gadget catalog / mini e-commerce style app featuring products like:
- Wireless earbuds.
- Smartwatches.
- Mechanical keyboards.
- Power banks.
- Webcams.
- Phone accessories.
- Gaming gear.

The app should feel like a premium gadget store with clean cards, strong product imagery, clear filters, and a sleek design.

## Suggested name
**GadgetHub**

## Design direction
Use one of these styles:
- Dark modern theme with neon accents.
- Clean light theme with blue or purple highlights.
- Glassmorphism panels with subtle gradients.

A futuristic dark ecommerce look works especially well for tech gadgets.

## Site structure
Use this route structure:
- `/` — Landing page.
- `/items` — Searchable and filterable gadget list.
- `/items/[id]` — Dynamic gadget details page.
- `/about` — Simple app/about page.
- `/login` — Email/password login page.
- `/register` — Email/password register page.
- `/items/add` — Protected add item page.
- `/items/manage` — Protected manage items page.

## Landing page requirements
The landing page must contain 7 sections:

1. **Navbar**
   - Logo or app name.
   - 4+ routes.
   - Login/Register when logged out.
   - After login, show dropdown with user info, Add Item, Manage Items, and Logout.
   - Sticky and responsive.

2. **Hero**
   - Strong headline.
   - Short subtitle.
   - Primary CTA like "Browse Gadgets".
   - Optional background illustration or gradient.

3. **Featured Products**
   - 3–4 highlighted gadget cards.
   - Image/icon, title, short description, category or badge.

4. **Why Choose Us**
   - 3–4 feature boxes like fast browsing, smart filters, secure login, responsive design.

5. **Testimonials or Stats**
   - 3 testimonial cards or a simple stats strip.

6. **CTA Banner**
   - A wide banner with a message and button like "Start Exploring" or "Add Your First Product".

7. **Footer**
   - Quick links.
   - Optional social icons.
   - Copyright.

## Items page requirements
The `/items` page should be the main gadget catalog.

### Must include
- Search bar.
- At least 2 filters, such as category and price range, or rating and category.
- Minimum 6 gadget items.
- Responsive grid layout.

### Each product card must include
- Image or icon.
- Title.
- Short description in 1–2 lines.
- Button: "View Details".

### Suggested filters
- Category.
- Price range.
- Rating.
- Brand.

## Item details page requirements
The `/items/[id]` page should show full gadget information.

### Must include
- Title.
- Image.
- Full description.
- Key information / specifications.
- Related items if applicable.
- Additional info such as price, category, rating, or warranty.
- Back button to `/items`.

### Suggested detail layout
- Desktop: two-column layout.
- Left: large image.
- Right: title, specs, badges, and CTA buttons.
- Mobile: stacked layout.

## About page requirements
The `/about` page should be simple and explain the app.

### Include
- Title.
- Short description.
- Optional image or illustration.
- A brief mission statement about GadgetHub.

## Authentication requirements
Use **Firebase Authentication**.

### Required
- Email and password login/register.
- Optional Google sign-in.
- Store user state using Context API or simple global state.
- Redirect to `/` after login.

### Auth pages
- `/login`
- `/register`

## Protected pages
Protect these routes so only logged-in users can access them:

- `/items/add`
- `/items/manage`

Logged-out users should be redirected to `/login`.

## Add item page requirements
The `/items/add` page should include a form with:
- Title.
- Short description.
- Full description.
- Price, date, priority, or another relevant field.
- Optional image URL.
- Submit button.

On success, show a toast or confirmation message.

## Manage items page requirements
The `/items/manage` page should show a list of all items in a clean table or grid.

### Each row/card should include
- View action.
- Delete action.

The layout must be readable and responsive.

## Data strategy
Use simple static data or local storage for product information.

### Suggested gadget fields
- id.
- title.
- shortDescription.
- fullDescription.
- image.
- category.
- price.
- rating.
- brand.
- specs array.
- relatedIds array.

## Visual system
Keep the UI consistent across all pages:
- One primary color.
- One accent color.
- Neutral background.
- Rounded cards.
- Consistent spacing.
- Same button style everywhere.
- Clear typography hierarchy.

## Build order
1. Set up Next.js App Router and styling.
2. Build shared layout and navbar/footer.
3. Create gadget data.
4. Build `/items`.
5. Build `/items/[id]`.
6. Build `/about`.
7. Set up Firebase auth.
8. Build `/login` and `/register`.
9. Protect `/items/add` and `/items/manage`.
10. Polish responsiveness and interactions.
11. Write README and deploy to Vercel.

## Requirement checklist
Make sure the final app includes:
- Landing page with 7 sections.
- Responsive navbar with auth state.
- Items page with search and 2+ filters.
- 6+ gadget items.
- Dynamic item details page.
- About page.
- Firebase authentication.
- Protected add/manage pages.
- Clean responsive UI.
- README with project description, features, setup, and route summary.
- GitHub repo and live demo link.

## Final prompt
Build a premium **GadgetHub** website that looks like a modern tech gadget store and satisfies every requirement in the assessment PDF. Focus on polished UI, responsiveness, consistent spacing, hover/focus states, and a smooth authentication flow. Make the design elegant, practical, and easy to navigate while keeping the functionality minimal but complete.