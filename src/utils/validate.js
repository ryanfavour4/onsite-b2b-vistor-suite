export const validateEmail = (email) => {
    if (!email) {
        throw new Error("Please enter email");
    }
    const regex  = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if (!email.toLowerCase().match(regex)) {
        throw new Error("Invalid Email!")
    }
}

export const validatePassword = (password) => {
    if (!password) {
        throw new Error("Please enter password");
    }
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long!")
    }
}

export const validateName = (name, nameType) => {
    if (!(name)) {
        throw new Error(`Please enter ${nameType}`);
    }
}

export const validateEmailAndPassword = (email, password) => {
    validateEmail(email)
    validatePassword(password)
}