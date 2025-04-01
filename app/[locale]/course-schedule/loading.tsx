import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('CourseSchedule');

  return (
    <div className="flex h-full flex-1 items-center justify-center gap-2.5 p-4 text-32 lg:text-42">
      {t('loadingCourses')}
    </div>
  );
}
