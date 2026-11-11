/**
 * Community Notices & Civic Advisories Logic
 */

const NOTICES_DATA = [
    {
        id: "NOT-2026-01",
        category: "clean-up",
        title: "Kawempe Monsoon Drainage De-silting Drive",
        date: "14 November 2026",
        division: "Kawempe",
        urgency: "high",
        summary: "Joint community clearing of Kabuusu channel and secondary drains ahead of expected heavy rains. Gloves and bags supplied by community leaders.",
        details: "Meeting point: Bwaise Community Centre at 07:30 AM. Volunteers, local shopkeepers, and youth groups are invited to participate. Refreshments provided."
    },
    {
        id: "NOT-2026-02",
        category: "schedule-change",
        title: "Ntinda & Bukoto Public Holiday Collection Rescheduled",
        date: "10 November 2026",
        division: "Nakawa",
        urgency: "medium",
        summary: "Due to road maintenance on the Ntinda-Kigowa stretch, Thursday morning collection will commence two hours earlier at 05:30 AM.",
        details: "Residents are kindly requested to bring their bins to roadside access gates on Wednesday evening to avoid missed pickups."
    },
    {
        id: "NOT-2026-03",
        category: "warning",
        title: "Enforcement Notice: Prohibited Waste Dumping in Lubigi Wetland Buffer",
        date: "05 November 2026",
        division: "Kawempe / Rubaga",
        urgency: "high",
        summary: "NEMA and Division Health Inspectors have issued warnings against nocturnal tipping of construction debris in the wetland corridor.",
        details: "Surveillance patrols have been increased. Community members are encouraged to record registration numbers of offending tipper trucks and report them via KCN."
    },
    {
        id: "NOT-2026-04",
        category: "workshop",
        title: "Makindye Household Composting & Black Soldier Fly Workshop",
        date: "22 November 2026",
        division: "Makindye",
        urgency: "low",
        summary: "Free hands-on masterclass on converting kitchen vegetable peels and matooke stems into nutrient-rich garden soil fertiliser.",
        details: "Venue: Kansanga Parish Hall, 09:00 AM - 12:30 PM. Hosted by Victoria University Agro-Tech Volunteers."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('notices-container');
    const categoryFilter = document.getElementById('notice-category-filter');

    function renderNotices(data) {
        if (!container) return;
        container.innerHTML = '';

        if (data.length === 0) {
            container.innerHTML = `
        <div style="text-align:center; padding:3rem; background:#fff; border-radius:8px; border:1px solid #e5e7eb;">
          <p style="color:var(--text-muted);">No notices found in this category.</p>
        </div>
      `;
            return;
        }

        data.forEach(item => {
            const card = document.createElement('article');
            card.className = 'card';

            let badgeClass = 'badge-info';
            if (item.urgency === 'high') badgeClass = 'badge-danger';
            if (item.urgency === 'medium') badgeClass = 'badge-warning';

            card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
          <span class="badge ${badgeClass}">${item.urgency.toUpperCase()} PRIORITY</span>
          <time style="font-size:0.8rem; color:var(--text-muted);">${item.date}</time>
        </div>
        <h3 style="font-size:1.25rem;">${item.title}</h3>
        <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.5rem;">
          <strong>Target Area:</strong> ${item.division} Division
        </p>
        <p style="font-size:0.925rem;">${item.summary}</p>
        <div style="background:var(--bg-subtle); padding:0.75rem 1rem; border-radius:6px; font-size:0.85rem; color:var(--text-main); margin-top:auto;">
          <strong>Action Details:</strong> ${item.details}
        </div>
      `;
            container.appendChild(card);
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            const selected = categoryFilter.value;
            if (selected === 'all') {
                renderNotices(NOTICES_DATA);
            } else {
                renderNotices(NOTICES_DATA.filter(n => n.category === selected));
            }
        });
    }

    renderNotices(NOTICES_DATA);
});