import React, { useState } from "react";
import { List, Button, Modal } from "antd";
import { useGetUsersQuery } from "../../../../Auth/api";
import { UserGet } from "../../../../Auth/types";
import EditUser from "./components/EditUser";

const UserList = () => {
  const { data: demoUsers, isLoading } = useGetUsersQuery();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [editId, setEditId] = useState<number>(1);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  // console.log({user});

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleEdit = (id:number) => {
    // Implement your edit logic here
    console.log("Editing user:");
    setEditId(id)
    showModal();
  };
  return (
    <div>
      {demoUsers && (
        <List
          itemLayout="vertical"
          dataSource={demoUsers}
          renderItem={(user: UserGet) => (
            <List.Item
              className="bg-white"
              key={user.id}
              actions={[
                <Button onClick={toggleExpanded}>
                  {expanded ? "Collapse" : "Expand"}
                </Button>,
                <Button
                  onClick={() => {
                    handleEdit(user.id);
                  }}
                >
                  Edit
                </Button>,
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
          )}
        />
      )}
      <Modal
        title="Edit Movie"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        // className="bg-gray-800 text-white"
        style={{ backgroundColor: "#333" }}
      >
        <div>
          {/* {isCreateMode && <Create />}
        {isShowMode && <Edit editId={editId} />} */}
          <EditUser editId={editId} />
        </div>
      </Modal>
    </div>
  );
};
// Define the User interface

// Define the UserListItem component
// const UserListItem: React.FC<{ user: UserGet }> = ({ user }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const [modalText, setModalText] = useState('Content of the modal');

//   const showModal = () => {
//     setOpen(true);
//   };

//   const handleOk = () => {
//     setModalText('The modal will be closed after two seconds');
//     setConfirmLoading(true);
//     setTimeout(() => {
//       setOpen(false);
//       setConfirmLoading(false);
//     }, 2000);
//   };

//   const handleCancel = () => {
//     console.log('Clicked cancel button');
//     setOpen(false);
//   };

//   console.log({user});

//   const toggleExpanded = () => {
//     setExpanded(!expanded);
//   };

//   const handleEdit = () => {
//     // Implement your edit logic here
//     console.log("Editing user:", user);
//   };

//   return (
//     <List.Item
//     className="bg-white"
//       key={user.id}
//       actions={[
//         <Button onClick={toggleExpanded}>
//           {expanded ? "Collapse" : "Expand"}
//         </Button>,
//         <Button onClick={()=>{handleEdit();}}>Edit</Button>,
//       ]}
//     >
//       <div>ID: {user.id}</div>
//       <div>Name: {user.name}</div>
//       <div>Role: {user.role}</div>
//       {expanded && (
//         <div>
//           <p>Age: {user.age}</p>
//           <p>Phone Number: {user.phone_no}</p>
//         </div>
//       )}
//     </List.Item>
//   );
// };

// Define the UserList component

// Export the UserList component
export default UserList;
