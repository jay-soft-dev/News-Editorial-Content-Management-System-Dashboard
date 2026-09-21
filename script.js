// LocalStorage से आर्टिकल्स (Articles) लोड करें
let articles = typeof getStoredArticles === 'function' ? getStoredArticles() : [];
let activeArticleId = 1;
let currentFilter = 'all';

// भाषा बदलने के लिए डिक्शनरी (Translations Dictionary)
const indexTranslations = {
    mr: {
        headTitle: "पुण्य नगरी - संपादक व्यवस्थापन प्रणाली (Editorial CMS)",
        headerBadge: "संपादक डेस्क",
        masterBtnText: "मास्टर ट्रॅकर शीट (Excel View)",
        searchPlaceholder: "बातमी / रिपोर्टर शोधा...",
        userRole: "मुख्य संपादक (Pune Edition)",
        navMainTitle: "मुख्य नेव्हिगेशन",
        navAll: "सर्व बातम्या",
        navPending: "मंजुरीसाठी प्रलंबित",
        navApproved: "मंजूर (प्रिंटसाठी तयार)",
        navRevision: "दुरुस्तीसाठी पाठवले",
        navRejected: "अमान्य / नाकारलेले",
        navMailbox: "मेल बॉक्स (इमेल बातम्या)",
        navBeatsTitle: "विभाग (Beats)",
        beatPune: "• पुणे शहर / स्थानिक",
        beatPolitics: "• महाराष्ट्र / राजकारण",
        beatCrime: "• गुन्हेगारी / Crime",
        beatSports: "• क्रीडा / Sports",
        footerMasterStatus: "Master Sheet Connected:",
        inboxTitle: "आल्या बातम्या (Inbox)",
        lblSourceRoute: "मार्ग:",
        lblDatetime: "वेळ व तारीख",
        lblCategory: "विभाग / शहर",
        lblHeadline: "मथळा (Main Headline)",
        placeholderHeadline: "बातमीचा मुख्य मथळा टाका...",
        lblSubheadline: "उप-मथळा (Sub Headline)",
        placeholderSubheadline: "उप-मथळा...",
        lblAttachedMedia: "बातमीसोबत आलेले फोटो (Attached Media)",
        lblPhotoCaption: "फोटो कॅप्शन",
        lblActionsHeader: "निर्णय व मुख्य कृती",
        btnApprove: "मंजूर करा आणि प्रिंटला पाठवा",
        btnRevision: "दुरुस्तीसाठी परत पाठवा",
        btnReject: "अमान्य / नाकारा",
        lblLayoutAnalysis: "लेआउट विश्लेषण",
        lblWordCount: "शब्दसंख्या:",
        lblCharCount: "अक्षरे:",
        noNewsFound: "कोणतीही बातमी उपलब्ध नाही.",
        untitledNews: "बिना शीर्षकाची बातमी",
        unknownReporter: "अज्ञात",
        defaultCategory: "सामान्य",
        mailSource: "ई-मेल (Mail Import)",
        statusPending: "प्रलंबित",
        statusApproved: "मंजूर",
        statusRevision: "दुरुस्ती",
        statusRejected: "नाकारले",
        statusPendingBadge: "● मंजुरीसाठी प्रलंबित",
        statusApprovedBadge: "✓ मंजूर (प्रिंटसाठी तयार)",
        statusRevisionBadge: "⚠ दुरुस्तीसाठी प्रलंबित",
        statusRejectedBadge: "✕ अमान्य / नाकारलेले",
        msgApproved: "बातमी मंजूर झाली! प्रिंटसाठी पाठवली आहे.",
        msgRevision: "बातमी दुरुस्तीसाठी परत पाठवली.",
        msgRejected: "बातमी अमान्य केली.",
        msgUpdated: "बातमी स्टेटस अपडेट झाले!"
    },
    en: {
        headTitle: "Punya Nagari - Editorial Management System (CMS)",
        headerBadge: "Editor Desk",
        masterBtnText: "Master Tracker Sheet (Excel View)",
        searchPlaceholder: "Search News / Reporter...",
        userRole: "Chief Editor (Pune Edition)",
        navMainTitle: "MAIN NAVIGATION",
        navAll: "All News",
        navPending: "Pending Approval",
        navApproved: "Approved (Ready for Print)",
        navRevision: "Sent for Revision",
        navRejected: "Rejected / Declined",
        navMailbox: "Mail Box (Email Import)",
        navBeatsTitle: "BEATS / CATEGORIES",
        beatPune: "• Pune City / Local",
        beatPolitics: "• Maharashtra / Politics",
        beatCrime: "• Crime",
        beatSports: "• Sports",
        footerMasterStatus: "Master Sheet Connected:",
        inboxTitle: "Incoming News (Inbox)",
        lblSourceRoute: "Source:",
        lblDatetime: "Date & Time",
        lblCategory: "Category / City",
        lblHeadline: "Main Headline",
        placeholderHeadline: "Enter main headline...",
        lblSubheadline: "Sub Headline",
        placeholderSubheadline: "Sub headline...",
        lblAttachedMedia: "Attached Media",
        lblPhotoCaption: "Photo Caption",
        lblActionsHeader: "Actions & Decisions",
        btnApprove: "Approve & Send to Print",
        btnRevision: "Send Back for Revision",
        btnReject: "Reject / Decline",
        lblLayoutAnalysis: "Layout Analysis",
        lblWordCount: "Word Count:",
        lblCharCount: "Characters:",
        noNewsFound: "No news articles found.",
        untitledNews: "Untitled News",
        unknownReporter: "Unknown",
        defaultCategory: "General",
        mailSource: "Email Import",
        statusPending: "Pending",
        statusApproved: "Approved",
        statusRevision: "Revision",
        statusRejected: "Rejected",
        statusPendingBadge: "● Pending Approval",
        statusApprovedBadge: "✓ Approved (Ready for Print)",
        statusRevisionBadge: "⚠ Sent for Revision",
        statusRejectedBadge: "✕ Rejected / Declined",
        msgApproved: "Article Approved! Sent to print.",
        msgRevision: "Article sent back for revision.",
        msgRejected: "Article rejected.",
        msgUpdated: "Article status updated!"
    }
};

