"use client";

import { useState, useMemo } from "react";
import { Mail } from "lucide-react";
import SearchBar from "../SearchBar";
import MessageModal from "@/components/admin/MessageModal";
import toast from "react-hot-toast";

export default function GuestsTable({ users }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-700">Customers</h2>
        <div className="px-4 py-1 text-sm text-gray-900 font-bold mx-auto rounded-xl bg-amber-200">
          Registered Customers: {users.length}
        </div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search Name or Email"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Gender</th>
              <th className="px-4 py-3 text-left">Nationality</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Verified</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-700">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, i) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.phone || "-"}</td>
                  <td className="px-4 py-3 capitalize">{user.gender || "-"}</td>
                  <td className="px-4 py-3">{user.nationality || "-"}</td>
                  <td className="px-4 py-3">{user.address || "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.isEmailVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isEmailVerified ? "Verified" : "Not Verified"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600"
                      title="Send Message"
                      onClick={() => handleSendMessage(user)}
                    >
                      <Mail size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center px-4 py-8 text-gray-500 italic"
                >
                  No guests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <MessageModal
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        user={selectedUser}
        onSend={handleSend}
      />
    </div>
  );

  function handleSendMessage(user) {
    setSelectedUser(user);
    setIsMessageOpen(true);
  }
  async function handleSend({ email, name, message }) {
    try {
      const res = await fetch("/api/admin/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, message }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      // Optionally show a toast:
      toast.success("Message sent successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error sending message");
    }
  }
}
