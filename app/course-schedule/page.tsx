//components
import { SectionSeparator } from '@/app/ui/home/SectionSeparator';

//utils
import { adaptCourses } from '@/app/ui/courseSchedule/utils';

//types
import { ReactElement } from 'react';
import { Metadata } from 'next';
import { Config, CourseSchedule } from '@/app/ui/courseSchedule/types';

const CoursesList = ({ config }: { config: Config }): ReactElement[] => {
  return config.map(({ month, courses }) => (
    <div key={month} className="flex flex-col gap-6 font-medium">
      <h2 className="text-42">{month}</h2>
      <div className="grid grid-cols-2 gap-12">
        {courses.map((course) => (
          <div
            key={course.name}
            className="flex flex-col justify-between gap-3"
          >
            <h3 className="text-24">{course.name}</h3>
            <div className="flex flex-col gap-3 text-16">
              <span>{`${course.trainingDate}, ${course.startTime}-${course.endTime}, ${course.timezone}`}</span>
              <span>{`Location: ${course.venue}`}</span>
              {course.seats && course.totalSeats ? (
                <span>{`Seats Available: ${course.seats}/${course.totalSeats}`}</span>
              ) : null}
              {course.facilitators.map((facilitator) => (
                <span key={facilitator}>{`Facilitator: ${facilitator}`}</span>
              ))}
              <span>{`Language: ${course.language}`}</span>
            </div>
            <SectionSeparator />
          </div>
        ))}
      </div>
    </div>
  ));
};

async function getServerSideProps(): Promise<CourseSchedule[]> {
  const res = await fetch(
    'https://scd.sos.org/api/SLIInfo/getSLIModuleSchedule',
  );
  return await res.json();
}

export default async function Page() {
  const courses = await getServerSideProps();
  const coursesConfig = adaptCourses(courses);

  return (
    <article className="flex flex-col gap-6 px-[14rem] pb-[8rem] pt-[6rem] text-sos-primary-blue">
      <h1 className="self-start text-center text-42 font-medium">
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
