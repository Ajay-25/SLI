import React from 'react';

const Video = () => {
  return (
    <div className="video-container h-full">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/EZRg66nPLN4?si=xefRbrEaHOanyCe1&rel=0"
        title="The Service Leadership Institute"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export { Video };
