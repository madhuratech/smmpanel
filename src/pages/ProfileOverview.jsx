import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'
import { resolveContentType } from '../utils/contentTypeMap'
import {Users,
  Heart,
  Eye,
  MessageCircle,
  Share2,
  Bookmark,
  Rocket
} from "lucide-react";

const detectServiceType = (name, category) => {
  const n = (name || "").toLowerCase();
  const c = (category || "").toLowerCase();

  if (n.includes("reels views") || n.includes("reels view") || c.includes("reels views") || c.includes("reels view") || n.includes("reels") || c.includes("reels")) {
    return "reels_views";
  }
  if (n.includes("story views") || n.includes("story view") || c.includes("story views") || c.includes("story view") || n.includes("story") || c.includes("story")) {
    return "story_views";
  }
  if (n.includes("story poll") || n.includes("poll votes") || n.includes("poll vote") || c.includes("story poll") || c.includes("poll votes")) {
    return "story_poll_votes";
  }
  if (n.includes("watch time") || n.includes("watchtime") || c.includes("watch time") || c.includes("watchtime")) {
    return "watch_time";
  }
  if (n.includes("live view") || c.includes("live view")) {
    return "live_views";
  }
  if (n.includes("follower") || c.includes("follower")) {
    return "followers";
  }
  if (n.includes("subscriber") || c.includes("subscriber")) {
    return "subscribers";
  }
  if (n.includes("like") || c.includes("like")) {
    return "likes";
  }
  if (n.includes("comment") || c.includes("comment")) {
    return "comments";
  }
  if (n.includes("share") || c.includes("share")) {
    return "shares";
  }
  if (n.includes("view") || c.includes("view")) {
    return "views";
  }
  return "likes"; // default fallback
};

const getServiceKey = (platform, serviceName) => {
  const p = (platform || "").toLowerCase().trim();
  const s = (serviceName || "").toLowerCase().trim();

  let key = "";
  if (s.includes("reels") || s.includes("reel")) {
    key = "reels";
  } else if (s.includes("story") || s.includes("stories")) {
    key = "story";
  } else if (s.includes("follower")) {
    key = "followers";
  } else if (s.includes("subscriber")) {
    key = "subscribers";
  } else if (s.includes("comment")) {
    key = "comments";
  } else if (s.includes("like")) {
    key = "likes";
  } else if (s.includes("share")) {
    key = "shares";
  } else if (s.includes("view")) {
    key = "views";
  } else {
    key = s.replace(/[^a-z0-9]/g, "_");
  }
  
  return `${p}_${key}`;
};

const ProfileOverview = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, selectedServiceKey, entryPath } = location.state || {}
  const userdata = location.state?.userdata || (username ? {
    username: username,
    avatar: '',
    followers: 0,
    following: 0,
    postsCount: 0,
    posts: []
  } : null);
  
  const [selectedService, setSelectedService] = useState(null)
  const [livePrices, setLivePrices] = useState({});
  const [services, setServices] = useState([]);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  // Auto-redirect if service is pre-selected from Navbar
  useEffect(() => {
    if (services.length > 0 && Object.keys(livePrices).length > 0 && selectedServiceKey) {
      const targetKey = selectedServiceKey.toLowerCase().trim();
      const matched = services.find(s => {
        const type = detectServiceType(s.name);
        return type === targetKey || s.name.toLowerCase().includes(targetKey);
      });
      if (matched) {
        // Prepare the selected service with pricing
        const key = getServiceKey(platform, matched.name);
        const livePriceItem = livePrices[key];
        const serviceWithPricing = {
          ...matched,
          serviceKey: key,
          packages: livePriceItem?.packages || [],
          pricing: livePriceItem?.pricing || null
        };
        const contentType = matched.contentType || resolveContentType(matched);

        if (contentType === "profile") {
          navigate("/quantity-pricing", {
            state: {
              username,
              platform,
              selectedService: serviceWithPricing,
              userdata,
              entryPath
            }
          });
        } else {
          navigate("/posts-selection", {
            state: {
              username,
              platform,
              selectedService: serviceWithPricing,
              userdata,
              contentType,
              entryPath
            }
          });
        }
      }
    }
  }, [services, livePrices, selectedServiceKey, platform, username, userdata, entryPath, navigate]);


  const API_URL = "http://localhost:5000/api/pricing/all";
  const SERVICES_API ="http://localhost:5001/api/services";

  useEffect(() =>{
    if(!username && !userdata){
      navigate("/instagram",{replace: true});
    }
  },[username, userdata, navigate]);

  if (!username && !userdata) return null;


  useEffect(() => {

  const fetchLivePrices = async () => {

    try {

      const response = await fetch(API_URL, {
        cache: "no-store"
      });

      const data = await response.json();

      if (data.success) {

        const formatted = {};

        data.data.forEach((item) => {

          const key = item.serviceKey;

          formatted[key] = {
            startingPrice: item.startingPrice ?? 0,
            description: item.description || "",
            baseQty: item.baseQuantity ?? item.packages?.[0]?.quantity ?? 100,
            packages: item.packages || [],
            pricing: item
          };

        });

        setLivePrices(formatted);
      }

    } catch (error) {

      console.log("LIVE PRICE ERROR:", error);

    }

  };

  fetchLivePrices();

  // AUTO LIVE UPDATE
  const interval = setInterval(fetchLivePrices, 3000);

  return () => clearInterval(interval);

}, []);


  // Platform-specific services
