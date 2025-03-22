function base64urlToBase64(base64url: string) {
  return base64url.replace(/-/g, '+').replace(/_/g, '/');
}

export const verifyJWT = async (token: string, secret: string) => {
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  );

  const [header, payload, signature] = token.split('.');

  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    Uint8Array.from(atob(base64urlToBase64(signature)), (c) => c.charCodeAt(0)),
    new TextEncoder().encode(`${header}.${payload}`),
  );

  if (!valid) throw new Error('Invalid token signature');

  const decodedPayload = JSON.parse(atob(base64urlToBase64(payload)));

  const currentTime = Math.floor(Date.now() / 1000);
  if (decodedPayload.exp && decodedPayload.exp < currentTime) {
    throw new Error('Token has expired');
  }

  return decodedPayload;
};
