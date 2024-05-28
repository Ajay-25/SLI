import React from 'react';

const Video = () => {
  return (
    <div className="video-container h-full">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/xrJtBk9q7DY"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export { Video };
