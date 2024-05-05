//components
import { SectionSeparator } from '@/app/ui/home/SectionSeparator';

//types
import { ReactElement } from 'react';
import { Metadata } from 'next';

const config = [
  {
    month: 'January',
    courses: [
      {
        name: 'Loving Communication pt. 1',
        trainingDate: 'Jan 12th',
        startTime: '10:00am',
        endTime: '1:00pm',
        timezone: 'UCT',
        venue: 'Virtual',
        seats: '13',
        totalSeats: '25',
        facilitators: ['Brian Waterloo', 'Kaite Forsythe'],
        language: 'English',
      },
      {
        name: 'Loving Communication pt. 2',
        trainingDate: 'Jan 17th',
        startTime: '10:00am',
        endTime: '1:00pm',
        timezone: 'UCT',
        venue: 'Virtual',
        seats: '8',
        totalSeats: '25',
        facilitators: ['Brian Waterloo', 'Kaite Forsythe'],
        language: 'English',
      },
    ],
  },
  {
    month: 'February',
    courses: [
      {
        name: 'Meeting Management',
        trainingDate: 'Feb 10th',
        startTime: '10:00am',
        endTime: '1:00pm',
        timezone: 'UCT',
        venue: 'Virtual',
        seats: '5',
        totalSeats: '25',
        facilitators: ['Brian Waterloo', 'Kaite Forsythe'],
        language: 'English',
      },
      {
        name: 'Loving Communication',
        trainingDate: 'Feb 17th',
        startTime: '10:00am',
        endTime: '1:00pm',
        timezone: 'UCT',
        venue: 'Virtual',
        seats: '16',
        totalSeats: '25',
        facilitators: ['Brian Waterloo', 'Kaite Forsythe'],
        language: 'English',
      },
    ],
  },
];

const CoursesList = (): ReactElement[] => {
  return config.map(({ month, courses }) => (
    <div key={month} className="flex flex-col gap-6">
      <h2 className="text-42">{month}</h2>
      <div className="grid grid-cols-2 gap-12">
        {courses.map((course) => (
          <div key={course.name} className="flex flex-col gap-3">
            <h3 className="text-32">{course.name}</h3>
            <div className="flex flex-col gap-3 text-24">
              <span>{`${course.trainingDate}, ${course.startTime}-${course.endTime}, ${course.timezone}`}</span>
              <span>{`Location: ${course.venue}`}</span>
              <span>{`Seats Available: ${course.seats}/${course.totalSeats}`}</span>
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
