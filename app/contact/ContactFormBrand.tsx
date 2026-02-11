// // "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Form, Input, message } from "antd";
// import { Mail, Phone, MapPin, Send, Home, UserRound, Shield, Lock, CheckCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import emailjs from "@emailjs/browser";
// import Turnstile from "react-turnstile";

// const BRAND = "#07518a";
// const LOGO = "/highbtlogo tm (1).png";

// // Cloudflare Turnstile sitekey (public key)
// const TURNSTILE_SITE_KEY = "0x4AAAAAACNkR2ryvzP3rHKe";

// /* ===== Motion helpers ===== */
// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 24 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: 12 },
//   transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
// });

// const fadeIn = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   exit: { opacity: 0 },
//   transition: { duration: 0.4 },
// };

// const stagger = {
//   initial: { opacity: 0 },
//   animate: {
//     opacity: 1,
//     transition: { staggerChildren: 0.07, delayChildren: 0.05 },
//   },
//   exit: { opacity: 0 },
// };

// const btnWhile = {
//   whileHover: { scale: 1.03, y: -1 },
//   whileTap: { scale: 0.98, y: 0 },
// };

// const pulseAnimation = {
//   animate: {
//     scale: [1, 1.02, 1],
//     transition: {
//       duration: 2,
//       repeat: Infinity,
//       repeatType: "reverse" as const,
//     },
//   },
// };

// export default function ContactFormBrand() {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [turnstileToken, setTurnstileToken] = useState("");
//   const [turnstileKey, setTurnstileKey] = useState(Date.now());
//   const [captchaError, setCaptchaError] = useState(false);
//   const [turnstileLoading, setTurnstileLoading] = useState(true);
//   const [turnstileWidgetId, setTurnstileWidgetId] = useState<number | null>(null);
//   const [formData, setFormData] = useState<Record<string, string> | null>(null);

//   const turnstileRef = useRef<{ reset: () => void } | null>(null);
//   const router = useRouter();

//   // Handle Turnstile widget load
//   const handleTurnstileLoad = (widgetId: number) => {
//     setTurnstileWidgetId(widgetId);
//     setTurnstileLoading(false);
//   };

//   // Handle Turnstile verification
//   const handleTurnstileVerify = (token: string) => {
//     setTurnstileToken(token);
//     setCaptchaError(false);
//     if (token) {
//       message.success({
//         content: "✓ Security verification complete",
//         duration: 2,
//         style: { marginTop: "20px" },
//       });
//     }
//   };

//   // Handle Turnstile error
//   const handleTurnstileError = () => {
//     setTurnstileToken("");
//     setCaptchaError(true);
//     message.error({
//       content: "❌ Security verification failed. Please try again.",
//       duration: 3,
//     });
//     setTimeout(() => {
//       if (turnstileRef.current) {
//         turnstileRef.current.reset();
//       }
//     }, 1000);
//   };

//   // Handle Turnstile expire
//   const handleTurnstileExpire = () => {
//     setTurnstileToken("");
//     setCaptchaError(true);
//     message.warning({
//       content: "⚠️ Security verification expired. Please verify again.",
//       duration: 3,
//     });
//   };

//   // Reset Turnstile
//   const resetTurnstile = () => {
//     setTurnstileToken("");
//     setTurnstileKey(Date.now());
//     setCaptchaError(false);
//     setTurnstileLoading(true);
//     if (turnstileRef.current) {
//       turnstileRef.current.reset();
//     }
//   };

//   // Handle form submission
//   const onFinish = async (values: Record<string, string>) => {
//     if (values.company_website) {
//       return; // honeypot - silently stop
//     }

//     if (!turnstileToken) {
//       setCaptchaError(true);
//       message.error({
//         content: "❌ Please complete the security verification!",
//         duration: 3,
//       });
//       setTimeout(() => {
//         const turnstileElement = document.querySelector(".cf-turnstile");
//         if (turnstileElement instanceof HTMLElement) {
//           turnstileElement.scrollIntoView({
//             behavior: "smooth",
//             block: "center",
//             inline: "center",
//           });
//           turnstileElement.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.5)";
//           setTimeout(() => {
//             turnstileElement.style.boxShadow = "";
//           }, 1500);
//         }
//       }, 100);
//       return;
//     }

