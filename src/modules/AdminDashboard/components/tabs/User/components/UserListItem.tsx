// UserListItem.tsx
import React from "react";
import { List, Button } from "antd";
import { UserGet } from "../../../../../Auth/types";

interface UserListItemProps {
  user: UserGet;
  onEdit: () => void; // Define the onEdit prop
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onEdit }) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <List.Item
      className="bg-white"
      key={user.id}
      actions={[
        <Button onClick={toggleExpanded}>
          {expanded ? "Collapse" : "Expand"}
        </Button>,
        <Button onClick={onEdit}>Edit</Button>, // Call the onEdit function
      ]}
    >
      <div>ID: {user.id}</div>
      <div>Name: {user.name}</div>
      <div>Role: {user.role}</div>
      {expanded && (
        <div>
          <p>Age: {user.age}</p>
          <p>Phone Number: {user.phone_no}</p>
        </div>
      )}
    </List.Item>
  );
};

export default UserListItem;
