const STATUS_STYLES = {
  pending: "bg-white/10 text-white/70",
  approved: "bg-tedx-red/15 text-tedx-red",
  rejected: "bg-white/5 text-white/30",
};

function StatusBadge({ status, isTest }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${STATUS_STYLES[status] || STATUS_STYLES.pending}`}>
        {status || "pending"}
      </span>
      {Boolean(isTest) && (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/10 text-white/50">
          Test
        </span>
      )}
    </div>
  );
}

function CheckedInBadge({ checkedInAt }) {
  if (!checkedInAt) {
    return <span className="text-white/30 text-xs">Not yet</span>;
  }
  return (
    <span className="text-tedx-red text-xs font-semibold">
      Checked in — {new Date(checkedInAt).toLocaleString()}
    </span>
  );
}

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
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap">Checked In</th>
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
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge status={o.status} isTest={o.is_test} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <CheckedInBadge checkedInAt={o.checked_in_at} />
                </td>
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
                <td colSpan={8} className="px-4 py-6 text-center text-white/40">
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
