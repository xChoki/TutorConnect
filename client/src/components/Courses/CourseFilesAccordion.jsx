import { Accordion } from "flowbite-react"
import { Icon_Download, Icon_PlayButton, Icon_Trashcan, Icon_Upload } from "../../assets/Icons"
import React from "react"

import downloadFile from "../../Services/CoursesServices"

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
}) {
  return (
    <Accordion className="mt-20">
      <Accordion.Panel>
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
                <div className="flex items-center p-5 text-gray-500 hover:bg-gray-200 hover:cursor-pointer">
                  <div
                    onClick={() => {
                      selectedVideoInfo(file.fileName)
                      setOpenModalVideo(true)
                    }}
                    className="flex-grow"
                  >
                    <span>{file.fileName.split("____").pop()}</span>
                  </div>
                  <div className="flex">
                    <div
                      className="hover:bg-gray-400 hover:text-white rounded-lg"
                      onClick={() => {
                        selectedVideoInfo(file.fileName)
                        setOpenModalVideo(true)
                      }}
                    >
                      <Icon_PlayButton margin="2" />
                    </div>

                    <div
                      className="hover:bg-gray-400 hover:text-white rounded-lg"
                      onClick={() => {
                        // alert("borrar " + file.fileName)
                        setOpenModalDelete(true)
                        setFileDiff("videos")
                        setFileName(file.fileName)
                      }}
                    >
                      <Icon_Trashcan margin="2" color="text-red-400" />
                    </div>
                  </div>
                </div>
                <hr className="h-px bg-gray-200 border-0" />
              </React.Fragment>
            ))}
        </Accordion.Content>
      </Accordion.Panel>

      <Accordion.Panel>
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
                <div className="flex items-center p-5 text-gray-500 hover:bg-gray-200 hover:cursor-pointer">
                  <div
                    onClick={() => {
                      downloadFile(file.fileName, "homework")
                    }}
                    className="flex-grow"
                  >
                    <span>{file.fileName.split("____").pop()}</span>
                  </div>
                  <div className="flex">
                    <div
                      className="hover:bg-gray-400 hover:text-white rounded-lg"
                      onClick={() => {
                        downloadFile(file.fileName, "homework")
                      }}
                    >
                      <Icon_Download margin="2" />
                    </div>

                    <div
                      className="hover:bg-gray-400 hover:text-white rounded-lg"
                      onClick={() => {
                        // alert("borrar " + file.fileName)
                        setOpenModalDelete(true)
                        setFileDiff("homework")
                        setFileName(file.fileName)
                      }}
                    >
                      <Icon_Trashcan margin="2" color="text-red-400" />
                    </div>
                  </div>
                </div>
                <hr className="h-px bg-gray-200 border-0" />
              </React.Fragment>
            ))}
        </Accordion.Content>
      </Accordion.Panel>

      <Accordion.Panel>
        <Accordion.Title className="flex items-center">
          <span className="text-lg">Material</span>
        </Accordion.Title>
        <Accordion.Content>
          {ValidateRoles && (
            <>
              <div
                onClick={() => {
                  // console.log("Subiendo material")
                  setOpenModalUpload(true)
                  setFileDiff("mat")
                }}
                className="p-5 text-gray-500 flex justify-between hover:bg-gray-200 hover:cursor-pointer"
              >
                Subir material <Icon_Upload />
              </div>
              <hr className="h-px bg-gray-200 border-0" />
            </>
          )}

          {materialFiles?.length > 0 &&
            materialFiles?.map((file) => (
              <React.Fragment key={file.fileName}>
                <div className="flex items-center p-5 text-gray-500 hover:bg-gray-200 hover:cursor-pointer">
                  <div
                    onClick={() => {
                      downloadFile(file.fileName, "material")
                    }}
                    className="flex-grow"
                  >
                    <span>{file.fileName.split("____").pop()}</span>
                  </div>
                  <div className="flex">
                    <div
                      className="hover:bg-gray-400 hover:text-white rounded-lg"
                      onClick={() => {
                        downloadFile(file.fileName, "material")
                      }}
                    >
                      <Icon_Download margin="2" />
                    </div>

                    <div
                      className="hover:bg-gray-400 hover:text-white rounded-lg"
                      onClick={() => {
                        // alert("borrar " + file.fileName)
                        setOpenModalDelete(true)
                        setFileDiff("material")
                        setFileName(file.fileName)
                      }}
                    >
                      <Icon_Trashcan margin="2" color="text-red-400" />
                    </div>
                  </div>
                </div>
                <hr className="h-px bg-gray-200 border-0" />
              </React.Fragment>
            ))}
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  )
}
