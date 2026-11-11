/**
 * Incident Reporting Form Logic
 * LocalStorage persistence, image file reading, dynamic parish options
 */

const KAMPALA_PARISHES = {
    Central: ["Nakasero", "Kamwokya I", "Kamwokya II", "Kisenyi I", "Kisenyi II", "Old Kampala", "Civic Centre"],
    Nakawa: ["Ntinda", "Bukoto I", "Bukoto II", "Naguru I", "Naguru II", "Luzira", "Kyambogo", "Banda"],
    Kawempe: ["Bwaise I", "Bwaise II", "Kalerwe", "Komamboga", "Makerere I", "Makerere II", "Mulago", "Wandegeya"],
    Makindye: ["Kansanga", "Kabalagala", "Ggaba", "Nsambya", "Katwe I", "Katwe II", "Wabigalo", "Kibuye"],
    Rubaga: ["Mengo", "Nateete", "Busega", "Kasubi", "Lubaga", "Namirembe", "Najjanankumbi"]
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('report-problem-form');
    const divisionSelect = document.getElementById('report-division');
    const parishSelect = document.getElementById('report-parish');
    const photoInput = document.getElementById('report-photo');
    const photoPreview = document.getElementById('photo-preview-box');
    const reportsList = document.getElementById('user-reports-list');
    const clearStorageBtn = document.getElementById('clear-storage-btn');

    if (divisionSelect && parishSelect) {
        divisionSelect.addEventListener('change', () => {
            const division = divisionSelect.value;
            parishSelect.innerHTML = '<option value="">-- Select Parish or Neighbourhood --</option>';

            if (division && KAMPALA_PARISHES[division]) {
                parishSelect.disabled = false;
                KAMPALA_PARISHES[division].forEach(p => {
                    const opt = document.createElement('option');
                    opt.value = p;
                    opt.textContent = p;
                    parishSelect.appendChild(opt);
                });
            } else {
                parishSelect.disabled = true;
            }
        });
    }

    let currentImageData = null;
    if (photoInput && photoPreview) {
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    alert("Image exceeds 2MB limit. Please select a smaller photo.");
                    photoInput.value = "";
                    currentImageData = null;
                    photoPreview.innerHTML = "";
                    return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    currentImageData = event.target.result;
                    photoPreview.innerHTML = `
            <div style="margin-top:0.75rem;">
              <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.25rem;">Attachment Preview:</p>
              <img src="${currentImageData}" alt="Attachment preview" style="max-height:140px; border-radius:6px; border:1px solid #cbd5e1;">
            </div>
          `;
                };
                reader.readAsDataURL(file);
            } else {
                currentImageData = null;
                photoPreview.innerHTML = "";
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const requiredFields = ['report-category', 'report-division', 'report-parish', 'report-location', 'report-description'];

            requiredFields.forEach(id => {
                const el = document.getElementById(id);
                if (!el || !el.value.trim()) {
                    if (el) el.classList.add('is-invalid');
                    isValid = false;
                } else {
                    if (el) el.classList.remove('is-invalid');
                }
            });

            if (!isValid) {
                showToast('Please fill out all mandatory marked (*) fields.', 'danger');
                return;
            }

            const reportId = "KCN-" + Math.floor(100000 + Math.random() * 900000);
            const newReport = {
                id: reportId,
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                category: document.getElementById('report-category').value,
                division: document.getElementById('report-division').value,
                parish: document.getElementById('report-parish').value,
                location: document.getElementById('report-location').value.trim(),
                description: document.getElementById('report-description').value.trim(),
                reporterName: document.getElementById('reporter-name').value.trim() || "Anonymous Resident",
                reporterContact: document.getElementById('reporter-contact').value.trim() || "Not provided",
                photo: currentImageData,
                status: "Submitted (Local Simulation Demo)"
            };

            const existing = JSON.parse(localStorage.getItem('kcn_community_reports') || '[]');
            existing.unshift(newReport);
            localStorage.setItem('kcn_community_reports', JSON.stringify(existing));

            form.reset();
            currentImageData = null;
            if (photoPreview) photoPreview.innerHTML = "";
            if (parishSelect) parishSelect.disabled = true;

            showToast(`Incident #${reportId} saved in local demo storage.`, 'success');
            renderUserReports();
        });
    }

    function renderUserReports() {
        if (!reportsList) return;
        const items = JSON.parse(localStorage.getItem('kcn_community_reports') || '[]');

        if (items.length === 0) {
            reportsList.innerHTML = `
        <div style="text-align:center; padding: 2rem; color: var(--text-muted); border: 1px dashed var(--border-color); border-radius:8px;">
          No incident reports submitted on this device yet.
        </div>
      `;
            if (clearStorageBtn) clearStorageBtn.style.display = 'none';
            return;
        }

        if (clearStorageBtn) clearStorageBtn.style.display = 'inline-block';
        reportsList.innerHTML = items.map(r => `
      <div class="card" style="margin-bottom:1rem; border-left: 4px solid var(--color-primary);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.5rem;">
          <div>
            <strong>${r.category}</strong> &bull; <span class="badge badge-neutral">${r.id}</span>
            <div style="font-size:0.8rem; color:var(--text-muted);">${r.division} Division, ${r.parish} (${r.location})</div>
          </div>
          <span class="badge badge-warning">${r.status}</span>
        </div>
        <p style="font-size:0.9rem; margin-bottom:0.5rem;">${r.description}</p>
        ${r.photo ? `<div style="margin: 0.5rem 0;"><img src="${r.photo}" alt="Report photo" style="max-height:100px; border-radius:4px;"></div>` : ''}
        <div style="font-size:0.75rem; color:var(--text-light); border-top:1px solid #f1f5f9; padding-top:0.4rem; display:flex; justify-content:space-between;">
          <span>Logged by: ${r.reporterName}</span>
          <time>${r.date}</time>
        </div>
      </div>
    `).join('');
    }

    if (clearStorageBtn) {
        clearStorageBtn.addEventListener('click', () => {
            if (confirm('Clear all stored demonstration reports from this browser?')) {
                localStorage.removeItem('kcn_community_reports');
                renderUserReports();
                showToast('Demonstration reports cleared.', 'info');
            }
        });
    }

    renderUserReports();
});