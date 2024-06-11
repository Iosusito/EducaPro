'use client'

import WelcomeBanner from './welcome-banner'
import CourseCardCollection from './course-card-collection'
import { useEffect, useState } from 'react'
import { getCourses } from '@/app/actions/course'
import { CourseData } from '@/app/lib/definitions'
import { getCoursesOfUser } from '@/app/actions/course'
//import { get } from '@/app/actions/session'

export default function Dashboard() {

  // Obtener todos los cursos del usuario
  const [courses, setCourses] = useState<CourseData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { success, message } = await getCourses();

        if (success) {
          const courses: CourseData[] = message as CourseData[];
          setCourses(courses);
        } // else?

      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* <WelcomeBanner /> */}

      {/* Courses */}
      <CourseCardCollection courses={courses}/>
    </div>
  )
}
