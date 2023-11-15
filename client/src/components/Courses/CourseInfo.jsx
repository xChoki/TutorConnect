export default function CourseInfo(props) {
  const { courseName, courseDescription, courseExtrainfo, courseNeurodiv } = props

  return (
    <>
      <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">{courseName}</h2>
      <hr className="h-px my-8 bg-gray-200 border-0" />
      <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900">Información del curso</h2>
      <p className="font-normal text-gray-700">{courseDescription}</p>

      <hr className="w-48 h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10" />

      {courseExtrainfo && (
        <div className="">
          <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
            Información extra del curso
          </h2>
          <p> {courseExtrainfo} </p>
          <hr className="w-48 h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10" />
        </div>
      )}

      <p>
        Este curso {courseNeurodiv ? "" : "no"} cuenta con disponibilidad para tratar con personas
        neurodivergentes.
      </p>
    </>
  )
}
