'use client'

import { Course } from '@/app/lib/definitions'
import CourseCard from './course-card'

export default function CourseCardCollection({
    courses,
    adminRights
}: {
    courses: Course[],
    adminRights: boolean
}) {
    return (
        <div className="grid grid-cols-12 gap-6">
            {courses.map((course) =>
                <CourseCard course={course} adminRights={adminRights}/>
            )}
        </div>
    )
}