import { Icon_Edit } from "../../assets/Icons"

export default function ConfigInput({
  type,
  name,
  id,
  labelText,
  editedValue,
  value,
  inputState,
  handleValueChange,
  toggleEdit,
}) {
  return (
    <div className="ml-4 mt-2 w-full lg:w-1/2">
      <label htmlFor={name}>{labelText}</label>
      <div className={`${!inputState && "flex"} items-center`}>
        {inputState ? (
          <input
            type={type}
            name={name}
            id={id}
            value={editedValue}
            onChange={(e) => handleValueChange(name, e.target.value)}
            autoComplete="false"
          />
        ) : (
          <input type="text" name={name} id={id} value={value} autoComplete="false" disabled />
        )}

        {inputState && name === "userPassword" && (
          <>
            <input
              type="text"
              name={name}
              id={id}
              value={editedValue}
              onChange={(e) => handleValueChange(name, e.target.value)}
              autoComplete="false"
            />
            <input
              type="text"
              name={name}
              id={id}
              value={editedValue}
              onChange={(e) => handleValueChange(name, e.target.value)}
              autoComplete="false"
            />
          </>
        )}

        {inputState ? (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => toggleEdit(name)}
              className="w-auto h-10 p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto text-center"
            >
              Aceptar
            </button>
            <button
              onClick={() => toggleEdit(name)}
              className="w-auto h-10 p-2 rounded-md hover:bg-gray-200 hover:cursor-pointer items-center justify-center"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <span
            onClick={() => toggleEdit(name)}
            className="ml-2 w-10 h-10 p-2 rounded-md hover:bg-gray-200 hover:cursor-pointer items-center justify-center"
          >
            <Icon_Edit />
          </span>
        )}
      </div>
    </div>
  )
}
