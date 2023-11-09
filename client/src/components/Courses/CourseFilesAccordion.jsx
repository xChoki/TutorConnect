import { Accordion } from "flowbite-react"
import {
  Icon_Download,
  Icon_Edit,
  Icon_Eye,
  // Icon_Eye,
  Icon_PlayButton,
  Icon_Trashcan,
  Icon_Upload,
} from "../../assets/Icons"
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
  isUserCourseTutor,
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

                    {isUserCourseTutor && (
                      <div
                        className="hover:bg-gray-400 hover:text-white rounded-lg"
                        onClick={() => {
                          // alert("borrar " + file.fileName)
                          setOpenModalDelete(true)
                          setFileDiff("videos")
                          setFileName(file.fileName)
                        }}
                      >
                        <Icon_Trashcan margin="2" color="text-red-400  hover:text-red-200" />
                      </div>
                    )}
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
                                downloadFile(file.fileName, "homework")
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
                        <div
                          className="p-5 text-gray-500 flex justify-between hover:bg-gray-200 hover:cursor-pointer items-center"
                        >
                          Nombre alumno - Nombre archivo{" "}
                          <div className="flex">
                            <div
                              className="hover:bg-gray-400 hover:text-white rounded-lg"
                              onClick={() => {
                                alert("viendo archivo")
                              }}
                            >
                              <Icon_Eye margin="2" />
                            </div>
                            
                            <div
                              className="hover:bg-gray-400 hover:text-white rounded-lg"
                              onClick={() => {
                                alert("calificando")
                              }}
                            >
                              <Icon_Edit margin="2" />
                            </div>
                          </div>
                          {/* <div className="flex">
                            <div
                              className="hover:bg-gray-400 hover:text-white rounded-lg"
                              onClick={() => {
                                alert("viendo archivo 2")
                              }}
                            >
                              <Icon_Eye margin="2" />
                            </div>

                            <div
                              className="hover:bg-gray-400 hover:text-white rounded-lg"
                              onClick={() => {
                                alert("calificando")
                              }}
                            >
                              <Icon_Edit margin="2" />
                            </div> 
                          </div>*/}
                        </div>
                      </Accordion.Content>
                    </Accordion.Panel>
                  </Accordion>
                ) : (
                  <>
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
                            alert("subiendo")
                          }}
                        >
                          <Icon_Upload margin="2" />
                        </div>

                        <div
                          className="hover:bg-gray-400 hover:text-white rounded-lg"
                          onClick={() => {
                            downloadFile(file.fileName, "homework")
                          }}
                        >
                          <Icon_Download margin="2" />
                        </div>

                        {isUserCourseTutor && (
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
                        )}
                      </div>
                    </div>
                    <hr className="h-px bg-gray-200 border-0" />
                  </>
                )}
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
                <div className="flex items-center p-5 text-gray-500 hover:bg-gray-200 hover:cursor-pointer w-full">
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

                    {isUserCourseTutor && (
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
                    )}
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