// वर्तमान भाषा प्राप्त करें (Get current language)
function getCurrentLang() {
    return localStorage.getItem('selected_language') || 'mr';
}

function getTranslation() {
    return indexTranslations[getCurrentLang()] || indexTranslations.mr;
}

document.addEventListener('DOMContentLoaded', () => {
    // LocalStorage से लेटेस्ट डेटा रीलोड करें
    if (typeof getStoredArticles === 'function') {
        articles = getStoredArticles();
    }

    // भाषा ड्रॉपडाउन वैल्यू सेट करें और UI भाषा अपडेट करें
    const savedLang = getCurrentLang();
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = savedLang;
    }
    changeLanguage(savedLang);

    // URL से Article ID पढ़ें (उदाहरण: index.html?id=3)
    const urlParams = new URLSearchParams(window.location.search);
    const passedId = urlParams.get('id');

    if (passedId) {
        activeArticleId = parseInt(passedId, 10);
    } else if (articles.length > 0) {
        activeArticleId = articles[0].id;
    }

    renderArticlesList();
    loadArticleToEditor(activeArticleId);

    // लाइव मेट्रिक्स (Word/Char count) और ऑटो-सेव इवेंट लिसनर्स
    const editorBody = document.getElementById('editor-body');
    const editorHeadline = document.getElementById('editor-headline');
    const editorSubheadline = document.getElementById('editor-subheadline');
    const photoCaption = document.getElementById('photo-caption');

    if (editorBody) {
        editorBody.addEventListener('input', () => {
            calculateMetrics();
            autoSaveCurrentArticle();
        });
    }
    if (editorHeadline) {
        editorHeadline.addEventListener('input', () => {
            calculateMetrics();
            autoSaveCurrentArticle();
        });
    }
    if (editorSubheadline) {
        editorSubheadline.addEventListener('input', autoSaveCurrentArticle);
    }
    if (photoCaption) {
        photoCaption.addEventListener('input', autoSaveCurrentArticle);
    }
});

