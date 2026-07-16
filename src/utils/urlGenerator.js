/**
 * Centralized Platform-Aware URL Generator
 */

export const generateProfileUrl = (platform, username) => {
  if (!username) return "";
  const cleaned = username.trim().replace(/^@/, "");
  const p = (platform || "").toLowerCase().trim();

  if (p === "tiktok") {
    return `https://www.tiktok.com/@${cleaned}`;
  }
  if (p === "instagram") {
    return `https://www.instagram.com/${cleaned}/`;
  }
  if (p === "youtube") {
    return `https://www.youtube.com/@${cleaned}`;
  }
  if (p === "facebook") {
    return `https://www.facebook.com/${cleaned}`;
  }
  return `https://www.${p}.com/${cleaned}`;
};

export const generatePostUrl = (platform, username, idOrShortcode) => {
  if (!idOrShortcode) return "";
  const cleanedId = idOrShortcode.trim();
  const cleanedUser = username ? username.trim().replace(/^@/, "") : "";
  const p = (platform || "").toLowerCase().trim();

  if (p === "tiktok") {
    return `https://www.tiktok.com/@${cleanedUser}/video/${cleanedId}`;
  }
  if (p === "instagram") {
    return `https://www.instagram.com/p/${cleanedId}/`;
  }
  if (p === "youtube") {
    return `https://www.youtube.com/watch?v=${cleanedId}`;
  }
  if (p === "facebook") {
    return `https://www.facebook.com/${cleanedUser}/posts/${cleanedId}`;
  }
  return cleanedId;
};

export const generateSpecialUrl = (platform, username, type, idOrShortcode) => {
  if (!idOrShortcode) return "";
  const cleanedId = idOrShortcode.trim();
  const cleanedUser = username ? username.trim().replace(/^@/, "") : "";
  const p = (platform || "").toLowerCase().trim();

  if (p === "instagram") {
    if (type === "story") {
      return `https://www.instagram.com/stories/${cleanedUser}/${cleanedId}/`;
    }
    if (type === "highlight") {
      return `https://www.instagram.com/stories/highlights/${cleanedId}/`;
    }
    if (type === "reel") {
      return `https://www.instagram.com/reel/${cleanedId}/`;
    }
  }
  return generatePostUrl(platform, username, idOrShortcode);
};

export const getPlatformFromUrl = (url) => {
  if (!url) return null;
  const cleaned = url.toLowerCase().trim();
  if (cleaned.includes("instagram.com")) return "instagram";
  if (cleaned.includes("tiktok.com")) return "tiktok";
  if (cleaned.includes("youtube.com") || cleaned.includes("youtu.be")) return "youtube";
  if (cleaned.includes("facebook.com")) return "facebook";
  return null;
};
