import { Accordion } from "flowbite-react"
import { useState } from "react"

import downloadFile from "../../Services/CoursesServices"

import VideoAccordionPanel from "./Accordion/Panels/VideoAccordionPanel"
import HomeworkAccordionPanel from "./Accordion/Panels/HomeworkAccordionPanel"
import MaterialAccordionPanel from "./Accordion/Panels/MaterialAccordionPanel"
import ModalFileViewer from "../Modals/ModalFileViewer"

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

      <ModalFileViewer 
        openFileModal={openHomeworkModal}
        setOpenFileModal={setOpenHomeworkModal}
        fileUri={fileUri}
      />
    </>
  )
}
