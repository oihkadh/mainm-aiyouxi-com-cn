// assets/content-map.js

// Site content sections and keyword tag configuration
const contentSections = [
  {
    id: 'home',
    title: '首页',
    tags: ['爱游戏', '热门推荐', '新游上线'],
    url: 'https://mainm-aiyouxi.com.cn',
    description: '欢迎来到爱游戏平台，探索最新最热的游戏资讯。'
  },
  {
    id: 'news',
    title: '新闻中心',
    tags: ['爱游戏', '游戏新闻', '行业动态', '版本更新'],
    url: 'https://mainm-aiyouxi.com.cn/news',
    description: '爱游戏平台游戏新闻与行业最新动态。'
  },
  {
    id: 'guides',
    title: '攻略教程',
    tags: ['爱游戏', '游戏攻略', '新手教程', '技巧分享'],
    url: 'https://mainm-aiyouxi.com.cn/guides',
    description: '爱游戏攻略合集，帮助你快速上手各类游戏。'
  },
  {
    id: 'reviews',
    title: '评测中心',
    tags: ['爱游戏', '游戏评测', '深度分析', '评分排行'],
    url: 'https://mainm-aiyouxi.com.cn/reviews',
    description: '爱游戏平台专业游戏评测与深度分析。'
  },
  {
    id: 'community',
    title: '社区',
    tags: ['爱游戏', '玩家社区', '讨论区', '活动'],
    url: 'https://mainm-aiyouxi.com.cn/community',
    description: '爱游戏玩家社区，分享你的游戏体验。'
  }
];

// Default keyword tag for fallback search
const defaultKeyword = '爱游戏';

// Simple search filter function: returns matching sections
function searchContent(query) {
  if (!query || query.trim() === '') {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  for (const section of contentSections) {
    // Check if query matches title, tags, description, or URL
    const titleMatch = section.title.toLowerCase().includes(lowerQuery);
    const tagMatch = section.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const descMatch = section.description.toLowerCase().includes(lowerQuery);
    const urlMatch = section.url.toLowerCase().includes(lowerQuery);

    if (titleMatch || tagMatch || descMatch || urlMatch) {
      results.push({
        id: section.id,
        title: section.title,
        tags: section.tags,
        url: section.url,
        description: section.description,
        relevanceScore: (titleMatch ? 3 : 0) + (tagMatch ? 2 : 0) + (descMatch ? 1 : 0) + (urlMatch ? 1 : 0)
      });
    }
  }

  // Sort results by relevance score descending
  results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  return results;
}

// Get all sections (export for external use)
function getAllSections() {
  return contentSections.map(section => ({
    id: section.id,
    title: section.title,
    tags: section.tags,
    url: section.url,
    description: section.description
  }));
}

// Get all unique tags across sections
function getAllTags() {
  const tagSet = new Set();
  for (const section of contentSections) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}

// Filter sections by a specific tag (exact match)
function filterByTag(tag) {
  if (!tag || tag.trim() === '') {
    return [];
  }
  const lowerTag = tag.toLowerCase().trim();
  return contentSections.filter(section =>
    section.tags.some(t => t.toLowerCase() === lowerTag)
  );
}

// Example usage (can be removed in production, but kept for demonstration)
if (typeof window !== 'undefined' && window.console) {
  console.log('Content Map loaded for', defaultKeyword);
  console.log('All tags:', getAllTags());
  console.log('Search "攻略":', searchContent('攻略'));
  console.log('Filter by tag "爱游戏":', filterByTag('爱游戏'));
}