'use client'

import EditMenu from '@/components/edit-menu'

export default function CourseCard() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">

        <header className="flex justify-between items-start mb-2">
          {/* Title */}
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Course Title</h2>
          {/* Menu button (Admin) */}
          <EditMenu align="right" />
        </header>

        {/* Image */}
        <div className="bg-[#ffffff] h-48 mb-4 rounded-lg"></div>

      </div>
    </div>
  )
}
