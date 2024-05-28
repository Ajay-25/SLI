import clsx from 'clsx';

//components
import { SectionSeparator } from '@/app/ui/home/SectionSeparator';
import { VideoContainer } from '@/app/ui/home/videoContainer';

//styles
import styles from '@/app/ui/home/home.module.css';

const BannerSection = () => {
  return (
    <div className="flex h-[60rem] w-full items-center justify-center bg-[url('/home/home-background.webp')] bg-cover bg-center">
      <VideoContainer />
    </div>
  );
};

const WelcomeContentSection = () => {
  return (
    <div className="mx-[14.2rem] mt-[4.8rem] flex flex-col justify-center gap-4 p-8 text-sos-secondary-blue shadow-2xl">
      <h1 className="text-center text-42 font-medium">Welcome</h1>
      <SectionSeparator />
      <div className="text-16 flex flex-col gap-8 p-2 text-center">
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
    <div className="mx-[14.2rem] mt-[6.4rem] flex flex-col justify-center gap-4 p-8 text-sos-primary-blue">
      <h2 className="text-center text-32 font-medium">
        What is the Service Leadership Institute
      </h2>
      <SectionSeparator />
      <div className="text-16 flex flex-col p-2">
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

const LeadershipInSettings = () => {
  return (
    <div
      className={clsx(
        'flex gap-6 border-[0.5rem] border-sos-primary-gold p-12 text-white',
        styles.leadershipBackgroundBlue,
      )}
    >
      <div className="self-center text-[18.2rem] leading-none">1</div>
      <div className="self-center text-24">
        Providing leadership in settings where the overarching mission is to
        care for, support and encourage positive outcomes for oneself and others
      </div>
    </div>
  );
};

const LeadershipAsVolunteer = () => {
  return (
    <div
      className={clsx(
        'flex gap-6 border-[0.5rem] border-sos-primary-gold p-12 text-white',
        styles.leadershipBackgroundBlue,
      )}
    >
      <div className="self-center text-[18.2rem] leading-none">2</div>
      <div className="self-center text-24">
        Providing leadership as a volunteer for the primary purpose of helping
        others and supporting a mission. These two conditions play an important
        role in how service leaders lead. Because the mission of Science of
        Spirituality is focused on self realization and God realization and
        founded on the principles of love, unity and, peace; the leadership
        practices exercised by managers and leaders in the organization should
        exemplify these qualities.AA
      </div>
    </div>
  );
};

const LeadershipSection = () => {
  return (
    <div className="mx-[14.2rem] flex flex-col bg-[url('/home/courses-background.webp')] bg-cover bg-center">
      <LeadershipInSettings />
      <div className="h-6 bg-white"></div>
      <LeadershipAsVolunteer />
    </div>
  );
};

const ServiceAttendContentSection = () => {
  return (
    <div className="mx-[14.2rem] mt-[6.4rem] flex flex-col justify-center gap-4 p-8 text-sos-primary-blue">
      <h2 className="text-center text-32 font-medium">How Can I Attend?</h2>
      <SectionSeparator />
      <div className="text-16 flex flex-col p-2">
        <p>
          The SLI currently offers courses in English and Spanish. If you are in
          a region that speaks either of these languages officially, please
          reach out to your Regional Coordinator to express interest in these
          courses. You will be able to be nominated by your Regional Coordinator
          to attend the next available SLI course.
        </p>
      </div>
      <div></div>
    </div>
  );
};

const CourseNomination = () => {
  return (
    <div
      className={clsx(
        'flex gap-6 p-12 text-sos-secondary-blue',
        styles.leadershipBackgroundYellow,
      )}
    >
      <div className="self-center text-[18.2rem] leading-none">1</div>
      <div className="self-center text-24">
        Ask your regional coordinator to be nominated for an upcoming SLI course
      </div>
    </div>
  );
};

const RSVPEmail = () => {
  return (
    <div
      className={clsx(
        'flex gap-6 p-12 text-sos-secondary-blue',
        styles.leadershipBackgroundYellow,
      )}
    >
      <div className="self-center text-[18.2rem] leading-none">2</div>
      <div className="flex flex-col gap-4 self-center text-24">
        <p>
          If space is available, an RSVP email will be sent to you. Respond
          accordingly and you will receive a confirmation email with either a
          link to a virtual class, or the address to the in-person class.
        </p>
        <p>Your attendance will be tracked.</p>
      </div>
    </div>
  );
};

const AttendSection = () => {
  return (
    <div className="mx-[14.2rem] flex flex-col bg-[url('/home/courses-background.webp')] bg-cover bg-center">
      <CourseNomination />
      <div className="h-6 bg-white"></div>
      <RSVPEmail />
    </div>
  );
};

export default function Page() {
  return (
    <article className="pb-[8rem]">
      <BannerSection />
      <WelcomeContentSection />
      <ServiceLeadershipContentSection />
      <LeadershipSection />
      <ServiceAttendContentSection />
      <AttendSection />
    </article>
  );
}
