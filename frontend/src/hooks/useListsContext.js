import { ListsContext} from '../context/ListsContext'
import {useContext} from 'react'

export const useListsContext = () => {
    const context = useContext(ListsContext)

    if(!context) {
        throw Error('useListsContext must be used inside a ListsContextProvider')
    }

    return context
}