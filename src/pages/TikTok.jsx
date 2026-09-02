import React from 'react';
import Hero from '../components/Hero';
import LiveDeliveryCounter from '../components/LiveDeliveryCounter';
import Steps from '../components/Steps';
import useScrollToTop from '../hooks/useScrollToTop';
import { useLocation } from 'react-router-dom';

const TikTok = () => {
  useScrollToTop();
  const location = useLocation();

  const getService = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("shares")) return "shares";
    if (path.includes("followers")) return "followers";
    if (path.includes("likes")) return "likes";
    return "views";
  };

  return (
    <div className="min-h-screen">
      <Hero platform="tiktok" />
      <div className="pt-14 sm:pt-16 pb-12 bg-[#f8f8fb]">
        <div className="flex justify-center mb-8 sm:mb-10">
          <LiveDeliveryCounter service={getService()} platform="TikTok" />
        </div>
        <Steps />
      </div>
    </div>
  );
};

export default TikTok;
