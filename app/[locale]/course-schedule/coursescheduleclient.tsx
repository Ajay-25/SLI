'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AdaptedCourse, Config } from '@components/courseSchedule/types';
import { SectionSeparator } from '@components/home/SectionSeparator';
import { useTranslations } from 'next-intl';
import axios from 'axios';

export default function CourseScheduleClient({
  config,
  contactDetails,
  userId,
}: {
  config: Config;
  contactDetails: {
    userId: number;
    email: string;
    number: string;
    isWhatsApp: boolean;
  };
  userId?: string | undefined;
}) {
  const t = useTranslations('CourseSchedule');
  const [selectedCourse, setSelectedCourse] = useState<AdaptedCourse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [useEmail, setUseEmail] = useState(true);
  const [smsConsent, setSmsConsent] = useState(true);
  const router = useRouter();
  const [email, setEmail] = useState(contactDetails?.email || '');
  const [phone, setPhone] = useState(contactDetails?.number || '');
  const [useWhatsApp, setUseWhatsApp] = useState(contactDetails?.isWhatsApp ?? true);

  const [classSetting, setClassSetting] = useState<string[]>([]);
  const [language, setLanguage] = useState<string[]>([]);
  const [courseName, setCourseName] = useState<string[]>([]);

  const classSettingOptions = ['Online', 'In-Person'];

  const languageOptions = Array.from(
    new Set(
      config.flatMap(({ courses }) => courses.map((course) => course.language))
    )
  ).sort();

  const courseNameOptions = Array.from(
    new Set(config.flatMap(({ courses }) => courses.map((course) => course.name)))
  ).sort();

  const handleRegisterClick = (course: AdaptedCourse) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
    setEmail('');
    setPhone('');
    router.push(`/rsvp/${selectedCourse?.id}`);
  };

  const handleSubmit = async () => {
    const payload = {
      userId: userId,
      email: useEmail ? email : null,
      number: useWhatsApp ? phone : null,
      isWhatsapp: useWhatsApp ? 1 : 0,
    };

    try {
      await axios.post('/api/updatecontactdetails', payload, {
        headers: {
          Accept: 'application/json, text/plain',
          'Content-Type': 'application/json',
        },
      });
      closeModal();
    } catch (error) {
      console.error('Failed to update contact info:', error);
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-4 lg:flex-nowrap lg:gap-8">
        {/* ...dropdown filters as already defined... */}
      </div>

      {config.map(({ month, courses }) => {
        const filteredCourses = courses.filter((course) => {
          const venue = course.venue?.trim().toLowerCase();
          const settingLabel = venue.includes('virtual') || venue === 'virtual' ? 'Online' : 'In-Person';
          const matchesSetting = classSetting.length > 0 ? classSetting.includes(settingLabel) : true;
          const matchesLanguage = language.length > 0 ? language.includes(course.language) : true;
          const matchesName = courseName.length > 0 ? courseName.includes(course.name) : true;
          return matchesSetting && matchesLanguage && matchesName;
        });

        return (
          <div key={month} className="flex flex-col gap-6 font-medium">
            <h2 className="text-32 lg:text-42">{month}</h2>
            <div className="grid grid-cols-auto-fill-minmax-300 gap-12">
              {filteredCourses.map((course) => {
                const isCourseFull = course.totalSeats && course.confirmedSeats >= course.totalSeats;

                return (
                  <div
                    key={`${course.name}-${course.trainingDate}-${course.startTime}`}
                    className="flex flex-col justify-between gap-2 lg:gap-3"
                  >
                    <h3 className="text-20 lg:text-24">{course.name}</h3>
                    <h3 className="text-20 font-bold lg:text-24">
                      {course.parts > 0 ? t('parts', { parts: course.parts }) : ''}
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
                            remainingSeats: course.totalSeats - course.confirmedSeats,
                            totalSeats: course.totalSeats,
                          })}
                        </span>
                      ) : null}
                      {course.facilitator1 && (
                        <span>{t('facilitator', { index: 1, name: course.facilitator1 })}</span>
                      )}
                      {course.facilitator2 && (
                        <span>{t('facilitator', { index: 2, name: course.facilitator2 })}</span>
                      )}
                      <span>
                        
                        {t('language', { language: course.language })}
                        {course.language === 'English'
                          ? '🇺🇸'
                          : course.language === 'Spanish'
                          ? '🇲🇽'
                          : ''}{' '}
                      </span>
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
        );
      })}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-xl rounded-md border-[2px] border-yellow-500 bg-white p-8 shadow-md">
            <h2 className="mb-2 text-24 font-bold">{t('modalTitle')}</h2>
            <p className="mb-6">{t('modalSubtitle')}</p>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="flex items-center space-x-2">
                  <span>{t('email')}</span>
                </label>
                <input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  className="mt-1 w-full border border-sos-primary-blue px-2 py-1 text-gray-700"
                  disabled={!useEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <span>{t('whatsapp')}</span>
                </label>
                <input
                  type="text"
                  placeholder={t('whatsappPlaceholder')}
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
                <span>{t('smsConsent')}</span>
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="border border-sos-primary-blue px-6 py-2 text-sos-primary-blue"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleSubmit}
                className="bg-sos-primary-blue px-6 py-2 text-white"
              >
                {t('confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}