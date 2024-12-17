//components
import Link from 'next/link';
import { SectionSeparator } from '@/app/ui/home/SectionSeparator';

//utils
import { adaptCourses } from '@/app/ui/courseSchedule/utils';

//types
import { ReactElement } from 'react';
import { Metadata } from 'next';
import { Config, CourseSchedule } from '@/app/ui/courseSchedule/types';

const EmptyPlaceholder = () => {
  return (
    <h3 className="text-20 lg:text-24">
      There are currently no scheduled courses.
    </h3>
  );
};

const CoursesList = ({
  config,
}: {
  config: Config;
}): ReactElement[] | ReactElement => {
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
              key={course.name}
              className="flex flex-col justify-between gap-2 lg:gap-3"
            >
              <h3 className="text-20 lg:text-24">{course.name}</h3>
              <div className="flex flex-col gap-2 text-12 lg:gap-3 lg:text-16">
                <span>
                  {course.timezone
                    ? `${course.trainingDate}, ${course.startTime}-${course.endTime}, ${course.timezone}`
                    : `${course.trainingDate}, ${course.startTime}-${course.endTime}`}
                </span>
                <span>{`Location: ${course.venue}`}</span>
                {course.totalSeats ? (
                  <span>{`Seats Available: ${course.confirmedSeats}/${course.totalSeats}`}</span>
                ) : null}
                {course.facilitators.length === 1 ? (
                  <span
                    key={course.facilitators[0]}
                  >{`Facilitator: ${course.facilitators[0]}`}</span>
                ) : (
                  course.facilitators.map((facilitator, index) => (
                    <span key={facilitator}>{`Facilitator ${
                      index + 1
                    }: ${facilitator}`}</span>
                  ))
                )}
                <span>{`Language: ${course.language}`}</span>
              </div>
              {isCourseFull ? (
                <div className="flex-none cursor-not-allowed self-start border border-sos-secondary-light-blue bg-sos-primary-blue px-8 py-2 text-16 font-medium text-white opacity-50 lg:px-12 lg:py-4 lg:text-20">
                  Full class
                </div>
              ) : (
                <Link
                  href={`https://sangat.sos.org/Forwarder?RedirectTo=${encodeURIComponent(
                    `https://scd.sos.org/#/LandingPage?rsvpScheduleId=${course.id}`,
                  )}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex-none self-start border border-sos-secondary-light-blue bg-sos-primary-blue px-8 py-2 text-16 font-medium text-white lg:px-12 lg:py-4 lg:text-20"
                >
                  Register
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

async function getServerSideProps(): Promise<CourseSchedule[]> {
  const res = await fetch(
    'https://scd.sos.org/api/SLIInfo/getSLIModuleSchedule?getDetails=true',
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
  const courses = await getServerSideProps();
  const coursesConfig = adaptCourses(courses);

  return (
    <article className="flex flex-col gap-2 px-[2.2rem] pb-[4rem] pt-[2rem] text-sos-primary-blue lg:gap-6 lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="self-start text-center text-32 font-medium lg:text-42">
        Course Schedule
      </h1>
      <SectionSeparator />
      <CoursesList config={coursesConfig} />
    </article>
  );
}

export const metadata: Metadata = {
  title: 'Courses Schedule',
};
