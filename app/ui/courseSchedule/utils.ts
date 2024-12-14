import { CourseSchedule, Config, AdaptedCourse } from './types';

type Iteratee<T> = ((item: T) => string | number) | keyof T;

function groupBy<T>(array: T[], iteratee: Iteratee<T>): Record<string, T[]> {
  return array.reduce((result: Record<string, T[]>, value: T) => {
    let key: string | number;

    if (typeof iteratee === 'function') {
      key = iteratee(value);
    } else if (typeof iteratee === 'string') {
      key = value[iteratee] as unknown as string | number;
    } else {
      throw new Error('Iteratee must be a function or string');
    }

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(value);

    return result;
  }, {});
}

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}${ampm}`;
}

function formatEvent(
  startDate: string,
  endDate: string,
  timezoneAbbr: string,
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Format the start date, start time, and end time
  const formattedStartDate = formatDate(start);
  const formattedStartTime = formatTime(start);
  const formattedEndTime = formatTime(end);

  return `${formattedStartDate}, ${formattedStartTime}-${formattedEndTime}, ${timezoneAbbr}`;
}

function getDateConfig(dateString: string): {
  month: number;
  day: number;
  year: number;
} {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return { month, day, year };
}

export const adaptCourses = (courses: CourseSchedule[]): Config => {
  const currentTime = Date.now();

  const transformedCourses = courses.reduce<
    Array<AdaptedCourse & { month: string }>
  >((acc, course) => {
    if (course.Module) {
      const courseStartTime = new Date(course.trainingDate).getTime();

      console.log(course.facilitators);
      if (courseStartTime > currentTime) {
        acc.push({
          month: new Date(course.trainingDate).toLocaleString('en-US', {
            month: 'long',
          }),
          id: course.id,
          name: course.Module.name,
          trainingDate: formatDate(new Date(course.trainingDate)), // todo: use formatEvent
          startTime: formatTime(new Date(course.startTime)),
          endTime: formatTime(new Date(course.endTime)),
          timezone: course.trainingTimeZone,
          venue: course.venue,
          facilitators: course.facilitators.map((facilitator) => {
            const { FirstName, MiddleName, LastName } = facilitator;
            let name = FirstName ? FirstName : '';

            if (MiddleName) {
              return LastName
                ? `${name} ${MiddleName} ${LastName}`
                : `${name} ${MiddleName}`;
            }
            return LastName ? `${name} ${LastName}` : name;
          }),
          language: course.language,
          seats: course.seats,
          totalSeats: course.confirmed + course.applied,
        });
      }
    }

    return acc;
  }, []);

  const groupedCourses = groupBy(transformedCourses, (course) => course.month);

  const config: Config = Object.entries(groupedCourses)
    .map(([month, courses]) => ({
      month,
      courses: courses.sort((a, b) => {
        const dateA = new Date(a.trainingDate);
        const dateB = new Date(b.trainingDate);
        return dateA.getTime() - dateB.getTime();
      }),
    }))
    .sort((a, b) => {
      const monthA = new Date(`01 ${a.month}`).getMonth();
      const monthB = new Date(`01 ${b.month}`).getMonth();
      return monthA - monthB;
    });

  return config;
};
