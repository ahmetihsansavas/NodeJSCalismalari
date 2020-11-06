const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport) {
    const authenticateUser = (email,password,done)=>{
        const user = getUsserByEmail(email)
        if (user == null) {
            return done(null,false,{message:'Kullanıcı Bulunamadi'})
        }
        try {
            if (await bcrypt.compare(password , user.password)) {
                
            }
            else{
                return done(null,false ,{message: 'sifre yanlis'})
            }
        } catch (error) {
            return done(error);
        }
    }
    passport.use(new LocalStrategy({usernameField:'email'}),
    authenticateUser)
    passport.serializer((user,done)=>{})
    passport.deserializer((user,done)=>{})

}
module.exports = initialize