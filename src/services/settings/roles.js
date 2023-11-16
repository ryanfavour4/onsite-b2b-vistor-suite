import { Api } from "../../axios"
import { validateName } from "../../utils/validate"

export const addRole = async (data) => {
    validateName(data.role, 'role')
    validateName(data.role_description, 'role description')
    try {
        await Api.post("settings/role", data)
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message)
    }
}