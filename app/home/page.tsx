import clsx from 'clsx';
import Link from 'next/link';

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
    <div className="mx-[4.2rem] lg:mx-[14.2rem] mt-[4.8rem] flex flex-col justify-center gap-4 p-8 text-sos-secondary-blue shadow-2xl">
      <h1 className="text-center text-42 font-medium">Welcome</h1>
      <SectionSeparator />
      <div className="flex flex-col gap-8 p-2 text-center text-20">
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
    <div className="mx-[2.2rem] lg:mx-[14.2rem] mt-[6.4rem] flex flex-col justify-center gap-4 p-8 text-sos-primary-blue">
      <h2 className="text-center text-32 font-medium">
        What is the Service Leadership Institute
      </h2>
      <SectionSeparator />
      <div className="flex flex-col p-2 text-20">
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
        'flex gap-6 border-[0.5rem] border-sos-primary-gold p-4 lg:p-12 text-white',
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
        'flex gap-6 border-[0.5rem] border-sos-primary-gold p-4 lg:p-12 text-white',
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
        exemplify these qualities.
      </div>
    </div>
  );
};

const LeadershipSection = () => {
  return (
    <div className="mx-[2.2rem] lg:mx-[14.2rem] flex flex-col bg-[url('/home/courses-background.webp')] bg-cover bg-center">
      <LeadershipInSettings />
      <div className="h-6 bg-white"></div>
      <LeadershipAsVolunteer />
    </div>
  );
};

const ServiceAttendContentSection = () => {
  return (
    <div className="mx-[2.2rem] lg:mx-[14.2rem] mt-[6.4rem] flex flex-col justify-center gap-4 p-8 text-sos-primary-blue">
      <h2 className="text-center text-32 font-medium">How Can I Attend?</h2>
      <SectionSeparator />
      <div className="flex flex-col p-2 text-20">
        <p>
          The SLI currently offers courses in English and Spanish. The course
          schedule will be posted on this website on the “Courses” page where
          you are able to register yourself.
        </p>
      </div>
    </div>
  );
};

const CourseNomination = ({ classname }: { classname: string }) => {
  return (
    <div
      className={clsx(
        'flex gap-6 p-4 lg:p-12 text-sos-secondary-blue',
        styles.leadershipBackgroundYellow,
        classname,
      )}
    >
      <div className="self-center text-[18.2rem] leading-none">1</div>
      <div className="self-center text-24">
        Visit{' '}
        <Link className="underline" href="https://sli.sos.org">
          sli.sos.org
        </Link>{' '}
        (this website)
      </div>
    </div>
  );
};

const RSVPEmail = ({ classname }: { classname: string }) => {
  return (
    <div
      className={clsx(
        'flex gap-6 p-4 lg:p-12 text-sos-secondary-blue',
        styles.leadershipBackgroundYellow,
        classname,
      )}
    >
      <div className="self-center text-[18.2rem] leading-none">2</div>
      <div className="flex flex-col gap-4 self-center text-24">
        <p>
          Navigate to the “Courses” page and register to the course you wish to
          attend
        </p>
      </div>
    </div>
  );
};

const AttendSection = () => {
  return (
    <div className="mx-[2.2rem] lg:mx-[14.2rem] flex bg-[url('/home/courses-background.webp')] bg-cover bg-center">
      <CourseNomination classname="flex-1" />
      <div className="w-12 bg-white"></div>
      <RSVPEmail classname="flex-1" />
    </div>
  );
};

const CertifiedSteps = () => {
  const Step1 = (
    <div className="flex h-96 w-96 flex-none gap-6 border-4 border-sos-secondary-dark-gold bg-sos-primary-gold p-12 text-sos-secondary-blue">
      <div className="self-center text-[7.2rem] leading-none">1</div>
      <div className="flex flex-col gap-4 self-center text-24">
        <p>Complete 5/7 courses</p>
      </div>
    </div>
  );
  const Step2 = (
    <div className="flex h-96 w-96 flex-none gap-6 border-4 border-sos-secondary-blue bg-sos-primary-blue p-12 text-white">
      <div className="self-center text-[7.2rem] leading-none">2</div>
      <div className="flex flex-col gap-4 self-center text-24">
        <p>Receive notification email</p>
      </div>
    </div>
  );
  const Step3 = (
    <div className="flex h-96 w-96 flex-none gap-6 border-4 border-sos-secondary-dark-gold bg-sos-primary-gold p-12 text-sos-secondary-blue">
      <div className="self-center text-[7.2rem] leading-none">3</div>
      <div className="flex flex-col gap-4 self-center text-24">
        <p>Confirm postal address and Name</p>
      </div>
    </div>
  );

  return (
    <div className="flex justify-between">
      {Step1}
      {Step2}
      {Step3}
    </div>
  );
};

const CertifiedSection = () => {
  return (
    <div className="mx-[14.2rem] mt-[6.4rem] flex flex-col justify-center gap-4 p-8 text-sos-primary-blue">
      <h2 className="text-center text-32 font-medium">
        How Can I Get Certified?
      </h2>
      <SectionSeparator />
      <div className="flex flex-col p-2 text-20">
        <p>
          To achieve certification from the Service Leadership Institute,
          participants are required to complete five out of the seven courses we
          offer. Once you have successfully completed the necessary courses, you
          will receive an email from us to verify your postal address and
          confirm the spelling of your name. Upon confirmation, your
          certification will be processed and mailed to you. If you have any
          further questions, please feel free to reach out through our website.
        </p>
      </div>
      <CertifiedSteps />
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
      <CertifiedSection />
    </article>
  );
}
