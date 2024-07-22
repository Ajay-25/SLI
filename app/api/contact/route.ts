import nodemailer from 'nodemailer';
import axios from 'axios';

import { NextRequest, NextResponse } from 'next/server';

type Data = {
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  subject: string;
  question: string;
  reCaptchaToken: string;
};

export async function POST(request: NextRequest, response: NextResponse) {
  const secretKey = process?.env?.RECAPTCHA_SECRET_KEY;
  let res;

  if (!secretKey) {
    // If the secret key is not found, log an error and return an appropriate response.
    console.error('RECAPTCHA_SECRET_KEY is not set in environment variables.');
    return NextResponse.json({
      success: false,
      error: 'RECAPTCHA_SECRET_KEY Not Found',
    });
  }

  const data: Data = await request.json();
  const { reCaptchaToken } = data;

  const formData = `secret=${secretKey}&response=${reCaptchaToken}`;

  try {
    res = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }

  if (res && res.data?.success && res.data?.score > 0.5) {
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

    return NextResponse.json({
      success: true,
      score: res.data.score,
    });
  } else {
    return NextResponse.json({ success: false });
  }
}
