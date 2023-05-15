import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EditUserInRole(props) {
  const [users, setUsers] = useState([]);
  const [roleId, setRoleId] = useState(props.match.params.roleId);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:5000/api/admin/edituserinrole/${roleId}`);
      setUsers(result.data);
    };
    fetchData();
  }, [roleId]);

  const handleCheckboxChange = (event, index) => {
    const newUsers = [...users];
    newUsers[index].isSelected = event.target.checked;
    setUsers(newUsers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await axios.post(`http://localhost:5000/api/admin/edituserinrole/${roleId}`, users);
    if (result.data.success) {
      props.history.push('http://localhost:5000/api/admin/roles');
    }
  };

  return (
    <div>
      <h1>Edit Users in Role</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>User Id</th>
              <th>User Name</th>
              <th>Is Selected</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.Id}</td>
                <td>{user.Username}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={user.isSelected}
                    onChange={(event) => handleCheckboxChange(event, index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditUserInRole;
