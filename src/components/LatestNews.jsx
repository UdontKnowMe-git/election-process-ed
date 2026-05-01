import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, Calendar, TrendingUp, Loader2 } from 'lucide-react';
import { useElectionStore } from '../store/useElectionStore';
import { useTranslation } from '../hooks/useTranslation';
import translations from '../data/translations.json';

const FALLBACK_NEWS = [
  {
    id: "fallback-1",
    title: "Election Commission of India Announces Phase-wise Voting Schedule",
    summary: "The ECI has released the comprehensive schedule for the upcoming General Elections, spanning 7 phases across the nation.",
    date: "May 1, 2026",
    category: "Announcements",
    source: "PIB India",
    link: "#"
  },
  {
    id: "fallback-2",
    title: "New Digital Voter ID features launched for Gen-Z voters",
    summary: "A more interactive and secure version of the e-EPIC has been introduced to encourage young voter participation.",
    date: "April 28, 2026",
    category: "Technology",
    source: "ECI Updates",
    link: "#"
  },
  {
    id: "fallback-3",
    title: "Model Code of Conduct: Do's and Don'ts for Political Parties",
    summary: "The ECI issues a fresh advisory to all recognized parties regarding the strict adherence to MCC guidelines during rallies.",
    date: "April 25, 2026",
    category: "Guidelines",
    source: "Legal News",
    link: "#"
  }
];

const FETCH_INTERVAL = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

const NewsItem = ({ item, index, t }) => {
  const { translatedText: title } = useTranslation(item.title);
  const { translatedText: summary } = useTranslation(item.summary);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group p-6 bg-secondary-bg border border-primary-border rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-[#E47A2E]/30"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2 py-1 bg-[#E47A2E]/10 text-[#E47A2E] text-[10px] font-bold rounded uppercase tracking-wider">
              {item.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-text">
              <Calendar className="w-3 h-3" />
              {item.date}
            </span>
          </div>
          <h3 className="text-xl font-bold text-primary-text mb-2 group-hover:text-[#E47A2E] transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-text text-sm leading-relaxed mb-4 line-clamp-3">
            {summary}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary-text/60">
              Source: <span className="text-primary-text font-semibold uppercase">{item.source}</span>
            </span>
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-bold text-[#1A365D] dark:text-blue-400 hover:underline"
            >
              {t.read_more} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const LatestNews = () => {
  const { language } = useElectionStore();
  const [news, setNews] = useState(FALLBACK_NEWS);
  const [loading, setLoading] = useState(false);

  const t = translations[language]?.latest_news || translations.en.latest_news;

  useEffect(() => {
    const fetchNews = async () => {
      const now = Date.now();
      const lastFetch = localStorage.getItem(`lastNewsFetchTimestamp_${language}`);
      const cachedNews = localStorage.getItem(`cachedNewsData_${language}`);

      if (lastFetch && now - parseInt(lastFetch) < FETCH_INTERVAL && cachedNews) {
        setNews(JSON.parse(cachedNews));
        return;
      }

      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;
        if (!apiKey) {
          console.warn("NewsData API key is missing. Using fallback data.");
          return;
        }

        // We still request in the selected language from the API to get native results if available
        // But the on-the-fly translator provides extra robustness
        const response = await fetch(
          `https://newsdata.io/api/1/latest?country=in&category=politics&language=${language}&apikey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.status === 'success' && data.results && data.results.length > 0) {
          const transformedNews = data.results.map((article) => ({
            id: article.article_id,
            title: article.title,
            summary: article.description || article.content || "No description available.",
            date: new Date(article.pubDate).toLocaleDateString(language === 'en' ? 'en-IN' : language, {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            category: article.category ? article.category[0] : "Politics",
            source: article.source_id || "Unknown Source",
            link: article.link
          }));

          const currentTopId = news[0]?.id;
          const newTopId = transformedNews[0]?.id;

          if (newTopId !== currentTopId) {
            setNews(transformedNews);
            localStorage.setItem(`cachedNewsData_${language}`, JSON.stringify(transformedNews));
            localStorage.setItem(`lastNewsFetchTimestamp_${language}`, now.toString());
          } else {
            localStorage.setItem(`lastNewsFetchTimestamp_${language}`, now.toString());
          }
        }
      } catch (error) {
        console.error("Failed to fetch news from NewsData.io:", error);
        if (cachedNews) {
          setNews(JSON.parse(cachedNews));
        } else {
          setNews(FALLBACK_NEWS);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [language]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-primary-text mb-2 flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-[#E47A2E]" />
            {t.title} <span className="text-[#E47A2E]">{t.news}</span>
          </h2>
          <p className="text-muted-text">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          {loading && <Loader2 className="w-5 h-5 animate-spin text-[#E47A2E]" />}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary-bg border border-primary-border rounded-full text-xs font-bold text-[#2E8B57]">
            <TrendingUp className="w-4 h-4" />
            {t.live_updates}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {news.map((item, index) => (
          <NewsItem key={item.id} item={item} index={index} t={t} />
        ))}
      </div>

      <div className="mt-12 p-8 bg-[#1A365D] rounded-3xl text-white text-center relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">{t.subscribe_title}</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">{t.subscribe_subtitle}</p>
          <div className="flex max-w-sm mx-auto gap-2">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#E47A2E]"
            />
            <button className="bg-[#E47A2E] text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-[#d66a1e] transition-colors">
              {t.subscribe_btn}
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E47A2E]/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#2E8B57]/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>
      </div>
    </div>
  );
};
