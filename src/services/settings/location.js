import { Api } from "../../axios"
import { validateName } from "../../utils/validate"

export const createBranch = async (data) => {
    validateName(data.branch_name, 'branch name')
    validateName(data.branch_admin, 'branch admin')
    validateName(data.country, 'country')
    validateName(data.address, 'address')
    // validateName(data.branch_code, 'branch code')

    console.log(data, 'dataaaaa')

    // return

    try {
        const res = await Api.post("settings/branch", data)
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message)
    }
}
