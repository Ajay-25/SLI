'use client';

import axios from 'axios';

import React, {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  ReactElement,
  useState,
  useCallback,
  ReactNode,
} from 'react';

//hooks
import { useTranslations } from 'next-intl';

const ReflectionSubmitForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const tReflection = useTranslations('Reflection');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    question1: '',
    question2: '',
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center gap-4 text-16 text-sos-primary-blue lg:gap-6"
    >
      <div className="flex w-3/4 flex-col gap-4 self-center text-16 lg:flex-col lg:gap-6">
        <div>{tReflection('question1')}</div>
        <textarea
          id="question"
          name="question"
          rows={5}
          placeholder={tReflection('question1')}
          required
          className="mx-h-60 grow overflow-auto border-current p-2 text-16 font-medium leading-tight placeholder:text-sos-primary-blue placeholder:opacity-50 lg:max-h-80 lg:p-4 lg:text-20"
        />
      </div>
      <div className="flex w-3/4 flex-col gap-4 self-center text-16 lg:flex-col lg:gap-6">
        <div>{tReflection('question2')}</div>
        <textarea
          id="question2"
          name="question2"
          rows={5}
          placeholder={tReflection('question2')}
          required
          className="mx-h-60 grow overflow-auto border-current p-2 text-16 font-medium leading-tight placeholder:text-sos-primary-blue placeholder:opacity-50 lg:max-h-80 lg:p-4 lg:text-20"
        />
      </div>
      <button
        type="submit"
        className="flex-none self-start border border-sos-primary-blue bg-sos-primary-blue px-4 py-2 text-16 font-medium text-white lg:px-12 lg:py-4 lg:text-20"
      >
        {submitting ? tReflection('submitting') : tReflection('submit')}
      </button>
    </form>
  );
};

export default function ReflectionPage(SuccessPage: typeof React.Component) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const tReflection = useTranslations('Reflection');

  const handleSubmit = useCallback(() => setFormSubmitted(true), []);
  const sendMail = useCallback(() => setFormSubmitted(false), []);

  return formSubmitted ? (
    <SuccessPage />
  ) : (
    <ReflectionSubmitForm onSubmit={handleSubmit} />
  );
}
