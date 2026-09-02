import { useState } from 'react'
import API_URL from '../config/api'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'

const PostsSelection = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, selectedService, quantity, entryPath, selectedPackage } = location.state || {}
  const [selectedPosts, setSelectedPosts] = useState(
    location.state?.selectedPostsIds || []
  );
  const [avatarError, setAvatarError] = useState(false);

  const userdata = location.state?.userdata

  const TOTAL_ALLOWED = Number(quantity) || Number(selectedPackage?.quantity) || 0;

  const initialSelectedPosts =
    location.state?.selectedPostsIds || [];

  const initialQuantity =
    Number(location.state?.quantity) || 0;

  // FUNCTION FIRST
  const getInitialSplit = () => {
    if (
      initialSelectedPosts.length === 0 ||
      initialQuantity === 0
    ) {
      return {};
    }

    const split =
      Math.floor(
        initialQuantity /
        initialSelectedPosts.length
      );

    const remainder =
      initialQuantity %
      initialSelectedPosts.length;

    const distribution = {};

    initialSelectedPosts.forEach(
      (id, index) => {
        distribution[id] =
          split + (
            index < remainder ? 1 : 0
          );
      }
    );

    return distribution;
  };

  // useState AFTER FUNCTION
  const [splitQuantities, setSplitQuantities] =
    useState(getInitialSplit());

  const totalUsed = Object.values(splitQuantities)
    .reduce((sum, qty) => sum + (Number(qty) || 0), 0);

  const remainingQty = TOTAL_ALLOWED - totalUsed;

  if (!userdata) {
    navigate('/' + (platform || 'instagram'), { replace: true })
    return null
  }

  const getPostId = (post, index) =>
    post.id || post.videoId || post.pk || index

  const contentType = selectedService?.contentType || location.state?.contentType || 'post'

  const headings = {
    post: 'Select a Post',
    story: 'Select a Story',
    highlight: 'Select a Highlight',
    reel: 'Select a Reel'
  }
  const headingText = headings[contentType] || 'Select Posts'


  const emptyMessages = {
    post: 'No posts found',
    story: 'No active stories found',
    highlight: 'No highlights available',
    reel: 'No reels found'
  }
  const emptyMessage = emptyMessages[contentType] || 'No posts found'

  const labels = {
    post: 'Post',
    story: 'Story',
    highlight: 'Highlight',
    reel: 'Reel'
  }
  const label = labels[contentType] || 'Post'

  // Strip bracket metadata + country codes from raw API service names
  // e.g. "IN Instagram Likes [INDIA] [Refill: 30 Days]" → "Instagram Likes"
  const cleanServiceName = (name) => {
    if (!name) return ''
    let clean = name.replace(/\[.*?\]/g, '').trim()
    clean = clean.replace(/^[A-Z]{2,3}\s+/g, '').trim()
    return clean
  }

  const displayHeadingService = cleanServiceName(selectedService?.name)
  const displayDescription = `Choose which ${label.toLowerCase()}s you want to boost with ${displayHeadingService.toLowerCase() || 'this service'}.`

  // Pick the right posts/videos/media array based on platform and contentType
  const getMedia = () => {
    if (platform === 'instagram') {
      switch (contentType) {
        case 'post':
          return userdata.posts || []
        case 'story':
          return userdata.stories || []
        case 'highlight':
          return userdata.highlights || []
        case 'reel':
          return userdata.reels || []
        default:
          return userdata.posts || []
      }
    }
    if (platform === 'youtube') return userdata.videos || userdata.posts || []
    if (platform === 'tiktok') return userdata.posts || userdata.videos || []
    // default
    return userdata.posts || []
  }

  const media = getMedia();
  const [visibleCount, setVisibleCount] = useState(10);

  const platformConfig = {
    instagram: { color: 'from-pink-500 to-purple-600', name: 'Instagram', bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50', label: 'Instagram Profile' },
    youtube: { color: 'from-red-500 to-red-600', name: 'YouTube', bgColor: 'bg-gradient-to-br from-red-50 to-orange-50', label: 'YouTube Channel' },
    facebook: { color: 'from-blue-600 to-blue-700', name: 'Facebook', bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50', label: 'Facebook Profile' },
    tiktok: { color: 'from-black to-gray-800', name: 'TikTok', bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50', label: 'TikTok Profile' }
  }

  const config = platformConfig[platform] || platformConfig.instagram
  // Static platform profile label — no original name fetched or displayed
  const platformProfileLabel = config.label

  const autoDistribute = (postIds) => {
    if (!postIds.length) return {};
    const split = Math.floor(TOTAL_ALLOWED / postIds.length);
    const remainder = TOTAL_ALLOWED % postIds.length;
    const distribution = {};
    postIds.forEach((id, index) => {
      distribution[id] = split + (index < remainder ? 1 : 0);
    });
    return distribution;
  };

  // Post Select
  const handlePostToggle = (postId) => {
    let updatedPosts = [];

    // REMOVE POST
    if (selectedPosts.includes(postId)) {
      updatedPosts = selectedPosts.filter(id => id !== postId);
    } else {
      updatedPosts = [...selectedPosts, postId];
    }

    // MINIMUM SPLIT CHECK
    const minPerPost = 50;

    // ONLY CHECK AFTER QUANTITY SELECTED
    if (TOTAL_ALLOWED > 0) {
      const splitPerPost = Math.floor(TOTAL_ALLOWED / updatedPosts.length);
      // BLOCK INVALID SPLIT
      if (updatedPosts.length > 0 && splitPerPost < minPerPost) {
        alert(`Minimum ${minPerPost} required per post`);
        return;
      }
    }

    setSelectedPosts(updatedPosts);
    // AUTO DISTRIBUTE
    const distributed = autoDistribute(updatedPosts);
    setSplitQuantities(distributed);
  };

  const handleContinue = () => {
    if (selectedPosts.length === 0) {
      alert(`Please select at least one ${label.toLowerCase()}`)
      return
    }

    const filteredPosts = media.filter((post, index) => {
      const id = getPostId(post, index) // ✅ SAME ID LOGIC
      return selectedPosts.includes(id)
    }).map((post, index) => {
      const id = getPostId(post, index)
      const image = post.image || post.cover || post.thumbnail || post.display_url || ''
      const link = post.link || post.permalink || post.url || ''
      return {
        ...post,
        id,
        image,
        link,
        contentType
      }
    })

    navigate('/quantity-pricing', {
      state: {
        username,
        platform,
        selectedService,
        userdata,
        quantity: TOTAL_ALLOWED || Number(selectedPackage?.quantity) || undefined,
        selectedPosts: filteredPosts,
        selectedPostsIds: selectedPosts,
        splitQuantities,
        contentType,
        entryPath,
        selectedPackage
      }
    })
  };

  // Image proxy helper for broken images
  const API_BASE = `${API_URL}/api`;
  const proxyUrl = (url, shortcode, profileUsername) => {
    if (!url && !shortcode && !profileUsername) return '';
    const params = new URLSearchParams();
    if (url) params.set('url', url);
    if (shortcode) params.set('shortcode', shortcode);
    if (profileUsername) params.set('username', profileUsername);
    return `${API_BASE}/instagram/image?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-transparent py-6 px-3 sm:px-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-5">
          <button
            onClick={() => {
              if (entryPath) {
                navigate(entryPath, { replace: true });
              } else {
                navigate('/profile-overview', {
                  state: { username, platform, userdata },
                  replace: true
                });
              }
            }}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-900 transition-all duration-300 text-[10px] font-bold">
              ←
            </span>
            <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
              Back
            </span>
          </button>
        </div>

        {/* Profile Header — responsive grid */}
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 mb-6 border border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Avatar */}
            <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
              {userdata?.avatar && !avatarError ? (
                <img
                  src={userdata.avatar}
                  alt="Profile"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const profileUsername = userdata?.username || username || '';
                    if (!e.target.src.includes('/instagram/image')) {
                      e.target.src = proxyUrl(userdata.avatar, null, profileUsername);
                    } else {
                      setAvatarError(true);
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-inner">
                  {(userdata?.username || username || 'U').replace(/^@/, '').charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Profile info — static platform label, no fetched name */}
            <div className="flex-1 min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-gray-900 truncate leading-tight">
                {platformProfileLabel}
              </h1>
              <div className="mt-0.5 flex flex-col sm:flex-row sm:items-center sm:gap-2 text-xs text-gray-500">
                <span className="truncate">
                  <span className="font-medium text-gray-700">Service: </span>
                  <span className="font-semibold text-gray-800 break-words">{displayHeadingService}</span>
                </span>
                <span className="hidden sm:inline text-gray-300">•</span>
                <span className="capitalize">
                  <span className="font-medium text-gray-700">Platform: </span>
                  <span className="font-semibold text-gray-800">{platform}</span>
                </span>
              </div>
            </div>

            {/* Selected count — single line */}
            <div className="flex-shrink-0 flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-xs text-gray-500">Selected {label}s:</span>
              <span className={`text-base sm:text-lg font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                {selectedPosts.length}
              </span>
            </div>
          </div>
        </div>

        {/* Posts Selection Card */}
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
          {/* Heading */}
          <div className="text-center mb-6 px-1">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight break-words">
              {headingText} for{' '}
              <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                {displayHeadingService}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-snug">
              {displayDescription}
            </p>
          </div>

          {/* No posts fallback */}
          {media.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">{emptyMessage}</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-6">
                We couldn't load any {label.toLowerCase()}s for <span className="font-semibold">@{userdata?.username}</span>.
                The account may be private or have no {label.toLowerCase()}s.
              </p>
              <button
                onClick={() => {
                  if (entryPath) navigate(entryPath, { replace: true });
                  else navigate('/profile-overview', { state: { username, platform, userdata }, replace: true });
                }}
                className={`bg-gradient-to-r ${config.color} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all`}
              >
                ← Go Back
              </button>
            </div>
          ) : (
            <>
              {/* Select All / Deselect All Controls */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-between mb-5">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const allpost = media.map((p, i) => getPostId(p, i));
                      setSelectedPosts(allpost)
                      setSplitQuantities(autoDistribute(allpost))
                    }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => { setSelectedPosts([]); setSplitQuantities({}); }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    Deselect All
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  {selectedPosts.length} of {media.length} {label.toLowerCase()}s selected
                </div>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 mb-6">
                {media.slice(0, visibleCount).map((post, index) => {
                  const postId = getPostId(post, index);
                  const postDisplayImg = post.image || post.thumbnail || post.cover || post.display_url;

                  return (
                    <div
                      key={postId}
                      onClick={() => handlePostToggle(postId)}
                      className={`relative cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${selectedPosts.includes(postId)
                        ? 'ring-4 ring-blue-500 shadow-2xl scale-105'
                        : 'hover:shadow-xl'
                        }`}
                    >
                      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                        {postDisplayImg ? (
                          <img
                            src={postDisplayImg}
                            alt={label}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              if (!e.target.src.includes('/instagram/image')) {
                                e.target.src = proxyUrl(postDisplayImg, post.shortcode);
                              } else {
                                e.target.style.display = 'none';
                              }
                            }}
                          />
                        ) : (
                          <div className="text-gray-400 text-3xl sm:text-4xl">
                            {contentType === 'story' ? '📸' : contentType === 'highlight' ? '⭐' : contentType === 'reel' ? '🎬' : '🖼️'}
                          </div>
                        )}
                      </div>

                      {/* ✅ Selection Indicator */}
                      {selectedPosts.includes(postId) && (
                        <>
                          {/* CHECK ICON */}
                          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-20 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>

                          {/* SPLIT QUANTITY */}
                          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-20">
                            <div className="bg-black/80 backdrop-blur-sm text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                              {splitQuantities[postId] ?? (selectedPosts.includes(postId) ?
                                Math.floor(TOTAL_ALLOWED / selectedPosts.length) : 0)}
                            </div>
                          </div>
                        </>
                      )}

                      {/* Stats */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 text-white pointer-events-none">
                        <div className="flex justify-between text-[10px] sm:text-xs">
                          {contentType === 'post' && (
                            <>
                              <span>❤️ {post.likes ?? ''}</span>
                              <span>💬 {post.comments ?? ''}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Button */}
              <div className="text-center px-2">
                <button
                  onClick={handleContinue}
                  disabled={selectedPosts.length === 0}
                  className={`bg-gradient-to-r ${config.color} text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto`}
                >
                  Continue with {selectedPosts.length} {label}{selectedPosts.length !== 1 ? 's' : ''}
                </button>
                {selectedPosts.length === 0 && (
                  <p className="text-sm text-gray-500 mt-2">Select at least one {label.toLowerCase()} to continue</p>
                )}
              </div>
            </>
          )}

          {/* Load More */}
          {visibleCount < media.length && (
            <div className="text-center mt-5 px-2">
              <button onClick={() => setVisibleCount(prev => prev + 12)}
                className={`bg-gradient-to-r ${config.color} text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                Load More {label}s
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsSelection;