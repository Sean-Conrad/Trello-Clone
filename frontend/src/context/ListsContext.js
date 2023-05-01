import { createContext, useReducer} from 'react'

export const ListsContext = createContext()

export const listsReducer = (state, action) => {
    switch(action.type){
        case 'SET_LISTS':
            return{
                lists: action.payload
            }
        case 'CREATE_LISTS':
            return{
                lists: [action.payload, ...state.lists]
            }
        case 'DELETE_LIST':
            return{
                lists: state.lists.filter((l)=> l._id !== action.payload._id)
            }
        case 'ADD_TASK':
            const newListWithAddedTask = state.lists.map(list => {
                if(list._id === action.payload.listId){
                    return {
                        ...list,
                        tasks: [...list.tasks, action.payload.taskName]
                    }
                }
                return list
            })
            return {
                ...state,
                lists: newListWithAddedTask
            }
        case 'DELETE_TASK':
            return{
                //TODO


            }
        default:
            return state
    }
}

export const ListsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(listsReducer, {
        lists: null
    })

    return(
        <ListsContext.Provider value={{...state, dispatch}}>
            {children}
        </ListsContext.Provider>
    )
}