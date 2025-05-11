import { cookies } from 'next/headers';
import Image from 'next/image';

import { SectionSeparator } from '@/ui/home/SectionSeparator';

import { parseISO, format } from 'date-fns';

import { ReactNode } from 'react';
import { Metadata } from 'next';
import { ProfileInfo, SevadarHistory } from '@/ui/myProfile/types';
//hooks
import {getTranslations} from 'next-intl/server';
import { useTranslations } from 'next-intl';

const Info = ({
  profileInfo,
  children,
}: {
  profileInfo: ProfileInfo;
  children: ReactNode;
}) => {
  return (
    <div className="flex gap-4 p-8 lg:gap-8 lg:p-12">
      <div className="hidden lg:block" style={{width: '180px', height: '180px', position: 'relative'}}> 
        <Image
          src={'https://scd.sos.org' + profileInfo.imagePath}
          alt=""
          className="hidden self-start lg:block"
          layout='fill'
        />
      </div>
      <div className="lg:hidden" style={{width: '60px', height: '60px', position: 'relative'}}> 
        <Image
          src={'https://scd.sos.org' + profileInfo.imagePath}
          alt=""
          className="self-start lg:hidden"
          layout='fill'
        />
      </div>
      <div className="px-10 text-justify text-16 text-sos-primary-blue lg:px-20 lg:text-20">
        {children}
      </div>
    </div>
  );
};

