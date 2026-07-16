/**
 * SMM Panel Link Parser & Service Validator
 * Supports Instagram, TikTok, YouTube, and Facebook.
 */

// Helper to clean URL and strip protocol/www
const cleanUrl = (url) => {
  if (!url) return '';
  return url.trim().replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase();
};

/**
 * Parses a social media link to determine the platform, username, and type (profile or post).
 * @param {string} url - The URL to parse
 * @returns {object} { platform: string, type: 'profile'|'post', username: string, originalUrl: string }
 */
export const parseSocialLink = (url) => {
  const result = {
    platform: 'instagram',
    type: 'profile',
    username: '',
    originalUrl: url ? url.trim() : ''
  };

  if (!url) return result;

  const cleaned = cleanUrl(url);

  // 1. INSTAGRAM
  if (cleaned.includes('instagram.com')) {
    result.platform = 'instagram';
    
    // Check if post/reel/tv link
    if (cleaned.includes('/p/') || cleaned.includes('/reel/') || cleaned.includes('/tv/')) {
      result.type = 'post';
      result.username = 'Instagram Direct Order';
    } else {
      result.type = 'profile';
      // Extract username: instagram.com/username/ -> username
      const parts = url.split('instagram.com/')[1]?.split('?')[0]?.split('/');
      const extracted = parts ? parts[0] : '';
      result.username = extracted ? extracted.trim() : 'Instagram Direct Order';
    }
  }
  // 2. TIKTOK
  else if (cleaned.includes('tiktok.com')) {
    result.platform = 'tiktok';

    if (cleaned.includes('/video/') || cleaned.includes('/v/')) {
      result.type = 'post';
      // Extract username from tiktok.com/@username/video/123
      const usernamePart = url.split('tiktok.com/')[1]?.split('/')[0];
      result.username = usernamePart ? usernamePart.replace('@', '').trim() : 'TikTok Direct Order';
    } else {
      result.type = 'profile';
      const parts = url.split('tiktok.com/')[1]?.split('?')[0]?.split('/');
      const extracted = parts ? parts[0] : '';
      result.username = extracted ? extracted.replace('@', '').trim() : 'TikTok Direct Order';
    }
  }
  // 3. YOUTUBE
  else if (cleaned.includes('youtube.com') || cleaned.includes('youtu.be')) {
    result.platform = 'youtube';

    if (cleaned.includes('watch?v=') || cleaned.includes('youtu.be/') || cleaned.includes('/v/') || cleaned.includes('/embed/') || cleaned.includes('/shorts/')) {
      result.type = 'post';
      result.username = 'YouTube Direct Order';
    } else {
      result.type = 'profile';
      // Extract channel name from youtube.com/@channel
      let extracted = '';
      if (url.includes('youtube.com/@')) {
        extracted = url.split('youtube.com/@')[1]?.split('?')[0]?.split('/')[0];
      } else if (url.includes('youtube.com/c/')) {
        extracted = url.split('youtube.com/c/')[1]?.split('?')[0]?.split('/')[0];
      } else if (url.includes('youtube.com/channel/')) {
        extracted = url.split('youtube.com/channel/')[1]?.split('?')[0]?.split('/')[0];
      } else if (url.includes('youtube.com/user/')) {
        extracted = url.split('youtube.com/user/')[1]?.split('?')[0]?.split('/')[0];
      }
      result.username = extracted ? extracted.replace('@', '').trim() : 'YouTube Direct Order';
    }
  }
  // 4. FACEBOOK
  else if (cleaned.includes('facebook.com')) {
    result.platform = 'facebook';

    if (cleaned.includes('/posts/') || cleaned.includes('/permalink.php') || cleaned.includes('/photos/') || cleaned.includes('/videos/') || cleaned.includes('/watch') || cleaned.includes('/reel/')) {
      result.type = 'post';
      result.username = 'Facebook Direct Order';
    } else {
      result.type = 'profile';
      const parts = url.split('facebook.com/')[1]?.split('?')[0]?.split('/');
      const extracted = parts ? parts[0] : '';
      result.username = extracted && extracted !== 'profile.php' ? extracted.trim() : 'Facebook Direct Order';
    }
  }

  // Final sanitization of username to remove any trailing/leading symbols
  if (result.username) {
    result.username = decodeURIComponent(result.username).replace(/[@\/]/g, '').trim();
  }
  
  if (!result.username) {
    result.username = `${result.platform.charAt(0).toUpperCase() + result.platform.slice(1)} Direct Order`;
  }

  return result;
};

/**
 * Validates if the selected service is compatible with the link type.
 * @param {object} service - The selected service object (needs name and optionally serviceKey)
 * @param {string} linkType - 'profile' or 'post'
 * @returns {object} { isValid: boolean, message: string }
 */
export const validateServiceForLinkType = (service, linkType) => {
  if (!service) return { isValid: true, message: '' };

  const name = (service.name || '').toLowerCase();
  const key = (service.serviceKey || '').toLowerCase();

  // Categories based on name and serviceKey keywords
  const isFollowerService = name.includes('follower') || name.includes('subscriber') || name.includes('member') || key.includes('followers') || key.includes('subscribers');
  
  const isPostService = name.includes('like') || name.includes('view') || name.includes('comment') || name.includes('share') || name.includes('watch') || name.includes('retweet') || key.includes('likes') || key.includes('views') || key.includes('comments') || key.includes('shares');

  if (linkType === 'profile') {
    if (isPostService && !name.includes('profile view')) {
      // Disallow posts/video services on profile links
      let serviceLabel = 'Likes/Views/Comments';
      if (name.includes('like')) serviceLabel = 'Likes';
      else if (name.includes('comment')) serviceLabel = 'Comments';
      else if (name.includes('share')) serviceLabel = 'Shares';
      else if (name.includes('watch') || name.includes('hour')) serviceLabel = 'Watch Time';
      else if (name.includes('view')) serviceLabel = 'Video Views';

      return {
        isValid: false,
        message: `${serviceLabel} service requires a post/video link.`
      };
    }
  } 
  
  if (linkType === 'post') {
    if (isFollowerService) {
      // Disallow profile followers/subscribers on post/video links
      const serviceLabel = name.includes('sub') ? 'Subscribers' : 'Followers';
      return {
        isValid: false,
        message: `${serviceLabel} service requires a profile link.`
      };
    }
  }

  return { isValid: true, message: '' };
};
