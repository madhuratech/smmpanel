import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'

const PostsSelection = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()
  const {username,platform,selectedService,quantity,entryPath} = location.state || {}
  const [selectedPosts, setSelectedPosts] = useState(
  location.state?.selectedPostsIds || []
 );


  const userdata = location.state?.userdata

  const TOTAL_ALLOWED = Number(quantity) || 0;

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
    instagram: { color: 'from-pink-500 to-purple-600', name: 'Instagram', bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50' },
    youtube: { color: 'from-red-500 to-red-600', name: 'YouTube', bgColor: 'bg-gradient-to-br from-red-50 to-orange-50' },
    facebook: { color: 'from-blue-600 to-blue-700', name: 'Facebook', bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50' },
    tiktok: { color: 'from-black to-gray-800', name: 'TikTok', bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50' }
  }

  const config = platformConfig[platform] || platformConfig.instagram

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
        quantity: TOTAL_ALLOWED,
        selectedPosts: filteredPosts,
        selectedPostsIds: selectedPosts,
        splitQuantities,
        contentType,
        entryPath
      }
    })
  };

  // Image proxy helper for broken images
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const proxyUrl = (url) => {
    if (!url) return '';
    return `${API_BASE}/instagram/image?url=${encodeURIComponent(url)}`;
  };

  return (
    <div className={`min-h-screen bg-transparent py-8 px-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
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

        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
              {userdata?.avatar ? (
                <img
                  src={userdata.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (!e.target.src.includes('/image?url=')) {
                      e.target.src = proxyUrl(userdata.avatar);
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  {userdata?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">@{userdata?.username}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Service: <span className="font-semibold">{selectedService?.name}</span></span>
                <span>•</span>
                <span>Platform: <span className="font-semibold capitalize">{platform}</span></span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Selected {label}s</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                {selectedPosts.length}
              </div>
            </div>
          </div>
        </div>

        {/* Posts Selection */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {headingText} for{' '}
              <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                {selectedService?.name}
              </span>
            </h2>
            <p className="text-gray-600">
              Choose which {label.toLowerCase()}s you want to boost with {selectedService?.name?.toLowerCase()}
            </p>
          </div>

          {/* No posts fallback */}
          {media.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">{emptyMessage}</h3>
              <p className="text-gray-500 mb-6">
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
              {/* Select All / Deselect All */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const allpost = media.map((p,i) => getPostId(p,i));
                      setSelectedPosts(allpost)
                      setSplitQuantities(autoDistribute(allpost))
                    }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => { setSelectedPosts([]); setSplitQuantities({});}}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Deselect All
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  {selectedPosts.length} of {media.length} {label.toLowerCase()}s selected
                </div>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                {media.slice(0, visibleCount).map((post, index) => {
                  const postId = getPostId(post, index);
                  const postDisplayImg = post.image || post.thumbnail || post.cover || post.display_url;

                  return (
                    <div
                      key={postId}
                      onClick={() => handlePostToggle(postId)}
                      className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${selectedPosts.includes(postId)
                        ? 'ring-4 ring-blue-500 shadow-2xl scale-105'
                        : 'hover:shadow-xl'
                        }`}
                    >
                      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                        {postDisplayImg ? (
                          <img
                            src={postDisplayImg}
                            alt={label}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              if (!e.target.src.includes('/image?url=')) {
                                e.target.src = proxyUrl(postDisplayImg);
                              }
                            }}
                          />
                        ) : (
                          <div className="text-gray-400 text-4xl">
                            {contentType === 'story' ? '📸' : contentType === 'highlight' ? '⭐' : contentType === 'reel' ? '🎬' : '🖼️'}
                          </div>
                        )}
                      </div>

                      {/* ✅ Selection Indicator */}
                       {selectedPosts.includes(postId) && (
                      <>
  
                     {/* CHECK ICON */} 
                     <div className="absolute top-2 right-2 z-20 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor"viewBox="0 0 20 20">
                      <path fillRule="evenodd"
                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                       clipRule="evenodd"
                       />
                      </svg>
                    </div>

    {/* SPLIT QUANTITY */}
                   <div className="absolute top-2 left-2 z-20">
                  <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  { splitQuantities[postId] ?? ( selectedPosts.includes(postId) ?
                   Math.floor(TOTAL_ALLOWED / selectedPosts.length): 0)}
                 </div>
                </div>
                </>
               )}

                      {/* Stats */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 right-2 text-white pointer-events-none">
                        <div className="flex justify-between text-xs">
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
              <div className="text-center ">
                <button
                  onClick={handleContinue}
                  disabled={selectedPosts.length === 0}
                  className={`bg-gradient-to-r ${config.color} text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  Continue with {selectedPosts.length} {label}{selectedPosts.length !== 1 ? 's' : ''}
                </button>
                {selectedPosts.length === 0 && (
                  <p className="text-sm text-gray-500 mt-2">Select at least one {label.toLowerCase()} to continue</p>
                )}
              </div>
            </>
          )}
        {visibleCount < media.length && (
       <div className="text-center mb-6 mt-5">
       <button  onClick={() => setVisibleCount(prev => prev + 12)}
      className={`bg-gradient-to-r ${config.color} text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
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