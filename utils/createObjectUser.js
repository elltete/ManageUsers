
// control de errores


const createNewUserObject = (args) => {
    return{
        firstName: args[1],
        lastName: args[2],
        email: args[3],
        password: args[4],
        isLoggedIn: false
    }
}

const createUpdateUserObject = (args) => {
    return{
        firstName: args[1],
        lastName: args[2],
        email: args[3],
        password: args[4]
    }
}

export { createNewUserObject, createUpdateUserObject }