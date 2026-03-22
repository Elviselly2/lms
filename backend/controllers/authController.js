const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let users = []; // temporary storage

// REGISTER
exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now(),
    email,
    password: hashedPassword,
    role: role || "learner",
  };

  users.push(user);

  res.json({ message: "User registered successfully" });
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    "secretkey",
    { expiresIn: "1h" }
  );

  res.json({ token });
};