//     setFormData(values);
//     setLoading(true);
//     setCaptchaError(false);

//     try {
//       const templateParams = {
//         from_name: values.name,
//         from_email: values.email,
//         phone: values.phone,
//         message: values.message,
//         subject: "Website Contact Form Submission",
//         captcha_verified: "YES",
//         captcha_token: turnstileToken.substring(0, 20) + "...",
//         submission_time: new Date().toLocaleString("en-IN", {
//           timeZone: "Asia/Kolkata",
//           dateStyle: "full",
//           timeStyle: "long",
//         }),
//         user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
//         page_url: typeof window !== "undefined" ? window.location.href : "",
//       };

//       await emailjs.send(
//         "service_octtqss",
//         "template_h9493t4",
//         templateParams,
//         "58795tHcPT-Gj8W3F"
//       );

//       setSubmitted(true);
//       message.success({
//         content: (
//           <div className="flex items-center gap-2">
//             <CheckCircle className="text-green-500" size={20} />
//             <span className="font-semibold">Message sent successfully!</span>
//           </div>
//         ),
//         duration: 5,
//       });

//       form.resetFields();
//       resetTurnstile();
//     } catch (error: unknown) {
//       const err = error as { text?: string };
//       let errorMessage = "Failed to send message. Please try again.";
//       if (err.text) {
//         try {
//           const errorData = JSON.parse(err.text) as { message?: string };
//           errorMessage = errorData.message ?? errorMessage;
//         } catch {
//           errorMessage = err.text;
//         }
//       }
//       message.error({
//         content: (
//           <div className="flex items-center gap-2">
//             <span className="text-red-600 font-semibold">❌ {errorMessage}</span>
//           </div>
//         ),
//         duration: 5,
//       });
//       resetTurnstile();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRetrySubmit = () => {
//     if (formData) {
//       onFinish(formData);
//     }
//   };

//   const handleSendAnother = () => {
//     setSubmitted(false);
//     setFormData(null);
//     resetTurnstile();
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (turnstileLoading && turnstileRef.current) {
//         turnstileRef.current.reset();
//       }
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, [turnstileLoading]);

//   return (
//     <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <motion.div
//           className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           style={{
//             background: `conic-gradient(from 0deg, ${BRAND}, transparent 50%)`,
//             filter: "blur(40px)",
//           }}
//         />
//         <motion.div
//           className="absolute bottom-0 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 opacity-10"
//           animate={{ rotate: -360 }}
//           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
//           style={{
//             background: `conic-gradient(from 180deg, ${BRAND}, transparent 50%)`,
//             filter: "blur(40px)",
//           }}
//         />
//       </div>

