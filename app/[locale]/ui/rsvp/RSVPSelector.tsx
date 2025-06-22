'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import React, { useState, useCallback } from 'react';

const recordRSVP = async (
  userId: string | undefined,
  scheduleId: number | null,
  rsvp: string | null,
  { onComplete, onError }: { onComplete: () => void; onError: () => void },
) => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/api/rsvp',
      data: {
        userId: userId ?? '',
        scheduleId: scheduleId ?? 0,
        rsvp: rsvp ?? '',
      },
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    console.log('Response received');
    if (response.status === 200) {
      onComplete();
    }
  } catch (e) {
    onError();
  }
};

export default function RSVPSelector({
  userId,
  scheduleId,
  rsvp,
}: {
  userId: string | undefined;
  scheduleId: number | null;
  rsvp: string | null;
}) {
  const router = useRouter();
  const t = useTranslations('RSVP');
  const rsvpYesRadio = t('rsvpYesRadio');
  const rsvpNoRadio = t('rsvpNoRadio');
  const [submitting, setSubmitting] = useState(false);
  const [selectedValue, setSelectedValue] = useState(rsvp);
  const radioOptions = [
    { label: rsvpYesRadio, value: 'Yes' },
    { label: rsvpNoRadio, value: 'No' },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Selected:', e.target.value);
    setSelectedValue(e.target.value);
  };
  const handleSubmit = useCallback(() => {
    setSubmitting(true);
    recordRSVP(userId, scheduleId, selectedValue, {
      onComplete: () => {
        setSubmitting(false);
        router.push('/course-schedule');
      },
      onError: () => setSubmitting(false),
    });
  }, [scheduleId, selectedValue, userId]);

  return (
    <>
      <div className="test-justify mb-2 flex flex-col space-y-2 text-12 text-sos-primary-blue lg:text-16">
        {radioOptions.map((option) => (
          <label
            key={option.value}
            className="inline-flex cursor-pointer items-center"
          >
            <input
              type="radio"
              name="rsvp"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={handleChange}
              className="form-radio h-5 w-5 transition duration-150 ease-in-out"
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
      <button
        type="button"
        className="my-4 flex-none self-start border border-sos-secondary-light-blue bg-sos-primary-blue px-8 py-2 text-16 font-medium text-white disabled:bg-gray-300 lg:px-12 lg:py-4 lg:text-20"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? 'Submitting' : 'Submit RSVP'}
      </button>
    </>
  );
}
