import passport from 'passport';
import LocalStrategy from 'passport-local';

import bcrypt from './bcrypt';
import {User} from '../models';
import {AuthError} from './errors';

function passwordAuth(username, password, done) {

  User
    .findOne({
      where: {email: username},
      attributes: {exclude: []},
    })
    .tap(user => { if (!user) throw new AuthError(); })
    .tap(user => bcrypt.verify(password, user.password))
    .then(user => done(null, user))
    .catch(AuthError, err => done(null, false, err))
    .catch(err => done(err));
}

passport.use(new LocalStrategy(passwordAuth));

export default passport.authenticate('local', {session: false});
