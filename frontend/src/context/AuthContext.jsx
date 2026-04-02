import React, { createContext, useContext, useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const AuthContext = createContext()

const api = axios.create({ baseURL: '/api' })

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const queryClient = useQueryClient()

  api.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await api.post('/auth/login', { username: email, password })
      return res.data
    },
    onSuccess: (data) => {
      setToken(data.access_token)
      localStorage.setItem('token', data.access_token)
    }
  })

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await api.post('/auth/register', userData)
      return res.data
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    queryClient.clear()
  }

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get('/auth/me').then(res => res.data),
    enabled: !!token,
  })

  return (
    <AuthContext.Provider value={{
      user,
      login: loginMutation.mutateAsync,
      loginLoading: loginMutation.isPending,
      register: registerMutation.mutateAsync,
      logout,
      token,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

