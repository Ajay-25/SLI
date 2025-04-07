import { Metadata } from 'next';

export default function Page() {
  return (
    <div className="border-1 mx-12 mt-20 w-fit border border-sos-primary-gold p-4 text-center text-32 font-medium text-sos-primary-blue lg:mx-auto lg:mt-40 lg:p-12 lg:text-42 ">
      <p>Thank you for visiting our website.</p>
      <br></br>
      <p>
        Unfortunately, the content you’re trying to access is not available in
        your region.
      </p>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Not Available',
};
