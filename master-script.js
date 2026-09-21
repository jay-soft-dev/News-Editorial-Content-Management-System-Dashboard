// ==========================================
// Punya Nagri Master Tracker Engine
// ==========================================

let masterData = [];

// Language Translations Dictionary for Master Sheet
const masterTranslations = {
    mr: {
        headTitle: "पुण्य नगरी - मुख्य बातमी मास्टर ट्रॅकर (Master Control Sheet)",
        headerBadge: "मास्टर कंट्रोल शीट (Data Grid)",
        emailServerText: "इमेल सर्व्हर: ",
        statusActiveText: "सक्रिय (Auto Sync On)",
        btnEditorPage: "संपादक एडिटर पेजवर जा",
        lblStatTotal: "एकूण प्राप्त बातम्या",
        lblStatPending: "मंजुरीसाठी प्रलंबित",
        lblStatApproved: "मंजूर (प्रिंटसाठी तयार)",
        lblStatRevision: "दुरुस्तीसाठी पाठवले",
        lblStatRejected: "अमान्य / नाकारलेले",
        searchPlaceholder: "आयडी, बातमीचे नाव, रिपोर्टर किंवा शहरावरून शोधा...",
        optStatusAll: "सर्व स्टेटस (All Status)",
        optStatusPending: "प्रलंबित (Pending)",
        optStatusApproved: "मंजूर (Approved)",
        optStatusRevision: "दुरुस्ती (Revision)",
        optStatusRejected: "अमान्य (Rejected)",
        optCatAll: "सर्व विभाग (All Category)",
        optCatPune: "स्थानिक / पुणे",
        optCatPolitics: "महाराष्ट्र / राजकारण",
        optCatCrime: "गुन्हेगारी",
        optCatSports: "क्रीडा",
        btnExportCsv: "Excel (CSV) डाउनलोड करा",
        thId: "बातमी ID",
        thTime: "आलेली वेळ & दिनांक",
        thHeadline: "बातमीचे नाव (Headline)",
        thReporter: "रिपोर्टर / सोर्स (Email)",
        thCategory: "विभाग",
        thWords: "शब्दसंख्या",
        thPage: "नियोजित पान",
        thStatus: "सध्याचे स्टेटस",
        thActions: "कृती (Actions)",
        noDataFound: "कोणतीही माहिती उपलब्ध नाही.",
        statusPendingLabel: "प्रलंबित (Pending)",
        statusApprovedLabel: "मंजूर (Approved)",
        statusRevisionLabel: "दुरुस्ती (Revision)",
        statusRejectedLabel: "अमान्य (Rejected)",
        defaultReporter: "प्रतिनिधी",
        defaultCategory: "स्थानिक",
        defaultDesk: "Desk",
        defaultPage: "पान १ (मुख्य)",
        wordsText: "शब्द",
        btnOpen: "उघडा",
        csvAlertNoData: "डाउनलोड करण्यासाठी कोणतीही माहिती उपलब्ध नाही.",
        csvHeaders: "News ID,Time,Headline,Reporter,Source,Category,Words,Assigned Page,Status\n"
    },
    en: {
        headTitle: "Punya Nagari - Master News Control Sheet",
        headerBadge: "Master Control Sheet (Data Grid)",
        emailServerText: "Email Server: ",
        statusActiveText: "Active (Auto Sync On)",
        btnEditorPage: "Go to Editor Page",
        lblStatTotal: "Total Received News",
        lblStatPending: "Pending Approval",
        lblStatApproved: "Approved (Ready for Print)",
        lblStatRevision: "Sent for Revision",
        lblStatRejected: "Rejected / Declined",
        searchPlaceholder: "Search by ID, Headline, Reporter, or City...",
        optStatusAll: "All Status",
        optStatusPending: "Pending",
        optStatusApproved: "Approved",
        optStatusRevision: "Revision",
        optStatusRejected: "Rejected",
        optCatAll: "All Categories",
        optCatPune: "Local / Pune",
        optCatPolitics: "Maharashtra / Politics",
        optCatCrime: "Crime",
        optCatSports: "Sports",
        btnExportCsv: "Download Excel (CSV)",
        thId: "News ID",
        thTime: "Time & Date",
        thHeadline: "Headline",
        thReporter: "Reporter / Source (Email)",
        thCategory: "Category",
        thWords: "Word Count",
        thPage: "Assigned Page",
        thStatus: "Current Status",
        thActions: "Actions",
        noDataFound: "No news records available.",
        statusPendingLabel: "Pending",
        statusApprovedLabel: "Approved",
        statusRevisionLabel: "Revision",
        statusRejectedLabel: "Rejected",
        defaultReporter: "Reporter",
        defaultCategory: "Local",
        defaultDesk: "Desk",
        defaultPage: "Page 1 (Main)",
        wordsText: "words",
        btnOpen: "Open",
        csvAlertNoData: "No data available for export.",
        csvHeaders: "News ID,Time,Headline,Reporter,Source,Category,Words,Assigned Page,Status\n"
    }
};

