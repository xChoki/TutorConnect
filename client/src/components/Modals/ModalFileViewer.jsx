import FilesViewer from "../Files/FilesViewer"
import Modal from "../Modal"

export default function ModalFileViewer({ openFileModal, setOpenFileModal, fileUri }) {
  return (
    <Modal
      open={openFileModal}
      onClose={() => {
        setOpenFileModal(false)
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
  )
}
