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
  trainingTimeZone: string;
  startTime: string;
  endTime: string;
  language: string;
  status: string;
  seats: number;
  applied: number;
  confirmed: number;
  venue: string;
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
};

export type AdaptedCourse = {
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

export type Config = Array<{ month: string; courses: Array<AdaptedCourse> }>;
