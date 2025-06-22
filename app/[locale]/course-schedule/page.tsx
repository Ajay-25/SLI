import { cookies } from 'next/headers';
// components
import { SectionSeparator } from '@components/home/SectionSeparator';
import CourseScheduleClient from './coursescheduleclient';

// utils
import { adaptCourses } from '@components/courseSchedule/utils';

// types
import { Metadata } from 'next';
import { CourseSchedule } from '@components/courseSchedule/types';
import { getTranslations } from 'next-intl/server';

async function getServerSideCourses(userId: string | undefined): Promise<CourseSchedule[]> {
  const res = await fetch(
    'https://scd.sos.org/api/SLI/getCourseSchedules?userId=' + userId,
    {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
    },
  );
  return res.json();
}

async function getContactDetails(userId: string | undefined) {
  const res = await fetch(
    'https://scd.sos.org/api/SLI/getSevadarSLIContactInfo?userId=' + userId,
    {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
    },
  );
  return res.json();
}


export default async function Page() {
  const cookiesList = cookies();
  const userId =  (await cookiesList).get('authToken')?.value;
  const courseList = await getServerSideCourses(userId);
  const coursesConfig = adaptCourses(courseList);
  const t = await getTranslations('CourseSchedule');
  const contactDetails = await getContactDetails(userId);

  return (
    <article className="flex flex-col gap-2 px-[2.2rem] pb-[4rem] pt-[2rem] text-sos-primary-blue lg:gap-6 lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="self-start text-center text-32 font-medium lg:text-42">
        {t('title')}
      </h1>
      <SectionSeparator />
      <CourseScheduleClient config={coursesConfig} contactDetails={contactDetails} userId={userId} />
    </article>
  );
}

export const metadata: Metadata = {
  title: 'Courses Schedule',
};
