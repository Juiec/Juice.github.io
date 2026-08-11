import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Github, Mail, ChevronDown, ArrowRight, Code, Zap, Shield, Users } from 'lucide-react';

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
        <meshBasicMaterial color="#3b82f6" wireframe />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
        <meshBasicMaterial color="#3b82f6" wireframe />
      </mesh>
      <mesh position={[-0.5, 1.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
        <meshBasicMaterial color="#3b82f6" wireframe />
      </mesh>
      <mesh position={[0.5, 1.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
        <meshBasicMaterial color="#3b82f6" wireframe />
      </mesh>
      <mesh position={[-0.2, -0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
        <meshBasicMaterial color="#3b82f6" wireframe />
      </mesh>
      <mesh position={[0.2, -0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
        <meshBasicMaterial color="#3b82f6" wireframe />
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
    <nav className="fixed top-0 w-full z-50 bg-darker/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tight">
          Portfolio
        </div>
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-muted hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </div>
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-2">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-darker absolute w-full border-b border-border">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="block text-muted hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark z-1"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          <span className="text-gradient">Machine Learning Engineer</span>
          <br />
          <span className="text-muted">&amp; Learning Designer</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-8"
        >
          Bridging AI Technology with Educational Science
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-4"
        >
          <a 
            href="#projects" 
            className="px-6 py-3 bg-accent hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            View Projects
          </a>
          <a 
            href="#contact" 
            className="px-6 py-3 border border-border hover:border-white/30 text-white rounded-lg transition-colors font-medium"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <a href="#about" className="inline-block p-3 rounded-full border border-border hover:bg-white/10 transition-colors">
          <ChevronDown size={24} />
        </a>
      </motion.div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Projects", value: "10+", icon: Code },
    { label: "Years Experience", value: "3+", icon: Zap },
    { label: "Countries", value: "5+", icon: Users },
  ];

  return (
    <section className="py-16 border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted uppercase tracking-wider text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 px-4 max-w-6xl mx-auto section-divider">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-muted text-lg leading-relaxed mb-6">
              I hold a degree in Learning Design &amp; Technology (LDTE) from CUHK. My work focuses on the intersection of Artificial Intelligence and Educational Science.
            </p>
            <p className="text-muted text-lg leading-relaxed">
              I specialize in Python and C++, building systems that enhance learning through data and computer vision.
            </p>
          </div>
          <div className="code-block">
            <div className="mb-2 text-muted">// Tech Stack</div>
            <div>{`languages: ["Python", "C++"]`}</div>
            <div>{`focus: ["AI", "Education"]`}</div>
            <div>{`education: "CUHK - LDTE"`}</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const ProjectCard = ({ title, description, tags, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-hover bg-dark border border-border p-6 rounded-lg"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Figure Skating AI",
      description: "AI-assisted judging system using YOLOe and VideoPose3D to reduce bias in technical scoring.",
      tags: ["Computer Vision", "Python", "YOLO", "3D Pose Estimation"]
    },
    {
      title: "Automated Data Pipeline",
      description: "Python-based scraper using Playwright and BeautifulSoup to automate figure skating video collection and metadata extraction.",
      tags: ["Automation", "Python", "Data Engineering", "Docker"]
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 max-w-6xl mx-auto section-divider">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              {...project} 
              index={index} 
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    "Python", "C++", "React", "Docker", "FastAPI", "Three.js", "Machine Learning"
  ];

  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto section-divider">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              key={skill}
              className="card-hover p-4 bg-dark border border-border rounded text-center font-mono text-sm hover:border-accent/30"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Contact = () => {
  return (
    <footer id="contact" className="py-20 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted mb-8">Let's discuss AI in Education.</p>
          <div className="flex justify-center space-x-6">
            <a 
              href="mailto:your.email@example.com" 
              className="p-3 bg-dark border border-border rounded-full hover:border-accent/30 hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-dark border border-border rounded-full hover:border-accent/30 hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </motion.div>
        <div className="max-w-6xl mx-auto mt-12 text-center text-muted text-sm">
          © 2026 Portfolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

function App() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;