// भाषा बदलने का मुख्य फ़ंक्शन (Main Change Language Function)
function changeLanguage(lang) {
    localStorage.setItem('selected_language', lang);
    const t = indexTranslations[lang] || indexTranslations.mr;

    const setElemText = (id, text) => {
        const elem = document.getElementById(id);
        if (elem) elem.innerText = text;
    };

    setElemText('head-title', t.headTitle);
    setElemText('header-badge', t.headerBadge);
    setElemText('master-btn-text', t.masterBtnText);
    setElemText('user-role', t.userRole);

    const searchElem = document.getElementById('search-input');
    if (searchElem) searchElem.placeholder = t.searchPlaceholder;

    setElemText('nav-main-title', t.navMainTitle);
    setElemText('nav-all', t.navAll);
    setElemText('nav-pending', t.navPending);
    setElemText('nav-approved', t.navApproved);
    setElemText('nav-revision', t.navRevision);
    setElemText('nav-rejected', t.navRejected);
    setElemText('nav-mailbox', t.navMailbox);

    setElemText('nav-beats-title', t.navBeatsTitle);
    setElemText('beat-pune', t.beatPune);
    setElemText('beat-politics', t.beatPolitics);
    setElemText('beat-crime', t.beatCrime);
    setElemText('beat-sports', t.beatSports);

    setElemText('footer-master-status', t.footerMasterStatus);
    setElemText('inbox-title', t.inboxTitle);

    setElemText('lbl-source-route', t.lblSourceRoute);
    setElemText('lbl-datetime', t.lblDatetime);
    setElemText('lbl-category', t.lblCategory);

    setElemText('lbl-headline', t.lblHeadline);
    const editorHeadline = document.getElementById('editor-headline');
    if (editorHeadline) editorHeadline.placeholder = t.placeholderHeadline;

    setElemText('lbl-subheadline', t.lblSubheadline);
    const editorSubheadline = document.getElementById('editor-subheadline');
    if (editorSubheadline) editorSubheadline.placeholder = t.placeholderSubheadline;

    setElemText('lbl-attached-media', t.lblAttachedMedia);
    setElemText('lbl-photo-caption', t.lblPhotoCaption);

    setElemText('lbl-actions-header', t.lblActionsHeader);
    setElemText('btn-approve', t.btnApprove);
    setElemText('btn-revision', t.btnRevision);
    setElemText('btn-reject', t.btnReject);

    setElemText('lbl-layout-analysis', t.lblLayoutAnalysis);
    setElemText('lbl-word-count', t.lblWordCount);
    setElemText('lbl-char-count', t.lblCharCount);

    // आर्टिकल्स की सूची और स्टेटस बैज रिफ्रेश करें
    renderArticlesList();
    const currentArticle = articles.find(a => a.id === activeArticleId);
    if (currentArticle) {
        updateStatusBadgeUI(currentArticle.status);
    }
}

// दूसरे टैब/पेज से डेटा बदलने पर सिंक (Sync) लिसनर
window.addEventListener('storage', (e) => {
    if (e.key === 'punya_articles') {
        if (typeof getStoredArticles === 'function') {
            articles = getStoredArticles();
            renderArticlesList();
            loadArticleToEditor(activeArticleId);
        }
    } else if (e.key === 'selected_language') {
        const langSelect = document.getElementById('lang-select');
        if (langSelect) langSelect.value = e.newValue;
        changeLanguage(e.newValue);
    }
});

