import { createContext } from "react"
import { User } from "../types/User.types"

interface Props {
    children: JSX.Element
}

const UserContext = createContext<User | undefined>(undefined)

function BaseContext({children}: Props) {
    return <UserContext.Provider value={undefined}>
        {children}
    </UserContext.Provider>
}

export default BaseContext