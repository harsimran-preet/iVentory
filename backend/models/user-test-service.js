const User = require("./user");

const saveUser = (username, email, password, name) => {
  const user = new User({
    username: username,
    email: email,
    password: password,
    name: name,
  });
  return user.save();
};

exports.saveUser = saveUser;
