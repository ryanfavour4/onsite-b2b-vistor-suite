const CloseModalBtn = ({setShowModal, setShowParentModal, onClose}) => {
  return (
        <button
          className="absolute -top-8 -right-6 border border-light bg-lightest drop-shadow-md text-darkred py-1 px-2 rounded-sm"
          onClick={() => {
            setShowModal(false)
            if(setShowParentModal){
              setShowParentModal(false)
            }
            if(onClose){
              onClose()
            }
          }}
          type="button"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
  )
}

export default CloseModalBtn