import { Icon_PlayButton, Icon_Trashcan } from "../../../../assets/Icons"

export default function VideoFilesContent({
    selectedVideoInfo,
    setOpenModalVideo,
    isUserCourseTutor,
    setOpenModalDelete,
    setFileDiff,
    setFileName,
    file
}) {
  return (
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
  )
}