//       <AnimatePresence mode="wait">
//         {!submitted ? (
//           <motion.div
//             key="contact-form"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="text-center mb-12"
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.2, type: "spring" }}
//                 className="inline-block mb-6"
//               >
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={LOGO}
//                   alt="Brihaspathi Technologies"
//                   className="h-12 w-auto mx-auto object-contain"
//                 />
//               </motion.div>
//               <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: BRAND }}>
//                 Contact Us
//               </h1>
//               <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//                 Ready to transform your digital presence? Let&apos;s build something amazing together.
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <motion.div
//                 variants={stagger}
//                 initial="initial"
//                 animate="animate"
//                 className="space-y-8"
//               >
//                 <motion.div
//                   variants={fadeUp(0.1)}
//                   className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="flex-shrink-0">
//                       <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
//                         <Shield className="text-white" size={24} />
//                       </div>
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold mb-2" style={{ color: BRAND }}>
//                         Secure & Protected
//                       </h3>
//                       <p className="text-gray-600">
//                         Your information is protected with enterprise-grade security. We use
//                         Cloudflare Turnstile to prevent spam and ensure only human submissions.
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   variants={fadeUp(0.2)}
//                   className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
//                 >
//                   <h3 className="text-2xl font-bold mb-6" style={{ color: BRAND }}>
//                     Get in Touch
//                   </h3>
//                   <div className="space-y-6">
//                     <div className="flex items-start gap-4">
//                       <div className="flex-shrink-0">
//                         <div
//                           className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"
//                           style={{ border: `1px solid ${BRAND}20` }}
//                         >
//                           <Mail size={18} style={{ color: BRAND }} />
//                         </div>
//                       </div>
//                       <div>
//                         <h4 className="font-semibold" style={{ color: BRAND }}>
//                           Email
//                         </h4>
//                         <a
//                           href="mailto:info@brihaspathi.com"
//                           className="text-gray-700 hover:text-blue-600 transition-colors"
//                         >
//                           info@brihaspathi.com
//                         </a>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-4">
//                       <div className="flex-shrink-0">
//                         <div
//                           className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"
//                           style={{ border: `1px solid ${BRAND}20` }}
//                         >
//                           <Phone size={18} style={{ color: BRAND }} />
//                         </div>
//                       </div>
//                       <div>
//                         <h4 className="font-semibold" style={{ color: BRAND }}>
//                           Phone
//                         </h4>
//                         <a
//                           href="tel:+919885888835"
//                           className="text-gray-700 hover:text-blue-600 transition-colors"
//                         >
//                           +91 98858 88835
//                         </a>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-4">
//                       <div className="flex-shrink-0">
//                         <div
//                           className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"
//                           style={{ border: `1px solid ${BRAND}20` }}
//                         >
//                           <MapPin size={18} style={{ color: BRAND }} />
//                         </div>
//                       </div>
//                       <div>
//                         <h4 className="font-semibold" style={{ color: BRAND }}>
//                           Address
//                         </h4>
//                         <p className="text-gray-700">
//                           01, 508-510, Shangrila Plaza, Road No. 2, Park View Enclave, Banjara Hills,
//                           Hyderabad, Telangana - 500034
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   variants={fadeUp(0.3)}
//                   className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200"
//                 >
//                   <h4 className="font-bold mb-4" style={{ color: BRAND }}>
//                     Our Response Process
//                   </h4>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                       <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
//                         <span className="text-xs font-bold" style={{ color: BRAND }}>
//                           1
//                         </span>
//                       </div>
//                       <span className="text-sm text-gray-600">Submit your enquiry</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
//                         <span className="text-xs font-bold" style={{ color: BRAND }}>
//                           2
//                         </span>
//                       </div>
//                       <span className="text-sm text-gray-600">We&apos;ll review within 24 hours</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
//                         <span className="text-xs font-bold" style={{ color: BRAND }}>
//                           3
//                         </span>
//                       </div>
//                       <span className="text-sm text-gray-600">
//                         Schedule a free consultation
//                       </span>
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>

//               <motion.div
//                 variants={fadeUp(0.2)}
//                 initial="initial"
//                 animate="animate"
//                 className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg"
//               >
//                 <div className="mb-8">
//                   <h2 className="text-2xl font-bold mb-2" style={{ color: BRAND }}>
//                     Send us a Message
//                   </h2>
//                   <p className="text-gray-600">
//                     Fill out the form below and our team will get back to you shortly.
//                   </p>
//                 </div>

//                 <Form
//                   form={form}
//                   layout="vertical"
//                   onFinish={onFinish}
//                   requiredMark={false}
//                   className="space-y-5"
//                 >
//                   <Form.Item name="company_website" style={{ display: "none" }}>
//                     <Input autoComplete="off" tabIndex={-1} />
//                   </Form.Item>

