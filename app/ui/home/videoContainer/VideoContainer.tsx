//components
import Image from 'next/image';
import { Video } from '../video';

const VideoContainer = () => {
  return (
    <div className="relative h-[42rem] w-[70rem] border-8 border-sos-primary-gold">
      <Image
        src="/home/home-logo.webp"
        width={94}
        height={94}
        className="absolute left-1/2 block -translate-x-1/2 -translate-y-2/3 transform shadow-lg"
        alt="Service Leadership Institute text with logo"
      />
      <Video />
    </div>
  );
};

export { VideoContainer };
