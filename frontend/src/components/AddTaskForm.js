import {useState} from 'react'
import {useListsContext} from '../hooks/useListsContext'

const AddTaskForm = ({list}) => {
    const {lists, dispatch} = useListsContext()
    const [name, setName] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            taskName : name,
            listId : list._id
        }
        const response = await fetch(`/api/lists/${list._id}/task`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),

        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            dispatch({type: 'ADD_TASK', payload:data})
            setError(null)
            setName('')
            console.log('new task added')
        }
    }

    return(
        <form className='create' onSubmit={handleSubmit}>
            <label>Task Name:</label>
            <input 
                className="input"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <button >Add</button>
        </form>
    )
}

export default AddTaskForm