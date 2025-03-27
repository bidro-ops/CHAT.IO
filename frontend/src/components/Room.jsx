import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

import { Input, Button, Select, Option, Label } from "lucid-react";

const CreateRoom = () => {
  const { authUser } = useAuthStore();  // Get logged-in user
  const [roomName, setRoomName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const users = [
    { _id: "67d602e28164114afd3b92e3", username: "helol dddd" },
    
];

  const handleCreateRoom = async () => {
    if (!roomName || selectedMembers.length === 0) {
      alert("Room name and members are required!");
      return;
    }

    try {
      const response = await axios.post(
        "/api/rooms", // Adjust the URL as needed
        { roomName, members: selectedMembers },
        { headers: { Authorization: `Bearer ${authUser.token}` } } // Pass token for authentication
      );
      console.log("Room created:", response.data);
      // Redirect or update the UI as needed
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Failed to create room");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-4">Create a Room</h3>

      {/* Room Name */}
      <div className="mb-4">
        <Label htmlFor="roomName">Room Name</Label>
        <Input
          id="roomName"
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="mt-2 w-full"
          placeholder="Enter room name"
        />
      </div>

      {/* Invite Members */}
      <div className="mb-4">
        <Label htmlFor="members">Invite Members</Label>
        <Select
          id="members"
          multiple
          value={selectedMembers}
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
            setSelectedMembers(selectedOptions);
          }}
          className="mt-2 w-full"
        >
          {users.map((user) => (
            <Option key={user._id} value={user._id}>
              {user.username}
            </Option>
          ))}
        </Select>
      </div>

      {/* Create Room Button */}
      <Button
        onClick={handleCreateRoom}
        color="primary"
        className="mt-4 w-full"
      >
        Create Room
      </Button>
    </div>
  );
};

export default CreateRoom;
