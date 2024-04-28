import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

type Data = {
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  subject: string;
  question: string;
};

export async function POST(request: NextRequest) {
  const data: Data = await request.json();

  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: { user: 'sli-admin@sos.org', pass: 'c>uA;SU6Z5(_iZI!,y]H' }, //todo : move to dynamic credentials for security reasons
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.error(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  let mailOptions = {
    from: '"SLI Admin" <sli-admin@sos.org>',
    to: 'sli-admin@sos.org',
    subject: `Contact Us Query : ${data.subject}`,
    text: data.question,
    html: `<div>
            <p>From : ${data.firstName} ${data.lastName}</p>
            <p>Region : ${data.region}</p>
            <p>Email : ${data.email}</p>
            <p>Question : ${data.question}</p>
        </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Failed to send mail', error);
    }
  });

  return NextResponse.json(data);
}
