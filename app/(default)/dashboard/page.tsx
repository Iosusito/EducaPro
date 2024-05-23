'use client'

import WelcomeBanner from './welcome-banner'
import DashboardAvatars from './dashboard-avatars'
import FilterButton from '@/components/dropdown-filter'
import Datepicker from '@/components/datepicker'
import CourseCardCollection from './course-card-collection'
import ModalBasic from "@/components/modal-basic"
import { useEffect, useState } from 'react'
import { addStudentToCourse, createCourse, getCourses } from '@/app/actions/course'
import { toast } from 'react-toastify'
import { CourseData } from '@/app/lib/definitions'
import { getRole } from '@/app/actions/session'

export default function Dashboard() {

  // modal crear-curso
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleButton = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { success, message } = await createCourse(title, description);

      if (success) {
        toast.success(message);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);

        // resetear los inputs y cerrar el modal
        setTitle("");
        setDescription("");
        setModalOpen(false);

      } else {
        toast.error(message);
      }

    } catch (error) {
      console.error();
    }
  }

  // modal añadir-usuario a curso
  const [UserModalOpen, setUserModalOpen] = useState<boolean>(false);

  const [user, setUser] = useState<string>("");
  const [course, setCourse] = useState<string>("");

  const handleUserButton = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { success, message } = await addStudentToCourse(course, user);

      if (success) {
        toast.success(message);

        // resetear los inputs y cerrar el modal
        setCourse("");
        setUser("")
        setUserModalOpen(false);

      } else {
        toast.error(message);
      }

    } catch (error) {
      console.error();
    }
  }

  // Obtener todos los cursos de la base de datos
  const [courses, setCourses] = useState<CourseData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { success, message } = await getCourses();

        if (success) {
          const courses: CourseData[] = message as CourseData[];
          setCourses(courses);
          //console.log(courses[0].students);
        } // else?

      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const [adminRights, setAdminRights] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { success, message } = await getRole();
        if (success) {
          if (message === "Admin") {
            setAdminRights(true);
          } // else?
        } // else?

      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <WelcomeBanner />
      {/* Dashboard actions (admin pannel)*/}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Avatars */}
        <DashboardAvatars />
        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Filter button */}
          <FilterButton align="right" />
          {/* Datepicker built with flatpickr */}
          <Datepicker align="right" />

          {/* Add course button */}
          <button onClick={() => { setModalOpen(true) }} className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Add Course</span>
            <ModalBasic isOpen={modalOpen} setIsOpen={setModalOpen} title="Add course">
              <form onSubmit={handleButton}>
                <div className="px-5 py-4">
                  <div className="text-sm">
                    <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">Create a new course</div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="title">Title<span className="text-rose-500"></span></label>
                      <input id="title" className="form-input w-full px-2 py-1" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="description">Description<span className="text-rose-500"></span></label>
                      <textarea id="description" className="form-textarea w-full px-2 py-1" rows={4} value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>

                    {/* Elegir la imagen */}
                  </div>
                </div>

                <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-wrap justify-end space-x-2">
                    <button
                      type="button"
                      className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                      onClick={() => { setModalOpen(false), setTitle(""), setDescription("") }}
                    >
                      Cancel
                    </button>
                    <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Create</button>
                  </div>
                </div>
              </form>
            </ModalBasic>
          </button>

          {/* Add user to course button */}
          <button onClick={() => { setUserModalOpen(true) }} className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Add User</span>
            <ModalBasic isOpen={UserModalOpen} setIsOpen={setUserModalOpen} title="Add course">
              <form onSubmit={handleUserButton}>
                <div className="px-5 py-4">
                  <div className="text-sm">
                    <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">Add a student to a course</div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="course">Course<span className="text-rose-500"></span></label>
                      <input id="course" className="form-input w-full px-2 py-1" type="text" value={course} onChange={e => setCourse(e.target.value)} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="user">Student<span className="text-rose-500"></span></label>
                      <input id="user" className="form-input w-full px-2 py-1" type="text" value={user} onChange={e => setUser(e.target.value)} />
                    </div>

                  </div>
                </div>

                <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-wrap justify-end space-x-2">
                    <button
                      type="button"
                      className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                      onClick={() => { setUserModalOpen(false), setCourse(""), setCourse("") }}
                    >
                      Cancel
                    </button>
                    <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Add</button>
                  </div>
                </div>
              </form>
            </ModalBasic>
          </button>

        </div>
      </div>

      {/* Courses */}
      <CourseCardCollection courses={courses} adminRights={adminRights} />
    </div>
  )
}
