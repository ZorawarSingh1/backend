import {PermissionError} from '../lib/errors';

const validators = {
  'user.self': function() {
    // user.self must "enabled" by overriding this validator
    return false;
  },
};

const roles = {
  user: [
    'user.self',
  ],
  admin: [
    'user.list',
    'user.get',
    'user.modify',
    'user.delete',
  ],
};

/**
 *
 * @param {external:Express~Request} req - express request object
 * @param {String[]} requiredPermissions -
 * @param {Object}  overrides -
 * @return {Boolean}
 */
export function checker(req, requiredPermissions, overrides = {}) {

  const role = req.role;
  const permissions = roles[role];

  return requiredPermissions.some(function(permission) {

    if (permission in overrides) {
      return overrides[permission](req);
    } else if (permission in validators) {
      return validators[permission](req);
    } else {
      return permissions.includes(permission);
    }

  });

}

/**
 *
 * @param {String[]} requiredPermissions -
 * @param {Object} overrides -
 */
export function middleware(requiredPermissions, overrides = {}) {

  return function(req, res, next) {
    const matched = checker(req, requiredPermissions, overrides);

    if (matched) {
      return next();
    } else {
      return next(new PermissionError());
    }
  };
}

export default {checker, middleware};
