
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import {
  ArrowRight,
  Calculator,
  Rotate3D,
  Code2,
  Database,
  MessageSquare,
} from "lucide-react";

export default function Home() {
  const canvasContainerRef = useRef(null);

  // --- Three.js Setup ---
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TetrahedronGeometry(1.9, 0);

    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xd97706,
      linewidth: 2,
    });

    const wireframe = new THREE.LineSegments(
      wireframeGeometry,
      wireframeMaterial
    );

    const material = new THREE.MeshPhongMaterial({
      color: 0x111111,
      specular: 0xd97706,
      shininess: 100,
      flatShading: true,
      transparent: true,
      opacity: 0.9,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.add(wireframe);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const orangeLight = new THREE.DirectionalLight(0xff8c00, 8.0);
    orangeLight.position.set(5, -3, 4);
    scene.add(orangeLight);

    const sunGlowSpot = new THREE.PointLight(0xffa500, 12.0, 30);
    sunGlowSpot.position.set(3, -2, 3);
    scene.add(sunGlowSpot);

    const whiteLight = new THREE.DirectionalLight(0xffffff, 6.0);
    whiteLight.position.set(-5, 5, 3);
    scene.add(whiteLight);

    const backLight = new THREE.PointLight(0xffffff, 3.0, 30);
    backLight.position.set(-2, 3, -3);
    scene.add(backLight);

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = () => {
      isDragging = true;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaMove = {
          x: e.offsetX - previousMousePosition.x,
          y: e.offsetY - previousMousePosition.y,
        };

        mesh.rotation.y += deltaMove.x * 0.01;
        mesh.rotation.x += deltaMove.y * 0.01;
      }

      previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY,
      };
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    let animId;
    const startTime = performance.now();

    const animate = (currentTime) => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = (currentTime - startTime) * 0.001;

      if (!isDragging) {
        mesh.rotation.y = elapsedTime * 0.3;
        mesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2;
        mesh.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      cancelAnimationFrame(animId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // --- Estimator Logic & State ---
  const [currency, setCurrency] = useState("INR");
  const [plan, setPlan] = useState("frontend");

  const [addons, setAddons] = useState({
    fastDelivery: false,
    adminPanel: false,
    seoSetup: false,
    maintenance: false,
  });

  const rates = { INR: 1, USD: 0.012 };
  const symbols = { INR: "₹", USD: "$" };

  const prices = {
    base: { frontend: 12000, fullstack: 28000 },
    addons: {
      fastDelivery: 3000,
      adminPanel: 6500,
      seoSetup: 2500,
      maintenance: 4000,
    },
  };

  const rate = rates[currency];
  const sym = symbols[currency];

  const calculateTotal = () => {
    let total = prices.base[plan];

    if (addons.fastDelivery) total += prices.addons.fastDelivery;
    if (addons.adminPanel) total += prices.addons.adminPanel;
    if (addons.seoSetup) total += prices.addons.seoSetup;
    if (addons.maintenance) total += prices.addons.maintenance;

    return Math.round(total * rate).toLocaleString();
  };

  const toggleAddon = (key) => {
    setAddons((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formattedTotal = `${sym}${calculateTotal()}`;

  const whatsappUrl = `https://wa.me/+917509478047?text=${encodeURIComponent(
    `Hi S&S Digital Studio! I calculated an estimate for a ${plan} project. Estimated Budget: ${formattedTotal}`
  )}`;

  return (
    <div className="bg-[#F9F8F6] text-[#111111] font-sans antialiased selection:bg-slate-900 selection:text-white grid-pattern relative overflow-x-hidden min-h-screen">
      {/* GLOBAL HEADER */}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* HERO SECTION */}
        <section className="py-10 sm:py-14 md:py-20 border-b border-[#E8E5DF] relative min-h-[500px] md:min-h-[580px] flex items-center">
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center w-full relative z-10">

            {/* HERO CONTENT */}
            <div className="md:col-span-7 space-y-5 sm:space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-amber-100/70 text-amber-900 text-[11px] sm:text-xs font-bold border border-amber-200/80">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                Available for Q4 Client Engagements
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.045em] text-slate-950 leading-[1.06]">
                High-converting web platforms{" "}
                <br className="hidden sm:block" />
                <span className="text-slate-400 font-normal">
                  engineered by S&S.
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 max-w-xl">
                We build fast, responsive, and production-ready Next.js applications, Tailwind CSS interfaces, and interactive digital products designed to scale your revenue.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2">
                <a
                  href="#pricing"
                  className="group px-6 py-4 rounded-xl bg-slate-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <span>Calculate Project Cost</span>
                  <Calculator className="w-4 h-4 transition-transform duration-300 group-hover:rotate-[-8deg]" />
                </a>

                <Link
                  href="/work"
                  className="px-6 py-4 rounded-xl border border-slate-300 bg-white/70 text-slate-800 text-xs font-bold uppercase tracking-wider hover:border-slate-900 hover:bg-white transition-colors duration-300 text-center"
                >
                  View Case Studies
                </Link>
              </div>
            </div>

            {/* THREE.JS CONTAINER - SIMPLE ORIGINAL LOOK */}
            <div className="md:col-span-5 relative flex items-center justify-center min-h-[280px] sm:min-h-[360px]">
              <div className="absolute -z-10 w-60 sm:w-72 h-60 sm:h-72 bg-amber-500/10 rounded-full blur-3xl" />

              <div
                ref={canvasContainerRef}
                className="w-full h-[280px] sm:h-[360px] cursor-grab active:cursor-grabbing rounded-2xl relative overflow-hidden flex items-center justify-center"
              />

              <div className="absolute bottom-3 right-4 px-3 py-1.5 bg-white/70 backdrop-blur border border-slate-200/80 rounded-full text-[10px] font-bold text-slate-500 pointer-events-none flex items-center gap-1.5">
                <Rotate3D className="w-3 h-3 text-amber-600" />
                Interactive 3D Geometry
              </div>
            </div>
          </div>
        </section>

        {/* COST ESTIMATOR SECTION */}
        <section
          id="pricing"
          className="py-14 sm:py-18 md:py-20 border-b border-[#E8E5DF]"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-5">
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-amber-700 uppercase tracking-[0.2em]">
                Transparent Pricing
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mt-2">
                Project Budget Estimator
              </h2>
            </div>

            <div className="bg-white/70 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
              <button
                onClick={() => setCurrency("INR")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  currency === "INR"
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                ₹ INR
              </button>

              <button
                onClick={() => setCurrency("USD")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  currency === "USD"
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                $ USD
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-8 sm:space-y-10">

              {/* PRIMARY SCOPE */}
              <div>
                <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.16em] mb-4">
                  1. Select Primary Scope
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setPlan("frontend")}
                    className={`group p-5 sm:p-6 rounded-2xl border cursor-pointer transition-colors duration-200 ${
                      plan === "frontend"
                        ? "bg-white border-amber-500 ring-1 ring-amber-500/30"
                        : "bg-white/50 border-slate-200 hover:border-amber-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2.5 bg-slate-100 rounded-xl group-hover:bg-amber-50 transition-colors">
                        <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
                      </div>

                      <span className="text-lg sm:text-xl font-black text-slate-950">
                        {sym}
                        {Math.round(prices.base.frontend * rate).toLocaleString()}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-950 text-sm sm:text-base mb-2">
                      Frontend Web Application
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-500 leading-6">
                      Pixel-perfect React/Next.js interface, 100% responsive, custom animations & optimized SEO.
                    </p>
                  </div>

                  <div
                    onClick={() => setPlan("fullstack")}
                    className={`group p-5 sm:p-6 rounded-2xl border cursor-pointer transition-colors duration-200 ${
                      plan === "fullstack"
                        ? "bg-white border-amber-500 ring-1 ring-amber-500/30"
                        : "bg-white/50 border-slate-200 hover:border-amber-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2.5 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                        <Database className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                      </div>

                      <span className="text-lg sm:text-xl font-black text-slate-950">
                        {sym}
                        {Math.round(prices.base.fullstack * rate).toLocaleString()}+
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-950 text-sm sm:text-base mb-2">
                      Full-Stack Platform
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-500 leading-6">
                      Complete application with Next.js App Router, Database integration, User Auth, & Custom APIs.
                    </p>
                  </div>
                </div>
              </div>

              {/* ADDONS */}
              <div>
                <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.16em] mb-4">
                  2. Choose Optional Add-ons
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      key: "fastDelivery",
                      label: "⚡ Express 48-Hour Delivery",
                      price: prices.addons.fastDelivery,
                    },
                    {
                      key: "adminPanel",
                      label: "⚙️ Custom Admin Dashboard",
                      price: prices.addons.adminPanel,
                    },
                    {
                      key: "seoSetup",
                      label: "🚀 Technical SEO & Performance",
                      price: prices.addons.seoSetup,
                    },
                    {
                      key: "maintenance",
                      label: "🛠️ 1-Month Post-Launch Support",
                      price: prices.addons.maintenance,
                    },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className={`p-4 rounded-xl border text-slate-600 cursor-pointer flex items-center justify-between gap-3 text-xs transition-colors duration-200 ${
                        addons[item.key]
                          ? "border-amber-400 bg-amber-50/60"
                          : "border-slate-200 bg-white/60 hover:border-amber-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <input
                          type="checkbox"
                          checked={addons[item.key]}
                          onChange={() => toggleAddon(item.key)}
                          className="rounded border-slate-300 text-slate-900 focus:ring-amber-500 w-4 h-4"
                        />

                        <span className="text-[11px] sm:text-xs font-medium">
                          {item.label}
                        </span>
                      </div>

                      <span className="font-bold text-slate-900 text-xs whitespace-nowrap">
                        +{sym}
                        {Math.round(item.price * rate).toLocaleString()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* REAL-TIME QUOTE CARD */}
            <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-fit lg:sticky lg:top-24">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                  Real-Time Quote
                </span>

                <h4 className="font-bold text-xl sm:text-2xl mt-2 mb-5 sm:mb-6">
                  Estimated Investment
                </h4>

                <div className="space-y-4 text-xs border-b border-white/10 pb-5 mb-5 text-slate-300">
                  <div className="flex justify-between gap-3">
                    <span>
                      Base Scope (
                      {plan === "frontend" ? "Frontend" : "Full-Stack"})
                    </span>

                    <span className="font-bold text-white whitespace-nowrap">
                      {sym}
                      {Math.round(prices.base[plan] * rate).toLocaleString()}
                    </span>
                  </div>

                  {addons.fastDelivery && (
                    <div className="flex justify-between gap-3 text-slate-400">
                      <span>Express Delivery</span>
                      <span className="whitespace-nowrap">
                        +{sym}
                        {Math.round(prices.addons.fastDelivery * rate).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {addons.adminPanel && (
                    <div className="flex justify-between gap-3 text-slate-400">
                      <span>Admin Dashboard</span>
                      <span className="whitespace-nowrap">
                        +{sym}
                        {Math.round(prices.addons.adminPanel * rate).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {addons.seoSetup && (
                    <div className="flex justify-between gap-3 text-slate-400">
                      <span>Technical SEO</span>
                      <span className="whitespace-nowrap">
                        +{sym}
                        {Math.round(prices.addons.seoSetup * rate).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {addons.maintenance && (
                    <div className="flex justify-between gap-3 text-slate-400">
                      <span>1-Mo Support</span>
                      <span className="whitespace-nowrap">
                        +{sym}
                        {Math.round(prices.addons.maintenance * rate).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-baseline gap-3 mb-6 sm:mb-8">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Total Price
                  </span>

                  <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                    {formattedTotal}
                  </span>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-200 text-center"
              >
                <MessageSquare className="w-4 h-4" />
                Instant WhatsApp Proposal
              </a>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION TO DEDICATED PAGES */}
        <section className="py-12 sm:py-16 text-center border-b border-[#E8E5DF] my-8 sm:my-12">
          <span className="text-[10px] sm:text-xs font-bold text-amber-700 uppercase tracking-[0.2em]">
            Ready to Collaborate?
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight mt-3 mb-4">
            Let’s discuss your next project details.
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-7 max-w-md mx-auto mb-8">
            Check out our detailed case studies, technical skills, or send us an inquiry directly.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href="/work"
              className="px-6 py-3.5 rounded-xl bg-slate-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors duration-200"
            >
              Explore Work
            </Link>

            <Link
              href="/experience"
              className="px-6 py-3.5 rounded-xl border border-slate-300 bg-white/60 text-slate-800 text-xs font-bold uppercase tracking-wider hover:border-slate-900 hover:bg-white transition-colors duration-200"
            >
              Skills & Experience
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-amber-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-700 transition-colors duration-200 flex items-center gap-1.5"
            >
              Contact Us
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>

      {/* GLOBAL FOOTER */}
    </div>
  );
}
