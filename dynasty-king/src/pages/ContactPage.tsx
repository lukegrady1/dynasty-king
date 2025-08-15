import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import Navbar from "./HomePage";
import "../styles.css";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or service
  }

  return (
    <div className="contact-root">
      <Navbar />
      <section className="contact-header-section">
        <div className="contact-header-container">
          <h1 className="mb-8 font-serif text-5xl text-neutral-900 tracking-wide font-light">Contact Us</h1>
          <p className="mb-12 text-lg text-neutral-700">We'd love to hear from you! Fill out the form below and we'll get back to you soon.</p>
          <div className="contact-content-section">
            {submitted ? (
              <div className="text-center text-green-700 font-medium text-xl">Thank you for reaching out!</div>
            ) : (
              <form className="max-w-lg mx-auto space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} required />
                </div>
                <Button type="submit" className="w-full rounded-2xl bg-[#940000] text-white hover:bg-[#7a0000]">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
