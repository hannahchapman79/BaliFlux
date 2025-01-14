const { insertUser, attemptLogin, selectUsers, selectUserByUsername, removeUserById } = require("../models/users.model")

exports.postUser = (request, response, next) => {
  const user = request.body;
  insertUser(user)
    .then((newUser) => {
      const userResponse = {
        user_id: newUser.user_id,
        username: newUser.username,
        email: newUser.email,
      };
      response.status(201).send({ user: userResponse });
    })
    .catch(next);
};

exports.getUsers = (request, response, next) => {
  selectUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch(next);
};

exports.getUserByUsername = (request, response, next) => {
  const { username } = request.params;

  selectUserByUsername(username)
    .then((user) => {
      if (!user) {
        return response.status(404).send({ message: "User not found" });
      }
      response.status(200).send({ user });
    })
    .catch(next);
};

exports.deleteUserById = (request, response, next) => {
  const { user_id } = request.params;
  removeUserById(user_id)
    .then(() => {
      response.status(200).send({ message: "User successfully deleted" });
    })
    .catch((error) => {
      next(error);
    })
}

exports.postLoginAttempt = (request, response, next) => {
  const loginAttempt = request.body;
  attemptLogin(loginAttempt)
    .then((userResponse) => {
      response.send(userResponse);
    })
    .catch(next);
}