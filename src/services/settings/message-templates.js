import { Api } from "../../axios"
import { validateName } from "../../utils/validate"

export const createCheckInMessageTemplate = async (data) => {
    validateName(data.purposes, 'purpose of visit')
    validateName(data.check_in_subject, 'check in subject')
    validateName(data.check_in_message, 'check in message')
    // validateName(data.check_in_attachment, 'check in attachment')

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
    })
    for (const pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }


    try {
        await Api.post("settings/purpose-message/checkin", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    } catch (error) {
        throw new Error(error.response?.data || error.response?.message || error?.response || error?.message || error)
    }
}

export const createCheckOutMessageTemplate = async (data) => {
    validateName(data.purposes, 'purpose of visit')
    validateName(data.check_out_subject, 'check out subject')
    validateName(data.check_out_message, 'check out message')
    // validateName(data.check_out_attachment, 'check out attachment')

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
    })
    for (const pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }


    try {
        await Api.post("settings/purpose-message/checkout", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    } catch (error) {
        throw new Error(error.response?.data || error.response?.message || error?.response || error?.message || error)
    }
}
