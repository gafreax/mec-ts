import { createContext, useState } from "react"
import { User, UserContext } from "../types/User.types"

interface Props {
    children: JSX.Element
}

const initalUser: User = {
    username: 'guest',
    logged: false
}

export const CurrentUserContext = createContext<UserContext>({})

function BaseContext({children}: Props) {
    const [user, setUser] = useState<User>(initalUser)
    
    return <CurrentUserContext.Provider value={{ user, setUser }}>
        {children}
    </CurrentUserContext.Provider>
}

export default BaseContext