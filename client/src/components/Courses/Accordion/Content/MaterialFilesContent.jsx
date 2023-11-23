import { Icon_Download, Icon_Trashcan } from "../../../../assets/Icons"


export default function MaterialFilesContent({
    downloadFile,
    setOpenModalDelete,
    isUserCourseTutor,
    setFileDiff,
    setFileName,
    file,
}) {
  return (
    <div className="flex items-center p-5 text-gray-500 hover:bg-gray-200 hover:cursor-pointer w-full">
      <div
        onClick={() => {
          downloadFile(file.fileName, "material")
        }}
        className="flex-grow"
      >
        <span>{file.fileName?.split("____").pop()}</span>
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
  )
}
