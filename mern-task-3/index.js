const mongoose = require('mongoose');

// Step 1: Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mern_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Connection error:', err));

// Step 2: Define Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  role: String
});

const User = mongoose.model('User', userSchema);

// Step 3: CRUD Operations as Functions

// Create users
async function createUsers() {
  await User.insertMany([
    { name: 'John Doe', email: 'john@example.com', age: 30, role: 'admin' },
    { name: 'Jane Smith', email: 'jane@example.com', age: 28, role: 'user' },
    { name: 'Robert Fox', email: 'robert@example.com', age: 45, role: 'editor' },
    { name: 'Emily Clark', email: 'emily@example.com', age: 35, role: 'viewer' }
  ]);
  console.log('✅ Users created');
}

// Read users
async function getAllUsers() {
  const users = await User.find();
  console.log('📄 All Users:', users);
}

// Update one user
async function updateUserRole() {
  await User.updateOne({ email: 'jane@example.com' }, { $set: { role: 'admin' } });
  console.log('✏️ Updated Jane\'s role to admin');
}

// Delete one user
async function deleteUser() {
  await User.deleteOne({ name: 'Robert Fox' });
  console.log('🗑️ Deleted Robert Fox');
}

// Main Runner
async function run() {
  await createUsers();
  await getAllUsers();
  await updateUserRole();
  await getAllUsers();
  await deleteUser();
  await getAllUsers();
  mongoose.connection.close(); // Cleanly close connection
}

run();