useEffect(() => {

  const fetchServices = async () => {

    try {

      const response = await fetch(
        SERVICES_API
      );

      const data = await response.json();

      if (data.success) {

        const filtered =
          data.services.filter(
            (s) =>
              s.type?.toLowerCase() ===
              platform?.toLowerCase()
          );

        const formatted =
          filtered.map((s) => ({

            id: s._id,

            provider_service_id:
              s.provider_service_id,

            name:
              s.name.split("|")[0].trim(),

            serviceKey:
              s.name
                .toLowerCase()
                .replace(/\s+/g, "-"),

            icon:
                s.name,

            contentType: s.contentType,

            description:
              `Boost your ${s.name.split("|")[0].trim()} instantly`,

            popular: false

          }));

        setServices(formatted);

      }

    } catch (error) {

      console.log(
        "SERVICE FETCH ERROR:",
        error
      );

    }

  };

  fetchServices();

  // AUTO LIVE REFRESH
  const interval =
    setInterval(fetchServices, 3000);

  return () =>
    clearInterval(interval);

}, [platform]);


const config = {

  color:
    "from-pink-500 to-purple-600",

  name:
    platform
      ?.charAt(0)
      ?.toUpperCase() +
    platform?.slice(1)

};



const getServiceIcon = (serviceName) => {

  const name =
    serviceName?.toLowerCase();

  if (
    name.includes("followers") ||
    name.includes("subscriber")
  ) {
    return (
      <Users
        size={30}
        className="text-white fill-white"
      />
    );
  }

  if (name.includes("likes")) {
    return (
      <Heart
        size={30}
        className="text-white fill-white"
      />
    );
  }

  if (name.includes("views")) {
    return (
      <Eye
        size={30}
        className="text-white"
      />
    );
  }

  if (name.includes("comments")) {
    return (
      <MessageCircle
        size={40}
        className="text-green-300"
      />
    );
  }

  if (name.includes("shares")) {
    return (
      <Share2
        size={40}
        className="text-yellow-300"
      />
    );
  }

  if (name.includes("saves")) {
    return (
      <Bookmark
        size={40}
        className="text-pink-300 fill-pink-300"
      />
    );
  }

  return (
    <Rocket
      size={40}
      className="text-white"
    />
  );
};

  const handleServiceSelect = async (service) => {
    setSelectedService(service.id);

    const key = getServiceKey(platform, service.name);
    const livePriceItem = livePrices[key];

    const serviceWithPricing = {
      ...service,
      serviceKey: key,
      packages: livePriceItem?.packages || [],
      pricing: livePriceItem?.pricing || null
    };

    // Dynamic content type
    const contentType = service.contentType || resolveContentType(service);

    // PROFILE SERVICES → go directly to quantity
    if (contentType === "profile") {
      navigate("/quantity-pricing", {
        state: {
          username,
          platform,
          selectedService: serviceWithPricing,
          userdata
        }
      });
      return;
    }

    // CONTENT SERVICES → go directly to posts selection
    navigate("/posts-selection", {
      state: {
        username,
        platform,
        selectedService: serviceWithPricing,
        userdata,
        contentType
      }
    });
  };

