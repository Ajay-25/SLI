// nodemailer.d.ts

declare module 'nodemailer' {
  interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
    // Add any other properties as needed
  }

  interface Transporter {
    sendMail(
      mailOptions: MailOptions,
      callback: (error: any, info: any) => void,
    ): void;
    verify(callback: (error: Error | null, success: boolean) => void): void;

    // Add any other methods as needed
  }

  function createTransport(options: any): Transporter;

  export { createTransport };
}
