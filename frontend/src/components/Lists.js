
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"

const Lists = ({list}) => {
    
    return(
        <Droppable droppableId={list._id}>
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
                <p>{list.title}</p>
                <ul>
                    {list.tasks.map((task, index)=> (
                        <Draggable draggableId={task._id} index={index} key={task._id}>
                            {(provided) => (
                                <li className="card" key={task._id} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                    <p>{task.name}</p>
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