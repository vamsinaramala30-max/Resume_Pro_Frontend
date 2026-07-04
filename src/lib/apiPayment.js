import { getApiBase } from './api.js'

async function safeFetch(url, options) {
  const res = await fetch(url, options)
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(json?.error || json?.message || res.statusText || 'Request failed')
  }
  return json
}

export async function apiPaymentCreateOrder({ token, plan }) {
  const API_BASE = await getApiBase()
  return safeFetch(`${API_BASE}/payment/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ plan }),
  })
}

export async function apiPaymentVerify({ token, orderId, paymentId, razorpaySignature, plan }) {
  const API_BASE = await getApiBase()
  return safeFetch(`${API_BASE}/payment/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      order_id: orderId,
      payment_id: paymentId,
      razorpay_signature: razorpaySignature,
      plan,
    }),
  })
}
