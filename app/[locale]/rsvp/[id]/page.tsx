import { cookies } from 'next/headers';

//components
import { SectionSeparator } from '@/ui/home/SectionSeparator';
import RSVPSelector from '@/ui/rsvp/RSVPSelector';

//hooks
import { useTranslations } from 'next-intl';

//utils
import { adaptCourses } from '@/ui/courseSchedule/utils';

//types
import { Metadata } from 'next';
import { CourseSchedule } from '@/ui/courseSchedule/types';
import { getTranslations } from 'next-intl/server';

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
  const nominationStatus = course.nominationStatus;
  const titleSubText =
    nominationStatus == 'RSVP Confirmed'
      ? 'RSVP: You Are Registered'
      : nominationStatus == 'RSVP Denied'
      ? 'RSVP: You Have Declined'
      : 'You Have Not Registered';
  const rsvp =
    nominationStatus == 'RSVP Confirmed'
      ? 'Yes'
      : nominationStatus == 'RSVP Denied'
      ? 'No'
      : null;
  const tRSVP = await getTranslations('RSVP');
  const t = await getTranslations('CourseSchedule');

  return (
    <article className="flex flex-col gap-2 px-[2.2rem] pb-[4rem] pt-[2rem] text-sos-primary-blue lg:gap-6 lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="self-start text-center text-32 font-medium lg:text-42">
        {`${tRSVP('title')} - ${titleSubText}`}
      </h1>
      <SectionSeparator />
      <div
        key={`${course.name}-${course.startTime}`}
        className="flex flex-col justify-between gap-2 lg:gap-3"
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
      <div className="mb-4 w-96">
        <SectionSeparator />
      </div>

      <RSVPSelector
        userId={userId?.value}
        scheduleId={scheduleId}
        rsvp={rsvp}
      />
      <div className="text-justify text-12 text-sos-primary-blue lg:text-16">
        <h3 className="mb-4 text-[#B42222]">
          1. Course Attendance Requirement
        </h3>
        <p>
          To ensure successful completion, all courses at the Service Leadership
          Institue require full attendance:
        </p>
        <ul className="m-4 list-inside list-disc indent-4">
          <li>
            Single or Two-Part Courses:
            <ul className="list-inside list-disc indent-8">
              <li>Attend all sessions for a completion grade.</li>
            </ul>
          </li>
          <br />
          <li>
            Three or More Parts:
            <ul className="list-inside list-disc indent-8">
              <li>One absense allowed.</li>
              <li>
                {'More than one absence results in an "incomplete" mark.'}
              </li>
              <li>You will need to retake the course in future.</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="text-justify text-12 text-sos-primary-blue lg:text-16">
        <h3 className="mb-4 text-[#B42222]">
          2. Course Completion Requirement
        </h3>
        <ul className="m-4 list-inside list-disc indent-4">
          <li>
            Course Reflection: After completing the course, you must fill out an
            dsubmit the assigned course reflection form available on the course
            website.
          </li>
          <br />
          <li>
            Evaluation Process: Your submitted reflection will be reviewed by
            the course facilitator. Approval of your reflection is required to
            receive credit for the course.
          </li>
          <br />
          <li>
            Granting of credit: Course credit will only be awarded upon
            successful completion of both attendance and the approved course
            reflection.
          </li>
        </ul>
        <p>
          Failure to meet these requirements may result in no credit being
          granted for the course. If you have any question about these terms,
          please contact the course facilitatr before proceeding with your
          registration.
        </p>
      </div>
    </article>
  );
}

export const metadata: Metadata = {
  title: 'Course Attendance',
};
