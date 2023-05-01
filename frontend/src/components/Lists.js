
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
import Task from "./Task"
import AddTaskForm from '../components/AddTaskForm'
import {useListsContext} from '../hooks/useListsContext'

const Lists = ({list}) => {
    const {lists, dispatch} = useListsContext()
    
    const handleClick = async () => {
        
        const response = await fetch(`/api/lists/${list._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
              },
        })
        const json = await response.json()
        if(response.ok){
            console.log("Delete was ok")
            dispatch({type: 'DELETE_LIST', payload:json})
        }
    }
    
    return(
        <Droppable droppableId={list._id}>
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
            <span onClick={handleClick} ><i class="fa-solid fa-trash icon"></i></span>
                <p>{list.title}</p>
                
                <AddTaskForm list={list} className="task-form" />
                <ul>
                    {list.tasks.map((task, index)=> (
                        <Draggable draggableId={task._id} index={index} key={task._id} isDragDisabled={task.content === 'Unassigned'}>
                            {(provided) => (
                                <li className="card task-item" key={task._id} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                    
                                    <Task list={list} task={task} isDragDisabled={true}/>
                                </li>
                            )}
                        </Draggable>

                    ))}
                    {provided.placeholder}
                </ul>
                
            </div>
        )}
        </Droppable>
    )
}

export default Lists