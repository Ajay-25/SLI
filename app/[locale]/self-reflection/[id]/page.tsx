import { cookies } from 'next/headers';

//components
import { SectionSeparator } from '@components/home/SectionSeparator';
import ReflectionPage from '@components/reflection/ReflectionPage';

//utils
import { adaptCourses } from '@components/courseSchedule/utils';

//types
import { Metadata } from 'next';
import { CourseSchedule } from '@components/courseSchedule/types';
import { getTranslations } from 'next-intl/server';
import { ReactElement } from 'react';

async function getServerSideProps(
  scheduleId: number | null,
  userId: string | undefined,
): Promise<CourseSchedule[]> {
  const res = await fetch(
    'https://scd.sos.org/api/SLI/getCourseSchedule?userId=' +
      userId +
      '&scheduleId=' +
      scheduleId,
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

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const scheduleId = parseInt(id, 10);
  const cookiesList = await cookies();
  const userId = cookiesList.get('authToken');
  const courseList = await getServerSideProps(scheduleId, userId?.value);
  const course = adaptCourses(courseList)[0].courses[0];
  const tReflection = await getTranslations('Reflection');
  const tRSVP = await getTranslations('RSVP');
  const t = await getTranslations('CourseSchedule');

  const successPage = (): ReactElement => {
    return (
      <article className="flex flex-col gap-4 px-[2.2rem] pb-[4rem] pt-[2rem] lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
        <h1 className="text-32 font-medium text-sos-primary-blue lg:text-42">
          {`${tReflection('submission')}`}
        </h1>
      </article>
    );
  };

  return (
    <article className="flex flex-col gap-4 px-[2.2rem] pb-[4rem] pt-[2rem] lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="text-32 font-medium text-sos-primary-blue lg:text-42">
        {`${tReflection('title')}`}
      </h1>
      <SectionSeparator />
      <div
        key={`${course.name}-${course.startTime}`}
        className="flex flex-col gap-2 self-center lg:gap-3"
      >
        <h3 className="text-20 lg:text-24">{course.name}</h3>
        <div className="flex flex-col gap-2 text-12 lg:gap-3 lg:text-16">
          <span>{t('language', { language: course.language })}</span>
          <span>
            {course.timezone
              ? `${course.trainingDate}, ${course.startTime}-${course.endTime}, ${course.timezone}`
              : `${course.trainingDate}, ${course.startTime}-${course.endTime}`}
          </span>
          <span>{t('location', { venue: course.venue })}</span>
          {course.facilitator1 !== '' && (
            <span key={`${course.name}-${course.facilitator1}-1`}>
              {t('facilitator', {
                index: 1,
                name: course.facilitator1,
              })}
            </span>
          )}
          {course.facilitator2 !== '' && (
            <span key={`${course.name}-${course.facilitator2}-2`}>
              {t('facilitator', {
                index: 2,
                name: course.facilitator2,
              })}
            </span>
          )}
          {course.totalSeats ? (
            <span>
              {tRSVP('seatsAvailable', {
                remainingSeats: course.totalSeats - course.confirmedSeats,
                totalSeats: course.totalSeats,
              })}
            </span>
          ) : null}
        </div>
      </div>
      <br />
      <div className="mb-4 w-1/3 self-center">
        <SectionSeparator />
      </div>
      <br />
      <div className="text-justify text-16 text-sos-primary-blue lg:text-16">
        {tReflection('description')}
      </div>
      <ReflectionPage SuccessPage={successPage} />
    </article>
  );
}

export const metadata: Metadata = {
  title: 'Self Reflection',
};
