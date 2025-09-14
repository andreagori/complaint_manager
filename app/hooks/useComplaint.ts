"use client";

import { useState } from "react";
import { CreateComplaintInput, Complaint, UpdateComplaintInput } from "@/types/complaint";

export function useComplaint() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Crear nueva complaint
  const createComplaint = async (data: CreateComplaintInput) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Error creating complaint");
      }

      const complaint: Complaint = await res.json();
      return complaint;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar complaint
  const updateComplaint = async (data: UpdateComplaintInput) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/complaints/${data.complaintId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Error updating complaint");
      }

      const updated: Complaint = await res.json();
      return updated;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createComplaint, updateComplaint, loading, error };
}
