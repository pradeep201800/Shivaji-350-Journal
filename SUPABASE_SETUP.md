# Simple Supabase Setup — Shivraj 350

Project owner and developer: Pradeep Kumar

This project uses a beginner-friendly static frontend and Supabase as the backend. No Node.js server is required.

## Languages used

- HTML: page structure and manuscript form
- CSS: design, layout and mobile responsiveness
- JavaScript: validation, co-author fields, PDF upload and database request
- SQL: database table, private file bucket and access policies

## Connect the form

1. Create a free project at https://supabase.com.
2. Open **SQL Editor**, create a new query, paste the complete contents of `supabase/schema.sql`, and click **Run**.
3. Open **Project Settings > API**.
4. Copy the **Project URL** and **anon / publishable key**.
5. Open `dist/supabase-config.js` and replace the two placeholder values.
6. Open the website and submit one test PDF under 10 MB.
7. Check the result in **Table Editor > manuscript_submissions** and the PDF in **Storage > manuscripts**.

## How the form works

1. JavaScript checks required fields, 200–250 abstract words, 4–6 keywords and PDF size/type.
2. The PDF is uploaded to the private `manuscripts` Storage bucket.
3. The author and article details are inserted into the `manuscript_submissions` table.
4. Supabase returns success and the page shows a short reference ID.

## Important security rules

- Use only the anon/publishable key in `supabase-config.js`.
- Never put the `service_role` key in HTML or JavaScript.
- The Storage bucket is private and the SQL does not allow public reading.
- This student version uses the Supabase dashboard for editorial review. A separate secure editor dashboard can be added later.
- For official public use, add CAPTCHA/rate limiting to reduce spam submissions.
