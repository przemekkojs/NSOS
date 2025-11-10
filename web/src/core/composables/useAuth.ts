import { authApi } from '@/api/modules/auth'
import { useMutation } from '@tanstack/vue-query'

export function useLogin() {
  return useMutation({
    mutationFn: authApi.login,
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: authApi.register,
  })
}
