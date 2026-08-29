import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import AdminLogin from "../admin/AdminLogin";

const READER_ID = "tedx-qr-reader";
const RESET_DELAY_MS = 2500;
const POLL_INTERVAL_MS = 10000;

const RESULT_STYLES = {
  success: "bg-green-600",
  duplicate: "bg-tedx-red",
  invalid: "bg-white/20",
};

function ResultOverlay({ result }) {
  if (!result) return null;

  return (
    <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8 ${RESULT_STYLES[result.type]}`}>
      {result.type === "success" && (
        <>
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="text-white mb-4" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-white text-2xl font-bold">Checked In</p>
          <p className="text-white/90 text-lg mt-1">{result.buyerName}</p>
          <p className="text-white/70 text-sm uppercase tracking-wide mt-1">{result.tier}</p>
        </>
      )}
      {result.type === "duplicate" && (
        <>
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="text-white mb-4" aria-hidden="true">
            <path d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.18A2 2 0 0 0 3.82 21h16.36a2 2 0 0 0 1.71-2.96L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-white text-2xl font-bold">Already Checked In</p>
          <p className="text-white/90 text-sm mt-2">
            First scanned {new Date(result.checkedInAt).toLocaleString()}
          </p>
        </>
      )}
      {result.type === "invalid" && (
        <>
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="text-white mb-4" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-white text-2xl font-bold">Invalid Ticket</p>
          <p className="text-white/70 text-sm mt-1">This QR code isn't a valid approved ticket.</p>
        </>
      )}
    </div>
  );
}

function ScanMode({ onExit, onScanned }) {
  const [result, setResult] = useState(null);
  const [cameraError, setCameraError] = useState("");
  const scannerRef = useRef(null);
  const lockedRef = useRef(false);

  useEffect(() => {
    const scanner = new Html5Qrcode(READER_ID);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 260 },
        (decodedText) => {
          if (lockedRef.current) return;
          lockedRef.current = true;
          handleScan(decodedText);
        },
        () => {} // per-frame decode failures — expected constantly, ignore
      )
      .catch((err) => {
        setCameraError(
          "Could not access the camera. Make sure you've granted camera permission and are on a secure (https) connection."
        );
        console.error(err);
      });

    return () => {
      scanner.stop().then(() => scanner.clear()).catch(() => {});
    };
  }, []);

  const handleScan = async (uuid) => {
    try {
      const res = await fetch("/api/orders/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ uuid }),
      });
      const data = await res.json();
      if (data.result === "success") {
        setResult({ type: "success", buyerName: data.buyerName, tier: data.tier });
      } else if (data.result === "duplicate") {
        setResult({ type: "duplicate", checkedInAt: data.checkedInAt });
      } else {
        setResult({ type: "invalid" });
      }
      onScanned(); // refresh the attendee list in the background
    } catch {
      setResult({ type: "invalid" });
    } finally {
      setTimeout(() => {
        setResult(null);
        lockedRef.current = false;
      }, RESET_DELAY_MS);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      <button
        type="button"
        onClick={onExit}
        aria-label="Back to attendee list"
        className="absolute top-5 left-5 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="w-full max-w-md px-4 py-6 text-center">
        <h1 className="text-white text-lg font-bold mb-1">TEDx JEC Ticket Scanner</h1>
        <p className="text-white/50 text-xs mb-4">Point the camera at a ticket's QR code</p>
      </div>

      <div className="relative w-full max-w-md aspect-square mx-4 rounded-2xl overflow-hidden border border-white/10">
        <div id={READER_ID} className="w-full h-full [&_video]:object-cover [&_video]:w-full [&_video]:h-full" />
        <ResultOverlay result={result} />
      </div>

      {cameraError && (
        <p className="text-red-400 text-sm text-center mt-6 max-w-md px-6">{cameraError}</p>
      )}
    </div>
  );
}

function AttendeeRow({ order }) {
  const checkedIn = Boolean(order.checked_in_at);
  return (
    <div className="flex items-center justify-between bg-tedx-charcoal border border-white/10 rounded-xl px-4 py-3">
      <div className="min-w-0">
        <p className="text-white text-sm font-semibold truncate">{order.buyer_name}</p>
        <p className="text-white/50 text-xs mt-0.5">
          {order.tier}
          {Boolean(order.is_test) && <span className="text-white/30"> · TEST</span>}
        </p>
      </div>
      {checkedIn ? (
        <span className="shrink-0 ml-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-tedx-red/15 text-tedx-red">
          Checked In
        </span>
      ) : (
        <span className="shrink-0 ml-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/10 text-white/40">
          Not Yet
        </span>
      )}
    </div>
  );
}

function ListMode({ orders, onStartScan }) {
  const approved = orders.filter((o) => o.status === "approved");
  const checkedInCount = approved.filter((o) => o.checked_in_at).length;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="px-5 pt-8 pb-1 text-center shrink-0">
        <h1 className="text-white text-xl font-bold">TEDx JEC Ticket Scanner</h1>
        <p className="text-white/50 text-sm mt-1">
          {checkedInCount} / {approved.length} checked in
        </p>
      </div>

      <div className="px-5 pt-5 pb-4 shrink-0">
        <button
          type="button"
          onClick={onStartScan}
          className="w-full bg-tedx-red text-white text-base font-bold uppercase tracking-wide rounded-2xl py-5 flex items-center justify-center gap-3 cursor-pointer active:scale-[0.98] transition-transform shadow-[0_0_30px_rgba(230,43,30,0.35)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7V5a1 1 0 0 1 1-1h2M20 7V5a1 1 0 0 0-1-1h-2M4 17v2a1 1 0 0 0 1 1h2M20 17v2a1 1 0 0 1-1 1h-2M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Start Scanning
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="flex flex-col gap-2">
          {approved.map((o) => (
            <AttendeeRow key={o.id} order={o} />
          ))}
          {approved.length === 0 && (
            <p className="text-white/40 text-sm text-center mt-10">No approved tickets yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TicketScannerApp() {
  const [authStatus, setAuthStatus] = useState("checking"); // checking | loggedOut | loggedIn
  const [mode, setMode] = useState("list"); // list | scan
  const [orders, setOrders] = useState([]);
  const authStatusRef = useRef("checking");
  authStatusRef.current = authStatus;

  useEffect(() => {
    document.title = "TEDx JEC Ticket Scanner";
  }, []);

  const loadOrders = async () => {
    try {
      const res = await fetch("/api/orders", { credentials: "include" });
      if (res.status === 401) {
        setAuthStatus("loggedOut");
        return;
      }
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      // Transient network hiccup — next poll/scan retry will refresh it.
    }
  };

  useEffect(() => {
    fetch("/api/admin/check", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          setAuthStatus("loggedIn");
          loadOrders();
        } else {
          setAuthStatus("loggedOut");
        }
      })
      .catch(() => setAuthStatus("loggedOut"));
  }, []);

  // Keeps the list fresh if other volunteers are scanning on other phones,
  // not just after this device's own scans.
  useEffect(() => {
    const interval = setInterval(() => {
      if (authStatusRef.current === "loggedIn" && document.visibilityState === "visible") {
        loadOrders();
      }
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  if (authStatus === "checking") {
    return <div className="min-h-screen bg-black text-white/60 flex items-center justify-center">Loading…</div>;
  }

  if (authStatus === "loggedOut") {
    return (
      <AdminLogin
        onSuccess={() => {
          setAuthStatus("loggedIn");
          loadOrders();
        }}
      />
    );
  }

  if (mode === "scan") {
    return (
      <ScanMode
        onExit={() => {
          setMode("list");
          loadOrders();
        }}
        onScanned={loadOrders}
      />
    );
  }

  return <ListMode orders={orders} onStartScan={() => setMode("scan")} />;
}