// आर्टिकल्स की लिस्ट रेंडर करें
function renderArticlesList(dataToRender = null) {
    const container = document.getElementById('articles-container');
    if (!container) return;

    const t = getTranslation();
    let list = dataToRender;

    if (!list) {
        if (currentFilter === 'mailbox') {
            list = articles.filter(a => a.source && (a.source.toLowerCase().includes('mail') || a.source.toLowerCase().includes('email')));
        } else if (currentFilter === 'all') {
            list = articles;
        } else {
            list = articles.filter(a => a.status === currentFilter);
        }
    }
    
    container.innerHTML = '';
    updateBadges();

    const countElem = document.getElementById('article-count');
    if (countElem) countElem.innerText = list.length;

    if (list.length === 0) {
        container.innerHTML = `<div class="p-4 text-center text-xs text-gray-400">${t.noNewsFound}</div>`;
        return;
    }

    list.forEach(article => {
        const card = document.createElement('div');
        card.className = `article-card p-3 cursor-pointer hover:bg-gray-50 transition border-b border-gray-100 ${article.id === activeArticleId ? 'active bg-blue-50/50 border-l-4 border-l-red-600' : ''}`;
        card.onclick = () => selectArticle(article.id);

        let badgeColor = 'bg-amber-100 text-amber-800';
        let statusText = t.statusPending;
        if (article.status === 'approved') { badgeColor = 'bg-green-100 text-green-800'; statusText = t.statusApproved; }
        if (article.status === 'revision') { badgeColor = 'bg-orange-100 text-orange-800'; statusText = t.statusRevision; }
        if (article.status === 'rejected') { badgeColor = 'bg-red-100 text-red-800'; statusText = t.statusRejected; }

        card.innerHTML = `
            <div class="flex justify-between items-start gap-1 mb-1">
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeColor}">${statusText}</span>
                <span class="text-[11px] text-gray-400"><i class="fa-regular fa-clock"></i> ${article.time || ''}</span>
            </div>
            <h4 class="font-bold text-sm text-gray-800 line-clamp-2 leading-snug mb-1">${article.headline || t.untitledNews}</h4>
            <div class="flex justify-between items-center text-xs text-gray-500 mt-2">
                <span><i class="fa-solid fa-user-pen"></i> ${article.reporter || t.unknownReporter}</span>
                <span class="font-semibold text-red-600">${article.category || t.defaultCategory}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// लिस्ट में से आर्टिकल सेलेक्ट करें
function selectArticle(id) {
    activeArticleId = id;
    renderArticlesList();
    loadArticleToEditor(id);
}

// सेलेक्ट किए गए आर्टिकल को एडिटर में लोड करें
function loadArticleToEditor(id) {
    const article = articles.find(a => a.id === id);
    if (!article) return;

    const t = getTranslation();

    const headlineElem = document.getElementById('editor-headline');
    const subheadlineElem = document.getElementById('editor-subheadline');
    const bodyElem = document.getElementById('editor-body');
    const reporterElem = document.getElementById('meta-reporter');
    const sourceElem = document.getElementById('meta-source');
    const timeElem = document.getElementById('meta-time');
    const categoryElem = document.getElementById('meta-category');
    const captionElem = document.getElementById('photo-caption');
    const imgElem = document.getElementById('article-img');

    if (headlineElem) headlineElem.value = article.headline || '';
    if (subheadlineElem) subheadlineElem.value = article.subheadline || '';
    if (bodyElem) bodyElem.innerHTML = article.content || '';
    if (reporterElem) reporterElem.innerText = article.reporter || '';
    if (sourceElem) sourceElem.innerHTML = `${t.lblSourceRoute} <span class="text-blue-600 font-medium">${article.source || t.mailSource}</span>`;
    if (timeElem) timeElem.innerText = `${article.time || ''} | २० सप्टें`;
    if (categoryElem) categoryElem.innerText = article.category || '';
    if (captionElem) captionElem.value = article.caption || '';

    if (imgElem) {
        if (article.image) {
            imgElem.src = article.image;
            imgElem.parentElement.classList.remove('hidden');
        } else {
            imgElem.parentElement.classList.add('hidden');
        }
    }

    updateStatusBadgeUI(article.status);
    calculateMetrics();
}

// एडिटर में बदलाव होते ही LocalStorage में ऑटो-सेव करें
function autoSaveCurrentArticle() {
    const article = articles.find(a => a.id === activeArticleId);
    if (!article) return;

    const t = getTranslation();

    const headlineText = document.getElementById('editor-headline')?.value || "";
    const subheadlineText = document.getElementById('editor-subheadline')?.value || "";
    const bodyHTML = document.getElementById('editor-body')?.innerHTML || "";
    const captionText = document.getElementById('photo-caption')?.value || "";

    article.headline = headlineText;
    article.subheadline = subheadlineText;
    article.content = bodyHTML;
    article.caption = captionText;

    if (typeof saveArticles === 'function') {
        saveArticles(articles);
    }

    // लिस्ट में टाइटल अपडेट दिखाने के लिए रेंडर करें
    const activeCardTitle = document.querySelector(`.article-card.active h4`);
    if (activeCardTitle) {
        activeCardTitle.innerText = headlineText || t.untitledNews;
    }
}

// शब्द (Word) और अक्षर (Character) की गणना
function calculateMetrics() {
    const bodyText = document.getElementById('editor-body')?.innerText || "";
    const headlineText = document.getElementById('editor-headline')?.value || "";
    const fullText = headlineText + " " + bodyText;

    const words = fullText.trim() ? fullText.trim().split(/\s+/).filter(Boolean).length : 0;
    const chars = fullText.length;

    const wordCountElem = document.getElementById('word-count');
    const charCountElem = document.getElementById('char-count');

    if (wordCountElem) wordCountElem.innerText = words;
    if (charCountElem) charCountElem.innerText = chars;
}

// बातमी स्टेटस अपडेट करें (Approve, Revision, Reject)
function updateStatus(newStatus) {
    const article = articles.find(a => a.id === activeArticleId);
    if (article) {
        article.status = newStatus;

        if (typeof saveArticles === 'function') {
            saveArticles(articles);
        }

        const t = getTranslation();

        updateStatusBadgeUI(newStatus);
        renderArticlesList();

        let msg = t.msgUpdated;
        if (newStatus === 'approved') msg = t.msgApproved;
        if (newStatus === 'revision') msg = t.msgRevision;
        if (newStatus === 'rejected') msg = t.msgRejected;

        showToast(msg);
    }
}

// स्टेटस बैज (Status Badge) का UI अपडेट करें
function updateStatusBadgeUI(status) {
    const badge = document.getElementById('current-status-badge');
    if (!badge) return;

    const t = getTranslation();

    if (status === 'approved') {
        badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-300";
        badge.innerText = t.statusApprovedBadge;
    } else if (status === 'revision') {
        badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-300";
        badge.innerText = t.statusRevisionBadge;
    } else if (status === 'rejected') {
        badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300";
        badge.innerText = t.statusRejectedBadge;
    } else {
        badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300";
        badge.innerText = t.statusPendingBadge;
    }
}

// साइडबार के काउंट बैज अपडेट करें
function updateBadges() {
    const setBadge = (id, count) => {
        const elem = document.getElementById(id);
        if (elem) elem.innerText = count;
    };

    setBadge('badge-all', articles.length);
    setBadge('badge-pending', articles.filter(a => a.status === 'pending').length);
    setBadge('badge-approved', articles.filter(a => a.status === 'approved').length);
    setBadge('badge-revision', articles.filter(a => a.status === 'revision').length);
    setBadge('badge-rejected', articles.filter(a => a.status === 'rejected').length);
    
    // Mailbox Badge Counter
    setBadge('badge-mailbox', articles.filter(a => a.source && (a.source.toLowerCase().includes('mail') || a.source.toLowerCase().includes('email'))).length);
}

// खोजें (Search Articles)
function searchArticles() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
        renderArticlesList();
        return;
    }

    const filtered = articles.filter(a => {
        const headline = (a.headline || '').toLowerCase();
        const reporter = (a.reporter || '').toLowerCase();
        const category = (a.category || '').toLowerCase();
        return headline.includes(query) || reporter.includes(query) || category.includes(query);
    });

    renderArticlesList(filtered);
}

// स्टेटस / मेलबॉक्स के अनुसार फिल्टर करें
function filterArticles(type, btn) {
    currentFilter = type;
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active', 'bg-red-50', 'text-red-600', 'bg-slate-800'));
    if (btn) btn.classList.add('active', 'bg-slate-800');
    renderArticlesList();
}

// कैटेगरी के अनुसार फिल्टर करें
function filterCategory(category) {
    if (category === 'all') {
        renderArticlesList();
    } else {
        const filtered = articles.filter(a => a.category && a.category.includes(category));
        renderArticlesList(filtered);
    }
}

// टेक्स्ट फॉर्मेटिंग (Rich Text Editor Commands)
function execCmd(command, value = null) {
    document.execCommand(command, false, value);
    autoSaveCurrentArticle();
}

// टोस्ट नोटिफिकेशन दिखाएं
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');

    if (!toast || !toastMsg) return;

    toastMsg.innerText = message;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.classList.add('opacity-100');

    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0', 'pointer-events-none');
    }, 3000);
}