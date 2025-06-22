'use client';

import { useState } from 'react';
import { AdaptedCourse } from '@components/courseSchedule/types';

export default function RegisterModal({
  course,
  onClose,
}: {
  course: AdaptedCourse;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    console.log('User submitted:', { email, phone, course });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md space-y-4">
        <h2 className="text-xl font-bold">Register for {course.name}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-between gap-4">
          <button
            onClick={handleSubmit}
            disabled={!email || !phone}
            className="flex-1 bg-blue-600 text-white p-2 rounded disabled:opacity-50"
          >
            Submit
          </button>
          <button onClick={onClose} className="flex-1 bg-gray-300 p-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