// Get current selected language
function getCurrentLang() {
    return localStorage.getItem('selected_language') || 'en';
}

// Get translation dataset for current language
function getTranslation() {
    return masterTranslations[getCurrentLang()] || masterTranslations.en;
}

document.addEventListener('DOMContentLoaded', () => {
    // Set language dropdown value and update UI
    const savedLang = getCurrentLang();
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = savedLang;
    }

    // Load data from LocalStorage
    loadMasterData();
    changeLanguage(savedLang);

    // Filter and Search Event Listeners
    const searchInput = document.getElementById('master-search');
    const statusSelect = document.getElementById('filter-status');
    const categorySelect = document.getElementById('filter-category');

    if (searchInput) searchInput.addEventListener('input', applyMasterFilters);
    if (statusSelect) statusSelect.addEventListener('change', applyMasterFilters);
    if (categorySelect) categorySelect.addEventListener('change', applyMasterFilters);
});

// Main Language Change Function
function changeLanguage(lang) {
    localStorage.setItem('selected_language', lang);
    const t = masterTranslations[lang] || masterTranslations.en;

    const setElemText = (id, text) => {
        const elem = document.getElementById(id);
        if (elem) elem.innerText = text;
    };

    setElemText('head-title', t.headTitle);
    setElemText('header-badge', t.headerBadge);
    
    const emailServerText = document.getElementById('email-server-text');
    if (emailServerText) {
        emailServerText.innerHTML = `${t.emailServerText}<strong id="status-active-text" class="text-emerald-400">${t.statusActiveText}</strong>`;
    }

    setElemText('btn-editor-page', t.btnEditorPage);
    setElemText('lbl-stat-total', t.lblStatTotal);
    setElemText('lbl-stat-pending', t.lblStatPending);
    setElemText('lbl-stat-approved', t.lblStatApproved);
    setElemText('lbl-stat-revision', t.lblStatRevision);
    setElemText('lbl-stat-rejected', t.lblStatRejected);

    const searchElem = document.getElementById('master-search');
    if (searchElem) searchElem.placeholder = t.searchPlaceholder;

    setElemText('opt-status-all', t.optStatusAll);
    setElemText('opt-status-pending', t.optStatusPending);
    setElemText('opt-status-approved', t.optStatusApproved);
    setElemText('opt-status-revision', t.optStatusRevision);
    setElemText('opt-status-rejected', t.optStatusRejected);

    setElemText('opt-cat-all', t.optCatAll);
    setElemText('opt-cat-pune', t.optCatPune);
    setElemText('opt-cat-politics', t.optCatPolitics);
    setElemText('opt-cat-crime', t.optCatCrime);
    setElemText('opt-cat-sports', t.optCatSports);

    setElemText('btn-export-csv', t.btnExportCsv);

    setElemText('th-id', t.thId);
    setElemText('th-time', t.thTime);
    setElemText('th-headline', t.thHeadline);
    setElemText('th-reporter', t.thReporter);
    setElemText('th-category', t.thCategory);
    setElemText('th-words', t.thWords);
    setElemText('th-page', t.thPage);
    setElemText('th-status', t.thStatus);
    setElemText('th-actions', t.thActions);

    // Re-render master table with updated language labels
    applyMasterFilters();
}

/**
 * Load articles data from LocalStorage
 */
function loadMasterData() {
    if (typeof getStoredArticles === 'function') {
        masterData = getStoredArticles();
    } else {
        const localData = localStorage.getItem('punya_articles');
        masterData = localData ? JSON.parse(localData) : [];
    }

    renderMasterTable(masterData);
    updateOverviewStats();
}

// Storage Sync Event Listener
window.addEventListener('storage', (e) => {
    if (e.key === 'punya_articles') {
        loadMasterData();
    } else if (e.key === 'selected_language') {
        const langSelect = document.getElementById('lang-select');
        if (langSelect) langSelect.value = e.newValue;
        changeLanguage(e.newValue);
    }
});

/**
 * Render data into Master Table
 */
