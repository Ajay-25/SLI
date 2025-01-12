import { cookies } from 'next/headers';
import Image from 'next/image';

import { SectionSeparator } from '@/app/ui/home/SectionSeparator';

//types
import { ReactElement } from 'react';

import { ReactNode } from 'react';
import { Metadata } from 'next';
import { ProfileInfo } from '@/app/ui/myProfile/types';

const Info = ({
  profileInfo,
  children,
}: {
  profileInfo: ProfileInfo;
  children: ReactNode;
}) => {
  return (
    <div className="flex gap-4 p-4 lg:gap-8 lg:p-12">
      <Image
        src={'https://scd.sos.org' + profileInfo.imagePath}
        width={180}
        height={180}
        alt=""
        className="hidden self-start lg:block"
      />
      <Image
        src={'https://scd.sos.org' + profileInfo.imagePath}
        width={60}
        height={60}
        alt=""
        className="self-start lg:hidden"
      />
      <div className="px-10 text-justify text-16 text-sos-primary-blue lg:px-20 lg:text-20">
        {children}
      </div>
    </div>
  );
};

const ToDos = () => {
  return (
    <article className="flex flex-col gap-2 px-[2.2rem] pb-[4rem] pt-[2rem] text-sos-secondary-blue lg:gap-6 lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="lg:text-38 self-start text-center text-32 font-medium">
        To Do&#39;s
      </h1>
    </article>
  );
};

async function getServerSideProps(
  userId: string | undefined,
): Promise<ProfileInfo> {
  const res = await fetch(
    'https://scd.sos.org/api/CommonServicesController/getSevadarIDFromDnnUserID?dnnUserID=' +
      userId,
    {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache', // Bypass caching
      },
    },
  );
  return await res.json();
}

export default async function Page() {
  const cookiesList = await cookies();
  const userId = cookiesList.get('authToken');
  const profileInfo = await getServerSideProps(userId?.value);

  return (
    <article className="flex flex-col gap-2 px-[2.2rem] pb-[4rem] pt-[2rem] text-sos-primary-blue lg:gap-6 lg:px-[14rem] lg:pb-[8rem] lg:pt-[6rem]">
      <h1 className="self-start text-center text-32 font-medium lg:text-42">
        My Profile
      </h1>
      <SectionSeparator />
      <div className="flex flex-col lg:mx-[14.2rem]">
        <Info profileInfo={profileInfo}>
          <div>
            <div>{profileInfo.fullName}</div>
            <div>{profileInfo.email}</div>
          </div>
        </Info>
      </div>
      <ToDos></ToDos>
    </article>
  );
}

export const metadata: Metadata = {
  title: 'My Profile',
};
