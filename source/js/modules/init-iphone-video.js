import '../vendor/iphone-inline-video';

export const initVideos = () => {
  let videos = document.querySelectorAll('video');
  videos.forEach((video) => window.enableInlineVideo(video));
};

