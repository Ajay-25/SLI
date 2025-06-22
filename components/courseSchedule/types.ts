export type CourseSchedule = {
  id: number;
  trainingDate: string;
  trainingTimeZone: string | null;
  startTime: string;
  endTime: string;
  language: string | null;
  status: 'Public' | 'Hidden';
  seats: number;
  confirmed: number;
  venue: string | null;
  name: string
  Facilitator1FirstName: string | null;
  Facilitator1MiddleName: string | null;
  Facilitator1LastName: string | null;
  Facilitator2FirstName: string | null;
  Facilitator2MiddleName: string | null;
  Facilitator2LastName: string | null;
  nominationStatus: string | null;
};

export type AdaptedCourse = {
  id: number;
  name: string;
  trainingDate: string;
  startTime: string;
  endTime: string;
  timezone: string | null;
  venue: string;
  language: string;
  confirmedSeats: number;
  totalSeats?: number;
  parts: number;
  facilitator1: string;
  facilitator2: string;
  nominationStatus: string | null
};

export type Config = Array<{ month: string; courses: Array<AdaptedCourse> }>;
