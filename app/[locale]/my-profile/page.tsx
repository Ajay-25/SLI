import { cookies } from 'next/headers';
import Image from 'next/image';

import { SectionSeparator } from '@components/home/SectionSeparator';

import { parseISO, format } from 'date-fns';

import { ReactNode } from 'react';
import { Metadata } from 'next';
import { ProfileInfo, SevadarHistory } from '@components/myProfile/types';

//hooks
import { getTranslations } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import { get } from 'http';

const Info = ({
  profileInfo,
  children,
}: {
  profileInfo: ProfileInfo;
  children: ReactNode;
}) => {
  return (
    <div className="flex gap-4 p-8 lg:gap-8 lg:p-12">
      <div
        className="hidden lg:block"
        style={{ width: '180px', height: '180px', position: 'relative' }}
      >
        <Image
          src={'https://scd.sos.org' + profileInfo.imagePath}
          alt=""
          className="hidden self-start lg:block"
          layout="fill"
        />
      </div>
      <div
        className="lg:hidden"
        style={{ width: '60px', height: '60px', position: 'relative' }}
      >
        <Image
          src={'https://scd.sos.org' + profileInfo.imagePath}
          alt=""
          className="self-start lg:hidden"
          layout="fill"
        />
      </div>
      <div className="px-10 text-justify text-16 text-sos-primary-blue lg:px-20 lg:text-20">
        {children}
      </div>
    </div>
  );
};

