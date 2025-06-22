'use client';

import { useState } from 'react';
import { AdaptedCourse, Config } from '@components/courseSchedule/types';
import { SectionSeparator } from '@components/home/SectionSeparator';
import { useTranslations } from 'next-intl';

export default function CourseScheduleClient({ config }: { config: Config }) {
  const t = useTranslations('CourseSchedule');
  const [selectedCourse, setSelectedCourse] = useState<AdaptedCourse | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const [useEmail, setUseEmail] = useState(true);
  const [useWhatsApp, setUseWhatsApp] = useState(true);
  const [smsConsent, setSmsConsent] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegisterClick = (course: AdaptedCourse) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
    setEmail('');
    setPhone('');
  };

  const handleSubmit = () => {
    const submission = {
      email: useEmail ? email : null,
      phone: useWhatsApp ? phone : null,
      smsConsent,
      courseId: selectedCourse?.id,
    };
    console.log('Submitting registration:', submission);
    closeModal();
  };

  return (
    <>
      {config.map(({ month, courses }) => (
        <div key={month} className="flex flex-col gap-6 font-medium">
          <h2 className="text-32 lg:text-42">{month}</h2>
          <div className="grid grid-cols-auto-fill-minmax-300 gap-12">
            {courses.map((course) => {
              const isCourseFull =
                course.totalSeats && course.confirmedSeats >= course.totalSeats;

              return (
                <div
                  key={`${course.name}-${course.startTime}`}
                  className="flex flex-col justify-between gap-2 lg:gap-3"
                >
                  <h3 className="text-20 lg:text-24">{course.name}</h3>
                  <h3 className="text-20 font-bold lg:text-24">
                    {course.parts > 0
                      ? t('parts', { parts: course.parts })
                      : ''}
                  </h3>
                  <div className="flex flex-col gap-2 text-12 lg:gap-3 lg:text-16">
                    <span>
                      {course.timezone
                        ? `${course.trainingDate}, ${course.startTime}-${course.endTime}, ${course.timezone}`
                        : `${course.trainingDate}, ${course.startTime}-${course.endTime}`}
                    </span>
                    <span>{t('location', { venue: course.venue })}</span>
                    {course.totalSeats ? (
                      <span>
                        {t('seatsAvailable', {
                          remainingSeats:
                            course.totalSeats - course.confirmedSeats,
                          totalSeats: course.totalSeats,
                        })}
                      </span>
                    ) : null}
                    {course.facilitator1 && (
                      <span>
                        {t('facilitator', {
                          index: 1,
                          name: course.facilitator1,
                        })}
                      </span>
                    )}
                    {course.facilitator2 && (
                      <span>
                        {t('facilitator', {
                          index: 2,
                          name: course.facilitator2,
                        })}
                      </span>
                    )}
                    <span>{t('language', { language: course.language })}</span>
                  </div>
                  {isCourseFull ? (
                    <div className="flex-none cursor-not-allowed self-start border border-sos-secondary-light-blue bg-sos-primary-blue px-8 py-2 text-16 font-medium text-white opacity-50 lg:px-12 lg:py-4 lg:text-20">
                      {t('fullClass')}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRegisterClick(course)}
                      className={`flex-none self-start border border-sos-secondary-light-blue ${
                        course.nominationStatus === 'RSVP Confirmed'
                          ? 'bg-sos-primary-gold'
                          : 'bg-sos-primary-blue'
                      } px-8 py-2 text-16 font-medium text-white lg:px-12 lg:py-4 lg:text-20`}
                    >
                      {course.nominationStatus === 'RSVP Confirmed'
                        ? t('registered')
                        : t('register')}
                    </button>
                  )}
                  <SectionSeparator />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-20">
          <div className="w-full max-w-xl rounded-md border-[2px] border-yellow-500 bg-white p-8 shadow-md">
            <h2 className="mb-2 text-24 font-bold">Contact Method</h2>
            <p className="mb-6">
              Please confirm your email and phone number below and select a
              contact method.
            </p>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={useEmail}
                    onChange={() => setUseEmail(!useEmail)}
                    className="accent-sos-primary-blue"
                  />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="mt-1 w-full border border-sos-primary-blue px-2 py-1 text-gray-700"
                  disabled={!useEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={useWhatsApp}
                    onChange={() => setUseWhatsApp(!useWhatsApp)}
                    className="accent-sos-primary-blue"
                  />
                  <span>WhatsApp Phone Number</span>
                </label>
                <input
                  type="text"
                  placeholder="WhatsApp Phone Number"
                  className="mt-1 w-full border border-sos-primary-blue px-2 py-1 text-gray-700"
                  disabled={!useWhatsApp}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6 mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={() => setSmsConsent(!smsConsent)}
                  className="accent-sos-primary-blue"
                />
                <span>
                  I do not have WhatsApp and consent to receiving SMS Text
                  messages
                </span>
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="border border-sos-primary-blue px-6 py-2 text-sos-primary-blue"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-sos-primary-blue px-6 py-2 text-white"
              >
                Confirm Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
