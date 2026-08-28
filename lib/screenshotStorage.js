import { put } from "@vercel/blob";

const MAX_BYTES = 3 * 1024 * 1024; // 3MB decoded — client already downscales before this

export class ScreenshotTooLargeError extends Error {}

function decodeDataUri(dataUri) {
  const match = /^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/.exec(dataUri || "");
  if (!match) throw new Error("screenshotBase64 must be an image data URI.");
  const [, contentType, base64] = match;
  const buffer = Buffer.from(base64, "base64");
  if (buffer.length > MAX_BYTES) {
    throw new ScreenshotTooLargeError("Screenshot is too large — please upload a smaller image.");
  }
  return { buffer, contentType };
}

// In local dev without BLOB_READ_WRITE_TOKEN configured, degrades to a
// placeholder rather than failing — so registration can still be tested end
// to end. In production, a real upload failure propagates (an order with no
// payment proof attached can never be legitimately verified later).
export async function uploadPaymentScreenshot(screenshotBase64, uuid) {
  const { buffer, contentType } = decodeDataUri(screenshotBase64);

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn("BLOB_READ_WRITE_TOKEN not set — storing a placeholder screenshot URL.");
    return "local-dev-placeholder://no-blob-token-configured";
  }

  const ext = contentType.split("/")[1] || "jpg";
  const blob = await put(`payment-proofs/${uuid}.${ext}`, buffer, {
    access: "public",
    contentType,
  });
  return blob.url;
}
