'use client';

import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  ReactElement,
  useState,
  useCallback,
} from 'react';

//components
import { SectionSeparator } from '@/app/ui/home/SectionSeparator';

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
      className="text-16 grow border-current p-4 font-medium leading-tight placeholder:text-sos-primary-blue placeholder:opacity-50"
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
};

const sendMail = (
  data: FormData,
  { onComplete }: { onComplete: () => void },
) => {
  try {
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log('Response received');
      if (res.status === 200) {
        console.log('Response succeeded!');
        onComplete();
      }
    });
  } catch (e) {
    console.error(e);
  }
};

const SuccessMessage = ({ onSendMail }: { onSendMail: MouseEventHandler }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center text-32 font-medium">
        Your message has been sent!
      </div>
      <button
        type="button"
        onClick={onSendMail}
        className="text-16 flex-none self-start border border-sos-secondary-dark-gold px-12 py-4 font-medium text-sos-primary-gold"
      >
        Send Another Message
      </button>
    </div>
  );
};

const InputFor = () => {};

const ContactForm = ({ onSubmit }: { onSubmit: () => void }) => {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add logic to handle form submission here
    sendMail(formData, { onComplete: onSubmit });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 text-sos-primary-blue"
    >
      <div className="flex gap-6">
        <Input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <Input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
      </div>
      <Input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <Input
        name="region"
        value={formData.region}
        onChange={handleChange}
        placeholder="Region"
      />
      <Input
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject"
        required
      />
      <textarea
        id="question"
        name="question"
        value={formData.question}
        onChange={handleChange}
        rows={4}
        placeholder="Question"
        required
        className="text-16 max-h-80 grow overflow-auto border-current p-4 font-medium leading-tight placeholder:text-sos-primary-blue placeholder:opacity-50"
      />
      <button
        type="submit"
        className="text-16 flex-none self-start border border-sos-secondary-dark-gold bg-sos-primary-gold px-12 py-4 font-medium text-white"
      >
        Send
      </button>
    </form>
  );
};

export default function Page() {
  const [mailSent, setMailSent] = useState(false);

  const handleSubmit = useCallback(() => setMailSent(true), []);
  const sendMail = useCallback(() => setMailSent(false), []);

  return (
    <article className="flex flex-col gap-4 px-[14rem] pb-[8rem] pt-[6rem]">
      <h1 className="text-42 font-medium text-sos-primary-blue">
        Contact the SLI Admin for questions
      </h1>
      <SectionSeparator />
      {mailSent ? (
        <SuccessMessage onSendMail={sendMail} />
      ) : (
        <ContactForm onSubmit={handleSubmit} />
      )}
    </article>
  );
}
