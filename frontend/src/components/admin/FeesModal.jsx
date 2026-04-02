import { useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";

const FeesModal = ({ app, onClose, refreshApp }) => {
  const totalFees = app.fees || 0;
  const emis = app.emis || [];
  const payments = app.payments || [];

  const today = new Date();

  // ✅ TOTAL PAID
  const paidAmount = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  const dueAmount = totalFees - paidAmount;

  // ✅ EMI STATUS
  const getStatus = (emi) => {
    if (emi.status === "paid") return "paid";
    if (emi.dueDate && new Date(emi.dueDate) < today) return "overdue";
    return "pending";
  };

  // ================= STATE =================
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("cash");
  const [transactionId, setTransactionId] = useState("");

  const [editPaymentId, setEditPaymentId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editTxn, setEditTxn] = useState("");

  const [selectedEmiIndex, setSelectedEmiIndex] = useState(null);
  const [emiMode, setEmiMode] = useState("cash");
  const [emiTxnId, setEmiTxnId] = useState("");

  // ================= ADD PAYMENT =================
  const handleAddPayment = async () => {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) return alert("Enter a valid amount");
    if (numericAmount > dueAmount) return alert("Amount exceeds due");
    if ((mode === "upi" || mode === "bank") && !transactionId) return alert("Transaction ID required");

    try {
      const res = await fetch(`${API_BASE_URL}/applications/${app._id}/payment`, {
        method: "POST",
        headers: {
          ...getAdminHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: numericAmount,
          type: mode,
          transactionId: transactionId.trim(),
          date: new Date(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setAmount("");
        setTransactionId("");
        refreshApp(); // ✅ refresh after successful add
      } else {
        alert(data.message || "Failed to add payment");
      }
    } catch (err) {
      console.error("Add payment failed", err);
      alert("Failed to add payment");
    }
  };

  // ================= EMI PAYMENT =================
  const handleEmiPayment = async (emi, index) => {
    const emiAmount = Number(emi.amount);
    if (!emiAmount || emiAmount > dueAmount) return alert("Payment exceeds due");
    if ((emiMode === "upi" || emiMode === "bank") && !emiTxnId) return alert("Transaction ID required");

    try {
      const res = await fetch(`${API_BASE_URL}/applications/${app._id}/payment`, {
        method: "POST",
        headers: {
          ...getAdminHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: emiAmount,
          type: "emi",
          paymentMode: emiMode,
          transactionId: emiTxnId.trim(),
          date: new Date(),
          emiIndex: index,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSelectedEmiIndex(null);
        setEmiTxnId("");
        refreshApp();
      } else {
        alert(data.message || "Failed to add EMI payment");
      }
    } catch (err) {
      console.error("EMI payment failed", err);
      alert("Failed to add EMI payment");
    }
  };

  // ================= DELETE PAYMENT =================
  const handleDeletePayment = async (paymentId) => {
    if (!confirm("Delete this payment?")) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/applications/${app._id}/payment/${paymentId}`,
        {
          method: "DELETE",
          headers: getAdminHeaders(),
        }
      );

      const data = await res.json();

      if (data.success) {
        refreshApp(); // ✅ refresh after delete
      } else {
        alert(data.message || "Failed to delete payment");
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete payment");
    }
  };

  // ================= UPDATE PAYMENT =================
  const handleUpdatePayment = async (paymentId) => {
    const numericAmount = Number(editAmount);
    if (!numericAmount || numericAmount <= 0) return alert("Enter a valid amount");

    try {
      const res = await fetch(
        `${API_BASE_URL}/applications/${app._id}/payment/${paymentId}`,
        {
          method: "PUT",
          headers: {
            ...getAdminHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: numericAmount,
            transactionId: editTxn.trim(),
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setEditPaymentId(null);
        refreshApp(); // ✅ refresh after update
      } else {
        alert(data.message || "Failed to update payment");
      }
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update payment");
    }
  };

  const getStatusBadge = (status) => {
    if (status === "paid") return "bg-green-100 text-green-700";
    if (status === "overdue") return "bg-red-100 text-red-600";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-5">Fees Summary</h2>

        {/* SUMMARY */}
        <div className="grid grid-cols-3 gap-4 text-sm mb-6">
          <div>
            <p className="text-gray-500 text-xs">Total Fees</p>
            <p className="font-bold text-lg">₹ {totalFees}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Paid</p>
            <p className="font-bold text-green-600 text-lg">₹ {paidAmount}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Due</p>
            <p className="font-bold text-red-600 text-lg">₹ {dueAmount}</p>
          </div>
        </div>

        {/* ADD PAYMENT FORM */}
        <div className="border rounded-xl p-4 mb-6">
          <p className="text-xs font-bold mb-3">Add Payment</p>
          <div className="flex gap-2 items-center flex-wrap">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border px-2 py-1 rounded text-sm w-32"
            />
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="border px-2 py-1 rounded text-sm"
            >
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="bank">Bank</option>
            </select>
            {mode !== "cash" && (
              <input
                type="text"
                placeholder="Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="border px-2 py-1 rounded text-sm w-40"
              />
            )}
            <button
              onClick={handleAddPayment}
              disabled={dueAmount <= 0}
              className="px-3 py-1 bg-indigo-600 text-white text-xs rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* EMI SCHEDULE */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold text-gray-500">EMI Schedule</h4>
          {emis.map((emi, index) => {
            const status = getStatus(emi);
            return (
              <div key={index} className="border rounded-xl p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">₹ {emi.amount}</p>
                    <p className="text-xs text-gray-500">
                      Due: {emi.dueDate?.split("T")[0] || "N/A"}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                    {status !== "paid" && dueAmount > 0 && (
                      <button
                        onClick={() => setSelectedEmiIndex(index)}
                        className="bg-green-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Mark Paid
                      </button>
                    )}
                  </div>
                </div>

                {selectedEmiIndex === index && (
                  <div className="mt-3 flex gap-2 flex-wrap items-center bg-gray-50 p-2 rounded">
                    <select
                      value={emiMode}
                      onChange={(e) => setEmiMode(e.target.value)}
                      className="border px-2 py-1 rounded text-xs"
                    >
                      <option value="cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="bank">Bank</option>
                    </select>
                    {emiMode !== "cash" && (
                      <input
                        type="text"
                        placeholder="Transaction ID"
                        value={emiTxnId}
                        onChange={(e) => setEmiTxnId(e.target.value)}
                        className="border px-2 py-1 rounded text-xs"
                      />
                    )}
                    <button
                      onClick={() => handleEmiPayment(emi, index)}
                      className="bg-indigo-600 text-white px-3 py-1 text-xs rounded"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setSelectedEmiIndex(null)}
                      className="text-gray-500 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* PAYMENT HISTORY */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs font-bold text-gray-500">Payment History</h4>
          {payments.length === 0 && <p className="text-xs text-gray-400">No payments yet</p>}
          {payments.length > 0 && (
            <div className="border rounded-xl overflow-hidden text-xs">
              <div className="grid grid-cols-6 bg-gray-100 font-bold px-3 py-2">
                <span>Amount</span>
                <span>Mode</span>
                <span>Transaction ID</span>
                <span>Date</span>
                <span className="text-center">Edit</span>
                <span className="text-center">Delete</span>
              </div>

              {payments.map((p) => (
                <div key={p._id} className="grid grid-cols-6 items-center px-3 py-2 border-t">
                  {editPaymentId === p._id ? (
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="border px-1 py-1 text-xs w-20"
                    />
                  ) : (
                    <span>₹ {p.amount}</span>
                  )}

                  <span>{p.paymentMode || p.type}</span>

                  {editPaymentId === p._id ? (
                    <input
                      type="text"
                      value={editTxn}
                      onChange={(e) => setEditTxn(e.target.value)}
                      className="border px-1 py-1 text-xs w-24"
                    />
                  ) : (
                    <span className="truncate text-gray-500">{p.transactionId || "-"}</span>
                  )}

                  <span className="text-gray-400">{new Date(p.date).toLocaleDateString()}</span>

                  <div className="text-center">
                    {editPaymentId === p._id ? (
                      <button onClick={() => handleUpdatePayment(p._id)} className="text-green-600 text-xs">
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditPaymentId(p._id);
                          setEditAmount(p.amount);
                          setEditTxn(p.transactionId || "");
                        }}
                        className="text-blue-600"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  <div className="text-center">
                    {editPaymentId === p._id ? (
                      <button onClick={() => setEditPaymentId(null)} className="text-gray-400 text-xs">
                        Cancel
                      </button>
                    ) : (
                      <button onClick={() => handleDeletePayment(p._id)} className="text-red-600">
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeesModal;
