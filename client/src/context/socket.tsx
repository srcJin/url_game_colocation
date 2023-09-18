// SocketProvider.js
import React, {useState, useEffect, createContext, useContext, JSX} from 'react'
import {io, Socket} from 'socket.io-client'
import { SOCKET_URL } from '../config'

type SocketContextType = {
  socket: Socket | null;
  connectSocket: () => void;
}

type SocketProviderProps = {
  children: JSX.Element
}

export const SocketContext = createContext<SocketContextType | null>(null)

export const SocketProvider = ({children}: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  const connectSocket = () => {
    if(!socket) {
      const newSocket: Socket = io(SOCKET_URL)
      setSocket(newSocket)
    }
  }

  return (
    <SocketContext.Provider value={{socket, connectSocket}}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)