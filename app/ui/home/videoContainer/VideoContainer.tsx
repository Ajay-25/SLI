//components
import Image from 'next/image';
import { Video } from '../video';

const VideoContainer = () => {
  return (
    <div className="relative h-[32rem] w-[54rem] border-8 border-sos-primary-gold lg:h-[42rem] lg:w-[70rem]">
      <Image
        src="/home/home-logo.webp"
        width={94}
        height={94}
        className="absolute left-1/2 hidden -translate-x-1/2 -translate-y-2/3 transform shadow-lg lg:block"
        alt="Service Leadership Institute text with logo"
      />
      <Image
        src="/home/home-logo.webp"
        width={60}
        height={60}
        className="absolute left-1/2 block -translate-x-1/2 -translate-y-2/3 transform shadow-lg lg:hidden"
        alt="Service Leadership Institute text with logo"
      />
      <Video />
    </div>
  );
};

export { VideoContainer };
