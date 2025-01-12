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

export async function POST(request: NextRequest) {
  const secretKey = process?.env?.RECAPTCHA_SECRET_KEY;
  let res;

  if (!secretKey) {
    // If the secret key is not found, log an error and return an appropriate response.
    console.error('RECAPTCHA_SECRET_KEY is not set in environment variables.');
    return NextResponse.json<{ success: boolean; error: string }>({
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
    return NextResponse.json<{ success: boolean; error: string }>({
      success: false,
      error: error as string,
    });
  }

  if (res && res.data?.success && res.data?.score > 0.5) {
    let transporter = nodemailer.createTransport({
      name: 'smtp.office365.com',
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'sli-admin@sos.org',
        pass: 'D9.2uYfMuq7smGLv_2@ziLA*bzi-u',
      }, //todo : move to dynamic credentials for security reasons
    });

    // verify connection configuration
    await transporter.verify(function (error, success) {
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

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Failed to send mail', error);
      }
      console.log('info', info);
    });

    return NextResponse.json<{ success: boolean; score: number }>({
      success: true,
      score: res.data.score,
    });
  } else {
    return NextResponse.json({ success: false });
  }
}
