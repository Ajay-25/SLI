'use client';

import axios from 'axios';

import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  ReactElement,
  useState,
  useCallback,
} from 'react';

import { GoogleCaptchaProvider } from '@/ui/googleCaptchaProvider';

//hooks
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslations } from 'next-intl';

//components
import { SectionSeparator } from '@/ui/home/SectionSeparator';

const Input = ({
  name,
  value,
  onChange,
  placeholder,
  required,
}: {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<{ name: string; value: string }>) => void;
  placeholder: string;
  required?: boolean;
}): ReactElement => {
  return (
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="grow border-current p-2 text-16 font-medium leading-tight placeholder:text-sos-primary-blue placeholder:opacity-50 lg:p-4 lg:text-20"
      required={required}
    />
  );
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  subject: string;
  question: string;
  reCaptchaToken: string;
};

const sendMail = async (
  data: FormData,
  { onComplete, onError }: { onComplete: () => void; onError: () => void },
) => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/api/contact',
      data,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    console.log('Response received');
    if (response.status === 200) {
      console.log('Response succeeded!');
      onComplete();
    }
  } catch (e) {
    console.error(e);
    onError();
  }
};

const SuccessMessage = ({ onSendMail }: { onSendMail: MouseEventHandler }) => {
  const t = useTranslations('ContactUs');

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center text-24 font-medium lg:text-32">
        {t('successMessage')}
      </div>
      <button
        type="button"
        onClick={onSendMail}
        className="flex-none self-start border border-sos-secondary-dark-gold px-4 py-2 text-16 font-medium text-sos-primary-gold lg:px-12 lg:py-4 lg:text-20"
      >
        {t('sendAnotherMessage')}
      </button>
    </div>
  );
};

const ContactForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    region: '',
    subject: '',
    question: '',
    email: '',
  });

  const handleChange = (e: ChangeEvent<{ name: string; value: string }>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.log('Recaptcha validation not available');
      return;
    }

    setSending(true);
    const reCaptchaToken = await executeRecaptcha('contactUsSubmit');

    // Add logic to handle form submission here
    sendMail(
      { ...formData, reCaptchaToken },
      {
        onComplete: () => {
          onSubmit();
          setSending(false);
        },
        onError: () => setSending(false),
      },
    );
  };

  const t = useTranslations('ContactUs.form');

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 text-sos-primary-blue lg:gap-6"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 ">
        <Input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder={t('firstName')}
          required
        />
        <Input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder={t('lastName')}
        />
      </div>
      <Input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder={t('email')}
      />
      <Input
        name="region"
        value={formData.region}
        onChange={handleChange}
        placeholder={t('region')}
      />
      <Input
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder={t('subject')}
        required
      />
      <textarea
        id="question"
        name="question"
        value={formData.question}
        onChange={handleChange}
        rows={4}
        placeholder={t('question')}
        required
        className="mx-h-60 grow overflow-auto border-current p-2 text-16 font-medium leading-tight placeholder:text-sos-primary-blue placeholder:opacity-50 lg:max-h-80 lg:p-4 lg:text-20"
      />
      <button
        type="submit"
        className="flex-none self-start border border-sos-secondary-dark-gold bg-sos-primary-gold px-4 py-2 text-16 font-medium text-white lg:px-12 lg:py-4 lg:text-20"
      >
        {sending ? t('sending') : t('submit')}
      </button>
    </form>
  );
};

export default function Page() {
  const [mailSent, setMailSent] = useState(false);
  const t = useTranslations('ContactUs');

  const handleSubmit = useCallback(() => setMailSent(true), []);
  const sendMail = useCallback(() => setMailSent(false), []);

  return (
    <GoogleCaptchaProvider>
      <article className="flex flex-col gap-4 px-[2.2rem] pb-[4rem] pt-[2rem] lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
        <h1 className="text-32 font-medium text-sos-primary-blue lg:text-42">
          {t('title')}
        </h1>
        <SectionSeparator />
        {mailSent ? (
          <SuccessMessage onSendMail={sendMail} />
        ) : (
          <ContactForm onSubmit={handleSubmit} />
        )}
      </article>
    </GoogleCaptchaProvider>
  );
}
