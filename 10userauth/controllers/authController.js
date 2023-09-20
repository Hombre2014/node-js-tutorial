const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
};
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) return res.status(400).json({ error: 'Missing user or password' });

  // Check if user exists
  const foundUser = usersDB.users.find(u => u.username === user);

  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // Check if password is correct
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    // Create JWT's ...
    res.json({ 'success': `Welcome ${user}!` });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = { handleLogin };
