import { Icon_UploadCloud } from "../../assets/Icons"

export default function ApplicationForm({
  saveApplication,
  applicationDescription,
  setApplicationDescription,
  uploadGradesFileChange,
  uploadRegularFileChange,
  gradesFileName,
  regularFileName,
  applicationExtraInfo,
  setCourseExtrainfo,
  id,
  deleteApplication,
}) {
  return (
    <form onSubmit={saveApplication} className="max-w-7xl px-10 justify-center">
      <div className="relative z-0 w-full mb-6 group">
        <label
          htmlFor="applicationDescription"
          className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
        >
          Descripción de tí
        </label>
        <textarea
          id="applicationDescription"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Haz una descripción de tí, háblanos de tus motivaciones, tu historia, o lo que desees."
          required
          value={applicationDescription}
          onChange={(ev) => setApplicationDescription(ev.target.value)}
        ></textarea>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <div className="mx-auto my-4 w-full h-full">
          <label className="flex flex-col justify-center items-center w-full h-full px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <div className="flex items-center space-x-2">
              <Icon_UploadCloud />
              <span className="font-medium text-gray-600">
                Presiona para subir tu reporte de notas.
              </span>
            </div>
            <p className="text-xs leading-5 text-gray-600">PDF de hasta 1MB</p>
            <input
              type="file"
              name="applicationRegularFile"
              className="hidden"
              accept=".pdf"
              onChange={uploadGradesFileChange}
            />
          </label>

          {gradesFileName && (
            <>
              <p className="text-sm text-gray-500 mt-2">Se está subiendo el archivo {gradesFileName}.</p>
            </>
          )}
        </div>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <div className="mx-auto my-4 w-full h-full">
          <label className="flex flex-col justify-center items-center w-full h-full px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <div className="flex items-center space-x-2">
              <Icon_UploadCloud />
              <span className="font-medium text-gray-600">
                Presiona para subir tu documento de alumno regular.
              </span>
            </div>
            <p className="text-xs leading-5 text-gray-600">PDF de hasta 1MB</p>
            <input
              type="file"
              name="applicationRegularFile"
              className="hidden"
              accept=".pdf"
              onChange={uploadRegularFileChange}
            />
          </label>

          {regularFileName && (
            <>
              <p className="text-sm text-gray-500 mt-2">Se está subiendo el archivo {regularFileName}.</p>
            </>
          )}
        </div>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <label
          htmlFor="applicationExtraInfo"
          className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
        >
          Información extra (opcional)
        </label>
        <textarea
          id="applicationExtraInfo"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Deja un comentario..."
          value={applicationExtraInfo}
          onChange={(ev) => setCourseExtrainfo(ev.target.value)}
        ></textarea>
      </div>

      <button
        type="submit"
        className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Enviar
      </button>

      {id && (
        <button
          type="button"
          onClick={deleteApplication}
          className="mx-2 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          <span className="pl-2">Eliminar Curso</span>
        </button>
      )}
    </form>
  )
}
