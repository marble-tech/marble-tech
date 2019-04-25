import * as joi from 'joi';

export function validateUser(user: any) {
  const schema = joi.object({
    f_name: joi.string().min(3).required().label("First Name"),
    l_name: joi.string().min(3).required().label("Last Name"),
    email: joi.string().email().required().label("Email"),
    username: joi.string().alphanum().min(6).max(11).required().label("Username"),
    password: joi.string().min(6).max(12).required().label("Password"),
    confirmPassword: joi.string().required().valid(joi.ref('password')).label("Confirm Password").options({
      language: {
        any: {
          allowOnly: '!! "Password" and "Confirm Password" do not match',
        }
      } 
    })

    // The strip unknown options removes unknown elements from 
    // objects and arrays, blocking their inclusion in the database 
  }).options({ stripUnknown: true });

  return joi.validate(user, schema);
}
export function validateUserEdit(user: any) {
  const schema = joi.object({
    f_name: joi.string().min(3).required().label("First Name"),
    l_name: joi.string().min(3).required().label("Last Name"),

    username: joi.string().min(6).max(11).required().label("Username"),
    email: joi.string().email().required().label("Email"),
    password: joi.string().min(6).max(12).required().label("Password"),
    confirmPassword: joi.string().required().valid(joi.ref('password')).label("Confirm Password").options({
      language: {
        any: {
          allowOnly: '!! "Password" and "Confirm Password" do not match',
        }
      } 
    })

    // The strip unknown options removes unknown elements from 
    // objects and arrays, blocking their inclusion in the database 
  }).options({ stripUnknown: true });

  return joi.validate(user, schema);
}

export function validateLogin(info: any) {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.string().min(6).max(12).required().label("Password"),
  }).options({ stripUnknown: true });

  return joi.validate(info, schema);
}
