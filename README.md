# MANAS COLLEGE — Resume Studio

A GitHub Pages-ready ATS resume builder with **20 distinct professional resume templates**, a red Manas College theme, profile photo upload, live preview, ATS keyword analysis, multi-resume library, local autosave, JSON backup/restore and PDF export.

## Run locally
Open `index.html` in a modern browser, or use VS Code Live Server.

## Deploy to GitHub Pages
1. Create a GitHub repository (for example `manas-college-resume-studio`).
2. Upload `index.html`, `styles.css`, `app.js`, and `supabase_schema.sql` to the repository root.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**, choose `main` and `/(root)`, then Save.

## 20 templates
1. Modern Professional
2. Minimal Classic
3. Executive Slate
4. Tech Talent
5. Creative Edge
6. Compact One-Page
7. Academic CV
8. Bold Impact
9. Sidebar Profile
10. Elegant Serif
11. Modern Blue
12. Startup Green
13. Nordic Clean
14. First Job
15. Global Standard
16. Crimson Corporate
17. Monochrome Pro
18. Portfolio Grid
19. Consultant Plus
20. Graduate Launch

## Features
- 20 selectable resume layouts with distinct typography, spacing, borders and accent treatments
- Optional profile photo upload (JPG, PNG, WebP; up to 3 MB), resize/compression and remove option
- Personal details, professional summary, work experience, education, skills, projects, certifications, languages, awards, volunteering and interests
- Repeatable experience, education, project and certification sections
- Live resume preview and print-to-PDF
- Create, duplicate and delete multiple resumes
- Browser local autosave and JSON export/import
- Job description keyword matching with matched/missing terms and improvement suggestions

## Important limitations
This GitHub Pages edition stores each visitor's resumes in that visitor's browser (`localStorage`). It does not yet provide login, shared cloud storage, or cross-device sync. The included `supabase_schema.sql` is a starting database schema; authentication and cloud sync still need to be connected separately.

The ATS checker is a keyword-overlap estimate, not an official score from an employer's ATS. PDF export opens the browser print dialog; select **Save as PDF**.
