'use client';

import axios from 'axios';

import React, { useState, useCallback } from 'react';

const recordRSVP = async (
  userId: string | undefined,
  scheduleId: number | null,
  rsvp: string | null
) => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/api/rsvp',
      data: {
        'userId': userId ?? '',
        'scheduleId': scheduleId ?? 0,
        'rsvp': rsvp ?? ''
      },
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    console.log('Response received');
    if (response.status === 200) {
      console.log('Response succeeded!');
      //onComplete();
    }
  } catch (e) {
    console.error(e);
    //onError();
  }
};

export default function RSVPSelector(
    {
        userId, scheduleId, rsvp
    }:{userId: string | undefined,
    scheduleId: number | null,
    rsvp: string | null}
) {
    const [selectedValue, setSelectedValue] = useState(rsvp);
    const radioOptions = [
        { label: 'Yes I do commit and will attend', value: 'Yes' },
        { label: 'I am not able to commit and will not attend', value: 'No' },
    ];
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log('Selected:', e.target.value);
        setSelectedValue(e.target.value);
    };
    const handleSubmit = useCallback(() => recordRSVP(userId, scheduleId, selectedValue), []);

    return (
        <>
        <div className="flex flex-col space-y-2 test-justify text-12 text-sos-primary-blue lg:text-16 mb-2">
            {radioOptions.map((option) => (
                <label key={option.value} className="inline-flex items-center cursor-pointer">
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
        className="flex-none self-start border border-sos-secondary-light-blue px-8 py-2 text-16 font-medium text-white lg:px-12 lg:py-4 lg:text-20 bg-sos-primary-blue my-4"
        onClick={handleSubmit}
      >Submit RSVP</button>
      </>
    );
}