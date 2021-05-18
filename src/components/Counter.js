import React, { useState, useReducer, useEffect } from 'react'
import { data } from './data'
import Modal from './Modal'

// Reducer function
const initialState = {
    people: [],
    isModal: false,
    modalContent: ''
}
const reducer = (state, action) => {
    const newPerson = [...state.people, action.payload]
    if (action.type === 'ITEM_ADDED') {
        return { ...state, isModal: true, modalContent: 'Item Added', people: newPerson }
    }
    if (action.type === 'EMPTY_ENTRY') {
        return { ...state, isModal: true, modalContent: 'Enter a value' }
    }
    if (action.type === 'CLOSE_MODAL') {
        return { ...state, isModal: false }
    }
    if (action.type === 'DELETE_ITEM') {
        const newPeople = state.people.filter(person => person.id !== action.payload)
        return { ...state, people: newPeople, isModal: true, modalContent: 'Item Removed' }
    }
    throw new Error('no matching action type')
}
function Counter() {
    const [name, setName] = useState('')
    const [state, dispatch] = useReducer(reducer, initialState)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (name) {
            const newItem = { id: new Date().getTime().toString(), name };
            dispatch({ type: "ITEM_ADDED", payload: newItem });
            setName('')
        } else {
            dispatch({ type: 'EMPTY_ENTRY' })
        }
    }

    const closeModal = () => {
        dispatch({ type: 'CLOSE_MODAL' })
    }

    return (
        <>
            {state.isModal && <Modal closeModal={closeModal} modal={state.modalContent} />}
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button className='btn btn-primary' type='submit'>Add</button>
            </form>
            <div>
                {state.people.map(person => {
                    return (
                        <div className='container w-100 d-flex justify-content-between' key={person.id}>
                            <h1>{person.name}</h1>
                            <button onClick={() => dispatch({ type: 'DELETE_ITEM', payload: person.id })} className="btn btn-danger">remove</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default Counter
