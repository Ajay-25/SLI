//components
import { SectionSeparator } from '@/ui/home/SectionSeparator';
import Image from 'next/image';

//hooks
import { useTranslations } from 'next-intl';

//types
import { ReactNode } from 'react';
import { Metadata } from 'next';

const BannerImageSection = () => {
  const globalT = useTranslations();
  const locale = globalT('locale');

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
  source,
  altText,
  children,
}: {
  source: string;
  altText: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex gap-4 p-4 lg:gap-8 lg:p-12">
      <Image
        src={source}
        width={180}
        height={180}
        alt={altText}
        className="hidden self-start lg:block"
      />
      <Image
        src={source}
        width={60}
        height={60}
        alt={altText}
        className="self-start lg:hidden"
      />
      <div className="text-justify text-16 text-sos-primary-blue lg:text-20">
        {children}
      </div>
    </div>
  );
};

const ItemList = () => {
  const t = useTranslations('CoursePage');
  const globalT = useTranslations();
  const locale = globalT('locale');

  return (
    <div className="mx-[2.2rem] flex flex-col lg:mx-[14.2rem]">
      <Item
        source={`/images/courses/${locale}/loving-communication.webp`}
        altText={t('LovingCommunication.title')}
      >
        <div>{t('LovingCommunication.description')}</div>
      </Item>
      <SectionSeparator />

      <Item
        source={`/images/courses/${locale}/serving-others.webp`}
        altText={t('ServingOthers.title')}
      >
        <div>{t('ServingOthers.description')}</div>
      </Item>
      <SectionSeparator />

      <Item
        source={`/images/courses/${locale}/delegation.webp`}
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
        source={`/images/courses/${locale}/conflict-resolution.webp`}
        altText={t('ConflictResolution.title')}
      >
        <div>{t('ConflictResolution.description')}</div>
      </Item>
      <SectionSeparator />

      <Item
        source={`/images/courses/${locale}/effective_meeting_management.webp`}
        altText={t('MeetingManagement.title')}
      >
        <div className="flex flex-col gap-6">
          <p>{t('MeetingManagement.description')}</p>
        </div>
      </Item>
      <SectionSeparator />

      <Item
        source={`/images/courses/${locale}/collaborative_decision_making.webp`}
        altText={t('CollaborativeDecisionMaking.title')}
      >
        <div className="flex flex-col gap-6">
          <p>{t('CollaborativeDecisionMaking.description')}</p>
        </div>
      </Item>
      <SectionSeparator />

      <Item
        source={`/images/courses/${locale}/building_lasting_change.webp`}
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
