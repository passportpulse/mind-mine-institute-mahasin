import { useState } from "react";

const FeesModal = ({ app, onClose, onAddPayment }) => {
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

  // ✅ STATE (GENERAL PAYMENT)
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("cash");
  const [transactionId, setTransactionId] = useState("");

  // ✅ EMI PAYMENT STATE
  const [selectedEmiIndex, setSelectedEmiIndex] = useState(null);
  const [emiMode, setEmiMode] = useState("cash");
  const [emiTxnId, setEmiTxnId] = useState("");

  // ================= ADD NORMAL PAYMENT =================
  const handleAddPayment = () => {
    if (!amount) return;

    const numericAmount = Number(amount);

    if (numericAmount <= 0) return;

    if (numericAmount > dueAmount) {
      alert("Amount exceeds due");
      return;
    }

    if ((mode === "upi" || mode === "bank") && !transactionId) {
      alert("Transaction ID required");
      return;
    }

    onAddPayment(app._id, {
      amount: numericAmount,
      type: mode,
      transactionId,
      date: new Date(),
    });

    setAmount("");
    setTransactionId("");
  };

  // ================= EMI PAYMENT =================
  const handleEmiPayment = (emi, index) => {
    if (emi.amount > dueAmount) {
      alert("Payment exceeds due");
      return;
    }

    if ((emiMode === "upi" || emiMode === "bank") && !emiTxnId) {
      alert("Transaction ID required");
      return;
    }

    onAddPayment(app._id, {
      amount: Number(emi.amount),
      type: "emi",
      paymentMode: emiMode,
      transactionId: emiTxnId,
      date: new Date(),
      emiIndex: index,
    });

    // reset
    setSelectedEmiIndex(null);
    setEmiTxnId("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      {/* 🔥 BIGGER MODAL */}
      <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl relative">

        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-5">Fees Summary</h2>

        {/* ✅ SUMMARY */}
        <div className="grid grid-cols-3 gap-4 text-sm mb-6">
          <div>
            <p className="text-gray-500 text-xs">Total Fees</p>
            <p className="font-bold text-lg">₹ {totalFees}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Paid</p>
            <p className="font-bold text-green-600 text-lg">
              ₹ {paidAmount}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Due</p>
            <p className="font-bold text-red-600 text-lg">
              ₹ {dueAmount}
            </p>
          </div>
        </div>

        {/* ================= ADD PAYMENT ================= */}
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

        {/* ================= EMI LIST ================= */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold text-gray-500">EMI Schedule</h4>

          {emis.map((emi, index) => {
            const status = getStatus(emi);

            return (
              <div key={index} className="border rounded-xl p-3">
                
                {/* ROW */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">₹ {emi.amount}</p>
                    <p className="text-xs text-gray-500">
                      Due: {emi.dueDate?.split("T")[0] || "N/A"}
                    </p>
                  </div>

                  <div className="flex gap-3 items-center">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        status === "paid"
                          ? "bg-green-100 text-green-700"
                          : status === "overdue"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {status}
                    </span>

                    {status !== "paid" && (
                      <button
                        onClick={() => setSelectedEmiIndex(index)}
                        className="bg-green-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Mark Paid
                      </button>
                    )}
                  </div>
                </div>

                {/* 🔥 EMI PAYMENT FORM */}
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

        {/* ================= PAYMENT HISTORY ================= */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs font-bold text-gray-500">Payment History</h4>

          {payments.length === 0 && (
            <p className="text-xs text-gray-400">No payments yet</p>
          )}

          {payments.length > 0 && (
            <div className="border rounded-xl overflow-hidden text-xs">

              <div className="grid grid-cols-6 bg-gray-100 font-bold px-3 py-2">
                <span>Amount</span>
                <span>Mode</span>
                <span>Txn ID</span>
                <span>Date</span>
                <span className="text-center">Edit</span>
                <span className="text-center">Delete</span>
              </div>

              {payments.map((p, i) => (
                <div
                  key={i}
                  className="grid grid-cols-6 items-center px-3 py-2 border-t"
                >
                  <span>₹ {p.amount}</span>

                  <span>{p.paymentMode || p.type}</span>

                  <span className="truncate text-gray-500">
                    {p.transactionId || "-"}
                  </span>

                  <span className="text-gray-400">
                    {new Date(p.date).toLocaleDateString()}
                  </span>

                  <button className="text-blue-600 text-center">Edit</button>
                  <button className="text-red-600 text-center">Delete</button>
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
