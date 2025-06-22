//components
import { SectionSeparator } from '@components/home/SectionSeparator';
import Image from 'next/image';

//hooks
import { useTranslations, useLocale } from 'next-intl';

//constants
import { SUPPORTED_LOCALES } from '@lib/constants/locales';

//types
import { ReactNode } from 'react';
import { Metadata } from 'next';

const BannerImageSection = () => {
  const locale = useLocale();

  return (
    <div
      className="h-[20rem] w-full bg-cover bg-center sm:h-[35rem] md:h-[40rem] lg:h-[45rem] xl:h-[60rem]"
      style={{
        backgroundImage: `url(/images/courses/${locale}/courses-banner.webp)`,
      }}
    ></div>
  );
};

const Item = ({
  title,
  videoUrl,
  altText,
  children,
  reverse = false,
}: {
  title: string;
  videoUrl: string;
  altText: string;
  children: ReactNode;
  reverse?: boolean;
}) => {
  return (
    <div className={`flex flex-col gap-4 p-4 lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''} lg:gap-8 lg:p-12`}>
      
      {/* Video container */}
      <div className="w-full lg:w-1/2 flex justify-center items-start">
        <div className="w-full aspect-video max-w-[560px]">
          <iframe
            src={videoUrl}
            title={altText}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-md"
          ></iframe>
        </div>
      </div>

      {/* Text container */}
      <div className="w-full lg:w-1/2 text-justify text-16 text-sos-primary-blue lg:text-20">
      <h3 className="text-20 lg:text-24 font-bold mb-2">{title}</h3>
        {children}
      </div>
    </div>
  );
};

const ItemList = () => {
  const locale = useLocale();
  const t = useTranslations('CoursePage');

  return (
    <div className="mx-[2.2rem] flex flex-col lg:mx-[14.2rem]">
      <Item
        title={t('LovingCommunication.title')}
        videoUrl="https://www.youtube.com/embed/yJxGo82Ti3M"
        altText={t('LovingCommunication.title')}
      >
        <div>{t('LovingCommunication.description')}</div>
      </Item>
      <SectionSeparator />

      <Item
        title={t('ServingOthers.title')}
        videoUrl="https://www.youtube.com/embed/3wdvX68pSFA"
        altText={t('ServingOthers.title')}
        reverse
      >
        <div>{t('ServingOthers.description')}</div>
      </Item>
      <SectionSeparator />

      <Item
        title={t('Delegation.title')}
        videoUrl="https://www.youtube.com/embed/yQcy3UHjkg4"
        altText={t('Delegation.title')}
      >
        <div className="flex flex-col gap-8">
          <p>{t('Delegation.description')}</p>
          <ul className="list-inside list-disc">
            <li>{t('Delegation.list.item1')}</li>
            <li>{t('Delegation.list.item2')}</li>
            <li>{t('Delegation.list.item3')}</li>
            <li>{t('Delegation.list.item4')}</li>
          </ul>
        </div>
      </Item>
      <SectionSeparator />

      <Item
        title={t('ConflictResolution.title')}
        videoUrl="https://www.youtube.com/embed/ysmWhZoP4Cc"
        altText={t('ConflictResolution.title')}
        reverse
      >
        <div>{t('ConflictResolution.description')}</div>
      </Item>
      <SectionSeparator />

      <Item
        title={t('MeetingManagement.title')}
        videoUrl="https://www.youtube.com/embed/HUe0W1Lp_C8"
        altText={t('MeetingManagement.title')}
      >
        <div className="flex flex-col gap-6">
          <p>{t('MeetingManagement.description')}</p>
        </div>
      </Item>
      <SectionSeparator />

      <Item
        title={t('CollaborativeDecisionMaking.title')}
        videoUrl="https://www.youtube.com/embed/OzDxCu3ABqE"
        altText={t('CollaborativeDecisionMaking.title')}
        reverse
      >
        <div className="flex flex-col gap-6">
          <p>{t('CollaborativeDecisionMaking.description')}</p>
        </div>
      </Item>
      <SectionSeparator />

      <Item
        title={t('BuildingLastingChange.title')}
        videoUrl="https://www.youtube.com/embed/nPf1ev5pWEU"
        altText={t('BuildingLastingChange.title')}
      >
        <div>{t('BuildingLastingChange.description')}</div>
      </Item>
    </div>
  );
};

export default function Page() {
  return (
    <article className="flex flex-col gap-2 pb-[2rem] lg:gap-6 lg:pb-[8rem]">
      <BannerImageSection />
      <ItemList />
    </article>
  );
}

export const metadata: Metadata = {
  title: 'Courses',
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}
