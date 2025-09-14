"use client";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { ShineBorder } from "./magicui/shine-border";
import { ShimmerButton } from "./magicui/shimmer-button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useComplaint } from "../hooks/useComplaint";
import type { CreateComplaintInput, Complaint } from "@/types/complaint";

type ComplaintFormRef = {
  clearForm: () => void;
};

type ComplaintFormProps = {
  onSubmit?: (result: Complaint | null) => void;
};

const ComplaintForm = forwardRef<ComplaintFormRef, ComplaintFormProps>(
  ({ onSubmit }, ref) => {
    const [form, setForm] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    const [error, setError] = useState("");

    // Hook de nuestro servicio
    const { createComplaint, loading } = useComplaint();

    const clearForm = () => {
      setForm({ name: "", email: "", subject: "", message: "" });
      setError("");
    };

    useImperativeHandle(ref, () => ({ clearForm }));

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      // Limpiar error cuando el usuario empiece a escribir
      if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // Validación simple
      if (!form.name || !form.email || !form.subject || !form.message) {
        setError("All fields are required.");
        return;
      }

      // Validación de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setError("Please enter a valid email address.");
        return;
      }

      setError("");

      try {
        // Transformar datos del formulario al formato CreateComplaintInput
        const complaintData: CreateComplaintInput = {
          fullname: form.name,
          customerEmail: form.email,
          title: form.subject,
          body: form.message,
        };

        const result = await createComplaint(complaintData);

        if (result) {
          clearForm(); // limpiar formulario al enviar
          if (onSubmit) onSubmit(result); // callback opcional
        } else {
          // Si result es null, el error ya está manejado en el hook
          if (onSubmit) onSubmit(null);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to submit complaint.");
        } else {
          setError("Failed to submit complaint.");
        }
        if (onSubmit) onSubmit(null);
      }
    };

    return (
      <Card className="relative overflow-hidden max-w-xl w-full">
        <ShineBorder
          shineColor={["#8b1286", "#ffe991", "#A64194"]}
          borderWidth={2}
          duration={15}
        />
        <CardHeader>
          <h2 className="text-3xl font-bold text-center pt-2" style={{ color: "var(--purple)" }}>
            Submit Your Complaint
          </h2>
          <p className="text-lg text-center text-gray-600 italic -pt-2">
            We value your feedback and will address your concerns promptly
          </p>
        </CardHeader>
        <CardContent className="p-10 pt-0">
          <form onSubmit={handleSubmit} className="text-2xl">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-red-600 text-lg">{error}</p>
              </div>
            )}
            
            <div className="mb-8">
              <label 
                className="block mb-1 font-medium" 
                htmlFor="name" 
                style={{ color: "var(--purple)" }}
              >
                * Full Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border rounded-2xl px-3 py-2 shadow-md text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderColor: "var(--purple)", color: "black" }}
              />
            </div>

            <div className="mb-8">
              <label 
                className="block mb-1 font-medium" 
                htmlFor="email" 
                style={{ color: "var(--purple)" }}
              >
                * Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border rounded-2xl px-3 py-2 shadow-md text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderColor: "var(--purple)", color: "black" }}
              />
            </div>

            <div className="mb-8">
              <label 
                className="block mb-1 font-medium" 
                htmlFor="subject" 
                style={{ color: "var(--purple)" }}
              >
                * Title:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border rounded-2xl px-3 py-2 shadow-md text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderColor: "var(--purple)", color: "black" }}
              />
            </div>

            <div className="mb-8">
              <label 
                className="block mb-1 font-medium" 
                htmlFor="message" 
                style={{ color: "var(--purple)" }}
              >
                * Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                disabled={loading}
                rows={4}
                className="w-full border rounded-2xl px-3 py-2 shadow-md text-lg disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                style={{ borderColor: "var(--purple)", color: "black" }}
              />
            </div>

            <ShimmerButton 
              className="shadow-2xl w-full" 
              type="submit" 
              disabled={loading}
            >
              <span className="whitespace-pre-wrap text-center text-2xl font-medium leading-none tracking-wide text-white">
                {loading ? "Submitting..." : "Submit"}
              </span>
            </ShimmerButton>
          </form>
        </CardContent>
      </Card>
    );
  }
);

ComplaintForm.displayName = "ComplaintForm";

export default ComplaintForm;
