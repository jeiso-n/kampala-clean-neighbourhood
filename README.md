# Kampala Clean Neighbourhood

A lightweight, responsive community information website prototype for household waste collection and responsible disposal in selected Kampala communities.

## Project scope

This project combines the Project One concept and the Project Two website/hosting deliverables for Internet Technology & Web Design (1315 ST), Victoria University Kampala.

The website is an information and community-reporting prototype. It is **not** a waste collection operator or an official KCCA reporting channel.

## Pages

1. Home and environmental dashboard
2. About the project and research sources
3. Collection schedules and area filtering
4. Private waste collector directory
5. Community incident reporting
6. Waste separation guide
7. Recycling, composting and reuse
8. Community notices and service advisories
9. Frequently asked questions
10. Privacy and reporting guidance
11. Contact and community engagement

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Browser localStorage for the local demonstration report form
- No framework, paid API, or server-side dependency

## Run locally

Open `index.html` in a modern browser, or serve the folder with a simple local static server. For example, from this directory:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Important data and privacy notes

- Collection schedules and collection points must be verified before publication.
- Provider names, contacts, service areas, and licensing status must be checked with reliable sources. The site must never invent or imply verification.
- The incident form saves report text to localStorage in the current browser only. It does not send reports to KCCA, local leaders, or providers.
- Photo previews are local to the browser session; photos are not uploaded.
- Do not publish personal contact details, exact home locations, or identifiable photos without a lawful basis and appropriate consent.
- A report does not guarantee collection or an immediate response.

## Hosting comparison for coursework

| Provider | Free static hosting | Strengths | Considerations |
|---|---|---|---|
| GitHub Pages | Yes | Directly hosts a repository; simple for static HTML/CSS/JS; version history | Public repository is normally required for free personal Pages; no server-side form processing |
| Netlify | Yes, subject to plan limits | Simple Git-based deployment; deploy previews; optional forms/functions | Free plan quotas and feature limits can change |
| Cloudflare Pages | Yes, subject to plan limits | CDN-backed static hosting; Git integration; fast global delivery | More platform features than this static prototype needs |

**Initial recommendation:** GitHub Pages is a suitable first choice because the project is a static site and coursework requires a public source repository. Confirm current free-plan conditions before final submission. A working public URL should only be recorded after deployment and browser testing.

## Before public submission

- Confirm pilot divisions and participating neighbourhoods with residents/local leaders.
- Verify schedules, collection points, collector details, notices, and official contacts.
- Review every page for accurate, credited content.
- Test all links, form validation, search/filter behaviour, keyboard navigation, mobile layouts, and browser console.
- Run every HTML page through the W3C Nu HTML Checker and correct reported errors.
- Do not claim the local-only report form transmits information.
- Keep the site online until marks are released and test the public URL without signing in.

## Research references

- KCCA (14 August 2026), [KCCA expands waste collection network with nine private collectors](https://kcca.go.ug/news/1172).
- NEMA (2024), [National State of the Environment Report 2024: State of waste](https://www.nema.go.ug/en/wp-content/uploads/2026/03/National-Status-of-the-Environment-Report-NSOER-2024.pdf).
- Katusiimeh, M. W., Burger, K., & Mol, A. P. J. (2013). “Informal waste collection and its co-existence with the formal waste sector: The case of Kampala, Uganda.” *Habitat International, 38*, 1–9. https://doi.org/10.1016/j.habitatint.2012.09.002
