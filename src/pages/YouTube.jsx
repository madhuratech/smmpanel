import React from 'react';
import Hero from '../components/Hero';
import LiveDeliveryCounter from '../components/LiveDeliveryCounter';
import Steps from '../components/Steps';
import useScrollToTop from '../hooks/useScrollToTop';
import { useLocation } from 'react-router-dom';

const YouTube = () => {
  useScrollToTop();
  const location = useLocation();

  const getService = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("likes")) return "likes";
    if (path.includes("subscribers")) return "subscribers";
    if (path.includes("comments")) return "comments";
    return "views";
  };

  return (
    <div className="min-h-screen">
      <Hero platform="youtube" />
      <div className="pt-14 sm:pt-16 pb-12 bg-[#f8f8fb]">
        <div className="flex justify-center mb-8 sm:mb-10">
          <LiveDeliveryCounter service={getService()} platform="YouTube" />
        </div>
        <Steps />
      </div>
    </div>
  );
};

export default YouTube;
