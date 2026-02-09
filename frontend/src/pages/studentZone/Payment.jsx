import { CreditCard, QrCode, Landmark, AlertCircle } from "lucide-react";

const Payment = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* ================= HEADER ================= */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Online Payment</h2>
        <p className="max-w-2xl mt-3 text-gray-600">
          Make your tuition and course payments securely using the options
          provided below. Please read the instructions carefully before
          proceeding.
        </p>
      </div>

      {/* ================= PAYMENT OPTIONS ================= */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* ================= ONLINE PAYMENT ================= */}
        <div className="p-8 border border-gray-200 shadow-md rounded-3xl bg-white/80 backdrop-blur">
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center justify-center w-12 h-12 text-indigo-600 bg-indigo-100 rounded-full">
              <CreditCard />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Online Payment</h3>
          </div>

          <p className="text-sm leading-relaxed text-gray-600">
            Pay securely using Debit Card, Credit Card, Net Banking, or UPI.
            Once payment is completed, please keep the transaction reference
            number for future communication.
          </p>

          <button className="mt-6 w-full rounded-full bg-indigo-600 py-3.5 text-sm font-bold text-white hover:bg-indigo-700 transition shadow-sm">
            Proceed to Payment →
          </button>
        </div>

        {/* ================= UPI PAYMENT ================= */}
        <div className="p-8 border border-gray-200 shadow-md rounded-3xl bg-white/80 backdrop-blur">
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center justify-center w-12 h-12 text-indigo-600 bg-indigo-100 rounded-full">
              <QrCode />
            </div>
            <h3 className="text-xl font-bold text-gray-900">UPI Payment</h3>
          </div>

          <p className="text-sm leading-relaxed text-gray-600">
            Pay using any UPI app such as Google Pay, PhonePe, Paytm, or BHIM.
            Use the UPI ID below or scan the QR code available at the institute.
          </p>

          <div className="p-4 mt-6 text-sm font-semibold text-indigo-700 rounded-xl bg-indigo-50">
            UPI ID: <span className="font-bold">mindmine@upi</span>
          </div>
        </div>

        {/* ================= BANK TRANSFER ================= */}
        <div className="p-8 border border-gray-200 shadow-md rounded-3xl bg-white/80 backdrop-blur md:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 text-indigo-600 bg-indigo-100 rounded-full">
              <Landmark />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Bank Transfer (NEFT / RTGS / IMPS)
            </h3>
          </div>

          <div className="grid gap-4 text-sm text-gray-700 md:grid-cols-2">
            <p>
              <b>Account Name:</b> Mindmine Institute
            </p>
            <p>
              <b>Bank Name:</b> State Bank of India
            </p>
            <p>
              <b>Account Number:</b> 123456789012
            </p>
            <p>
              <b>IFSC Code:</b> SBIN000XXXX
            </p>
            <p>
              <b>Branch:</b> Kolkata
            </p>
          </div>

          <p className="mt-5 text-sm text-gray-600">
            After completing the transfer, please share the transaction ID with
            the administration for payment confirmation.
          </p>
        </div>
      </div>

      {/* ================= IMPORTANT NOTE ================= */}
      <div className="flex gap-4 p-6 border mt-14 rounded-2xl bg-amber-50 border-amber-200">
        <AlertCircle className="mt-1 text-amber-600" />
        <div className="text-sm text-gray-700">
          <p className="mb-1 font-semibold">Important Notice</p>
          <p>
            Payments once made are non-refundable. Please ensure the correct
            course and amount are selected before proceeding with payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
