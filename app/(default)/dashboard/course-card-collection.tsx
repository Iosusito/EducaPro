'use client'

import { CourseData } from '@/app/lib/definitions'
import CourseCard from './course-card'

export default function CourseCardCollection({
    courses,
    adminRights
}: {
    courses: CourseData[],
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