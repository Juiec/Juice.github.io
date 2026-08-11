import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Github, Mail, ChevronDown, ArrowRight } from 'lucide-react';

// --- 3D Components ---

const SkeletonWireframe = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
  });

  return (
    <group ref={meshRef}>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#111111" wireframe />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
        <meshBasicMaterial color="#111111" wireframe />
      </mesh>
      <mesh position={[-0.5, 1.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
        <meshBasicMaterial color="#111111" wireframe />
      </mesh>
      <mesh position={[0.5, 1.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
        <meshBasicMaterial color="#111111" wireframe />
      </mesh>
      <mesh position={[-0.2, -0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
        <meshBasicMaterial color="#111111" wireframe />
      </mesh>
      <mesh position={[0.2, -0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
        <meshBasicMaterial color="#111111" wireframe />
      </mesh>
    </group>
  );
};

const HeroScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={0.5} count={5000} factor={4} saturation={0} fade />
      <SkeletonWireframe />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate={false}
      />
    </Canvas>
  );
};

// --- UI Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed left-1/2 top-6 transform -translate-x-1/2 w-[90vw] max-w-[1100px] z-50 bg-white border border-border rounded-[24px] flex justify-between items-center px-7 py-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
      <div className="text-2xl font-medium tracking-tight">
        Portfolio
      </div>
      <div className="hidden md:flex gap-12">
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="text-muted hover:text-dark transition-colors text-[0.95rem]"
          >
            {link.name}
          </a>
        ))}
      </div>
      <button 
        className="bg-black text-white px-5 py-3 rounded-full text-sm hover:bg-black/80 transition-colors"
        onClick={() => window.location.href = '#contact'}
      >
        Start creating
      </button>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center container px-10 pt-20">
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative">
        
        {/* Left: Text Content */}
        <div className="relative z-10">
          <div className="font-mono text-muted text-[13px] mb-10 flex items-center gap-[15px]">
            <span className="w-[40px] h-[1px] bg-[#444]"></span>
            Machine Learning Engineer
          </div>

          <h1 className="text-[clamp(3rem,10vw,8rem)] leading-[0.88] tracking-tight font-light">
            The platform<br />
            to <span className="highlight">create</span>
          </h1>

          <p className="mt-10 max-w-[620px] text-[1.8rem] leading-[1.5] text-muted">
            Bridging AI Technology with Educational Science.
          </p>

          <div className="mt-12 flex gap-5">
            <a
              href="#projects"
              className="bg-black text-white px-8 py-4 rounded-full text-lg hover:bg-black/80 transition-colors"
            >
              View work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full text-lg hover:text-muted transition-colors flex items-center gap-2"
            >
              Contact me <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right: 3D Scene */}
        <div className="relative z-10 h-[500px] w-full">
          <HeroScene />
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-20 px-10 container max-w-[1400px] mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-light mb-6">About me</h2>
        <p className="text-xl text-muted leading-relaxed max-w-[600px]">
          I build intelligent systems that solve complex problems. My focus is on natural language processing and computer vision.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-white border border-border rounded-[16px]">
          <h3 className="text-2xl font-mono mb-2">5+</h3>
          <p className="text-muted">Years Experience</p>
        </div>
        <div className="p-6 bg-white border border-border rounded-[16px]">
          <h3 className="text-2xl font-mono mb-2">20+</h3>
          <p className="text-muted">Projects Done</p>
        </div>
      </div>
    </div>
  </section>
);

const Projects = () => {
  const projects = [
    { title: "Neural Chat", desc: "LLM integration for customer service.", tech: "Python, React" },
    { title: "Vision Bot", desc: "Real-time object detection system.", tech: "PyTorch, OpenCV" },
    { title: "Data Flow", desc: "Automated ETL pipeline builder.", tech: "Airflow, SQL" },
  ];

  return (
    <section id="projects" className="py-20 px-10 container max-w-[1400px] mx-auto">
      <h2 className="text-[clamp(2rem,5vw,4rem)] font-light mb-16">Selected work</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <div key={i} className="bg-white border border-border rounded-[24px] p-8 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-shadow">
            <h3 className="text-2xl mb-2">{p.title}</h3>
            <p className="text-muted mb-6">{p.desc}</p>
            <div className="flex gap-2 mb-6">
              {p.tech.split(',').map((t) => (
                <span key={t} className="text-xs font-mono bg-light px-2 py-1 rounded">{t.trim()}</span>
              ))}
            </div>
            <a href="#" className="text-dark font-medium hover:text-muted flex items-center gap-2">
              View project <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    "Python", "PyTorch", "TensorFlow", "React", "Node.js",
    "AWS", "Docker", "Kubernetes", "SQL", "Git"
  ];

  return (
    <section id="skills" className="py-20 px-10 container max-w-[1400px] mx-auto">
      <h2 className="text-[clamp(2rem,5vw,4rem)] font-light mb-16">Capabilities</h2>
      <div className="flex flex-wrap gap-4">
        {skills.map((s) => (
          <div key={s} className="bg-white border border-border px-6 py-3 rounded-full text-lg">
            {s}
          </div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-20 px-10 container max-w-[1400px] mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-light mb-6">Get in touch</h2>
        <p className="text-xl text-muted mb-10">
          I am currently available for new projects.
        </p>
        <div className="flex gap-4">
          <a href="#" className="p-4 border border-border rounded-full hover:bg-black hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="p-4 border border-border rounded-full hover:bg-black hover:text-white transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
      <form className="space-y-6">
        <input
          type="text"
          placeholder="Name"
          className="w-full bg-transparent border-b border-dark pb-4 text-xl focus:outline-none focus:border-muted"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-transparent border-b border-dark pb-4 text-xl focus:outline-none focus:border-muted"
        />
        <textarea
          placeholder="Message"
          className="w-full bg-transparent border-b border-dark pb-4 text-xl focus:outline-none focus:border-muted h-32 resize-none"
        />
        <button className="bg-black text-white px-8 py-4 rounded-full text-lg hover:bg-black/80 transition-colors">
          Send message
        </button>
      </form>
    </div>
  </section>
);

function App() {
  return (
    <div className="relative">
      <div className="grid-bg"></div>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;
