const MAP = {
  followers: "profile",
  subscriber: "profile",
  story: "story",
  highlight: "highlight",
  reel: "reel",
  likes: "post",
  comments: "post",
  saves: "post",
  shares: "post",
  views: "post",
};

export function resolveContentType(service) {
  if (service.contentType) return service.contentType;
  const name = service.name?.toLowerCase() || "";
  for (const [key, type] of Object.entries(MAP)) {
    if (name.includes(key)) return type;
  }
  return "post";
}
