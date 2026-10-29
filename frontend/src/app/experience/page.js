"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { CheckCircle2, Layout, Database, Cpu, Award, Rotate3D, Sparkles } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Engineering",
    icon: Layout,
    banner: "/nn.png", // Ensure public/banner5.png exists
    gradient: "from-amber-500/15 via-orange-500/10 to-transparent border-amber-500/30 hover:border-amber-500",
    iconBg: "bg-amber-500 text-slate-950",
    accentText: "text-amber-500",
    skills: ["React.js & Next.js (App Router)", "TypeScript", "Tailwind CSS / Bootstrap5", "Three.js / WebGL 3D", "Framer Motion", "Responsive Web Design"],
  },
  {
    title: "Backend & Systems",
    icon: Database,
    banner: "/banner2.png", // Ensure public/banner.png exists
    gradient: "from-violet-500/15 via-purple-500/10 to-transparent border-violet-500/30 hover:border-violet-500",
    iconBg: "bg-violet-600 text-white",
    accentText: "text-violet-500",
    skills: ["Node.js & Express", "PostgreSQL / Prisma ORM & MongoDB", "RESTful & GraphQL APIs", "User Auth & JWT", "Stripe API Integration", "Serverless Deployment"],
  },
  {
    title: "Performance & Quality",
    icon: Cpu,
    banner: "/banner6.png", // Ensure public/banner2.png exists
    gradient: "from-cyan-500/15 via-blue-500/10 to-transparent border-cyan-500/30 hover:border-cyan-500",
    iconBg: "bg-cyan-600 text-white",
    accentText: "text-cyan-500",
    skills: ["Lighthouse 99+ Speed Standard", "Core Web Vitals Optimization", "Technical SEO Architecture", "Cross-Browser Testing", "Git Version Workflows", "CI/CD Deployment Pipeline"],
  },
];

const workflowSteps = [
  { step: "01", title: "Discovery & Scope", desc: "Analyzing project requirements, defining features list, selecting technical stack, and planning transparent milestones." },
  { step: "02", title: "Architecture & UI", desc: "Wireframing user flows, responsive UI layouts, interactive 3D components, and API schema design." },
  { step: "03", title: "Engineering & Speed", desc: "Writing modular, scalable React/Next.js code with server components, optimized assets, and responsive Tailwind styling." },
  { step: "04", title: "Testing & Launch", desc: "Running Lighthouse performance checks, cross-device QA testing, SEO indexing setup, and production deployment." },
];

export default function ExperiencePage() {
  const canvasContainerRef = useRef(null);

  // --- Three.js 3D Animation Setup ---
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TetrahedronGeometry(1.9, 0);
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xd97706, linewidth: 2 });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);

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

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = () => { isDragging = true; };
    const handleMouseUp = () => { isDragging = false; };
    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaMove = {
          x: e.offsetX - previousMousePosition.x,
          y: e.offsetY - previousMousePosition.y,
        };
        mesh.rotation.y += deltaMove.x * 0.01;
        mesh.rotation.x += deltaMove.y * 0.01;
      }
      previousMousePosition = { x: e.offsetX, y: e.offsetY };
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
      if (!container) return;
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

  return (
    <div className="bg-[#F9F8F6] text-[#111111] font-sans min-h-screen grid-pattern relative overflow-x-hidden">
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16 space-y-12 md:space-y-20">

        {/* TOP BANNER WITH 3D INTERACTIVE GRAPHIC */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-[#E8E5DF] pb-8 md:pb-12 grid md:grid-cols-12 gap-8 items-center"
        >
          <div className="md:col-span-7 space-y-4">
            <span className="text-[10px] md:text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100/70 px-3 py-1 rounded-full">
              Engineering Capabilities
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Full-stack skills & <br className="hidden sm:inline" />
              <span className="text-slate-400 font-normal">battle-tested standards.</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
              We focus on clean architecture, lightning-fast rendering speeds, and intuitive UI interactions for high-conversion web platforms.
            </p>
          </div>

          {/* THREE.JS CONTAINER */}
          <div className="md:col-span-5 relative flex items-center justify-center min-h-[260px] sm:min-h-[320px]">
            <div className="absolute -z-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl" />
            <div
              ref={canvasContainerRef}
              className="w-full h-[260px] sm:h-[320px] cursor-grab active:cursor-grabbing rounded-2xl relative overflow-hidden flex items-center justify-center"
            />
            <div className="absolute bottom-3 right-4 px-3 py-1.5 bg-white/80 backdrop-blur border border-slate-200/80 rounded-full text-[10px] font-bold text-slate-500 pointer-events-none flex items-center gap-1.5 shadow-sm">
              <Rotate3D className="w-3 h-3 text-amber-600" />
              Interactive 3D Geometry
            </div>
          </div>
        </motion.div>

        {/* COLORFUL SKILLS CARDS SECTION WITH PROMINENT BANNERS */}
        <section>
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <Award className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Technical Expertise</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`bg-gradient-to-br ${cat.gradient} bg-white border rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group overflow-hidden`}
                >
                  <div className="space-y-5">
                    {/* Prominent Banner Image on top of each card */}
                    <div className="w-full h-40 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 relative">
                      <img
                        src={cat.banner}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur text-white rounded-lg flex items-center gap-1.5 shadow">
                        <Icon className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[10px] font-bold">{cat.title}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 pt-2">
                      {cat.skills.map((skill, sIdx) => (
                        <li key={sIdx} className="text-xs sm:text-sm text-slate-700 font-medium flex items-center gap-2.5">
                          <CheckCircle2 className={`w-4 h-4 ${cat.accentText} flex-shrink-0`} />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Production Grade
                    </span>
                    <span className="text-amber-600">S&S Standard</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* WORKFLOW STEPS SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900 text-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl"
        >
          <div className="max-w-2xl mb-8 md:mb-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              Our Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">How we engineer projects from scratch</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {workflowSteps.map((ws, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700/80 rounded-xl md:rounded-2xl p-5 sm:p-6 space-y-2.5 sm:space-y-3 relative group hover:border-amber-500/50 transition">
                <span className="text-2xl sm:text-3xl font-black text-amber-400">{ws.step}</span>
                <h4 className="font-bold text-sm sm:text-base text-white">{ws.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{ws.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}