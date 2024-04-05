import clsx from 'clsx';

//components
import { SectionSeparator } from '@/app/ui/home/SectionSeparator';

//styles
import styles from '@/app/ui/home/home.module.css';

const BannerImageSection = () => {
  return (
    <>
      <div className="h-[92rem] w-full bg-[url('/home/home-background.jpeg')] bg-cover bg-center"></div>
      <div
        className={clsx(
          'border-sos-primary-gold absolute left-1/2 top-1/2 border-8 border-solid p-[5rem] text-center text-[5.2rem] font-medium',
          styles.bannerText,
        )}
      >
        Unlock your potential, embody spiritual wisdom, and lead with love
        through the transformative leadership programs.
      </div>
    </>
  );
};

const WelcomeContentSection = () => {
  return (
    <div className="mx-[14.2rem] mt-[4.8rem] flex flex-col justify-center gap-4 p-8 shadow-2xl">
      <h1 className="text-42 text-center font-medium">Welcome</h1>
      <SectionSeparator />
      <div className="text-24 flex flex-col gap-8 p-2 text-center">
        <p>
          Welcome to the Service Leadership Institute, where we merge the
          profound teachings of the Spiritual Masters with practical leadership
          skills to cultivate a unique approach to service. As you embark on
          this transformative journey, explore our courses designed to empower
          you as a service leader, rooted in the qualities of your empowered
          soul.
        </p>
        <p>
          Discover the art of effective meeting management, loving
          communication, and the essentials of service leadership. Join us in
          unlocking the secrets to impactful leadership, where spirituality and
          management converge to shape leaders who embody love, unity, and
          peace. Get ready to learn, grow, and lead with purpose.
        </p>
      </div>
    </div>
  );
};

const ServiceLeadershipContentSection = () => {
  return (
    <div className="mx-[14.2rem] mt-[6.4rem] flex flex-col justify-center gap-4 p-8">
      <h2 className="text-32 text-sos-primary-blue text-center font-medium">
        What is the Service Leadership Institute
      </h2>
      <SectionSeparator />
      <div className="text-24 flex flex-col p-2">
        <p>
          Service Leadership starts with the premise that serving through
          leadership is most effective when we draw from the Qualities of our
          empowered Soul. Building upon these qualities of Unlimited Wisdom,
          Immortality, Unconditional Love, Fearlessness, Connectedness and
          Bliss, Service Leadership involves two things:
        </p>
      </div>
      <div></div>
    </div>
  );
};

export default function Page() {
  return (
    <>
      <BannerImageSection />
      <WelcomeContentSection />
      <ServiceLeadershipContentSection />
    </>
  );
}
