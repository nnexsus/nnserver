import { createContext, useReducer } from "react";
import { reducer, initState } from "./states";

export const LinkContext = createContext({
    state: initState,
    dispatch: () => {}
})

export const LinkProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <LinkContext.Provider value={[state, dispatch]}>
            { children }
        </LinkContext.Provider>
    )
}