import { Accordion } from "flowbite-react"
import { Icon_Upload } from "../../../../assets/Icons"
import React from "react"
import VideoFilesContent from "../Content/VideoFilesContent"

export default function VideoAccordionPanel({
  ValidateRoles,
  setOpenModalUpload,
  setFileDiff,
  videoFiles,
  selectedVideoInfo,
  setOpenModalVideo,
  isUserCourseTutor,
  setOpenModalDelete,
  setFileName,
}) {
  return (
    <>
      <Accordion.Title className="flex items-center">
        <span className="text-lg">Grabaciones</span>
      </Accordion.Title>
      <Accordion.Content>
        {ValidateRoles && (
          <>
            <div
              onClick={() => {
                // console.log("Subiendo grabación")
                setOpenModalUpload(true)
                setFileDiff("vid")
              }}
              className="p-5 text-gray-500 flex justify-between hover:bg-gray-200 hover:cursor-pointer"
            >
              Subir grabación <Icon_Upload />
            </div>
            <hr className="h-px bg-gray-200 border-0" />
          </>
        )}

        {videoFiles?.length > 0 &&
          videoFiles?.map((file) => (
            <React.Fragment key={file.fileName}>
              <VideoFilesContent
                selectedVideoInfo={selectedVideoInfo}
                setOpenModalVideo={setOpenModalVideo}
                isUserCourseTutor={isUserCourseTutor}
                setOpenModalDelete={setOpenModalDelete}
                setFileDiff={setFileDiff}
                setFileName={setFileName}
                file={file}
              />
              <hr className="h-px bg-gray-200 border-0" />
            </React.Fragment>
          ))}
      </Accordion.Content>
    </>
  )
}
