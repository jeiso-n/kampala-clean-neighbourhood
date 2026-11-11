/**
 * Collection Schedules Engine
 * Kampala Divisions: Central, Nakawa, Kawempe, Makindye, Rubaga
 */

const DIVISION_SCHEDULES = [
    {
        division: "Central",
        parish: "Nakasero",
        area: "Commercial & Diplomatic Zone",
        days: "Monday, Wednesday, Friday",
        timeWindow: "06:00 - 09:30 AM",
        wasteType: "General Mixed & Sorted Dry",
        point: "Front curb collection / Nakasero Market Lane",
        operator: "Licensed Concessionaire (CleanCity Central)"
    },
    {
        division: "Central",
        parish: "Kamwokya II",
        area: "Kyebando Road & Church Area",
        days: "Tuesday & Saturday",
        timeWindow: "07:00 - 11:00 AM",
        wasteType: "Household & Organic",
        point: "Kamwokya Community Centre Junction",
        operator: "KCCA Concessionaire"
    },
    {
        division: "Central",
        parish: "Kisenyi I",
        area: "Mwanga II Road Corridor",
        days: "Monday & Thursday",
        timeWindow: "06:30 - 10:30 AM",
        wasteType: "Market Organics & Household",
        point: "Kisenyi Health Centre Designated Bay",
        operator: "KCCA Direct Municipal Fleet"
    },
    {
        division: "Nakawa",
        parish: "Ntinda",
        area: "Ministers' Village & Kigowa",
        days: "Tuesday & Friday",
        timeWindow: "07:30 - 11:30 AM",
        wasteType: "Household Organics & Plastic Bales",
        point: "Curbside bin collection",
        operator: "Eco-Waste Uganda Ltd"
    },
    {
        division: "Nakawa",
        parish: "Bukoto I",
        area: "White Flats & Kisasi Bypass Junction",
        days: "Wednesday & Saturday",
        timeWindow: "08:00 - 12:00 PM",
        wasteType: "General Household Solid Waste",
        point: "Bukoto Market Access Point",
        operator: "Eco-Waste Uganda Ltd"
    },
    {
        division: "Nakawa",
        parish: "Luzira",
        area: "Port Bell Road & Kitintale Border",
        days: "Monday & Thursday",
        timeWindow: "07:00 - 10:30 AM",
        wasteType: "Residential & Light Industrial",
        point: "Luzira Stage designated skip corner",
        operator: "HillTop Waste Managers"
    },
    {
        division: "Kawempe",
        parish: "Bwaise II",
        area: "Kabuusu Channel & Nabweru Road",
        days: "Wednesday & Sunday",
        timeWindow: "06:00 - 10:00 AM",
        wasteType: "Household & Flood-Drain Residue",
        point: "Bwaise Community Drainage Crossing Bay",
        operator: "Northern Division Sanitary Services"
    },
    {
        division: "Kawempe",
        parish: "Kalerwe",
        area: "Kiteezi Road & Market Periphery",
        days: "Tuesday, Thursday, Saturday",
        timeWindow: "05:30 - 08:30 AM",
        wasteType: "High-Volume Market Organics",
        point: "Kalerwe Market Central Offloading Zone",
        operator: "KCCA Direct Municipal Fleet"
    },
    {
        division: "Makindye",
        parish: "Kansanga",
        area: "Ggaba Road Corridor & Heritage Park",
        days: "Tuesday & Friday",
        timeWindow: "08:00 - 12:00 PM",
        wasteType: "Household & Institutional Waste",
        point: "Residential Gates & Kansanga Trading Post",
        operator: "Lakeside Sanitation Services"
    },
    {
        division: "Makindye",
        parish: "Nsambya",
        area: "Nsambya Estate & St. Francis Zone",
        days: "Monday & Thursday",
        timeWindow: "07:30 - 11:00 AM",
        wasteType: "General Residential & Recyclables",
        point: "Nsambya Hospital Road staging point",
        operator: "Lakeside Sanitation Services"
    },
    {
        division: "Rubaga",
        parish: "Nateete",
        area: "Traffic Lights & Wakaliga Road",
        days: "Monday, Wednesday, Friday",
        timeWindow: "06:30 - 10:00 AM",
        wasteType: "Commercial & Organic Food Scraps",
        point: "Nateete Market Staging Compound",
        operator: "South-West Clean Concession"
    },
    {
        division: "Rubaga",
        parish: "Mengo",
        area: "Bakuli & Kabaka's Lake Ring",
        days: "Tuesday & Saturday",
        timeWindow: "07:00 - 10:30 AM",
        wasteType: "Household & Yard Garden Prunings",
        point: "Curbside at Mengo Ring Road junctions",
        operator: "South-West Clean Concession"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('schedules-table-body');
    const divisionSelect = document.getElementById('filter-division');
    const searchInput = document.getElementById('search-schedule');
    const counterElement = document.getElementById('schedules-count');

    function renderSchedules(data) {
        if (!tableBody) return;
        tableBody.innerHTML = '';

        if (data.length === 0) {
            tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding: 2.5rem; color: var(--text-muted);">
            <strong>No collection schedules match your criteria.</strong>
          </td>
        </tr>
      `;
            if (counterElement) counterElement.textContent = "0 schedules found";
            return;
        }

        data.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td><span class="badge badge-neutral">${item.division}</span></td>
        <td><strong>${item.parish}</strong><br><small style="color:var(--text-muted);">${item.area}</small></td>
        <td>${item.days}</td>
        <td><span style="font-family:monospace; font-weight:600;">${item.timeWindow}</span></td>
        <td><span class="badge badge-info">${item.wasteType}</span></td>
        <td>${item.point}</td>
      `;
            tableBody.appendChild(tr);
        });

        if (counterElement) {
            counterElement.textContent = `Showing ${data.length} schedule${data.length === 1 ? '' : 's'}`;
        }
    }

    function filterData() {
        const selectedDivision = divisionSelect ? divisionSelect.value.toLowerCase() : 'all';
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const filtered = DIVISION_SCHEDULES.filter(item => {
            const matchesDivision = selectedDivision === 'all' || item.division.toLowerCase() === selectedDivision;
            const matchesQuery = item.parish.toLowerCase().includes(query) ||
                item.area.toLowerCase().includes(query) ||
                item.point.toLowerCase().includes(query) ||
                item.days.toLowerCase().includes(query);
            return matchesDivision && matchesQuery;
        });

        renderSchedules(filtered);
    }

    if (divisionSelect) divisionSelect.addEventListener('change', filterData);
    if (searchInput) searchInput.addEventListener('input', filterData);

    renderSchedules(DIVISION_SCHEDULES);
});