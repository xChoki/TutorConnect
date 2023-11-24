import { useState } from 'react'
import { Icon_Download, Icon_Trashcan } from '../../../../assets/Icons'
import ModalFileViewer from '../../../Modals/ModalFileViewer'

export default function MaterialFilesContent({
  downloadFile,
  setOpenModalDelete,
  isUserCourseTutor,
  setFileDiff,
  setFileName,
  file,
}) {
  const [openModal, setOpenModal] = useState()
  const [fileUri, setFileUri] = useState()
  return (
    <>
      <div
        onClick={() => {
          setOpenModal(true)

          const fileName = file.fileName
          const apiUrl = import.meta.env.VITE_API_FILE_URL

          setFileUri(apiUrl + '/material/' + (fileName ? fileName : ''))
          // downloadFile(file.fileName, "material")
        }}
        className='flex items-center p-5 text-gray-500 hover:bg-gray-200 hover:cursor-pointer w-full'
      >
        <div className='flex-grow'>
          <span>{file.fileName?.split('____').pop()}</span>
        </div>
        <div className='flex'>
          <div
            className='hover:bg-gray-400 hover:text-white rounded-lg'
            onClick={() => {
              downloadFile(file.fileName, 'material')
            }}
          >
            <Icon_Download margin='2' />
          </div>

          {isUserCourseTutor && (
            <div
              className='hover:bg-gray-400 hover:text-white rounded-lg'
              onClick={() => {
                // alert("borrar " + file.fileName)
                setOpenModalDelete(true)
                setFileDiff('material')
                setFileName(file.fileName)
              }}
            >
              <Icon_Trashcan margin='2' color='text-red-400' />
            </div>
          )}
        </div>
      </div>

      <ModalFileViewer
        openFileModal={openModal}
        setOpenFileModal={setOpenModal}
        fileUri={fileUri}
      />
    </>
  )
}
