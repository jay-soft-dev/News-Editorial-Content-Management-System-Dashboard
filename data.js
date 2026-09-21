// ==========================================
// Punya Nagri Editorial System - Default Data
// ==========================================

const defaultArticles = [
    {
        id: 1,
        headline: "New Traffic Congestion Measures in Pune; Metro Route Work Progresses Rapidly...",
        subheadline: "Traffic Police Prepare New Action Plan",
        content: "The city administration is fully prepared to tackle the growing traffic congestion in Pune. To minimize traffic jams caused by ongoing Metro route construction, the traffic police have identified and deployed new alternative routes.",
        reporter: "Pramod Deshpande",
        source: "Email (Pune Bureau)",
        time: "10:45 AM",
        category: "Local",
        status: "pending",
        caption: "A view of traffic congestion in Pune.",
        imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        headline: "Monsoon Regains Strength in State; Heavy Rainfall Warning for Next 48 Hours...",
        subheadline: "Meteorological Department Issues Yellow Alert",
        content: "Monsoon progress across the state has gained momentum once again. The Meteorological Department has forecasted heavy to very heavy rainfall in Konkan, Central Maharashtra, and Vidarbha over the next 48 hours.",
        reporter: "Sanjay Jadhav",
        source: "Agency (PTI News)",
        time: "09:30 AM",
        category: "Politics",
        status: "approved",
        caption: "A view of heavy monsoon rain.",
        imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        headline: "Digital Fraud Gang Busted in Pimpri Chinchwad",
        subheadline: "Major Operation by Cyber Police",
        content: "The Pimpri Chinchwad Cyber Cell arrested three suspects in a major online fraud investigation. The gang allegedly defrauded citizens of crores of rupees under the guise of completing lucrative online tasks.",
        reporter: "Vikram Salunkhe",
        source: "Crime Reporter",
        time: "08:15 AM",
        category: "Crime",
        status: "revision",
        caption: "Cyber Cell Police Station premises.",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        headline: "Gold Prices Drop; Buyers Crowd Bullion Markets",
        subheadline: "Enthusiasm in Jewellery Outlets",
        content: "Gold prices registered a notable drop today following global market fluctuations. With prices decreasing by ₹600 per 10 grams, bullion markets saw an influx of eager retail shoppers.",
        reporter: "Sachin Kulkarni",
        source: "sachin.k@punyanagri.com",
        time: "11:15 AM",
        category: "Local",
        status: "pending",
        caption: "A bustling jewellers market.",
        imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        headline: "India vs Australia T20 Series Starts Tomorrow",
        subheadline: "Team India Ready to Compete at Full Strength",
        content: "The highly anticipated T20 series between India and Australia kicks off tomorrow. Led by captain Rohit Sharma, the Indian team is aiming for a strong start as fan excitement reaches fever pitch.",
        reporter: "Rohit Shinde",
        source: "Agency Feed",
        time: "11:50 AM",
        category: "Sports",
        status: "approved",
        caption: "Indian Cricket Team.",
        imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80"
    }
];

// ==========================================
// Helper Functions for LocalStorage Sync
// ==========================================

/**
 * Retrieve all articles from LocalStorage.
 * If no data exists, initialize LocalStorage with defaultArticles.
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
 * Save updated articles array to LocalStorage.
 */
function saveArticles(articles) {
    try {
        localStorage.setItem('punya_articles', JSON.stringify(articles));
    } catch (e) {
        console.error("Failed to save articles to LocalStorage:", e);
    }
}

/**
 * Find and return an article by its unique ID.
 */
function getArticleById(id) {
    const articles = getStoredArticles();
    return articles.find(article => article.id === parseInt(id));
}

/**
 * Update a specific article in LocalStorage.
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
 * Helper function to create and prepend a new article.
 */
function addNewArticle(newArticle) {
    let articles = getStoredArticles();
    newArticle.id = Date.now(); // Unique Timestamp Identifier
    articles.unshift(newArticle);
    saveArticles(articles);
    return newArticle;
}

/**
 * Remove an article from LocalStorage by ID.
 */
function deleteArticleFromStorage(id) {
    let articles = getStoredArticles();
    articles = articles.filter(a => a.id !== parseInt(id));
    saveArticles(articles);
}

/**
 * Reset LocalStorage back to default sample articles.
 */
function resetToDefaultData() {
    localStorage.setItem('punya_articles', JSON.stringify(defaultArticles));
    return defaultArticles;
}