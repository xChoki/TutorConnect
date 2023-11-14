import { Accordion } from "flowbite-react"
import HomeworkFilesContent from "../Content/HomeworkFilesContent"
import React from "react"
import { Icon_Upload } from "../../../../assets/Icons"

export default function HomeworkAccordionPanel({
  ValidateRoles,
  setOpenModalUpload,
  setFileDiff,
  homeworkFiles,
  isUserCourseTutor,
  setOpenHomeworkModal,
  setOpenModalDelete,
  setFileName,
  setFileUri,
  downloadFile,
  setAddedFileId,
  id,
}) {
  return (
    <>
      <Accordion.Title className="flex items-center">
        <span className="text-lg">Tareas</span>
      </Accordion.Title>
      <Accordion.Content>
        {ValidateRoles && (
          <>
            <div
              onClick={() => {
                // console.log("Subiendo tarea")
                setOpenModalUpload(true)
                setFileDiff("hom")
              }}
              className="p-5 text-gray-500 flex justify-between hover:bg-gray-200 hover:cursor-pointer"
            >
              Subir tarea <Icon_Upload />
            </div>
            <hr className="h-px bg-gray-200 border-0" />
          </>
        )}

        {homeworkFiles?.length > 0 &&
          homeworkFiles?.map((file) => (
            <React.Fragment key={file.fileName}>
              <HomeworkFilesContent
                isUserCourseTutor={isUserCourseTutor}
                setOpenHomeworkModal={setOpenHomeworkModal}
                setOpenModalDelete={setOpenModalDelete}
                setFileDiff={setFileDiff}
                setFileName={setFileName}
                file={file}
                setFileUri={setFileUri}
                downloadFile={downloadFile}
                setOpenModalUpload={setOpenModalUpload}
                setAddedFileId={setAddedFileId}
                id={id}
              />
            </React.Fragment>
          ))}
      </Accordion.Content>
    </>
  )
}
