import axios from "axios"
import Modal from "../Modal"
import { useState } from "react"

export default function ModalCourseCalification({
  openCalificationModal,
  setOpenCalificationModal,
  setProgressCalificationId,
  progressCalificationId,
  setStudentCalificationId,
  studentCalificationId,
  courseId,
  setToastCalificationSuccessfull,
  setToastCalificationError,
}) {
  const [calification, setCalification] = useState(0)
  const [calificationComment, setCalificationComment] = useState("")

  async function handleCalification(ev) {
    ev.preventDefault()

    try {
      const endpoint = `/student/course/calificate/${courseId}/${studentCalificationId}/${progressCalificationId}`

      const data = {
        progressScore: calification,
        progressComment: calificationComment,
      }

      await axios.patch(endpoint, data)

      setToastCalificationSuccessfull(true)
      sessionStorage.setItem("showcalifsuccessmsg", "1")

      setCalification(0)
      setCalificationComment("")
      setOpenCalificationModal(false)
    } catch (error) {
      sessionStorage.setItem("showcaliferrormsg", "1")
      setToastCalificationError(true)
      console.error("Error en la calificacion: ", error)
    }
  }

  return (
    <Modal
      open={openCalificationModal}
      onClose={() => {
        setOpenCalificationModal(false)
        setProgressCalificationId("")
        setStudentCalificationId("")
      }}
      cancel={true}
    >
      <div className="flex flex-col items-center justify-center text-center h-full">
        <h3 className="mt-5 font-bold text-xl">Calificando</h3>
      </div>

      <form onSubmit={handleCalification}>
        <label className="text-lg" htmlFor="calification">
          Calificación:
        </label>
        <input
          type="number"
          id="calification"
          className="w-full mt-2 rounded-md border-2 border-gray-300"
          placeholder="1 - 5.5 -  7"
          min={1}
          max={7}
          value={calification}
          onChange={(ev) => setCalification(ev.target.value)}
        />

        <label className="text-lg" htmlFor="calification">
          Comentarios:
        </label>
        <textarea
          className="border-gray-300 resize-none"
          name="calification"
          id="calification"
          cols="45"
          rows="10"
          placeholder="Buen trabajo | Puedes mejorar en... | etc... "
          value={calificationComment}
          onChange={(ev) => setCalificationComment(ev.target.value)}
        ></textarea>

        <div className="flex items-center justify-center gap-4">
          <button
            type="submit"
            className="border rounded-md bg-blue-300 hover:bg-blue-400 px-4 py-2"
          >
            Enviar
          </button>
          <button
            type="button"
            className="rounded-md  hover:bg-gray-200 px-4 py-2"
            onClick={() => {
              setOpenCalificationModal(false)
              setProgressCalificationId("")
              setStudentCalificationId("")
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  )
}