const ToDos = ({
    sevadarHistory,
}: {
  sevadarHistory: SevadarHistory[];
}) => {
  const t = useTranslations('MyProfilePage');
  return (
    <article className="hidden lg:flex flex-col gap-2 px-[2.2rem] pb-[4rem] pt-[2rem] text-sos-secondary-blue lg:gap-6 lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="lg:text-38 self-start text-center text-32 font-medium">
        {t('ToDo.title')}
      </h1>
      <table className="text-16">
        <tbody>
          <tr className="bg-sos-primary-blue text-white">
            <td className="border-sos-secondary-blue-50 w-40 border-2 ps-2">
              {t('ToDo.ToDos')}
            </td>
            <td className="border-sos-secondary-blue-50 w-20 border-2 ps-2">
              {t('ToDo.Status')}
            </td>
          </tr>
          {sevadarHistory.filter(item => item.status == 'Attended' && item.reflectionStatus != 'Complete').map((item, index) => (
            <tr key={item.id}>
              <td className="border-sos-secondary-blue-50 border-2 ps-2">
                {item.Schedule.Module.name + ' - Self Reflection Form'}
              </td>
              <td className="border-sos-secondary-blue-50 border-2 ps-2 text-red-400">
                {t('ToDo.Incomplete')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
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

const CourseCompletion = ({
  sevadarHistory,
}: {
  sevadarHistory: SevadarHistory[];
}) => {
  const t = useTranslations('MyProfilePage');
  const tCourse = useTranslations('CoursePage');
  const globalT = useTranslations();
  const locale = globalT('locale');
  const completedCourse = sevadarHistory.filter(obj => obj.status == "Attended" && obj.reflectionStatus == "Complete");
  const isLovingCommunicationCompleted = completedCourse.some(obj => obj.Schedule.Module.id == 18) || (completedCourse.some(obj => obj.Schedule.Module.id == 43) && completedCourse.some(obj => obj.Schedule.Module.id == 44));
  return (
    <article className="hidden lg:flex flex-col gap-2 px-[2.2rem] pb-[4rem] pt-[2rem] text-sos-secondary-blue lg:gap-6 lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="lg:text-38 self-start text-center text-32 font-medium">
        {t('CourseCompletion.title')}
      </h1>
      <div className="mx-[2.2rem] flex flex-row lg:mx-[14.2rem]">
            <Item
              source={`/images/courses/${locale}/loving-communication.webp`}
              altText={tCourse('LovingCommunication.title')}
            >
              <div></div>
            </Item>
            <SectionSeparator />
      
            <Item
              source={`/images/courses/${locale}/serving-others.webp`}
              altText={tCourse('ServingOthers.title')}
            >
              <div></div>
            </Item>
            <SectionSeparator />
      
            <Item
              source={`/images/courses/${locale}/delegation.webp`}
              altText={tCourse('Delegation.title')}
            >
              <div></div>
            </Item>
            <SectionSeparator />
      
            <Item
              source={`/images/courses/${locale}/conflict-resolution.webp`}
              altText={tCourse('ConflictResolution.title')}
            >
              <div></div>
            </Item>
            <SectionSeparator />
      
            <Item
              source={`/images/courses/${locale}/effective_meeting_management.webp`}
              altText={tCourse('MeetingManagement.title')}
            >
              <div></div>
            </Item>
            <SectionSeparator />
      
            <Item
              source={`/images/courses/${locale}/collaborative_decision_making.webp`}
              altText={tCourse('CollaborativeDecisionMaking.title')}
            >
              <div></div>
            </Item>
            <SectionSeparator />
      
            <Item
              source={`/images/courses/${locale}/building_lasting_change.webp`}
              altText={tCourse('BuildingLastingChange.title')}
            >
              <div></div>
            </Item>
          </div>

    </article>
  );
};

const CourseHistory = ({
  sevadarHistory,
}: {
  sevadarHistory: SevadarHistory[];
}) => {
  const t = useTranslations('MyProfilePage');
  return (
    <article className="hidden lg:flex flex-col gap-2 px-[2.2rem] pb-[4rem] pt-[2rem] text-sos-secondary-blue lg:gap-6 lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="lg:text-38 self-start text-center text-32 font-medium">
        {t('CourseHistory.title')}
      </h1>
      <table className="text-16">
        <tbody>
          <tr className="bg-sos-primary-blue text-white">
            <td className="border-sos-secondary-blue-50 w-40 border-2 ps-2">
              {t('CourseHistory.Course')}
            </td>
            <td className="border-sos-secondary-blue-50 w-20 border-2 ps-2">
              {t('CourseHistory.Location')}
            </td>
            <td className="border-sos-secondary-blue-50 w-20 border-2 ps-2">
              {t('CourseHistory.Date')}
            </td>
            <td className="border-sos-secondary-blue-50 w-20 border-2 ps-2">
              {t('CourseHistory.Attendance')}
            </td>
            <td className="border-sos-secondary-blue-50 w-20 border-2 ps-2">
              {t('CourseHistory.Credit')}
            </td>
          </tr>
          {sevadarHistory.map((item, index) => (
            <tr key={item.id}>
              <td className="border-sos-secondary-blue-50 border-2 ps-2">
                {item.Schedule.Module.name}
              </td>
              <td className="border-sos-secondary-blue-50 border-2 ps-2">
                {item.Schedule.venue == 'Virtual' ? 'Virtual' : 'In-Person'}
              </td>
              <td className="border-sos-secondary-blue-50 border-2 ps-2">
                {format(parseISO(item.Schedule.trainingDate), 'MM/dd/yyyy')}
              </td>
              <td
                className={`border-sos-secondary-blue-50 border-2 ps-2 ${
                  item.status == 'Attended' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {item.status == 'Attended' ? 'Yes' : 'No'}
              </td>
              <td
                className={`border-sos-secondary-blue-50 border-2 ps-2 ${
                  item.reflectionStatus == 'Complete'
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {item.reflectionStatus == 'Complete' ? 'Yes' : 'No'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

async function getServerSideProps(
  userId: string | undefined,
): Promise<ProfileInfo> {
  const res = await fetch(
    'https://scd.sos.org/api/CommonServicesController/getSevadarIDFromDnnUserID?dnnUserID=' +
      userId,
    {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache', // Bypass caching
      },
    },
  );
  return await res.json();
}

async function getServerSidePropsForHistory(
  sevadarID: number,
): Promise<SevadarHistory[]> {
  const res = await fetch(
    'https://scd.sos.org/api/Training/trainingnominationsBySevadar?id=' +
      sevadarID,
    {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache', // Bypass caching
      },
    },
  );
  return await res.json();
}

export default async function Page() {
  const cookiesList = await cookies();
  const userId = cookiesList.get('authToken');
  const profileInfo = await getServerSideProps(userId?.value);
  const sevadarHistory = await getServerSidePropsForHistory(
    profileInfo.sevadarID,
  );
  const t = await getTranslations('MyProfilePage');

  return (
    <article className="flex flex-col gap-2 px-[2.2rem] pb-[4rem] pt-[2rem] text-sos-primary-blue lg:gap-6 lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="self-start text-center text-32 font-medium lg:text-42">
        {t('title')}
      </h1>
      <SectionSeparator />
      <div className="flex flex-col lg:mx-[14.2rem]">
        <Info profileInfo={profileInfo}>
          <div>
            <div>{profileInfo.fullName}</div>
            <div>{profileInfo.email}</div>
            <div>{`${profileInfo.address1}, ${
              profileInfo.address2 ?? ''
            }`}</div>
            <div>{`${profileInfo.city}, ${profileInfo.state ?? ''}`}</div>
            <div>{profileInfo.country}</div>
          </div>
        </Info>
      </div>
      <ToDos sevadarHistory={sevadarHistory}></ToDos>
      <CourseCompletion sevadarHistory={sevadarHistory}></CourseCompletion>
      <CourseHistory sevadarHistory={sevadarHistory}></CourseHistory>
    </article>
  );
}

export const metadata: Metadata = {
  title: 'My Profile',
};