function renderMasterTable(data) {
    const tbody = document.getElementById('master-table-body');
    if (!tbody) return;

    const t = getTranslation();
    tbody.innerHTML = '';

    if (!data || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="text-center py-6 text-gray-400">${t.noDataFound}</td></tr>`;
        return;
    }

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-50 transition border-b border-gray-100";

        // Determine status badge classes and label
        let statusClass = 'bg-amber-100 text-amber-800';
        let statusLabel = t.statusPendingLabel;
        
        if (row.status === 'approved') { 
            statusClass = 'bg-emerald-100 text-emerald-800'; 
            statusLabel = t.statusApprovedLabel; 
        } else if (row.status === 'revision') { 
            statusClass = 'bg-orange-100 text-orange-800'; 
            statusLabel = t.statusRevisionLabel; 
        } else if (row.status === 'rejected') { 
            statusClass = 'bg-red-100 text-red-800'; 
            statusLabel = t.statusRejectedLabel; 
        }

        // Calculate Word Count
        const wordCount = row.wordCount || (row.content ? row.content.trim().split(/\s+/).filter(w => w.length > 0).length : 200);

        tr.innerHTML = `
            <td class="py-3 px-4 font-bold text-gray-900">#PN-${1000 + Number(row.id)}</td>
            <td class="py-3 px-4 text-xs font-semibold text-gray-600">${row.time || '10:00 AM'} | Sep 20</td>
            <td class="py-3 px-4 font-bold text-gray-800 max-w-xs truncate" title="${escapeHtml(row.headline || '')}">${row.headline || ''}</td>
            <td class="py-3 px-4 text-gray-600">${row.reporter || t.defaultReporter} <br><span class="text-[11px] text-gray-400">${row.source || t.defaultDesk}</span></td>
            <td class="py-3 px-4 font-medium text-red-600">${row.category || t.defaultCategory}</td>
            <td class="py-3 px-4 font-bold text-gray-700">${wordCount} ${t.wordsText}</td>
            <td class="py-3 px-4 font-semibold text-slate-700">${row.assignedPage || t.defaultPage}</td>
            <td class="py-3 px-4"><span class="px-2.5 py-1 rounded-full text-xs font-bold ${statusClass}">${statusLabel}</span></td>
            <td class="py-3 px-4 text-center">
                <button onclick="openInEditor(${row.id})" class="bg-slate-800 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded transition flex items-center gap-1 mx-auto">
                    <i class="fa-solid fa-pen-to-square"></i> ${t.btnOpen}
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * Update Top Metrics Counter
 */
function updateOverviewStats() {
    const statTotal = document.getElementById('stat-total');
    const statPending = document.getElementById('stat-pending');
    const statApproved = document.getElementById('stat-approved');
    const statRevision = document.getElementById('stat-revision');
    const statRejected = document.getElementById('stat-rejected');

    if (statTotal) statTotal.innerText = masterData.length;
    if (statPending) statPending.innerText = masterData.filter(d => d.status === 'pending').length;
    if (statApproved) statApproved.innerText = masterData.filter(d => d.status === 'approved').length;
    if (statRevision) statRevision.innerText = masterData.filter(d => d.status === 'revision').length;
    if (statRejected) statRejected.innerText = masterData.filter(d => d.status === 'rejected').length;
}

/**
 * Apply Search and Filter Operations
 */
function applyMasterFilters() {
    const searchVal = document.getElementById('master-search')?.value.toLowerCase().trim() || '';
    const statusVal = document.getElementById('filter-status')?.value || 'all';
    const categoryVal = document.getElementById('filter-category')?.value || 'all';

    const filtered = masterData.filter(item => {
        const headlineMatch = item.headline ? item.headline.toLowerCase().includes(searchVal) : false;
        const reporterMatch = item.reporter ? item.reporter.toLowerCase().includes(searchVal) : false;
        const idMatch = item.id ? item.id.toString().includes(searchVal) : false;

        const matchesSearch = !searchVal || headlineMatch || reporterMatch || idMatch;
        const matchesStatus = statusVal === 'all' || item.status === statusVal;
        const matchesCat = categoryVal === 'all' || item.category === categoryVal;

        return matchesSearch && matchesStatus && matchesCat;
    });

    renderMasterTable(filtered);
}

/**
 * Open selected article in the Main Editor Page
 */
function openInEditor(id) {
    window.location.href = `index.html?id=${id}`;
}

/**
 * Download Master Data as CSV (Excel Sheet)
 */
function exportTableToCSV() {
    const t = getTranslation();

    if (!masterData || masterData.length === 0) {
        alert(t.csvAlertNoData);
        return;
    }

    let csv = t.csvHeaders;

    masterData.forEach(r => {
        const headlineText = (r.headline || '').replace(/"/g, '""');
        const wordCount = r.wordCount || (r.content ? r.content.trim().split(/\s+/).length : 200);
        const assignedPage = r.assignedPage || t.defaultPage;

        csv += `"#PN-${1000 + Number(r.id)}","${r.time || ''}","${headlineText}","${r.reporter || ''}","${r.source || ''}","${r.category || ''}","${wordCount}","${assignedPage}","${r.status || ''}"\n`;
    });

    // Added UTF-8 BOM so Marathi & Special characters display correctly in Excel
    const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'Punya_Nagri_Master_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Helper function to escape HTML special characters
 */
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}