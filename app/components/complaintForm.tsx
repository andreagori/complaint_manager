"use client";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { ShineBorder } from "./magicui/shine-border";
import { ShimmerButton } from "./magicui/shimmer-button";
import { Card, CardContent, CardHeader } from "./ui/card";

interface ComplaintFormProps {
  onSubmit?: () => void;
}

export interface ComplaintFormRef {
  clearForm: () => void;
}

const ComplaintForm = forwardRef<ComplaintFormRef, ComplaintFormProps>(
  ({ onSubmit }, ref) => {
    const [form, setForm] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    const [error, setError] = useState("");

    const clearForm = () => {
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    };

    useImperativeHandle(ref, () => ({
      clearForm,
    }));

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted");

      if (!form.name || !form.email || !form.subject || !form.message) {
        setError("All fields are required.");
        return;
      }
      setError("");

      console.log("All fields valid, calling onSubmit");

      if (onSubmit) {
        console.log("Calling onSubmit now");
        onSubmit();
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
          <h2
            className="text-3xl font-bold text-center pt-2"
            style={{ color: "var(--purple)" }}
          >
            Submit Your Complaint
          </h2>
          <p className="text-lg text-center text-gray-600 italic -pt-2">
            We value your feedback and will address your concerns promptly
          </p>
        </CardHeader>
        <CardContent className="p-10 pt-0">
          <form onSubmit={handleSubmit} className="text-2xl">
            {error && (
              <p className="mb-2" style={{ color: "var(--purple)" }}>
                {error}
              </p>
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
                className="w-full border rounded-2xl px-3 py-2 shadow-md text-lg"
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
                className="w-full border rounded-2xl px-3 py-2 shadow-md text-lg"
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
                className="w-full border rounded-2xl px-3 py-2 shadow-md text-lg"
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
                className="w-full border rounded-2xl px-3 py-2 shadow-md text-lg"
                style={{ borderColor: "var(--purple)", color: "black" }}
              />
            </div>
            <ShimmerButton className="shadow-2xl w-full" type="submit">
              <span className="whitespace-pre-wrap text-center text-2xl font-medium leading-none tracking-wide text-white">
                Submit
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
