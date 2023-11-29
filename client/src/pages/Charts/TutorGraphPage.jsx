import { useEffect } from 'react'
import SideBar from '../../components/Navigation/SideBar'
import { useSidebarState } from '../../hooks/useSidebarState'
import TutorChartMeanByHomework from '../../components/Tutors/TutorChartMeanByHomework'
import TutorChartCantAlumnos from '../../components/Tutors/TutorChartCantAlumnos'
import TutorChartMeanByCourse from '../../components/Tutors/TutorChartMeanByCourse'

export default function TutorGraphPage() {
  const [open, setOpen] = useSidebarState()

  useEffect(() => {
    document.title = 'TutorConnect | Gráficos'
  }, [])

  return (
    <div className={`${open ? 'ml-72' : 'ml-20'} pt-6`}>
      <SideBar open={open} setOpen={setOpen} />

      <section className='px-10 mb-10 container mx-auto'>
        <h1 className='text-4xl md:text-4xl text-center'>Gráficos</h1>
        <TutorChartMeanByHomework />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='border rounded-md shadow-md lg:col-span-1 p-5'>
            <TutorChartCantAlumnos />
          </div>

          <div className='border rounded-md shadow-md lg:col-span-1 p-5'>
            <TutorChartMeanByCourse />
          </div>
        </div>
      </section>
    </div>
  )
}
