import React, { useState } from 'react';
import { createNewAdminUser, revokeAdminAccess } from '../services/api';

export default function AdminManagement({ admins, setAdmins }) {
  const [targetUid, setTargetUid] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Function 1: Grant Administrative Permissions via Firebase UID
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!targetUid.trim()) return;

    setSubmitting(true);
    try {
      const createdUser = await createNewAdminUser(targetUid.trim());
      setAdmins((prev) => [...prev, createdUser]);
      setTargetUid("");
      alert("Administrative parameters registered successfully.");
    } catch (err) {
      alert("System registration failure: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  // Function 2: Revoke Administrative Access with Secure User Confirmation
  const handleRevokeAccess = async (id, name, email) => {
    const confirmation = window.confirm(
      `CRITICAL ACTION:\nAre you sure you want to revoke administrative permissions for ${name || 'User'} (${email || 'No Email'})?`
    );
    if (!confirmation) return;

    try {
      await revokeAdminAccess(id);
      setAdmins((prev) =>
        prev.map((admin) =>
          (admin._id || admin.id) === id ? { ...admin, status: "revoked" } : admin
        )
      );
      alert("System configuration modified: Access revoked.");
    } catch (err) {
      alert("Access manipulation failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="space-y-12 text-black font-sans antialiased">
      
      {/* MODULE 1: CREATE NEW ADMIN ENTRY */}
      <div className="max-w-xl">
        <h3 className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-4">
          // Register Security Credentials
        </h3>
        <p className="text-xs font-light text-zinc-500 mb-4 leading-relaxed">
          Provide an authenticated Firebase User ID string below. The application server environment will handle identity profile hydration automatically upon creation.
        </p>
        
        <form onSubmit={handleCreateAdmin} className="flex gap-4">
          <input 
            type="text" 
            placeholder="Enter Firebase UID..."
            value={targetUid}
            onChange={(e) => setTargetUid(e.target.value)}
            className="flex-1 bg-white border border-zinc-200 px-4 py-2.5 text-xs font-mono focus:border-black outline-none rounded-md transition-colors"
            required
            disabled={submitting}
          />
          <button 
            type="submit" 
            disabled={submitting}
            className="bg-black text-white px-5 py-2.5 text-xs font-mono tracking-wider uppercase hover:bg-zinc-800 transition-colors disabled:bg-zinc-200 disabled:text-zinc-400 rounded-md"
          >
            {submitting ? "PROCESSING..." : "GRANT_ACCESS"}
          </button>
        </form>
      </div>

      {/* MODULE 2: SYSTEM ACCESS DIRECTORY TABLE */}
      <div>
        <h3 className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-6">
          // Access Control Log ({admins?.length || 0})
        </h3>
        
        {/* Main outer table wrapper box changed to rounded-lg */}
        <div className="w-full border border-zinc-200 overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            
            {/* Table Column Headers - Fixed text alignment and typos */}
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/50 font-mono text-zinc-500 tracking-wide uppercase">
                <th className="p-4 font-medium">Database ID</th>
                <th className="p-4 pl-6 font-medium">Firebase UID</th>
                <th className="p-4 font-medium">Identity / Email</th>
                <th className="p-4 font-medium">System Role</th>
                <th className="p-4 font-medium">System Status</th>
                <th className="p-4 font-medium text-right pr-6">Operations</th>
              </tr>
            </thead>
            
            {/* Table Row Content */}
            <tbody className="divide-y divide-zinc-100 font-light">
              {!admins || admins.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-zinc-400 italic font-mono">
                    NO_ADMINISTRATIVE_RECORDS_INDEXED
                  </td>
                </tr>
              ) : (
                admins.map((admin) => {
                  const currentId = admin._id || admin.id;
                  const isActive = admin.status === "active";
                  
                  // FIXED: Automated multi-conditional protection layer targeting your active developer account
                  const isSuperAdmin = 
                    admin.role?.toLowerCase() === "super admin" || 
                    admin.email === "rajakannan1107@gmail.com";
                  
                  return (
                    <tr key={currentId} className="hover:bg-zinc-50/30 transition-colors">
                      {/* MongoDB ID */}
                      <td className="p-4 font-mono text-[11px] text-zinc-400 select-all">{currentId}</td>
                      
                      {/* Firebase ID - Fixed padding alignment */}
                      <td className="p-4 pl-6 font-mono text-[11px] text-zinc-500 select-all" title={admin.firebaseUid}>
                        {admin.firebaseUid ? `${admin.firebaseUid.substring(0, 10)}...` : "—"}
                      </td>
                      
                      {/* Profile Name & Email */}
                      <td className="p-4">
                        <div className="font-medium text-black">{admin.name || "System User"}</div>
                        <div className="text-zinc-400 text-[11px] font-mono mt-0.5">{admin.email}</div>
                      </td>
                      
                      {/* System Role */}
                      <td className="p-4 uppercase tracking-wider text-[11px] font-mono whitespace-nowrap">
                        {isSuperAdmin ? (
                          <span className="text-black font-semibold">★ Super Admin</span>
                        ) : (
                          <span className="text-zinc-500">Admin</span>
                        )}
                      </td>
                      
                      {/* Status Badges - Made status wrapper border rounded-md */}
                      <td className="p-4">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide border rounded-md ${
                          isActive 
                            ? "bg-zinc-950 text-white border-black" 
                            : "bg-zinc-100 text-zinc-400 border-zinc-200"
                        }`}>
                          {admin.status || "Unknown"}
                        </span>
                      </td>
                      
                      {/* Action Operation Buttons - Fixed right padding alignment */}
                      <td className="p-4 pr-6 text-right font-mono text-[10px] tracking-wider uppercase whitespace-nowrap">
                        {isSuperAdmin ? (
                          <span className="text-zinc-300 italic select-none">[ Protected ]</span>
                        ) : isActive ? (
                          <button 
                            onClick={() => handleRevokeAccess(currentId, admin.name, admin.email)}
                            className="text-red-500 hover:text-red-700 transition-colors font-medium"
                          >
                            [ revoke_access ]
                          </button>
                        ) : (
                          <span className="text-zinc-300 italic select-none">[ Disabled ]</span>
                        )}
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