const ToDos = ({ sevadarHistory }: { sevadarHistory: SevadarHistory[] }) => {
  const t = useTranslations('MyProfilePage');
  return (
    <article className="hidden flex-col gap-2 px-[2.2rem] pb-[4rem] pt-[2rem] text-sos-secondary-blue lg:flex lg:gap-6 lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="self-start text-center text-32 font-medium lg:text-42">
        {t('ToDo.title')}
      </h1>
      <table className="w-1/2 text-16">
        <tbody>
          <tr className="bg-sos-primary-blue text-white">
            <td className="border-sos-secondary-blue-50 w-40 border-2 py-4 ps-2">
              {t('ToDo.ToDos')}
            </td>
            <td className="border-sos-secondary-blue-50 w-20 border-2 ps-2">
              {t('ToDo.Status')}
            </td>
          </tr>
          {sevadarHistory
            .filter(
              (item) =>
                item.status == 'Attended' &&
                item.reflectionStatus != 'Complete',
            )
            .map((item, index) => (
              <tr key={item.id}>
                <td className="border-sos-secondary-blue-50 border-2 py-4 ps-2 ">
                  <a
                    href={`/self-reflection/${item.Schedule.id}`}
                    target="_self"
                    className="text-blue-600 underline underline-offset-2"
                  >
                    {item.Schedule.Module.name + ' - Self Reflection Form'}
                  </a>
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
  showComplete,
  remainingCoursesNeeded,
  firstEmptyBox,
  isCertificate,
}: {
  source: string;
  altText: string;
  showComplete: boolean;
  remainingCoursesNeeded: number;
  firstEmptyBox: boolean;
  isCertificate?: boolean;
}) => {
  return (
    <div className="mx-2 flex-shrink-0">
      <div className="relative h-48 w-48">
        {showComplete || isCertificate ? (
          <div
            className={`h-48 w-48 border-2 ${
              showComplete ? 'border-green-500' : 'border-yellow-400'
            }`}
          >
            <Image
              src={source}
              width={180}
              height={180}
              alt={altText}
              className="h-full w-full object-cover"
            />
            <div className="pt-2 text-center text-20 font-medium text-sos-primary-blue">
              {altText}
            </div>
          </div>
        ) : (
          <div className="h-48 w-48">
            <div className="flex h-48 w-48 items-center justify-center border-2 border-yellow-400 bg-gray-50"></div>
            {firstEmptyBox && (
              <div className="pt-2 text-center text-20 font-medium text-sos-primary-blue">
                {`Complete ${getNumber(remainingCoursesNeeded)} More ${
                  remainingCoursesNeeded == 1 ? 'Course' : 'Courses'
                }`}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const getNumber = (num: number): string => {
  switch (num) {
    case 1:
      return 'One';
    case 2:
      return 'Two';
    case 3:
      return 'Three';
    case 4:
      return 'Four';
    case 5:
      return 'Five';
    default:
      return '';
  }
};

const CourseCompletion = ({
  sevadarHistory,
}: {
  sevadarHistory: SevadarHistory[];
}) => {
  const t = useTranslations('MyProfilePage');
  const tCourse = useTranslations('CoursePage');
  const locale = useLocale();
  const completedCourse = sevadarHistory.filter(
    (obj) => obj.status == 'Attended' && obj.reflectionStatus == 'Complete',
  );
  const isLovingCommunicationCompleted =
    completedCourse.some((obj) => obj.Schedule.Module.id == 18) ||
    (completedCourse.some((obj) => obj.Schedule.Module.id == 43) &&
      completedCourse.some((obj) => obj.Schedule.Module.id == 44));
  const isDelegationCompleted =
    completedCourse.some((obj) => obj.Schedule.Module.id == 32) ||
    (completedCourse.some((obj) => obj.Schedule.Module.id == 47) &&
      completedCourse.some((obj) => obj.Schedule.Module.id == 48));
  const isServingOthersCompleted =
    completedCourse.some((obj) => obj.Schedule.Module.id == 24) ||
    (completedCourse.some((obj) => obj.Schedule.Module.id == 49) &&
      completedCourse.some((obj) => obj.Schedule.Module.id == 50));
  const isConflictCompleted =
    completedCourse.some((obj) => obj.Schedule.Module.id == 27) ||
    (completedCourse.some((obj) => obj.Schedule.Module.id == 51) &&
      completedCourse.some((obj) => obj.Schedule.Module.id == 52));
  const isMeetingCompleted =
    completedCourse.some((obj) => obj.Schedule.Module.id == 19) ||
    (completedCourse.some((obj) => obj.Schedule.Module.id == 45) &&
      completedCourse.some((obj) => obj.Schedule.Module.id == 46));
  const isColabCompleted =
    completedCourse.some((obj) => obj.Schedule.Module.id == 31) ||
    (completedCourse.some((obj) => obj.Schedule.Module.id == 53) &&
      completedCourse.some((obj) => obj.Schedule.Module.id == 54));
  const isBLCCompleted =
    completedCourse.some((obj) => obj.Schedule.Module.id == 83) ||
    (completedCourse.some((obj) => obj.Schedule.Module.id == 42) &&
      completedCourse.some((obj) => obj.Schedule.Module.id == 84) &&
      completedCourse.some((obj) => obj.Schedule.Module.id == 85) &&
      completedCourse.some((obj) => obj.Schedule.Module.id == 86) &&
      completedCourse.some((obj) => obj.Schedule.Module.id == 87) &&
      completedCourse.some((obj) => obj.Schedule.Module.id == 88));
  const CourseCompletionStatus = [
    isLovingCommunicationCompleted,
    isDelegationCompleted,
    isServingOthersCompleted,
    isConflictCompleted,
    isMeetingCompleted,
    isColabCompleted,
    isBLCCompleted,
  ];

  const requiredCoursesForCertification = 5;
  const completedCourses = CourseCompletionStatus.filter(Boolean).length;

  const comppletedCount = Math.min(
    completedCourses,
    requiredCoursesForCertification,
  );
  const isEligibleForCertification =
    completedCourses >= requiredCoursesForCertification;
  const remainingCoursesNeeded = Math.max(
    0,
    requiredCoursesForCertification - completedCourses,
  );
  //All possible courses with completion stataus
  const allCourses = [
    {
      id: 18,
      ids: [43, 44],
      name: 'LovingCommunication',
      status: isLovingCommunicationCompleted,
      source: 'loving-communication',
    },
    {
      id: 24,
      ids: [49, 50],
      name: 'ServingOthers',
      status: isServingOthersCompleted,
      source: 'serving-others',
    },
    {
      id: 32,
      ids: [47, 48],
      name: 'Delegation',
      status: isDelegationCompleted,
      source: 'delegation',
    },
    {
      id: 27,
      ids: [51, 52],
      name: 'ConflictResolution',
      status: isConflictCompleted,
      source: 'conflict-resolution',
    },
    {
      id: 19,
      ids: [45, 46],
      name: 'MeetingManagement',
      status: isMeetingCompleted,
      source: 'effective_meeting_management',
    },
    {
      id: 31,
      ids: [53, 54],
      name: 'CollaborativeDecisionMaking',
      status: isColabCompleted,
      source: 'collaborative_decision_making',
    },
    {
      id: 83,
      ids: [42, 84, 85, 86, 87, 88],
      name: 'BuildingLastingChange',
      status: isBLCCompleted,
      source: 'building_lasting_change',
    },
  ];

  //Get all complleted courses fiirst- ALL of them
  const completedCoursesList = allCourses.filter((course) => course.status);

  const incompleteCourses = allCourses.filter((course) => !course.status);

  //Get the fiirst 5 courses thaat are completed.
  const displayCourses = [...completedCoursesList, ...incompleteCourses].slice(
    0,
    requiredCoursesForCertification,
  );

  const displayStatuses = displayCourses.map((course) => course.status);

  while (displayStatuses.length < requiredCoursesForCertification) {
    displayStatuses.push(false);
  }

  //course images for display in order.
  const courseImages = displayCourses
    .map((course) => ({
      id: course.id,
      ids: course.ids,
      name: course.name,
      status: course.status,
      source: course.source,
    }))
    .slice(0, requiredCoursesForCertification);

  const orderedBoxStatus = displayStatuses;

  while (orderedBoxStatus.length < requiredCoursesForCertification) {
    orderedBoxStatus.push(false);
  }

  //find index of first empty box (for dispalyiing the message)
  const firstEmptyBoxIndex = orderedBoxStatus.indexOf(false);
  const remainingCoursesNeededString = getNumber(remainingCoursesNeeded);
  return (
    <article className="flex flex-col gap-2 px-[2.2rem] pb-[4rem] pt-[2rem] text-sos-secondary-blue lg:flex lg:gap-6 lg:px-[2.2rem] lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="self-start text-32 font-medium lg:text-42">
        {t('CourseCompletion.title')}
      </h1>

      {!isEligibleForCertification && (
        <div className="px-2 text-16 font-thin">
          {`Complete ${remainingCoursesNeededString.toLowerCase()} more ${
            remainingCoursesNeeded == 1 ? 'course' : 'courses'
          } to receive your certification`}
        </div>
      )}
      <div className="flex w-full">
        <div className="flex w-full flex-col">
          <div className="flex flex-col">
            <div className="overflow-x-autto flex flex-row items-center justify-evenly pb-4">
              <div className="flex flex-col items-center">
                <Item
                  source={`/images/courses/${locale}/${
                    courseImages[0]?.source || 'loving-communication'
                  }.webp`}
                  altText={tCourse(
                    `${courseImages[0]?.name || 'LovingCommunication'}.title`,
                  )}
                  showComplete={orderedBoxStatus[0]}
                  remainingCoursesNeeded={remainingCoursesNeeded}
                  firstEmptyBox={firstEmptyBoxIndex === 0}
                />
              </div>
              <div
                className="lg:ppx-20 px-14 text-6xl font-bold text-sos-primary-blue"
                style={{ lineHeight: 0 }}
              >
                →
              </div>
              <div className="flex flex-col items-center">
                <Item
                  source={`/images/courses/${locale}/${
                    courseImages[1]?.source || 'serving-others'
                  }.webp`}
                  altText={tCourse(
                    `${courseImages[1]?.name || 'ServingOthers'}.title`,
                  )}
                  showComplete={orderedBoxStatus[1]}
                  remainingCoursesNeeded={remainingCoursesNeeded}
                  firstEmptyBox={firstEmptyBoxIndex === 1}
                />
              </div>
              <div
                className="px-14 text-6xl font-bold text-sos-primary-blue lg:px-20"
                style={{ lineHeight: 0 }}
              >
                →
              </div>
              <div className="flex flex-col items-center">
                <Item
                  source={`/images/courses/${locale}/${
                    courseImages[2]?.source || 'delegation'
                  }.webp`}
                  altText={tCourse(
                    `${courseImages[2]?.name || 'Delegation'}.title`,
                  )}
                  showComplete={orderedBoxStatus[2]}
                  remainingCoursesNeeded={remainingCoursesNeeded}
                  firstEmptyBox={firstEmptyBoxIndex === 2}
                />
              </div>
              <div
                className="px-14 text-6xl font-bold text-sos-primary-blue lg:px-20"
                style={{ lineHeight: 0 }}
              >
                →
              </div>
              <div className="flex flex-col items-center">
                <Item
                  source={`/images/courses/${locale}/${
                    courseImages[3]?.source || 'conflict-resolution'
                  }.webp`}
                  altText={tCourse(
                    `${courseImages[3]?.name || 'ConflictResolution'}.title`,
                  )}
                  showComplete={orderedBoxStatus[3]}
                  remainingCoursesNeeded={remainingCoursesNeeded}
                  firstEmptyBox={firstEmptyBoxIndex === 3}
                />
              </div>
              <div
                className="px-14 text-6xl font-bold text-sos-primary-blue lg:px-20"
                style={{ lineHeight: 0 }}
              >
                →
              </div>
              <div className="flex flex-col items-center">
                <Item
                  source={`/images/courses/${locale}/${
                    courseImages[4]?.source || 'effective_meeting_management'
                  }.webp`}
                  altText={tCourse(
                    `${courseImages[4]?.name || 'MeetingManagement'}.title`,
                  )}
                  showComplete={orderedBoxStatus[4]}
                  remainingCoursesNeeded={remainingCoursesNeeded}
                  firstEmptyBox={firstEmptyBoxIndex === 4}
                />
              </div>

              <div
                className={
                  isEligibleForCertification
                    ? 'px-14 text-6xl font-bold text-green-500 lg:px-20'
                    : 'px-14 text-6xl font-bold text-sos-primary-blue lg:px-20'
                }
                style={{ lineHeight: 0 }}
              >
                →
              </div>

              <div className="flex flex-col items-center">
                <Item
                  source={'/home/home-logo.webp'}
                  altText={'Certification'}
                  showComplete={isEligibleForCertification}
                  remainingCoursesNeeded={remainingCoursesNeeded}
                  firstEmptyBox={false}
                  isCertificate={true}
                />
              </div>
            </div>
          </div>
        </div>
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
    <article className="hidden flex-col gap-2 px-[2.2rem] pb-[4rem] pt-[2rem] text-sos-secondary-blue lg:flex lg:gap-6 lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="self-start text-center text-32 font-medium lg:text-42">
        {t('CourseHistory.title')}
      </h1>
      <div className="text-12">
        <p>{t('CourseHistory.AttendanceDisclaimer')}</p>
        <p>{t('CourseHistory.CreditDisclaimer')}</p>
      </div>
      <table className="h-24 text-16">
        <tbody>
          <tr className="bg-sos-primary-blue text-white">
            <td className="border-sos-secondary-blue-50 w-40 border-2 py-4 ps-2">
              {t('CourseHistory.Course')}
            </td>
            <td className="border-sos-secondary-blue-50 w-20 border-2 ps-2">
              {t('CourseHistory.Location')}
            </td>
            <td className="border-sos-secondary-blue-50 w-20 border-2 ps-2">
              {t('CourseHistory.Date')}
            </td>
            <td className="border-sos-secondary-blue-50 w-20 border-2 ps-2">
              {`${t('CourseHistory.Attendance')} *`}
            </td>
            <td className="border-sos-secondary-blue-50 w-20 border-2 ps-2">
              {`${t('CourseHistory.Credit')} * *`}
            </td>
          </tr>
          {sevadarHistory.map((item, index) => (
            <tr key={item.id}>
              <td className="border-sos-secondary-blue-50 border-2 py-4 ps-2">
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
      <CourseCompletion sevadarHistory={sevadarHistory}></CourseCompletion>
      <div className="flex flex-col">
        <Info profileInfo={profileInfo}>
          <div>
            <div className="text-32 text-sos-secondary-blue">
              {profileInfo.fullName}
            </div>
            <div className="text-32 text-sos-secondary-blue">
              {profileInfo.email}
            </div>
            <div>{`${profileInfo.address1}, ${
              profileInfo.address2 ?? ''
            }`}</div>
            <div>{`${profileInfo.city}, ${profileInfo.state ?? ''}`}</div>
            <div>{profileInfo.country}</div>
          </div>
        </Info>
      </div>
      <ToDos sevadarHistory={sevadarHistory}></ToDos>
      <CourseHistory sevadarHistory={sevadarHistory}></CourseHistory>
    </article>
  );
}

export const metadata: Metadata = {
  title: 'My Profile',
};
