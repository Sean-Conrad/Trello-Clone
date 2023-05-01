import {useState} from 'react'
import {useListsContext} from '../hooks/useListsContext'

const AddListForm = () => {
    const {lists, dispatch} = useListsContext()
    const [title, setTitle] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const tasks = []
        const list = {title, tasks}
        const response = await fetch('/api/lists', {
            method: 'POST',
            body: JSON.stringify(list),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            dispatch({type: 'CREATE_LISTS', payload:json})
            setError(null)
            setTitle('')
            console.log('new list added')
        }
    }

    return(
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a New List</h3>
            <label>List Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <button >Add</button>
        </form>
    )
}

export default AddListForm