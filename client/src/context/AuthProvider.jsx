import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!auth) {
      axios.get("/profile").then(({ data }) => {
        setAuth(data)
        setReady(true)
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth, ready }}>
      {children}
    </AuthContext.Provider>
  )
}
