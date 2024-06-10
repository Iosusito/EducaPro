'use client'

import { CourseData } from '@/app/lib/definitions'
import AdminCourseCard from './admin-course-card'

export default function AdminCourseCollection({
    courses,
}: {
    courses: CourseData[]
}) {
    return (
        <div className="grid grid-cols-12 gap-6">
            {courses.map((course) =>
                <AdminCourseCard course={course}/>
            )}
        </div>
    )
}