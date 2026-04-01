import { useState } from "react";

const FeesModal = ({ app, onClose, onAddPayment }) => {
  const totalFees = app.fees || 0;
  const emis = app.emis || [];
  const payments = app.payments || [];

  const today = new Date();

  // ✅ TOTAL PAID FROM PAYMENTS (single source of truth)
  const paidAmount = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0,
  );

  const dueAmount = totalFees - paidAmount;

  // ✅ EMI STATUS LOGIC
  const getStatus = (emi) => {
    if (emi.status === "paid") return "paid";
    if (emi.dueDate && new Date(emi.dueDate) < today) return "overdue";
    return "pending";
  };

  // ✅ STATE
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("cash");

  // ✅ ADD PAYMENT
  const handleAddPayment = () => {
    if (!amount) return;

    const numericAmount = Number(amount);

    if (numericAmount <= 0) return;

    if (numericAmount > dueAmount) {
      alert("Amount exceeds due");
      return;
    }

    onAddPayment(app._id, {
      amount: numericAmount,
      type: mode,
      date: new Date(),
    });

    setAmount("");
  };

  const handleMarkPaid = (emi, index) => {
    if (emi.amount > dueAmount) {
      alert("Payment exceeds due");
      return;
    }

    onAddPayment(app._id, {
      amount: Number(emi.amount),
      type: "emi",
      date: new Date(),
      emiIndex: index,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[650px] max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold mb-4">Fees Summary</h2>

        {/* ✅ SUMMARY */}
        <div className="space-y-2 text-sm mb-5">
          <p>
            <b>Total Fees:</b> ₹ {totalFees}
          </p>
          <p className="text-green-700 font-bold">
            <b>Total Paid:</b> ₹ {paidAmount}
          </p>
          <p className="text-red-600 font-bold">
            <b>Due:</b> ₹ {dueAmount}
          </p>
        </div>

        {/* ✅ ADD PAYMENT */}
        <div className="border rounded-xl p-3 mb-5">
          <p className="text-xs font-bold mb-2">Add Payment</p>

          <div className="flex gap-2">
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
              <option value="online">Online</option>
            </select>

            <button
              onClick={handleAddPayment}
              disabled={dueAmount <= 0}
              className={`px-3 py-1 rounded text-xs ${
                dueAmount <= 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 text-white"
              }`}
            >
              Paid
            </button>
          </div>
        </div>

        {/* ✅ EMI LIST */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold text-gray-500">EMI Schedule</h4>

          {emis.map((emi, index) => {
            const status = getStatus(emi);

            return (
              <div
                key={index}
                className="flex items-center justify-between border rounded-xl p-3"
              >
                <div>
                  <p className="text-sm font-bold">₹ {emi.amount}</p>
                  <p className="text-xs text-gray-500">
                    Due: {emi.dueDate?.split("T")[0] || "N/A"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      status === "paid"
                        ? "bg-green-100 text-green-700"
                        : status === "overdue"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {status.toUpperCase()}
                  </span>

                  {status !== "paid" && (
                    <button
                      onClick={() => handleMarkPaid(emi, index)}
                      className="text-xs bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Mark Paid
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ✅ PAYMENT HISTORY */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs font-bold text-gray-500">Payment History</h4>

          {payments.length === 0 && (
            <p className="text-xs text-gray-400">No payments yet</p>
          )}

          {payments.map((p, i) => (
            <div key={i} className="flex justify-between text-xs border-b pb-1">
              <span>₹ {p.amount}</span>

              <span className="text-gray-500 capitalize">
                {p.type === "emi" ? "EMI Payment" : p.type}
              </span>

              <span className="text-gray-400">
                {new Date(p.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>

        {/* CLOSE */}
        <div className="text-right">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-500">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeesModal;
