import bcrypt from 'bcrypt'

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const passwordValidator = (password, hashPassword) => bcrypt.compareSync(password, hashPassword)