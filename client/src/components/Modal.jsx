import { Icon_Cancel } from "../assets/Icons";

export default function Modal({ open, onClose, cancel, modalMargin, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-lg shadow p-8 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }
        max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl
        max-h-screen-sm md:max-h-screen-md lg:max-h-screen-lg xl:max-h-screen-xl
        ml-${modalMargin}`}
      >
        {cancel && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          >
            <Icon_Cancel />
          </button>
        )}

        {children}
      </div>
    </div>
  );
}
