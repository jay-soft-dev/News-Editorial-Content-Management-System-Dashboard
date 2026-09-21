// ==========================================
// Punya Nagri Editorial System - Default Data
// ==========================================

const defaultArticles = [
    {
        id: 1,
        headline: "पुण्यात वाहतूक कोंडीवर नवीन उपाययोजना; मेट्रो मार्गिकेचे काम वेगाने...",
        subheadline: "वाहतूक पोलिसांचा नवीन आराखडा तयार",
        content: "पुणे शहरातील वाढत्या वाहतूक कोंडीवर मात करण्यासाठी प्रशासन सज्ज झाले आहे. मेट्रो मार्गिकेच्या कामामुळे होणारी कोंडी कमी करण्यासाठी वाहतूक पोलिसांनी नवीन मार्ग निश्चित केले आहेत.",
        reporter: "प्रमोद देशपांडे",
        source: "ई-मेल (Pune Bureau)",
        time: "१०:४५ AM",
        category: "स्थानिक",
        status: "pending",
        caption: "पुण्यातील वाहतूक कोंडीचे दृश्य.",
        imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        headline: "राज्यात मान्सूनचा पुन्हा जोर; पुढील ४८ तासांत मुसळधार पावसाचा इशारा...",
        subheadline: "हवामान खात्याने जारी केला यलो अलर्ट",
        content: "राज्यात मान्सूनचा प्रवास पुन्हा एकदा गतिमान झाला आहे. पुढील ४८ तासांत कोकण, मध्य महाराष्ट्र आणि विदर्भात मुसळधार पावसाची शक्यता हवामान विभागाने वर्तवली आहे.",
        reporter: "संजय जाधव",
        source: "एजन्सी (PTI News)",
        time: "०९:३० AM",
        category: "राजकारण",
        status: "approved",
        caption: "पावसाचे दृश्य.",
        imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        headline: "पिंपरी चिंचवडमध्ये डिजिटल फसवणूक करणारी टोळी गजाआड",
        subheadline: "सायबर पोलिसांची मोठी कारवाई",
        content: "पिंपरी चिंचवड सायबर सेलने मोठ्या फसवणूक प्रकरणी तीन आरोपींना अटक केली. नागरिकांना ऑनलाईन टास्क देऊन कोट्यवधी रुपयांचा गंडा घालण्याचा प्रकार समोर आला आहे.",
        reporter: "विक्रम साळुंखे",
        source: "क्राईम रिपोर्टर",
        time: "०८:१५ AM",
        category: "गुन्हेगारी",
        status: "revision",
        caption: "सायबर सेल पोलीस स्टेशन.",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        headline: "सोन्याच्या दरात घसरण; ग्राहकांची खरेदीसाठी गर्दी",
        subheadline: "सराफा बाजारात उत्साह",
        content: "आंतरराष्ट्रीय घडामोडींमुळे आज सोन्याच्या दरात घसरण पाहायला मिळाली. प्रति तोळा सोन्याचे दर ६०० रुपयांनी कमी झाल्यामुळे ग्राहकांनी सराफा दुकानांमध्ये गर्दी केली आहे.",
        reporter: "सचिन कुलकर्णी",
        source: "sachin.k@punyanagri.com",
        time: "११:१५ AM",
        category: "स्थानिक",
        status: "pending",
        caption: "सराफा बाजार.",
        imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        headline: "भारत विरुद्ध ऑस्ट्रेलिया टी-२० मालिका उद्यापासून",
        subheadline: "भारतीय संघ पूर्ण ताकदीनिशी उतरणार",
        content: "भारत आणि ऑस्ट्रेलिया यांच्यातील बहुप्रतिक्षित टी-२० मालिकेला उद्यापासून सुरुवात होत आहे. भारतीय संघाचे नेतृत्व रोहित शर्मा करणार असून मालिकेची उत्सुकता शिगेला पोहोचली आहे.",
        reporter: "रोहित शिंदे",
        source: "Agency Feed",
        time: "११:५० AM",
        category: "क्रीडा",
        status: "approved",
        caption: "भारतीय संघ.",
        imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80"
    }
];

// ==========================================
// Helper Functions for LocalStorage Sync
// ==========================================

/**
 * LocalStorage मधून सर्व आर्टिकल्स मिळवा.
 * जर डेटा नसेल तर defaultArticles सेट करा.
 */
function getStoredArticles() {
    try {
        const data = localStorage.getItem('punya_articles');
        if (!data) {
            localStorage.setItem('punya_articles', JSON.stringify(defaultArticles));
            return defaultArticles;
        }
        return JSON.parse(data);
    } catch (e) {
        console.error("LocalStorage error:", e);
        return defaultArticles;
    }
}

/**
 * LocalStorage मध्ये अपडेटेड आर्टिकल्स सेव्ह करा.
 */
function saveArticles(articles) {
    try {
        localStorage.setItem('punya_articles', JSON.stringify(articles));
    } catch (e) {
        console.error("Failed to save articles to LocalStorage:", e);
    }
}

/**
 * ठराविक ID असलेला आर्टिकल शोधून मिळवा.
 */
function getArticleById(id) {
    const articles = getStoredArticles();
    return articles.find(article => article.id === parseInt(id));
}

/**
 * विशिष्ट आर्टिकल अपडेट करा.
 */
function updateArticleInStorage(updatedArticle) {
    let articles = getStoredArticles();
    const index = articles.findIndex(a => a.id === parseInt(updatedArticle.id));
    if (index !== -1) {
        articles[index] = updatedArticle;
        saveArticles(articles);
    }
}

/**
 * नवीन आर्टिकल जोडण्यासाठी हेल्पिंग फंक्शन.
 */
function addNewArticle(newArticle) {
    let articles = getStoredArticles();
    newArticle.id = Date.now(); // Unique Identifier
    articles.unshift(newArticle);
    saveArticles(articles);
    return newArticle;
}

/**
 * आर्टिकल हटवण्यासाठी (Delete) फंक्शन.
 */
function deleteArticleFromStorage(id) {
    let articles = getStoredArticles();
    articles = articles.filter(a => a.id !== parseInt(id));
    saveArticles(articles);
}

/**
 * डिफॉल्ट डेटा रिसेट करण्यासाठी.
 */
function resetToDefaultData() {
    localStorage.setItem('punya_articles', JSON.stringify(defaultArticles));
    return defaultArticles;
}