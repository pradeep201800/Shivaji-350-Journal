# Shivraj 350 Journal Website

An original, responsive student website project for **Shivraj 350: International Peer Reviewed Multidisciplinary Journal**, published by Shivaji College, University of Delhi.

Designed and developed by **Pradeep Kumar**, Shivaji College, University of Delhi.

## Highlights

- Responsive academic editorial design
- Journal particulars aligned with the supplied ISSN India checklist
- Current issue presentation and searchable archive
- Editorial board, author guidance, peer-review and ethics sections
- Shivaji College identity with NAAC Grade ‘A’ accreditation badge
- Supplied Shivraj 350 coronation artwork, with the 2023 and 2024 ribbon dates removed, used as the journal identity mark
- Four-stage Supabase-ready manuscript submission with co-author, keyword, abstract and PDF validation
- Contact form, editorial desk email link and clearly labelled editorial-login demo
- Keyboard-friendly tabs and mobile navigation
- Ready for manual Netlify deployment

## Important content note

The archive article titles and metadata are demonstration content for the prototype. Replace them with editorially approved records and individual article PDFs before official publication. Editorial board institutional email addresses, full postal affiliations and profile links must also be verified before an ISSN application.

## Preview

Open `dist/index.html` in a browser.

On GitHub, the deployable website files are placed at the repository root so the site can be published directly from the `main` branch.

## Supabase backend

Run `supabase/schema.sql` in the Supabase SQL Editor, then add the Project URL and anon key to `dist/supabase-config.js`. Detailed beginner steps are available in `SUPABASE_SETUP.md`.

## Publish manually on Netlify

1. Sign in to Netlify and select **Add new site → Deploy manually**.
2. Drag and drop the `dist` folder into the deployment area.
3. Netlify will upload the website and provide its live link.

The separate `Shivraj-350-Netlify-Deploy.zip` package contains only the files required for manual deployment.

## Publish with GitHub Pages

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the `main` branch and `/ (root)` folder, then click **Save**.
4. The published website will be available at `https://pradeep201800.github.io/Shivaji-350-Journal/`.

## Source material

- Shivraj 350 journal cover and profile supplied for the assignment
- ISSN India detailed information document supplied for compliance reference
