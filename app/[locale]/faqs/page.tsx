//components
import { SectionSeparator } from '@components/home/SectionSeparator';
import { Metadata } from 'next';

//hooks
import { useTranslations } from 'next-intl';

//constants
import { SUPPORTED_LOCALES } from '@lib/constants/locales';

const HowToEnrollSection = () => {
  const t = useTranslations('FAQPage.HowToEnrollSection');

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-24 font-medium text-sos-secondary-blue lg:text-32">
        {t('title')}
      </h2>
      <div className="flex flex-col gap-4 text-justify text-16 font-medium text-sos-primary-blue lg:gap-8 lg:text-20">
        <p>{t('description')}</p>
        <ol className="list-inside list-decimal pl-4">
          {t.raw('steps').map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <span className="text-20 underline lg:text-24">
          {t('importantNote')}
        </span>
        <p>{t('reservationPolicy')}</p>
      </div>
    </section>
  );
};

const UnableToAttendSection = () => {
  const t = useTranslations('FAQPage.UnableToAttendSection');

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-24 font-medium text-sos-secondary-blue lg:text-32">
        {t('title')}
      </h2>
      <p className="flex flex-col gap-4 text-justify text-16 font-medium text-sos-primary-blue lg:gap-8 lg:text-20">
        {t('description')}
      </p>
    </section>
  );
};

const CourseAsGroupSection = () => {
  const t = useTranslations('FAQPage.CourseAsGroupSection');

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-24 font-medium text-sos-secondary-blue lg:text-32">
        {t('title')}
      </h2>
      <div className="flex flex-col gap-4 text-justify text-16 font-medium text-sos-primary-blue lg:gap-8 lg:text-20">
        <p>{t('description')}</p>
        <ol className="list-inside list-decimal pl-4">
          {t.raw('steps').map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <span className="text-20 italic text-sos-secondary-blue lg:text-24">
          {t('unavailableDates.question')}
        </span>
        <ol className="list-inside list-decimal pl-4">
          {t
            .raw('unavailableDates.steps')
            .map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
        </ol>
      </div>
    </section>
  );
};

const LanguagesSection = () => {
  const t = useTranslations('FAQPage.LanguagesSection');

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-24 font-medium text-sos-secondary-blue lg:text-32">
        {t('title')}
      </h2>
      <div className="flex flex-col gap-4 text-justify text-16 font-medium text-sos-primary-blue lg:gap-8 lg:text-20">
        <p>{t('description')}</p>
        <ul className="list-inside list-disc pl-4">
          <li>{t('contacts.english')}</li>
          <li>{t('contacts.spanish')}</li>
        </ul>
      </div>
    </section>
  );
};

const RegionSection = () => {
  const t = useTranslations('FAQPage.RegionSection');

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-24 font-medium text-sos-secondary-blue lg:text-32">
        {t('title')}
      </h2>
      <div className="flex flex-col gap-4 text-justify text-16 font-medium text-sos-primary-blue lg:gap-8 lg:text-20">
        <p>{t('description')}</p>
        <ul className="list-inside list-disc pl-4">
          <li>{t('contacts.english')}</li>
          <li>{t('contacts.spanish')}</li>
        </ul>
      </div>
    </section>
  );
};

export default function Page() {
  const t = useTranslations('FAQPage');

  return (
    <article className="flex flex-col gap-4 px-[2.2rem] pb-[4rem] pt-[2rem] lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="text-32 font-medium text-sos-primary-blue lg:text-42">
        {t('title')}
      </h1>
      <SectionSeparator />
      <HowToEnrollSection />
      <UnableToAttendSection />
      <CourseAsGroupSection />
      <LanguagesSection />
      <RegionSection />
    </article>
  );
}

export const metadata: Metadata = {
  title: 'FAQs',
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}
