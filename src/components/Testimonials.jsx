import { useRef, useEffect } from 'react'
import image1 from '../assets/images/1.png'
import image2 from '../assets/images/2.png'
import image3 from '../assets/images/3.png'
import image4 from '../assets/images/4.png'
import image5 from '../assets/images/5.png'

export default function Testimonials() {
  const scrollRef = useRef(null)

  const testimonials = [
    {
      name: 'Lucas Bennett',
      location: 'Canada',
      text: "I'm getting more recognition for my TikTok videos from the increased amount of traffic after using their services; they made the entire procedure easy and the results came quickly.",
      rating: 5,
      avatar: image1
    },
    {
      name: 'Amelia Clarke',
      location: 'Australia',
      text: "I was able to promote my Instagram page before beginning my campaign and I found it increased the activity on my page dramatically.",
      rating: 5,
      avatar: image2
    },
    {
      name: 'Hassan Ali',
      location: 'United Arab Emirates',
      text: "I was able to increase the number of views on my YouTube video and as a result, my channel is becoming more recognizable.",
      rating: 5,
      avatar: image3
    },
    {
      name: 'Sofia Martinez',
      location: 'Spain',
      text: "I used them for their Instagram likes, and it worked just as I thought it would; it was very easy to do as well.",
      rating: 5,
      avatar: image4
    },
    {
      name: 'Daniel Kim',
      location: 'South Korea',
      text: "I utilized them for my Facebook page and as a result, my Facebook page is much more credible than it originally was.",
      rating: 5,
      avatar: image5
    }
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollSpeed = 0.5; // Slow auto-scroll speed

    const autoScroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        // Reset scroll when reaching the end (seamless loop)
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 3) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scroll
    animationId = requestAnimationFrame(autoScroll);

    // Handle mouse wheel scroll
    const handleWheel = (e) => {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY * 2; // Horizontal scroll with mouse wheel
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    // Pause auto-scroll on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(autoScroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('wheel', handleWheel);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const TestimonialCard = ({ testimonial }) => (
    <div className="flex-shrink-0 w-80 mx-4 backdrop-blur-xl rounded-2xl border-2 border-white/60 p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group relative overflow-hidden bg-white/10 hover:bg-white/20">
      {/* Decorative Elements */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-[#FF6B35]/20 to-[#FFA500]/10 rounded-full blur-lg"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-br from-[#FFB3D9]/20 to-[#FF6B35]/10 rounded-full blur-md"></div>

      {/* Rating Stars */}
      <div className="flex gap-1 mb-4 relative z-10">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-[#FFA500] drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 leading-relaxed mb-6 italic text-sm relative z-10 group-hover:text-gray-600 transition-colors duration-300">
        "{testimonial.text}"
      </p>

      {/* Author Info with Profile Picture */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200/50 relative z-10">
        <div className="relative">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover shadow-lg ring-2 ring-white/50 group-hover:ring-[#FFA500]/30 transition-all duration-300"
          />
        </div>
        <div>
          <h4 className="font-bold text-black text-sm group-hover:text-gray-800 transition-colors duration-300">
            {testimonial.name}
          </h4>
          <p className="text-xs text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
            {testimonial.location}
          </p>
        </div>
      </div>

      {/* Hover Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
    </div>
  );

  return (
    <div className="py-16 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base text-gray-800 max-w-2xl mx-auto leading-relaxed">
            Real feedback from satisfied customers who've grown their social media presence with our services.
          </p>
        </div>

        {/* Horizontal Scrolling Carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`testimonial-${index}`} testimonial={testimonial} />
          ))}
        </div>

      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
