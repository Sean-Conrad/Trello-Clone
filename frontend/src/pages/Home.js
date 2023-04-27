import {useState, useEffect} from 'react'
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"


//components
import Lists from '../components/Lists'
import AddListForm from '../components/AddListForm'

const Home = () => {
    const [lists, setLists] = useState(null) //local state

    useEffect(() => {
        const fetchLists = async () => {
            const response = await fetch('/api/lists')
            const json = await response.json() //data needs to become parsed as an array of objects

            if(response.ok){
                setLists(json)
            }
        }

        fetchLists()
    }, [])

    const handleDragDrop = (results) => {
        const {source, destination, type} = results;
        console.log(source, destination)

        if(!destination) return;

        if(destination.droppableId === source.droppableId && source.index === destination.index) return;

        if(type === 'group'){
            const reorderdedLists = [...lists];
            const sourceIndex = source.index;
            const destinationIndex = destination.index;

            const [removedList] = reorderdedLists.splice(sourceIndex, 1)
            reorderdedLists.splice(destinationIndex, 0, removedList);
            return setLists(reorderdedLists)
        }

        const listSourceIndex = lists.findIndex(
            (list) => list._id === source.droppableId
        )
        const listDestinationIndex = lists.findIndex(
            (list) => list._id === destination.droppableId
        )

        //removing specific item from one array
        const newSourceTasks = [...lists[listSourceIndex].tasks]
        const newDestinationTasks = 
            source.droppableId !== destination.droppableId
            ? [...lists[listDestinationIndex].tasks] 
            : newSourceTasks;
        
        //adding item to another array
            const [deletedTask] = newSourceTasks.splice(source.index, 1)
            newDestinationTasks.splice(destination.index, 0, deletedTask)

            const newLists = [...lists]
        
        //reformating arrays
            newLists[listSourceIndex] = {
                ...lists[listSourceIndex],
                tasks: newSourceTasks
            }
            newLists[listDestinationIndex] = {
                ...lists[listDestinationIndex],
                tasks: newDestinationTasks
            }

            setLists(newLists)

            const updateDatabase = async () => {
                await fetch(`api/lists/${source.droppableId}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newLists[listSourceIndex]),
                });
                await fetch(`api/lists/${destination.droppableId}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newLists[listDestinationIndex]),
                });
              };
              updateDatabase();
    };

    return (
        <div className="home">
            <h1>WELCOME</h1>
            <AddListForm />
                <DragDropContext onDragEnd={handleDragDrop}>
                <div>
                    <Droppable 
                        direction="horizontal"
                        droppableId="ROOT" 
                        type="group"
                    >
                        {(provided) => (
                            <div className="list-container " {...provided.droppableProps} ref={provided.innerRef}>
                                {lists && lists.map((list, index) => (
                                    <Draggable 
                                        
                                        draggableId={list._id} 
                                        key={list._id} 
                                        index={index}
                                    >
                                        {(provided) => (
                                                <div 
                                                    className="list col-md-2"
                                                    {...provided.dragHandleProps} 
                                                    {...provided.draggableProps} 
                                                    ref={provided.innerRef}
                                                >
                                                    <h2><Lists key={list._id} list={list}/></h2>
                                                </div>  
                                        )}
                                    </Draggable>                    
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                </DragDropContext>
        </div>
    )
}



export default Home