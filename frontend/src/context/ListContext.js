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
        default:
            return state
    }
}

export const ListsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(listsReducer, {
        lists: null
    })

    return(
        <ListsContextProvider value={{...state, dispatch}}>
            {children}
        </ListsContextProvider>
    )
}