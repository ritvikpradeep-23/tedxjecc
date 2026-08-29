import QRCode from "qrcode";

const QR_OPTIONS = {
  margin: 1,
  width: 320,
  color: { dark: "#0d0d0d", light: "#ffffff" },
};

// A ticket's QR encodes nothing but its UUID — scanning just looks that UUID
// up server-side (api/orders/checkin.js). No image is ever stored; this is
// called fresh wherever a QR is needed (email send, public ticket page).
export async function qrDataUrl(uuid) {
  return QRCode.toDataURL(uuid, QR_OPTIONS);
}

// For email specifically — Gmail (and other clients) block/strip inline
// base64 data: URIs in <img src>, so the emailed ticket needs a real hosted
// URL instead. See api/tickets/[uuid]/qr.js, which calls this.
export async function qrPngBuffer(uuid) {
  return QRCode.toBuffer(uuid, QR_OPTIONS);
}
