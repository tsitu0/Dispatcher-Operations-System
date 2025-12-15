const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Simple placeholder auth; replace with real validation if needed
    return res.status(200).json({
      data: { username },
      message: 'Login successful'
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Failed to process login' });
  }
};

module.exports = { login };
