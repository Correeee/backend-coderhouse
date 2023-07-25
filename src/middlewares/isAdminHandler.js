export const isAdminHandler = async (role, req, res, next) => {

    if (role == 'admin') {
        console.log('Es admin')
    } else {
        console.log('No estás a')
    }
}