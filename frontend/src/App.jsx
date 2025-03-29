import React, { useState } from "react";
import { Banknote, Search, CheckCircle, XCircle } from "lucide-react";

const mockTransactions = [
  {
    id: 1,
    name: "ACME Ltd",
    amount: 100,
    date: "2025-03-29",
    match: {
      invoiceId: 4521,
      client: "ACME Ltd",
      dueDate: "2025-03-30",
    },
  },
  {
    id: 2,
    name: "BrightCo",
    amount: 250,
    date: "2025-03-28",
    match: null,
  },
];

const mockInvoiceResults = [
  { id: 101, client: "BrightCo", amount: 250, due: "2025-03-30" },
  { id: 102, client: "BrightCo", amount: 250, due: "2025-03-29" },
];

function SearchModal({ show, onClose }) {
  return show ? (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-xl">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Manual Invoice Search</h3>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-black">Close</button>
        </div>
        <form className="grid grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="Client Name" className="border rounded p-2" />
          <input type="email" placeholder="Email" className="border rounded p-2" />
          <input type="number" placeholder="Amount" className="border rounded p-2" />
          <input type="date" placeholder="Date" className="border rounded p-2" />
        </form>
        <div className="border-t pt-3">
          <h4 className="text-sm font-medium mb-2">Search Results:</h4>
          <ul className="space-y-2 text-sm">
            {mockInvoiceResults.map((inv) => (
              <li key={inv.id} className="flex justify-between items-center border p-3 rounded">
                <div>
                  <p className="font-semibold">#{inv.id} – {inv.client}</p>
                  <p className="text-gray-500">€{inv.amount} due {inv.due}</p>
                </div>
                <button className="px-3 py-1 bg-green-600 text-white text-xs rounded flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Apply
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : null;
}

export default function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <SearchModal show={showModal} onClose={() => setShowModal(false)} />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Banknote className="text-green-600" /> PAYYMO – Open Banking Dashboard
        </h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Matching Transactions</h2>
          <div className="border rounded-md bg-white overflow-hidden shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Client</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Suggested Match</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="border-t">
                    <td className="p-3 font-medium">{tx.name}</td>
                    <td className="p-3">€{tx.amount.toFixed(2)}</td>
                    <td className="p-3">{tx.date}</td>
                    <td className="p-3">
                      {tx.match ? (
                        <span className="text-green-600">
                          #{tx.match.invoiceId} – {tx.match.client} (due {tx.match.dueDate})
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">No match</span>
                      )}
                    </td>
                    <td className="p-3 flex gap-2">
                      {tx.match && (
                        <button className="px-3 py-1 bg-green-600 text-white rounded text-xs flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Apply
                        </button>
                      )}
                      <button
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs flex items-center gap-1"
                        onClick={() => setShowModal(true)}>
                        <Search className="w-4 h-4" /> Search
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Ignore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
