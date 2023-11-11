import { Accordion } from "flowbite-react"
import {
  Icon_Download,
  Icon_Edit,
  Icon_Eye,
  Icon_Trashcan,
  Icon_Upload,
} from "../../../../assets/Icons"

export default function HomeworkFilesContent({
  isUserCourseTutor,
  setOpenHomeworkModal,
  setOpenModalDelete,
  setFileDiff,
  setFileName,
  file,
  setFileUri,
  downloadFile,
}) {
  return (
    <>
      {isUserCourseTutor ? (
        <Accordion collapseAll className="mt-2">
          <Accordion.Panel>
            <Accordion.Title className="flex items-center">
              {/* <span className="text-lg">Grabaciones</span> */}
              <div className="flex items-center p-1 text-gray-500 hover:cursor-pointer">
                <div className="flex">
                  <div
                    className="hover:bg-gray-400 hover:text-white rounded-lg"
                    onClick={() => {
                      setOpenHomeworkModal(true)
                    }}
                  >
                    <Icon_Download margin="2" />
                  </div>

                  {isUserCourseTutor && (
                    <div
                      className="hover:bg-red-200 hover:text-white rounded-lg"
                      onClick={() => {
                        // alert("borrar " + file.fileName)
                        setOpenModalDelete(true)
                        setFileDiff("homework")
                        setFileName(file.fileName)
                      }}
                    >
                      <Icon_Trashcan margin="2" color="text-red-400" />
                    </div>
                  )}

                  <div className="flex items-center ml-2">
                    <span>{file.fileName.split("____").pop()}</span>
                  </div>
                </div>
              </div>
            </Accordion.Title>
            <Accordion.Content>
              <div className="p-5 text-gray-500 flex justify-between hover:bg-gray-200 hover:cursor-pointer items-center">
                Nombre alumno - Nombre archivo{" "}
                <div className="flex">
                  <div
                    className="hover:bg-gray-400 hover:text-white rounded-lg"
                    onClick={() => {
                      alert("viendo archivo")
                      setOpenHomeworkModal(false)
                    }}
                  >
                    <Icon_Eye margin="2" />
                  </div>

                  <div
                    className="hover:bg-gray-400 hover:text-white rounded-lg"
                    onClick={() => {
                      alert("calificando")
                      setOpenHomeworkModal(false)
                    }}
                  >
                    <Icon_Edit margin="2" />
                  </div>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      ) : (
        <>
          <div
            onClick={() => {
              setOpenHomeworkModal(true)
              setFileUri(import.meta.env.VITE_API_FILE_URL + "/homework/" + file.fileName)
            }}
            className="flex items-center p-5 text-gray-500 hover:bg-gray-200 hover:cursor-pointer"
          >
            <div className="flex-grow">
              <span>{file.fileName.split("____").pop()}</span>
            </div>
            <div className="flex">
              <div
                className="hover:bg-gray-400 hover:text-white rounded-lg"
                onClick={(e) => {
                  e.stopPropagation()
                  alert("subiendo")
                }}
              >
                <Icon_Upload margin="2" />
              </div>

              <div
                className="hover:bg-gray-400 hover:text-white rounded-lg"
                onClick={(e) => {
                  e.stopPropagation()
                  downloadFile(file.fileName, "homework")
                }}
              >
                <Icon_Download margin="2" />
              </div>

              {isUserCourseTutor && (
                <div
                  className="hover:bg-gray-400 hover:text-white rounded-lg"
                  onClick={() => {
                    setOpenModalDelete(true)
                    setFileDiff("homework")
                    setFileName(file.fileName)
                  }}
                >
                  <Icon_Trashcan margin="2" color="text-red-400" />
                </div>
              )}
            </div>
          </div>
          <hr className="h-px bg-gray-200 border-0" />
        </>
      )}
    </>
  )
}