// Formatnumber;
 const formatnumber = (num) => {
    if(num === undefined || num === null) return "0";
    if(num > 1000000) return (num / 1000000).toFixed(1) + 'M';
    if(num > 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };


  const getLivePrice = (serviceName) => {
    const key = getServiceKey(platform, serviceName);
    const item = livePrices[key];
    if (!item || item.startingPrice === undefined || item.startingPrice === null) return "";
    return `From $${item.startingPrice}`;
  };

  const getServiceDescription = (serviceName) => {
    const key = getServiceKey(platform, serviceName);
    const item = livePrices[key];
    if (item && item.description) return item.description;
    return `Boost your ${serviceName} instantly.`;
  };

  if (selectedServiceKey) {
    return (
      <div className="min-h-screen bg-[#0f0817] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        <p className="text-gray-400 mt-4 text-sm font-semibold">Loading your posts...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-transparent py-8 px-4`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
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
        
        {/* Profile Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {userdata?.avatar ? (
                  <img 
                    src={userdata.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =`http://localhost:5000/api/instagram/image?url=${encodeURIComponent(userdata?.avatar)}`

                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                    {userdata?.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              {userdata?.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 w-7 h-7 rounded-full border-4 border-white flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-2">
                 <h1 className="text-3xl font-bold text-gray-900">@{userdata?.username?.startsWith('@') ? userdata.username.slice(1) : userdata?.username}</h1>
                 {userdata?.verified && <span className="text-blue-500">✔</span>}
                 {userdata?.isPrivate && (
                   <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">Private</span>
                 )}
               </div>
               
               {userdata?.url && (
                 <a 
                   href={userdata.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-blue-600 text-sm hover:underline block mb-3"
                 >
                   {userdata.url}
                 </a>
               )}

               <p className="text-gray-600 mb-4">{userdata?.bio || userdata?.description}</p>
              
              <div className="flex gap-8">
               {(platform === "instagram" || platform === "facebook" || platform === "tiktok") &&  (
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{formatnumber(userdata?.postsCount || userdata?.posts_count)}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                )}
                 {platform === "youtube" && (
                  <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                   {formatnumber(userdata?.videosCount)}
                  </div>
                 <div className="text-sm text-gray-600">Videos</div>
                </div>
                 )}

                 {/* instagram followers */}

                {(platform === "facebook" || platform === "instagram" || platform === "tiktok") && (
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{formatnumber(userdata?.followers)}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                )}

                
                {platform === "youtube" && (
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{formatnumber
                    (userdata?.subscribers)}</div>
                  <div className="text-sm text-gray-600">Subscribers</div>
                </div>
                )}


                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{formatnumber(userdata?.following)}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Loading Overlay */}
        {isLoadingContent && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-700 font-semibold">Loading content...</p>
            </div>
          </div>
        )}

        {/* Services Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Choose Your <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>{config.name}</span> Service
            </h2>
            <p className="text-gray-600">Select the service you want to boost for this profile</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className="relative cursor-pointer group transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                {service.popular && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    POPULAR
                  </div>
                )}
                
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-gray-200 transition-all group-hover:shadow-lg h-full flex flex-col justify-between">
                  <div className="text-center mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${config.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg`}>
                     <span className="drop-shadow-lg">
                       {getServiceIcon(service.name)}
                        </span>
                      </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2 min-h-[56px]">
                      {service.name}
                     </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[40px]">{getServiceDescription(service.name)}</p>
                    <div className={`text-lg font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                       {getLivePrice(service.name)}
                    </div>
                  </div>
                  
                  <button   onClick={() => handleServiceSelect(service)}className={`w-full bg-gradient-to-r ${config.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200`}>
                  Select Service 
                 </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileOverview