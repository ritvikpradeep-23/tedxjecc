import QRCode from "qrcode";

// A ticket's QR encodes nothing but its UUID — scanning just looks that UUID
// up server-side (api/orders/checkin.js). No image is ever stored; this is
// called fresh wherever a QR is needed (email send, public ticket page).
export async function qrDataUrl(uuid) {
  return QRCode.toDataURL(uuid, {
    margin: 1,
    width: 320,
    color: { dark: "#0d0d0d", light: "#ffffff" },
  });
}
