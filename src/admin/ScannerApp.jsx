import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import AdminLogin from "./AdminLogin";

const READER_ID = "tedx-qr-reader";
const RESET_DELAY_MS = 2500;

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

function Scanner() {
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
      <div className="w-full max-w-md px-4 py-6 text-center">
        <h1 className="text-white text-lg font-bold mb-1">TEDxJEC Check-In</h1>
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

export default function ScannerApp() {
  const [status, setStatus] = useState("checking"); // checking | loggedOut | loggedIn

  useEffect(() => {
    fetch("/api/admin/check", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setStatus(data.authenticated ? "loggedIn" : "loggedOut"))
      .catch(() => setStatus("loggedOut"));
  }, []);

  if (status === "checking") {
    return <div className="min-h-screen bg-tedx-black text-white/60 flex items-center justify-center">Loading…</div>;
  }

  if (status === "loggedOut") {
    return <AdminLogin onSuccess={() => setStatus("loggedIn")} />;
  }

  return <Scanner />;
}
