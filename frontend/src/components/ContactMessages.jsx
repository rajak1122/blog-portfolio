import React, { useState } from "react";
import { updateMessageStatus, deleteMessageLog } from "../services/api";

export default function ContactMessages({ messages, setMessages }) {
  const [updatingId, setUpdatingId] = useState(null);

  // Track which message is actively selected to view in the separate card
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Status Toggler
  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "completed" ? "pending" : "completed";
    setUpdatingId(id);
    try {
      await updateMessageStatus(id, nextStatus);
      setMessages((prev) =>
        prev.map((msg) =>
          (msg._id || msg.id) === id ? { ...msg, status: nextStatus } : msg,
        ),
      );
      // Synchronize the text if the currently viewed message's status changes
      if (
        selectedMessage &&
        (selectedMessage._id || selectedMessage.id) === id
      ) {
        setSelectedMessage((prev) => ({ ...prev, status: nextStatus }));
      }
    } catch (err) {
      alert(
        "Status update failed: " + (err.response?.data?.message || err.message),
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Deletion Sync
  const handleDeleteMessage = async (id, senderName) => {
    if (
      !window.confirm(
        `Permanently remove inquiry from ${senderName || "User"}?`,
      )
    )
      return;
    try {
      await deleteMessageLog(id);
      setMessages((prev) => prev.filter((msg) => (msg._id || msg.id) !== id));
      if (
        selectedMessage &&
        (selectedMessage._id || selectedMessage.id) === id
      ) {
        setSelectedMessage(null); // Clear reader view if currently open item is deleted
      }
    } catch (err) {
      alert("Deletion failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="space-y-8 text-black font-sans antialiased">
      {/* 1. SEPARATE MESSAGE READER CARD (Shows up when a row is clicked) */}
      {selectedMessage && (
        <div className="border border-black p-6 bg-white rounded-lg shadow-sm animate-fadeIn">
          <div className="flex justify-between items-start mb-4 pb-2 border-b border-zinc-100">
            <div>
              <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase block mb-1">
                // Reading Message Log
              </span>
              <h4 className="text-base font-semibold text-black">
                {selectedMessage.name}
              </h4>
              <span className="text-xs font-mono text-zinc-400">
                {selectedMessage.email}
              </span>
            </div>
            <button
              onClick={() => setSelectedMessage(null)}
              className="text-xs font-mono border border-zinc-200 px-2 py-1 rounded-md hover:border-black transition-colors"
            >
              [ Close Reader ]
            </button>
          </div>

          {/* Complete text area with whitespace safety wraps */}
          <div className="bg-zinc-50/50 border border-zinc-100 p-4 rounded-md text-xs text-zinc-700 leading-relaxed font-light whitespace-pre-wrap min-h-25">
            {selectedMessage.message || selectedMessage.text || "—"}
          </div>

          <div className="mt-4 flex justify-between items-center text-[10px] font-mono uppercase tracking-wider">
            <div>
              <span className="text-zinc-400 mr-2">Status:</span>
              <span
                className={
                  selectedMessage.status === "completed"
                    ? "text-zinc-400"
                    : "text-black font-bold"
                }
              >
                {selectedMessage.status || "pending"}
              </span>
            </div>
            <a
              href={`mailto:${selectedMessage.email}`}
              className="border border-black bg-black text-white px-3 py-1.5 rounded-md hover:bg-zinc-800 transition-colors"
            >
              [ Compose Mail Reply ]
            </a>
          </div>
        </div>
      )}

      {/* 2. RESTRUCTURED LOG MATRIX TABLE */}
      <div className="space-y-4">
        <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase block">
          // Communications Index Matrix ({messages?.length || 0})
        </span>

        <div className="w-full border border-zinc-200 overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/50 font-mono text-zinc-500 tracking-wide uppercase">
                <th className="p-4 font-medium">Inquiry ID</th>
                <th className="p-4 font-medium">Sender Details</th>
                <th className="p-4 font-medium">Progress Flag</th>
                <th className="p-4 font-medium text-right pr-6">Operations</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 font-light">
              {!messages || messages.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-8 text-center text-zinc-400 italic font-mono"
                  >
                    NO_USER_INQUIRIES_FOUND_IN_SYSTEM_INDEX
                  </td>
                </tr>
              ) : (
                messages.map((msg) => {
                  const currentId = msg._id || msg.id;
                  const isCompleted = msg.status === "completed";
                  const isCurrentSelection =
                    selectedMessage &&
                    (selectedMessage._id || selectedMessage.id) === currentId;

                  return (
                    <tr
                      key={currentId}
                      /* Clean trigger to activate full text mapping on row selection click events */
                      onClick={() => setSelectedMessage(msg)}
                      className={`cursor-pointer transition-colors duration-150 ${
                        isCurrentSelection
                          ? "bg-zinc-100"
                          : "hover:bg-zinc-50/50"
                      }`}
                    >
                      {/* ID Column */}
                      <td className="p-4 font-mono text-[11px] text-zinc-400 select-all">
                        {currentId}
                      </td>

                      {/* Sender Contact Meta */}
                      <td className="p-4">
                        <div className="font-medium text-black">
                          {msg.name || "Anonymous"}
                        </div>
                        <div className="text-zinc-400 text-[11px] font-mono mt-0.5">
                          {msg.email}
                        </div>
                      </td>

                      {/* Progress Badge */}
                      <td className="p-4">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide border rounded-md ${
                            isCompleted
                              ? "bg-zinc-100 text-zinc-400 border-zinc-200"
                              : "bg-black text-white border-black"
                          }`}
                        >
                          {msg.status || "pending"}
                        </span>
                      </td>

                      {/* Operations Links */}
                      <td
                        className="p-4 pr-6 text-right font-mono text-[10px] tracking-wider uppercase space-x-3 whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() =>
                            handleToggleStatus(
                              currentId,
                              msg.status || "pending",
                            )
                          }
                          disabled={updatingId === currentId}
                          className="text-zinc-500 hover:text-black transition-colors"
                        >
                          {updatingId === currentId
                            ? "[ processing... ]"
                            : isCompleted
                              ? "[ mark_pending ]"
                              : "[ mark_completed ]"}
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteMessage(currentId, msg.name)
                          }
                          className="text-red-500 hover:text-red-700 transition-colors font-medium"
                        >
                          [ delete ]
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
