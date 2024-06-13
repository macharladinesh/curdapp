import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = () => {
    if (newUser.name && newUser.email) {
      const id = users.length ? users[users.length - 1].id + 1 : 1;
      setUsers([...users, { id, ...newUser }]);
      setNewUser({ name: '', email: '' });
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const startEditing = (user) => {
    setEditingUser(user);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const updateUser = () => {
    if (editingUser.name && editingUser.email) {
      setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
      setEditingUser(null);
    }
  };

  return (
    <div className="App container">
      <h1 className="mt-4">CRUD App</h1>
      <div className="mb-4">
        <input
          className="form-control mb-2"
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange}
        />
        <input
          className="form-control mb-2"
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={addUser}>Add User</button>
      </div>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            {user.name} ({user.email})
            <div>
              <button className="btn btn-danger btn-sm mr-2" onClick={() => deleteUser(user.id)}>Delete</button>
              <button className="btn btn-secondary btn-sm" onClick={() => startEditing(user)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
      {editingUser && (
        <div className="mt-4">
          <h2>Edit User</h2>
          <input
            className="form-control mb-2"
            type="text"
            name="name"
            placeholder="Name"
            value={editingUser.name}
            onChange={handleEditInputChange}
          />
          <input
            className="form-control mb-2"
            type="email"
            name="email"
            placeholder="Email"
            value={editingUser.email}
            onChange={handleEditInputChange}
          />
          <button className="btn btn-primary mr-2" onClick={updateUser}>Update User</button>
          <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
