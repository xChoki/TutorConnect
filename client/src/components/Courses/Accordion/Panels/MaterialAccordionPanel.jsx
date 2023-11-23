import { Accordion } from "flowbite-react"
import React from "react"
import MaterialFilesContent from "../Content/MaterialFilesContent"
import { Icon_Upload } from "../../../../assets/Icons"

export default function MaterialAccordionPanel({
  ValidateRoles,
  setOpenModalUpload,
  setFileDiff,
  materialFiles,
  downloadFile,
  setOpenModalDelete,
  isUserCourseTutor,
  setFileName,
}) {
  return (
    <>
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
            <React.Fragment key={file._id}>
              <MaterialFilesContent
                downloadFile={downloadFile}
                setOpenModalDelete={setOpenModalDelete}
                isUserCourseTutor={isUserCourseTutor}
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
