import { cookies } from 'next/headers';
//components
import Link from 'next/link';
import { SectionSeparator } from '@/ui/home/SectionSeparator';

//hooks
import { useTranslations } from 'next-intl';

//utils
import { adaptCourses } from '@/ui/courseSchedule/utils';

//types
import { ReactElement } from 'react';
import { Metadata } from 'next';
import { Config, CourseSchedule } from '@/ui/courseSchedule/types';
import { getTranslations } from 'next-intl/server';

const EmptyPlaceholder = () => {
  const t = useTranslations('CourseSchedule');

  return <h3 className="text-20 lg:text-24">{t('noCourses')}</h3>;
};

const CoursesList = ({
  config,
}: {
  config: Config;
}): ReactElement[] | ReactElement => {
  const t = useTranslations('CourseSchedule');

  if (config.length === 0) {
    return <EmptyPlaceholder />;
  }

  return config.map(({ month, courses }) => (
    <div key={month} className="flex flex-col gap-6 font-medium">
      <h2 className="text-32 lg:text-42">{month}</h2>
      <div className="grid grid-cols-auto-fill-minmax-300 gap-12">
        {courses.map((course) => {
          const isCourseFull =
            course.totalSeats && course.confirmedSeats >= course.totalSeats;

          return (
            <div
              key={`${course.name}-${course.startTime}`}
              className="flex flex-col justify-between gap-2 lg:gap-3"
            >
              <h3 className="text-20 lg:text-24">{course.name}</h3>
              <h3 className="text-20 font-bold lg:text-24">
                {course.parts > 0 ? t('parts', { parts: course.parts }) : ''}
              </h3>
              <div className="flex flex-col gap-2 text-12 lg:gap-3 lg:text-16">
                <span>
                  {course.timezone
                    ? `${course.trainingDate}, ${course.startTime}-${course.endTime}, ${course.timezone}`
                    : `${course.trainingDate}, ${course.startTime}-${course.endTime}`}
                </span>
                <span>{t('location', { venue: course.venue })}</span>
                {course.totalSeats ? (
                  <span>
                    {t('seatsAvailable', {
                      remainingSeats: course.totalSeats - course.confirmedSeats,
                      totalSeats: course.totalSeats,
                    })}
                  </span>
                ) : null}
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
                <span>{t('language', { language: course.language })}</span>
              </div>
              {isCourseFull ? (
                <div className="flex-none cursor-not-allowed self-start border border-sos-secondary-light-blue bg-sos-primary-blue px-8 py-2 text-16 font-medium text-white opacity-50 lg:px-12 lg:py-4 lg:text-20">
                  {t('fullClass')}
                </div>
              ) : (
                <Link
                  href={`https://sangat.sos.org/Forwarder?RedirectTo=${encodeURIComponent(
                    `https://scd.sos.org/#/LandingPage?rsvpScheduleId=${course.id}`,
                  )}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className={`flex-none self-start border border-sos-secondary-light-blue ${course.nominationStatus === 'RSVP Confirmed' ? 'bg-sos-primary-gold' : 'bg-sos-primary-blue'} px-8 py-2 text-16 font-medium text-white lg:px-12 lg:py-4 lg:text-20`}
                >
                  {course.nominationStatus === 'RSVP Confirmed' ?  t('registered') : t('register')}
                </Link>
              )}
              <SectionSeparator />
            </div>
          );
        })}
      </div>
    </div>
  ));
};

async function getServerSideProps(
  userId: string | undefined,
): Promise<CourseSchedule[]> {
  const res = await fetch(
    'https://scd.sos.org/api/SLI/getCourseSchedules?userId=' +
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

export default async function Page() {
  const cookiesList = await cookies();
  const userId = cookiesList.get('authToken');
  const courses = await getServerSideProps(userId?.value);
  const coursesConfig = adaptCourses(courses);
  const t = await getTranslations("CourseSchedule")

  return (
    <article className="flex flex-col gap-2 px-[2.2rem] pb-[4rem] pt-[2rem] text-sos-primary-blue lg:gap-6 lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="self-start text-center text-32 font-medium lg:text-42">
        {t('title')}
      </h1>
      <SectionSeparator />
      <CoursesList config={coursesConfig} />
    </article>
  );
}

export const metadata: Metadata = {
  title: 'Courses Schedule',
};
