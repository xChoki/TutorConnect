import { Link } from 'react-router-dom'
import PencilsImage from '../../assets/Pencils.png'

export default function CoursesCard(props) {
  // console.log(course)
  const { course } = props

  return (
    <Link to={'/portal/cursos/' + course._id}>
      <div className='max-w-xl rounded overflow-hidden shadow-lg relative'>
        <img
          className='w-full h-1/2'
          src={PencilsImage}
          alt='Background image of some pencils with a yellow background'
        />

        {course.courseNeurodiv && (
          <div className='absolute left-0 top-0 h-16 w-16'>
            <p className='absolute transform -rotate-45 bg-gray-600 text-center text-white font-semibold py-1 left-[-34px] top-[32px] w-[170px]'>
              Neurodivergente
            </p>
          </div>
        )}

        <section className='px-6 py-4'>
          <span className='font-bold text-xl mb-2 truncate'>{course.courseName}</span>
          <p className='text-gray-700 text-base truncate'>{course.courseDescription}</p>
        </section>

        <section className='px-6 pt-4 pb-2'>
          <span
            to={'/portal/cursos/' + course._id}
            className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
          >
            Ver detalles
          </span>
        </section>
      </div>
    </Link>
  )
}
