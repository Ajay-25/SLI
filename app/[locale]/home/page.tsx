import clsx from 'clsx';
import { Link } from '@i18n/navigation';

//hooks
import { useTranslations } from 'next-intl';

//components
import { SectionSeparator } from '@/ui/home/SectionSeparator';
import { VideoContainer } from '@/ui/home/videoContainer';

//styles
import styles from '@/ui/home/home.module.css';

const BannerSection = () => {
  return (
    <div className="flex h-[40rem] w-full items-center justify-center bg-[url('/home/home-background.webp')] bg-cover bg-center lg:h-[60rem]">
      <VideoContainer />
    </div>
  );
};

const WelcomeContentSection = () => {
  const t = useTranslations('HomePage');

  return (
    <div className="mx-[2.2rem] mt-[4.8rem] flex flex-col justify-center gap-4 p-8 text-sos-secondary-blue shadow-2xl lg:mx-[14.2rem]">
      <h1 className="text-center text-32 font-medium lg:text-42">
        {t('WelcomeContentSection.title')}
      </h1>
      <SectionSeparator />
      <div className="flex flex-col gap-8 p-2 text-center text-16 lg:text-20">
        <p>{t('WelcomeContentSection.introMessage')}</p>
        <p>{t('WelcomeContentSection.missionStatement')}</p>
      </div>
    </div>
  );
};

const ServiceLeadershipContentSection = () => {
  const t = useTranslations('HomePage');

  return (
    <div className="mx-[2.2rem] mt-[6.4rem] flex flex-col justify-center gap-4 p-2 text-sos-primary-blue lg:mx-[14.2rem] lg:p-8 ">
      <h2 className="text-center text-24 font-medium lg:text-32">
        {t('ServiceLeadershipContentSection.title')}
      </h2>
      <SectionSeparator />
      <div className="flex flex-col p-2 text-justify text-16 lg:text-20">
        <p> {t('ServiceLeadershipContentSection.description')}</p>
      </div>
    </div>
  );
};

const LeadershipInSettings = () => {
  const t = useTranslations('HomePage');

  return (
    <div
      className={clsx(
        'flex gap-6 border-[0.5rem] border-sos-primary-gold p-4 text-white lg:p-12',
        styles.leadershipBackgroundBlue,
      )}
    >
      <div className="self-center text-[12rem] leading-none lg:text-[18.2rem]">
        {t('LeadershipSection.LeadershipInSettings.title')}
      </div>
      <div className="self-center text-20 lg:text-24">
        {t('LeadershipSection.LeadershipInSettings.description')}
      </div>
    </div>
  );
};

const LeadershipAsVolunteer = () => {
  const t = useTranslations('HomePage');

  return (
    <div
      className={clsx(
        'flex gap-6 border-[0.5rem] border-sos-primary-gold p-4 text-white lg:p-12',
        styles.leadershipBackgroundBlue,
      )}
    >
      <div className="self-center text-[12rem] leading-none lg:text-[18.2rem]">
        {t('LeadershipSection.LeadershipAsVolunteer.title')}
      </div>
      <div className="self-center text-20 lg:text-24">
        {t('LeadershipSection.LeadershipAsVolunteer.description')}
      </div>
    </div>
  );
};

const LeadershipSection = () => {
  return (
    <div className="mx-[2.2rem] flex flex-col bg-[url('/home/courses-background.webp')] bg-cover bg-center lg:mx-[14.2rem]">
      <LeadershipInSettings />
      <div className="h-6 bg-white"></div>
      <LeadershipAsVolunteer />
    </div>
  );
};

const ServiceAttendContentSection = () => {
  const t = useTranslations('HomePage');

  return (
    <div className="mx-[2.2rem] mt-[6.4rem] flex flex-col justify-center gap-4 p-2 text-sos-primary-blue lg:mx-[14.2rem] lg:p-8">
      <h2 className="text-center text-24 font-medium lg:text-32">
        {t('ServiceAttendContentSection.title')}
      </h2>
      <SectionSeparator />
      <div className="flex flex-col p-2 text-justify text-16 lg:text-20">
        <p>{t('ServiceAttendContentSection.details')}</p>
      </div>
    </div>
  );
};

