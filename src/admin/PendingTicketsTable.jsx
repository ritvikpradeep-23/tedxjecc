import { useState } from "react";
import ScreenshotLightbox from "./ScreenshotLightbox";

function ScreenshotThumb({ url, onEnlarge }) {
  if (!url || url.startsWith("local-dev-placeholder://")) {
    return <span className="text-white/30 text-xs">No screenshot (Blob not configured locally)</span>;
  }
  return (
    <button type="button" onClick={() => onEnlarge(url)} className="cursor-pointer">
      <img
        src={url}
        alt="Payment screenshot thumbnail"
        className="w-16 h-16 object-cover rounded-lg border border-white/15 hover:border-tedx-red/60 transition-colors"
      />
    </button>
  );
}

export default function PendingTicketsTable({ orders, onReview }) {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleReject = (order) => {
    if (window.confirm(`Reject the ticket registration for ${order.buyer_name}? No ticket will be sent.`)) {
      onReview(order.id, "rejected");
    }
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h2 className="text-white text-lg font-bold">Pending Tickets ({orders.length})</h2>
      </div>

      <div className="overflow-x-auto border border-white/10 rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-tedx-charcoal text-white/60 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">Buyer</th>
              <th className="px-4 py-3 whitespace-nowrap">Email</th>
              <th className="px-4 py-3 whitespace-nowrap">Tier</th>
              <th className="px-4 py-3 whitespace-nowrap">Price</th>
              <th className="px-4 py-3 whitespace-nowrap">Screenshot</th>
              <th className="px-4 py-3 whitespace-nowrap">Submitted</th>
              <th className="px-4 py-3 whitespace-nowrap">Review</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {orders.map((o) => (
              <tr key={o.id} className="text-white/80 align-middle">
                <td className="px-4 py-3 whitespace-nowrap">{o.buyer_name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{o.email}</td>
                <td className="px-4 py-3 whitespace-nowrap">{o.tier}</td>
                <td className="px-4 py-3 whitespace-nowrap">{o.price}</td>
                <td className="px-4 py-3">
                  <ScreenshotThumb url={o.payment_screenshot_url} onEnlarge={setLightboxSrc} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{new Date(o.created_at).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => onReview(o.id, "approved")}
                      className="text-tedx-red hover:text-tedx-red-dark text-xs font-semibold uppercase tracking-wide cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(o)}
                      className="text-white/50 hover:text-white text-xs font-semibold uppercase tracking-wide cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-white/40">
                  Nothing pending review.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ScreenshotLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </section>
  );
}
