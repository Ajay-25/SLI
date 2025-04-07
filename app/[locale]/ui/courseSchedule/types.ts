export type CourseSchedule = {
  Module: {
    id: number;
    name: string;
    createdOn: string;
    createdBy: number;
    updatedOn: string;
    updatedBy: number;
    status: string;
    summary: string;
    details: string;
    certificationID_FK: number;
    facilitator: string;
    imgPath: string;
    Certification: string;
    Facilitators: string;
  };
  id: number;
  trainingDate: string;
  trainingTimeZone: string | null;
  startTime: string;
  endTime: string;
  language: string | null;
  status: 'Public' | 'Hidden';
  seats: number;
  applied: number;
  confirmed: number;
  venue: string | null;
  openToStates: string;
  facilitatorID_FK: number;
  facilitatorID2_FK: number;
  moduleID_FK: 24;
  sevadarModSch: {
    id: number;
    moduleID_FK: number;
    sevadarID_FK: number;
    certificateID_FK: number;
    scheduleID_FK: number;
    departmentID_FK: number;
    createdOn: string;
    createdBy: number;
    updatedOn: string;
    updatedBy: number;
    status: string;
    emailSent: boolean;
    rsvp: string;
    addedBy: string;
  };
  facilitators: { FirstName: string; MiddleName?: string; LastName: string }[];
  childSchedules: [];
};

export type AdaptedCourse = {
  id: number;
  name: string;
  trainingDate: string;
  startTime: string;
  endTime: string;
  timezone: string | null;
  venue: string;
  facilitators: string[];
  language: string;
  confirmedSeats: number;
  totalSeats?: number;
  parts: number;
};

export type Config = Array<{ month: string; courses: Array<AdaptedCourse> }>;