const CourseNomination = ({ classname }: { classname: string }) => {
  const t = useTranslations('HomePage');

  return (
    <div
      className={clsx(
        'flex gap-6 p-8 text-sos-secondary-blue lg:p-12',
        styles.leadershipBackgroundYellow,
        classname,
      )}
    >
      <div className="self-center text-[10rem] leading-none lg:text-[18.2rem]">
        {t('AttendSection.CourseNomination.title')}
      </div>
      <div className="self-center text-20 lg:text-24">
        {t.rich('AttendSection.CourseNomination.description', {
          link: (chunks) => (
            <Link className="underline" href="https://sli.sos.org">
              {chunks}
            </Link>
          ),
        })}
      </div>
    </div>
  );
};

const RSVPEmail = ({ classname }: { classname: string }) => {
  const t = useTranslations('HomePage');

  return (
    <div
      className={clsx(
        'flex gap-6 p-8 text-sos-secondary-blue lg:p-12',
        styles.leadershipBackgroundYellow,
        classname,
      )}
    >
      <div className="self-center text-[10rem] leading-none lg:text-[18.2rem]">
        {t('AttendSection.RSVPEmail.title')}
      </div>
      <div className="flex flex-col gap-4 self-center text-20 lg:text-24">
        <p>{t('AttendSection.RSVPEmail.description')}</p>
      </div>
    </div>
  );
};

const AttendSection = () => {
  return (
    <div className="mx-[2.2rem] flex flex-col bg-[url('/home/courses-background.webp')] bg-cover bg-center lg:mx-[14.2rem] lg:flex-row">
      <CourseNomination classname="flex-1" />
      <div className="h-4 w-full bg-white lg:h-auto lg:w-12"></div>
      <RSVPEmail classname="flex-1" />
    </div>
  );
};

const CertifiedSteps = () => {
  const t = useTranslations('HomePage');

  const Step1 = (
    <div className="flex h-72 flex-none gap-6 border-4 border-sos-secondary-dark-gold bg-sos-primary-gold p-8 text-sos-secondary-blue lg:h-96 lg:w-96 lg:p-12">
      <div className="self-center text-[7.2rem] leading-none">1</div>
      <div className="flex flex-col gap-4 self-center text-20 lg:text-24">
        <p>{t('CertifiedSection.CertifiedSteps.Step1')}</p>
      </div>
    </div>
  );
  const Step2 = (
    <div className="flex  h-72 flex-none gap-6 border-4 border-sos-secondary-blue bg-sos-primary-blue p-8 text-white lg:h-96 lg:w-96 lg:p-12">
      <div className="self-center text-[7.2rem] leading-none">2</div>
      <div className="flex flex-col gap-4 self-center text-20 lg:text-24">
        <p>{t('CertifiedSection.CertifiedSteps.Step2')}</p>
      </div>
    </div>
  );
  const Step3 = (
    <div className="flex  h-72 flex-none gap-6 border-4 border-sos-secondary-dark-gold bg-sos-primary-gold p-8 text-sos-secondary-blue lg:h-96 lg:w-96 lg:p-12">
      <div className="self-center text-[7.2rem] leading-none">3</div>
      <div className="flex flex-col gap-4 self-center text-20 lg:text-24">
        <p>{t('CertifiedSection.CertifiedSteps.Step3')}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-0">
      {Step1}
      {Step2}
      {Step3}
    </div>
  );
};

const CertifiedSection = () => {
  const t = useTranslations('HomePage');

  return (
    <div className="mx-[2.2rem] mt-[6.4rem] flex flex-col justify-center gap-4 p-2 text-sos-primary-blue lg:mx-[14.2rem] lg:p-8">
      <h2 className="text-center text-32 font-medium">
        {t('CertifiedSection.title')}
      </h2>
      <SectionSeparator />
      <div className="flex flex-col p-2 text-justify text-16 lg:text-20">
        <p>{t('CertifiedSection.details')}</p>
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
