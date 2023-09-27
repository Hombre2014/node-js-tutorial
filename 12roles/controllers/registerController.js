const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ error: 'Missing user or password' });
  // Check if user already exists
  const duplicate = usersDB.users.find(u => u.username === user);
  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // Hash password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // Add new user to DB
    const newUser = { username: user, password: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    // Save DB to file
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users)
    );
    console.log('New user added:', newUser);
    console.log('All users:', usersDB.users);
    res.status(201).json({ 'success': `New user ${user} created.` });
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
}

module.exports = { handleNewUser };