//                   <Form.Item
//                     label={
//                       <span className="font-medium text-gray-700">
//                         Full Name <span className="text-red-500">*</span>
//                       </span>
//                     }
//                     name="name"
//                     rules={[
//                       { required: true, message: "Please enter your name" },
//                       { min: 2, message: "Name must be at least 2 characters" },
//                       { max: 100, message: "Name must be less than 100 characters" },
//                     ]}
//                     validateTrigger={["onChange", "onBlur"]}
//                   >
//                     <Input
//                       size="large"
//                       placeholder="Enter your full name"
//                       className="rounded-xl border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
//                       style={{ height: "48px", fontSize: "16px" }}
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     label={
//                       <span className="font-medium text-gray-700">
//                         Email Address <span className="text-red-500">*</span>
//                       </span>
//                     }
//                     name="email"
//                     rules={[
//                       { required: true, message: "Please enter your email address" },
//                       { type: "email", message: "Please enter a valid email address" },
//                     ]}
//                     validateTrigger={["onChange", "onBlur"]}
//                   >
//                     <Input
//                       size="large"
//                       placeholder="you@example.com"
//                       className="rounded-xl border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
//                       style={{ height: "48px", fontSize: "16px" }}
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     label={
//                       <span className="font-medium text-gray-700">
//                         Phone Number <span className="text-red-500">*</span>
//                       </span>
//                     }
//                     name="phone"
//                     rules={[
//                       { required: true, message: "Please enter your phone number" },
//                       {
//                         pattern: /^[6-9]\d{9}$/,
//                         message: "Please enter a valid 10-digit Indian phone number",
//                       },
//                     ]}
//                     validateTrigger={["onChange", "onBlur"]}
//                   >
//                     <Input
//                       size="large"
//                       placeholder="+91 98765 43210"
//                       className="rounded-xl border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
//                       style={{ height: "48px", fontSize: "16px" }}
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     label={
//                       <span className="font-medium text-gray-700">
//                         Your Message <span className="text-red-500">*</span>
//                       </span>
//                     }
//                     name="message"
//                     rules={[
//                       { required: true, message: "Please enter your message" },
//                       { min: 10, message: "Message must be at least 10 characters" },
//                       { max: 1000, message: "Message must be less than 1000 characters" },
//                     ]}
//                     validateTrigger={["onChange", "onBlur"]}
//                   >
//                     <Input.TextArea
//                       rows={4}
//                       placeholder="Tell us about your project, requirements, or any questions you have..."
//                       className="rounded-xl border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
//                       style={{ fontSize: "16px", lineHeight: "1.5" }}
//                     />
//                   </Form.Item>

//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                   >
//                     <div className="mb-4">
//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center gap-2">
//                           <Lock size={16} style={{ color: BRAND }} />
//                           <span className="font-medium" style={{ color: BRAND }}>
//                             Security Verification
//                           </span>
//                           <span className="">*</span>
//                         </div>
//                         {turnstileToken && (
//                           <motion.div
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             className="flex items-center gap-1 text-sm bg-green-50 px-2 py-1 rounded-full"
//                           >
//                             <CheckCircle size={14} />
//                             <span>Verified</span>
//                           </motion.div>
//                         )}
//                       </div>

//                       <div
//                         className={`p-4 rounded-xl border-2 transition-all duration-300 ${
//                           captchaError
//                             ? "border-red-300 bg-red-50"
//                             : turnstileToken
//                               ? "border-green-300 bg-green-50"
//                               : "border-gray-200 bg-gray-50"
//                         }`}
//                       >
//                         {turnstileLoading && !turnstileToken && (
//                           <div className="flex flex-col items-center justify-center py-8">
//                             <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-3" />
//                             <p className="text-gray-500 text-sm">
//                               Loading security verification...
//                             </p>
//                           </div>
//                         )}

//                         <div className="flex justify-center">
//                           <Turnstile
//                             key={turnstileKey}
//                             ref={turnstileRef}
//                             sitekey={TURNSTILE_SITE_KEY}
//                             onVerify={handleTurnstileVerify}
//                             onError={handleTurnstileError}
//                             onExpire={handleTurnstileExpire}
//                             onLoad={handleTurnstileLoad}
//                             theme="light"
//                             size="normal"
//                             retry="auto"
//                             retryInterval={3000}
//                             refreshExpired="auto"
//                             className="turnstile-widget"
//                           />
//                         </div>

//                         <div
//                           className={`mt-4 text-center text-sm px-4 py-2 rounded-lg ${
//                             turnstileToken
//                               ? "text-green-700 bg-green-100"
//                               : captchaError
//                                 ? "text-red-700 bg-red-100"
//                                 : "text-gray-600 bg-gray-100"
//                           }`}
//                         >
//                           {turnstileToken ? (
//                             <div className="flex items-center justify-center gap-2">
//                               <CheckCircle size={16} />
//                               <span>Security verification complete</span>
//                             </div>
//                           ) : captchaError ? (
//                             <div className="flex items-center justify-center gap-2">
//                               <span>❌ Please complete the security verification</span>
//                             </div>
//                           ) : (
//                             <div className="flex items-center justify-center gap-2">
//                               <Shield size={16} />
//                               <span>Please verify you&apos;re human to continue</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <p className="mt-2 text-xs text-gray-500 text-center">
//                         This helps us prevent spam and automated submissions
//                       </p>
//                     </div>
//                   </motion.div>

//                   <Form.Item>
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.5 }}
//                     >
//                       <motion.button
//                         type="submit"
//                         disabled={loading || !turnstileToken}
//                         className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
//                           loading
//                             ? "opacity-80 cursor-not-allowed"
//                             : !turnstileToken
//                               ? "opacity-60 cursor-not-allowed"
//                               : "hover:shadow-xl"
//                         }`}
//                         style={{
//                           background: turnstileToken
//                             ? `linear-gradient(135deg, ${BRAND}, #0a5a9c)`
//                             : "#9ca3af",
//                           color: "white",
//                         }}
//                         whileHover={
//                           turnstileToken && !loading
//                             ? { scale: 1.02, boxShadow: "0 10px 25px rgba(7, 81, 138, 0.3)" }
//                             : {}
//                         }
//                         whileTap={turnstileToken && !loading ? { scale: 0.98 } : {}}
//                       >
//                         {loading ? (
//                           <>
//                             <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                             <span>Sending Message...</span>
//                           </>
//                         ) : (
//                           <>
//                             <Send size={20} />
//                             <span>
//                               {turnstileToken ? "Send Message" : "Complete Security First"}
//                             </span>
//                           </>
//                         )}
//                       </motion.button>

//                       {formData && !turnstileToken && (
//                         <motion.button
//                           type="button"
//                           onClick={handleRetrySubmit}
//                           className="mt-4 w-full py-3 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                         >
//                           Retry Submission
//                         </motion.button>
//                       )}

//                       <p className="mt-4 text-xs text-gray-500 text-center">
//                         By submitting this form, you agree to our privacy policy. We&apos;ll never
//                         share your information with third parties.
//                       </p>
//                     </motion.div>
//                   </Form.Item>
//                 </Form>
//               </motion.div>
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div
//             key="thank-you"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.5 }}
//             className="max-w-4xl mx-auto"
//           >
//             <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl border border-blue-100 shadow-2xl overflow-hidden">
//               <div className="grid grid-cols-1 lg:grid-cols-2">
//                 <div className="p-8 md:p-12">
//                   <motion.div
//                     initial={{ y: -20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.1 }}
//                     className="mb-8"
//                   >
//                     {/* eslint-disable-next-line @next/next/no-img-element */}
//                     <img
//                       src={LOGO}
//                       alt="Brihaspathi Technologies"
//                       className="h-12 w-auto mb-6"
//                     />
//                     <div className="flex items-center gap-3 mb-6">
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{
//                           delay: 0.3,
//                           type: "spring",
//                           stiffness: 200,
//                         }}
//                         className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
//                       >
//                         <CheckCircle className="text-white" size={24} />
//                       </motion.div>
//                       <h1 className="text-3xl md:text-4xl font-bold" style={{ color: BRAND }}>
//                         Message Sent Successfully!
//                       </h1>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="space-y-6"
//                   >
//                     <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm">
//                       <div className="flex items-start gap-4">
//                         <div className="flex-shrink-0">
//                           <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
//                             <Shield size={20} className="text-green-600" />
//                           </div>
//                         </div>
//                         <div>
//                           <h3 className="font-bold text-lg text-green-800 mb-2">
//                             ✓ Secure & Verified Submission
//                           </h3>
//                           <p className="text-green-700">
//                             Your message was protected by Cloudflare Turnstile and has been securely
//                             delivered to our team.
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <h3 className="text-xl font-bold" style={{ color: BRAND }}>
//                         What happens next?
//                       </h3>
//                       <div className="space-y-3">
//                         <div className="flex items-center gap-3">
//                           <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//                             <span className="text-sm font-bold" style={{ color: BRAND }}>
//                               1
//                             </span>
//                           </div>
//                           <span className="text-gray-700">
//                             You&apos;ll receive a confirmation email shortly
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//                             <span className="text-sm font-bold" style={{ color: BRAND }}>
//                               2
//                             </span>
//                           </div>
//                           <span className="text-gray-700">
//                             Our team will review your enquiry within 24 hours
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//                             <span className="text-sm font-bold" style={{ color: BRAND }}>
//                               3
//                             </span>
//                           </div>
//                           <span className="text-gray-700">
//                             We&apos;ll schedule a free consultation call at your convenience
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
//                   >
//                     <motion.button
//                       className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white shadow-lg hover:shadow-xl transition-all"
//                       style={{
//                         background: `linear-gradient(135deg, ${BRAND}, #0a5a9c)`,
//                       }}
//                       onClick={() => router.push("/")}
//                       whileHover={{ scale: 1.03, y: -2 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <Home size={20} />
//                       <span>Home</span>
//                     </motion.button>

//                     <motion.button
//                       className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white shadow-lg hover:shadow-xl transition-all"
//                       style={{
//                         background: `linear-gradient(135deg, ${BRAND}, #0a5a9c)`,
//                       }}
//                       onClick={() => router.push("/about/our-managing-director")}
//                       whileHover={{ scale: 1.03, y: -2 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <UserRound size={20} />
//                       <span>Our Founder</span>
//                     </motion.button>

//                     <motion.button
//                       className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-gray-800 bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
//                       onClick={handleSendAnother}
//                       whileHover={{ scale: 1.03, y: -2 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <Send size={20} />
//                       <span>Send Another</span>
//                     </motion.button>
//                   </motion.div>
//                 </div>

//                 <div className="relative p-8 md:p-12 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
//                   <div className="absolute inset-0">
//                     <motion.div
//                       className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-20"
//                       animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
//                       transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                       style={{
//                         background: `radial-gradient(circle, ${BRAND}, transparent)`,
//                       }}
//                     />
//                     <motion.div
//                       className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-10"
//                       animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
//                       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                       style={{
//                         background: `radial-gradient(circle, ${BRAND}, transparent)`,
//                       }}
//                     />
//                   </div>

//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.5, type: "spring" }}
//                     className="relative text-center"
//                   >
//                     <div className="mb-8">
//                       <motion.img
//                         src={LOGO}
//                         alt="Brihaspathi Technologies"
//                         className="h-16 w-auto mx-auto mb-6"
//                         initial={{ y: -20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.6 }}
//                       />
//                       <motion.h2
//                         className="text-2xl font-bold text-gray-900 mb-4"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.7 }}
//                       >
//                         Thank You for Choosing Us
//                       </motion.h2>
//                       <motion.p
//                         className="text-gray-600 max-w-sm mx-auto"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.8 }}
//                       >
//                         We&apos;re excited to work with you! Our team is dedicated to delivering
//                         exceptional solutions that drive your business forward.
//                       </motion.p>
//                     </div>

//                     <motion.div
//                       className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.9 }}
//                     >
//                       <div className="w-2 h-2 rounded-full animate-pulse" />
//                       <span className="text-sm font-medium" style={{ color: BRAND }}>
//                         Typically responds within 2 hours
//                       </span>
//                     </motion.div>
//                   </motion.div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// } 

import React from 'react'

function ContactFormBrand() {
  return (
    <div>ContactFormBrand</div>
  )
}

export default ContactFormBrand
