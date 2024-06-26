'use client'

import { CourseData } from '@/app/lib/definitions'

export default function CourseCard({
  course,
}: {
  course: CourseData,
}) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">

        <header className="flex justify-between items-start mb-2">
          {/* Title */}
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">{course.title}</h2>
        </header>

        {/* Image */}
        <div className="bg-[#ffffff] h-48 mb-4 rounded-lg"></div>

      </div>
    </div>
  )
}
