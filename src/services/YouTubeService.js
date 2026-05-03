import axios from 'axios';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';

export const YouTubeService = {
  async searchVideos(query) {
    if (!YOUTUBE_API_KEY) {
      console.warn("YouTube API key is missing. Returning fallback videos.");
      return [
        { id: 'mock-1', title: `Official Voter Guide: ${query}`, url: '#', thumbnail: 'https://via.placeholder.com/480x270' }
      ];
    }

    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          q: query,
          key: YOUTUBE_API_KEY,
          type: 'video',
          maxResults: 1
        }
      });
      return response.data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails.high.url
      }));
    } catch (error) {
      console.error("Failed to search YouTube videos:", error);
      return [];
    }
  },
  async fetchContextualVideos(language) {
    if (!YOUTUBE_API_KEY) {
      console.warn("YouTube API key is missing. Returning fallback videos.");
      return [
        { id: 'mock-1', title: `Official Voter Guide (${language})`, url: '#' },
        { id: 'mock-2', title: 'How to use EVM Simulator', url: '#' }
      ];
    }

    try {
      // "Official Voter Guide [Language]"
      const query = `Official Voter Guide India ${language}`;
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          q: query,
          key: YOUTUBE_API_KEY,
          type: 'video',
          maxResults: 3
        }
      });
      return response.data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails.high.url
      }));
    } catch (error) {
      console.error("Failed to fetch YouTube videos:", error);
      return [];
    }
  }
};
