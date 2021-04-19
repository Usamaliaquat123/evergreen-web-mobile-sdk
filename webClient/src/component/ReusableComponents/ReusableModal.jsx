import React from 'react';

import Modal from 'react-modal';

export default function ReusableModal({
  ModalContent,
  modalTitle,
  ModalToggler,
  setModalToggler
}) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const afterOpenModal=()=>{
      console.log("open")
  }

  const closeModal=()=>{
    console.log("close")
    setModalToggler(false)
}
  Modal.setAppElement('#root');
  return (
      <Modal isOpen={ModalToggler} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel={modalTitle} className="">
     <div className="card ">
        <div className="text-center card-header">
            {modalTitle}
        </div>
        <div className="card-body ">
        {ModalContent}
        </div>
        <div className="card-footer">
        <form>
      <button type="submit" className="float-left btn btn-sm btn-success">Submit</button>
      <button type="button" onClick={closeModal} className="float-right btn btn-sm btn-danger">Close</button>
      </form>
        </div>
   
     </div>
     
    </Modal>
 
   
  );
}
