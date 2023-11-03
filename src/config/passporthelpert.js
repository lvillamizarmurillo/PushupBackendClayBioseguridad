import { verificarToken } from "../middleware/jwt.js";
import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";

passport.use( new BearerStrategy(
    async function (token,done){
        const usuario = await verificarToken(token);
        if (!usuario) return done(null,false);
        return done(null, usuario);
    }
));

export default passport;