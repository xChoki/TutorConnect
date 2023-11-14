import { Accordion } from "flowbite-react"
import { useState } from "react"

import downloadFile from "../../Services/CoursesServices"
import Modal from "../Modal"

import FilesViewer from "../Files/FilesViewer"
import VideoAccordionPanel from "./Accordion/Panels/VideoAccordionPanel"
import HomeworkAccordionPanel from "./Accordion/Panels/HomeworkAccordionPanel"
import MaterialAccordionPanel from "./Accordion/Panels/MaterialAccordionPanel"

export default function CourseFilesAccordion({
  ValidateRoles,
  videoFiles,
  homeworkFiles,
  materialFiles,
  setOpenModalUpload,
  setOpenModalVideo,
  setOpenModalDelete,
  setFileDiff,
  setFileName,
  selectedVideoInfo,
  isUserCourseTutor,
  setAddedFileId,
  id,
}) {
  const [openHomeworkModal, setOpenHomeworkModal] = useState()
  const [fileUri, setFileUri] = useState("")

  return (
    <>
      <Accordion collapseAll className="mt-20">
        <Accordion.Panel>
          <VideoAccordionPanel
            ValidateRoles={ValidateRoles}
            setOpenModalUpload={setOpenModalUpload}
            setFileDiff={setFileDiff}
            videoFiles={videoFiles}
            selectedVideoInfo={selectedVideoInfo}
            setOpenModalVideo={setOpenModalVideo}
            isUserCourseTutor={isUserCourseTutor}
            setOpenModalDelete={setOpenModalDelete}
            setFileName={setFileName}
          />
        </Accordion.Panel>

        <Accordion.Panel>
          <HomeworkAccordionPanel
            ValidateRoles={ValidateRoles}
            setOpenModalUpload={setOpenModalUpload}
            setFileDiff={setFileDiff}
            homeworkFiles={homeworkFiles}
            isUserCourseTutor={isUserCourseTutor}
            setOpenHomeworkModal={setOpenHomeworkModal}
            setOpenModalDelete={setOpenModalDelete}
            setFileName={setFileName}
            setFileUri={setFileUri}
            downloadFile={downloadFile}
            setAddedFileId={setAddedFileId}
            id={id}
          />
        </Accordion.Panel>

        <Accordion.Panel>
          <MaterialAccordionPanel
            ValidateRoles={ValidateRoles}
            setOpenModalUpload={setOpenModalUpload}
            setFileDiff={setFileDiff}
            materialFiles={materialFiles}
            downloadFile={downloadFile}
            setOpenModalDelete={setOpenModalDelete}
            isUserCourseTutor={isUserCourseTutor}
            setFileName={setFileName}
          />
        </Accordion.Panel>
      </Accordion>

      <Modal
        open={openHomeworkModal}
        onClose={() => {
          setOpenHomeworkModal(false)
        }}
        cancel={true}
      >
        <div className="flex flex-col items-center justify-center text-center h-full">
          <div className="mx-auto my-4 w-full h-full">
            <h3>Viendo archivo</h3>
            <FilesViewer fileUri={fileUri} />
          </div>
        </div>
      </Modal>
    </>
  )
}
