export default class UserResponse{
    constructor(user){
        this.firstName = user.firstName
        this.lastName = user.lastName 
        this.email = user.email 
        this.age = user.age
        this.role = user.role,
        this.premium = user.premium 
    }
}