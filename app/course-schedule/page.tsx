//components
import { SectionSeparator } from '@/app/ui/home/SectionSeparator';

//types
import { ReactElement } from 'react';
import { Metadata } from 'next';

type Course = {
  name: string;
  trainingDate: string;
  startTime: string;
  endTime: string;
  timezone: string;
  venue: string;
  facilitators: string[];
  language: string;
  seats?: number;
  totalSeats?: number;
};

type Config = Array<{ month: string; courses: Array<Course> }>;

const config: Config = [
  {
    month: 'June',
    courses: [
      {
        name: 'Loving communication',
        trainingDate: 'Jun 2nd ',
        startTime: '10:30am',
        endTime: '1:30pm',
        timezone: 'CDT',
        venue: 'Lisle Center',
        facilitators: ['Kait', 'Vicki Lumpkin'],
        language: 'English',
      },
    ],
  },
  {
    month: 'July',
    courses: [
      {
        name: 'Meeting Management',
        trainingDate: 'Jul 14',
        startTime: '10:00am',
        endTime: '1:00pm',
        timezone: 'CDT',
        venue: 'Virtual',
        facilitators: ['Tom', 'Karla'],
        language: 'English',
      },
    ],
  },
];

const CoursesList = (): ReactElement[] => {
  return config.map(({ month, courses }) => (
    <div key={month} className="flex flex-col gap-6 font-medium">
      <h2 className="text-42">{month}</h2>
      <div className="grid grid-cols-2 gap-12">
        {courses.map((course) => (
          <div key={course.name} className="flex flex-col gap-3">
            <h3 className="text-24">{course.name}</h3>
            <div className="text-12 flex flex-col gap-3">
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

export default function Page() {
  return (
    <article className="flex flex-col gap-6 px-[14rem] pb-[8rem] pt-[6rem] text-sos-primary-blue">
      <h1 className="self-start text-center text-42 font-medium">
        Course Schedule
      </h1>
      <SectionSeparator />
      <CoursesList />
    </article>
  );
}

export const metadata: Metadata = {
  title: 'Courses Schedule',
};
