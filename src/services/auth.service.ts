import api from "@/constant/api"
import type { ILoginPayload, IRegisterPayload } from "@/types"
import { API_ENDPOINTS } from "@/constant/api"

export const login = async <T>(payload: ILoginPayload): Promise<T> => {
    const response = await api.post(API_ENDPOINTS.LOGIN, payload)
    return response.data
}

export const register = async <T>(payload: IRegisterPayload): Promise<T> => {
    const response = await api.post(API_ENDPOINTS.REGISTER, payload)
    return response.data
}