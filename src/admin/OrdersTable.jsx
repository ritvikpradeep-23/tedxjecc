export default function OrdersTable({ orders, totalRevenue, onDelete }) {
  const handleDelete = (o) => {
    if (window.confirm("Are you sure you want to delete this response? This cannot be undone.")) {
      onDelete(o.id);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h2 className="text-white text-lg font-bold">Ticket Orders ({orders.length})</h2>
        <div className="text-white/70 text-sm">
          <span className="mr-4">
            Tickets sold: <strong className="text-white">{orders.length}</strong>
          </span>
          <span>
            Total revenue: <strong className="text-tedx-red">₹{totalRevenue}</strong>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto border border-white/10 rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-tedx-charcoal text-white/60 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">Buyer</th>
              <th className="px-4 py-3 whitespace-nowrap">Email</th>
              <th className="px-4 py-3 whitespace-nowrap">Tier</th>
              <th className="px-4 py-3 whitespace-nowrap">Price</th>
              <th className="px-4 py-3 whitespace-nowrap">Submitted</th>
              <th className="px-4 py-3 whitespace-nowrap">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {orders.map((o) => (
              <tr key={o.id} className="text-white/80">
                <td className="px-4 py-3 whitespace-nowrap">{o.buyer_name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{o.email}</td>
                <td className="px-4 py-3 whitespace-nowrap">{o.tier}</td>
                <td className="px-4 py-3 whitespace-nowrap">{o.price}</td>
                <td className="px-4 py-3 whitespace-nowrap">{new Date(o.created_at).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleDelete(o)}
                    className="text-red-400 hover:text-red-300 text-xs font-semibold uppercase tracking-wide cursor-pointer"
                    aria-label={`Delete order from ${o.buyer_name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-white/40">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
