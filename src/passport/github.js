import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import UserManagerMongoose from "../daos/mongoose/userDao.js";

const userDao = new UserManagerMongoose()

const strategyOptions = {
    clientID: 'Iv1.803152a336769511',
    clientSecret: 'f218193180f60487647300f6324ee9aa9789eb1a',
    callbackURL: 'http://localhost:8080/users/profileGithub'
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) =>{
    console.log(profile);
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
    const user = await userDao.getByEmail(email);
    if(user) return done(null, user);
    const newUser = await userDao.createUser({
        firstName: profile._json.name.split(' ')[0],
        lastName: profile._json.name.split(' ')[1],
        email,
        age: 0,
        password: '',
        role: email != 'adminCoder@coder.com' ? 'user' : 'admin',
    });
    return done(null, newUser);
}

passport.use('githubPassport', new GithubStrategy(strategyOptions, registerOrLogin));