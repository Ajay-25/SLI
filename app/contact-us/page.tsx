'use client';

import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';

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
      className="grow border-current p-4 text-24 font-medium leading-tight placeholder:text-sos-primary-blue placeholder:opacity-50"
      required={required}
    />
  );
};

const sendMail = async () => {
  // let s = new SMTPClient({
  //   host: 'smtp.office365.com',
  //   port: 587,
  // });
  //
  // try {
  //   await s.connect();
  //   await s.greet({ hostname: 'smtp.office365.com' }); // runs EHLO command or HELO as a fallback
  //   await s.authPlain({
  //     username: 'sli-admin@sos.org',
  //     password: 'c>uA;SU6Z5(_iZI!,y]H',
  //   }); // authenticates a user
  //   await s.mail({ from: 'sli-admin@sos.org' }); // runs MAIL FROM command
  //   await s.rcpt({ to: 'sli-admin@sos.org' }); // runs RCPT TO command (run this multiple times to add more recii)
  //   await s.data('Hola mundo mail source'); // runs DATA command and streams email source
  //   await s.quit(); // runs QUIT command
  // } catch (e) {
  //   console.error(e);
  // }
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    region: '',
    subject: '',
    question: '',
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

    sendMail();

    console.log(formData);
    // Reset form fields after submission
    // setFormData({
    //   firstName: '',
    //   lastName: '',
    //   region: '',
    //   subject: '',
    //   question: '',
    // });
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
        className="max-h-80 grow overflow-auto border-current p-4 text-24 font-medium leading-tight placeholder:text-sos-primary-blue placeholder:opacity-50"
      />
      <button
        type="submit"
        className="flex-none self-start border border-sos-secondary-dark-gold bg-sos-primary-gold px-12 py-4 text-24 font-medium text-white"
      >
        Send
      </button>
    </form>
  );
};

export default function Page() {
  return (
    <article className="flex flex-col gap-4 px-[14rem] pb-[8rem] pt-[6rem]">
      <h1 className="text-42 font-medium text-sos-primary-blue">
        Contact the SLI Admin for questions
      </h1>
      <SectionSeparator />
      <ContactForm />
    </article>
  );
}
