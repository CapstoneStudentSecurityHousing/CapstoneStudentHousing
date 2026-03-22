import { useEffect, useState } from 'react';

export type VerificationStatus = 'Pending' | 'Approved' | 'Rejected';

export interface VerificationRequest {
  id: string;
  type: 'student' | 'landlord';
  email: string;
  name?: string;
  documents: string[];
  status: VerificationStatus;
  submittedAt: string;
}

type Listener = (requests: VerificationRequest[]) => void;

let requests: VerificationRequest[] = [];
const listeners = new Set<Listener>();

function notify() {
  const snapshot = [...requests];
  listeners.forEach((listener) => listener(snapshot));
}

function generateId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function addVerificationRequest(payload: {
  type: 'student' | 'landlord';
  email: string;
  name?: string;
  documents?: string[];
}) {
  const request: VerificationRequest = {
    id: generateId(payload.type === 'student' ? 'USER' : 'PROP'),
    type: payload.type,
    email: payload.email,
    name: payload.name,
    documents: payload.documents ?? [],
    status: 'Pending',
    submittedAt: new Date().toISOString(),
  };
  requests = [request, ...requests];
  notify();
  return request;
}

export function updateVerificationStatus(id: string, status: VerificationStatus) {
  let updated = false;
  requests = requests.map((req) => {
    if (req.id === id) {
      updated = true;
      return { ...req, status };
    }
    return req;
  });
  if (updated) notify();
}

export function getVerificationRequests() {
  return [...requests];
}

export function subscribeVerificationRequests(listener: Listener) {
  listeners.add(listener);
  listener([...requests]);
  return () => {
    listeners.delete(listener);
  };
}

export function useVerificationRequests() {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeVerificationRequests(setRequests);
    return unsubscribe;
  }, []);

  return requests;
}
