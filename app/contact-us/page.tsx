'use client';

import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';

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
      className="text-24 placeholder:text-sos-primary-blue grow border-current p-4 font-medium leading-tight placeholder:opacity-50"
      required={required}
    />
  );
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
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      firstName: '',
      lastName: '',
      region: '',
      subject: '',
      question: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-sos-primary-blue flex flex-col gap-6"
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
        className="text-24 placeholder:text-sos-primary-blue max-h-80 grow overflow-auto border-current p-4 font-medium leading-tight placeholder:opacity-50"
      />
      <button
        type="submit"
        className="text-24 border-sos-secondary-dark-gold bg-sos-primary-gold flex-none self-start border px-12 py-4 font-medium text-white"
      >
        Send
      </button>
    </form>
  );
};

export default function Page() {
  return (
    <article className="flex flex-col gap-4 px-[14rem] pb-[8rem] pt-[6rem]">
      <h1 className="text-sos-primary-blue text-[4.2rem] font-medium">
        Contact the SLI Admin for questions
      </h1>
      <div className="h-[1px] bg-[#E1B93B]" />
      <ContactForm />
    </article>
  );
}
