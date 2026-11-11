/**
 * Waste Collector Directory Logic
 * Verification transparency, service areas, and division filtering
 */

const COLLECTORS = [
    {
        id: "COL-001",
        name: "Eco-Waste Uganda Ltd",
        divisions: ["Nakawa", "Central"],
        phone: "+256 414 000 111",
        email: "dispatch@ecowaste.sample.ug",
        address: "Plot 42, Port Bell Road, Nakawa Industrial",
        services: ["Curbside Household Collection", "Commercial Plastics", "Recycling Audits"],
        isLicensed: true,
        licenseNotice: "KCCA Concession Holder (Nakawa Zone B)"
    },
    {
        id: "COL-002",
        name: "Northern Sanitary & Haulage Co.",
        divisions: ["Kawempe"],
        phone: "+256 414 000 222",
        email: "ops@northernsanitary.sample.ug",
        address: "Kalerwe T-Junction, Kawempe",
        services: ["Household Waste", "Market Food Residue", "Drain Clearance"],
        isLicensed: true,
        licenseNotice: "KCCA Concession Holder (Kawempe Zone A)"
    },
    {
        id: "COL-003",
        name: "Lakeside Sanitation Services",
        divisions: ["Makindye"],
        phone: "+256 414 000 333",
        email: "support@lakesidesanitation.sample.ug",
        address: "Ggaba Road, Kansanga Stage",
        services: ["Residential Curbside", "Hospitality Waste", "Yard Waste Pruning"],
        isLicensed: true,
        licenseNotice: "KCCA Concession Holder (Makindye Zone C)"
    },
    {
        id: "COL-004",
        name: "South-West Clean Concession",
        divisions: ["Rubaga"],
        phone: "+256 414 000 444",
        email: "rubagaclean@sample.ug",
        address: "Wakaliga Road, Nateete",
        services: ["Household Waste", "Commercial Skip Hire", "Market Waste"],
        isLicensed: true,
        licenseNotice: "KCCA Concession Holder (Rubaga Zone D)"
    },
    {
        id: "COL-005",
        name: "Kampala Green Cycle Community Initiative",
        divisions: ["Central", "Makindye", "Nakawa"],
        phone: "+256 700 000 555",
        email: "recycle@greencycle.sample.ug",
        address: "Nsambya Estate, Makindye",
        services: ["PET Plastic Recovery", "Cardboard Recycling", "Community Composting"],
        isLicensed: false,
        licenseNotice: "Civic Community Group (Plastic Collection Partner, Non-concessionaire)"
    },
    {
        id: "COL-006",
        name: "HillTop Waste Managers",
        divisions: ["Nakawa", "Central"],
        phone: "+256 414 000 666",
        email: "info@hilltopwaste.sample.ug",
        address: "Bukoto-Kisasi Road, Nakawa",
        services: ["Bulk Waste Removal", "Apartment Block Waste", "Electronics Recycling"],
        isLicensed: true,
        licenseNotice: "KCCA Concession Holder (Nakawa Zone A)"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('collectors-grid');
    const divisionFilter = document.getElementById('collector-division');
    const searchInput = document.getElementById('collector-search');
    const countElement = document.getElementById('collector-count');

    function renderCollectors(list) {
        if (!container) return;
        container.innerHTML = '';

        if (list.length === 0) {
            container.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 3rem; background:#fff; border-radius:8px; border:1px solid #e5e7eb;">
          <p style="font-size:1.1rem; color:var(--text-muted);">No waste collectors found matching your criteria.</p>
        </div>
      `;
            if (countElement) countElement.textContent = "0 collectors found";
            return;
        }

        list.forEach(col => {
            const card = document.createElement('article');
            card.className = 'card';
            const licenseBadge = col.isLicensed
                ? `<span class="badge badge-success">&#10003; Licensed Concessionaire</span>`
                : `<span class="badge badge-warning">&#9888; Community / Non-licensed</span>`;

            card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
          <h3 style="font-size:1.2rem; margin-bottom:0;">${col.name}</h3>
          ${licenseBadge}
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:1rem;">
          <strong>License Status:</strong> ${col.licenseNotice}
        </p>
        <p style="margin-bottom:0.75rem;">
          <strong>Divisions:</strong> ${col.divisions.map(d => `<span class="badge badge-neutral" style="margin-right:4px;">${d}</span>`).join('')}
        </p>
        <p style="margin-bottom:0.75rem;">
          <strong>Services:</strong><br>
          <small style="color:var(--text-muted);">${col.services.join(' &bull; ')}</small>
        </p>
        <div style="margin-top:auto; padding-top:1rem; border-top:1px solid var(--border-color); font-size:0.85rem;">
          <div><strong>Tel:</strong> <a href="tel:${col.phone}">${col.phone}</a></div>
          <div><strong>Email:</strong> <a href="mailto:${col.email}">${col.email}</a></div>
          <div style="color:var(--text-light); margin-top:0.25rem;">${col.address}</div>
        </div>
      `;
            container.appendChild(card);
        });

        if (countElement) countElement.textContent = `Showing ${list.length} waste collector${list.length === 1 ? '' : 's'}`;
    }

    function applyFilters() {
        const selectedDivision = divisionFilter ? divisionFilter.value : 'all';
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const filtered = COLLECTORS.filter(c => {
            const matchesDivision = selectedDivision === 'all' || c.divisions.includes(selectedDivision);
            const matchesQuery = c.name.toLowerCase().includes(query) ||
                c.services.some(s => s.toLowerCase().includes(query)) ||
                c.address.toLowerCase().includes(query);
            return matchesDivision && matchesQuery;
        });

        renderCollectors(filtered);
    }

    if (divisionFilter) divisionFilter.addEventListener('change', applyFilters);
    if (searchInput) searchInput.addEventListener('input', applyFilters);

    renderCollectors(COLLECTORS);
});