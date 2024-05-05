//components
import { SectionSeparator } from '@/app/ui/home/SectionSeparator';
import { Metadata } from 'next';

const HowToEnrollSection = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-32 font-medium text-sos-secondary-blue">
        How can I enroll in an SLI course?
      </h2>
      <div className="flex flex-col gap-8 text-24 font-medium  text-sos-primary-blue">
        <p>
          The SLI currently operates on a nomination basis by regional
          coordinators.
        </p>
        <ol className="list-inside list-decimal pl-4">
          <li>
            Establish contact with your respective regional coordinators to
            express interest in a course and should there be available seats,
            they will nominate you for attendance.
          </li>
          <li>
            The facilitator of the SLI course will then accept the nomination
            and you will receive and RSVP link to the seva portal.
          </li>
        </ol>
        <span className="underline">
          It is crucial that you RSVP to reserve your seat.
        </span>
        <p>
          The SLI operates on a first come first serve basis. Should the course
          be fully reserved, your acceptance into the course will rest upon the
          discretion of the facilitator teaching that course.
        </p>
      </div>
    </section>
  );
};

const UnableToAttendSection = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-32 font-medium text-sos-secondary-blue">
        What if I am invited to a course that I am unable to attend?
      </h2>
      <p className="flex flex-col gap-8 text-24 font-medium  text-sos-primary-blue">
        The SLI is constantly offering courses. As of 2024, on average, courses
        are offered twice a year. One in-person, and one virtual.
      </p>
    </section>
  );
};

const CourseAsGroupSection = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-32 font-medium text-sos-secondary-blue">
        What if a group I do seva with regularly want to take a course as a
        group.
      </h2>
      <div className="flex flex-col gap-8 text-24 font-medium  text-sos-primary-blue">
        <p>
          Taking SLI courses with your respective seva teams and departments are
          an excellent way to experience these courses!
        </p>
        <ol className="list-inside list-decimal pl-4">
          <li>
            Gain a commitment from your seva team/department to take an SLI
            course
          </li>
          <li>
            Find your regional coordinator and present to them the list of
            people in your seva team/department
          </li>
          <li>
            The regional coordinator will then nominate all people in your list.
          </li>
        </ol>
        <span className="italic text-sos-secondary-blue">
          What if our seva team/department are not available for any of the
          dates posted publicly?
        </span>
        <ol className="list-inside list-decimal pl-4">
          <li>
            Reach out to the SLI admin at sli-admin@sos.org for inquires
            regarding schedules.
          </li>
          <li>
            The SLI admin will get into contact with your team representative to
            arrange an event dedicated to your team alone at a date and location
            that fits your schedule, and the schedule of our facilitators.
          </li>
        </ol>
      </div>
    </section>
  );
};

const LanguagesSection = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-32 font-medium text-sos-secondary-blue">
        What languages are the SLI courses being offered in?
      </h2>
      <div className="flex flex-col gap-8 text-24 font-medium  text-sos-primary-blue">
        <p>
          As of Jan 2024, the SLI courses are being offered in English and
          Spanish.
        </p>
        <ul className="list-inside list-disc pl-4">
          <li>For inquires on English courses - sli-admin@sos.org</li>
          <li>For inquires on Spanish courses - alvaro.castro@sos.org</li>
        </ul>
      </div>
    </section>
  );
};

const RegionSection = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-32 font-medium text-sos-secondary-blue">
        What regions does the SLI give courses in?
      </h2>
      <div className="flex flex-col gap-8 text-24 font-medium  text-sos-primary-blue">
        <p>
          As of Jan 2024, the SLI does not operate regionally but rather by
          language. The SLI has different administrations per language. Each
          administration is able to offer any courses in the Western Hemisphere
          based on the languages offered by the SLI.
        </p>
        <ul className="list-inside list-disc pl-4">
          <li>For inquires on English courses - sli-admin@sos.org</li>
          <li>For inquires on Spanish courses - alvaro.castro@sos.org</li>
        </ul>
      </div>
    </section>
  );
};

export default function Page() {
  return (
    <article className="flex flex-col gap-4 px-[14rem] pb-[8rem] pt-[6rem]">
      <h1 className="text-42 font-medium text-sos-primary-blue">
        Frequently Asked Questions
      </h1>
      <SectionSeparator />
      <HowToEnrollSection />
      <UnableToAttendSection />
      <CourseAsGroupSection />
      <LanguagesSection />
      <RegionSection />
    </article>
  );
}

export const metadata: Metadata = {
  title: 'FAQs',
};
