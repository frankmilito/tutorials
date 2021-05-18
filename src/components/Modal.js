import React, { useEffect } from 'react'

function Modal({ modal, closeModal }) {
    useEffect(() => {
        setTimeout(() => {
            closeModal()
        }, 1000);
    })
    return (
        <div>
            <h1>{modal}</h1>
        </div>
    )
}

export default Modal
