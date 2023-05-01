import {useListsContext} from '../hooks/useListsContext'

const Task = ({list, task}) => {
    const {lists, dispatch} = useListsContext()

    const handleClick = async () => {

        const data = {
            taskId : task._id
        }

        const response = await fetch(`/api/lists/${list._id}/task`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        const json = await response.json()
        if(response.ok){
            //dispatch({type: 'DELETE_TASK', payload:json})
            console.log("Delete was ok")
        }
    }
    
    return(
        <div className="card-container">
                <p className="card-text">{task.name}</p>
                <span onClick={handleClick}><i class="fa-solid fa-trash icon"></i></span>
        </div>

    )}



export default Task