import React, { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [typingText, setTypingText] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const roles = ["Frontend Developer", "React Developer", "UI/UX Enthusiast", "Web Designer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initialize AOS
  useEffect(() => {
    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: "ease-out-cubic",
      });
    }
  }, []);

  // Typing animation effect
  useEffect(() => {
    const typeEffect = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        setTypingText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setTypingText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    };

    const timer = setTimeout(typeEffect, 100);
    return () => clearTimeout(timer);
  }, [roleIndex, charIndex, isDeleting, roles]);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(scrolled);
      setShowBackToTop(window.scrollY > 300);

      // Update active section
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        variant: "default",
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        className: "bg-green-500 text-white border-green-600",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const skills = [
    { icon: "fab fa-html5", name: "HTML5", description: "Semantic markup", color: "text-orange-500" },
    { icon: "fab fa-css3-alt", name: "CSS3", description: "Modern styling", color: "text-blue-500" },
    { icon: "fab fa-js-square", name: "JavaScript", description: "ES6+ features", color: "text-yellow-500" },
    { icon: "fab fa-react", name: "React", description: "Component-based", color: "text-cyan-400" },
    { icon: "fab fa-bootstrap", name: "Bootstrap", description: "Responsive design", color: "text-purple-500" },
    { icon: "fab fa-git-alt", name: "Git", description: "Version control", color: "text-red-500" },
    { icon: "fab fa-figma", name: "Figma", description: "UI/UX design", color: "text-pink-500" },
    { icon: "fas fa-database", name: "MySQL", description: "Database design", color: "text-green-500" },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Redux, and payment integration.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      tech: ["React", "Redux", "Node.js"],
    },
    {
      title: "Task Management App",
      description: "A productivity app with drag-and-drop functionality and real-time updates.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      tech: ["React", "Firebase", "Tailwind"],
    },
    {
      title: "Weather App",
      description: "A beautiful weather application with location-based forecasts and animations.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      tech: ["JavaScript", "API", "CSS3"],
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website with smooth animations and modern design.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      tech: ["HTML5", "CSS3", "JavaScript"],
    },
    {
      title: "Blog Platform",
      description: "A full-featured blog platform with user authentication and content management.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      tech: ["React", "MongoDB", "Express"],
    },
    {
      title: "Chat Application",
      description: "A real-time chat application with Socket.io and modern UI components.",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      tech: ["React", "Socket.io", "Node.js"],
    },
  ];

  return (
    <div className="bg-background text-foreground font-sans">
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 navbar-blur bg-background/90 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-xl font-bold text-primary"
              data-testid="brand-logo"
            >
              Aman Kumar
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {["home", "about", "skills", "projects", "services", "experience", "education", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                  data-testid={`nav-link-${section}`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-2"
                aria-label="Toggle theme"
                data-testid="theme-toggle"
              >
                {theme === "light" ? (
                  <i className="fas fa-moon text-blue-400" />
                ) : (
                  <i className="fas fa-sun text-yellow-400" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                data-testid="mobile-menu-toggle"
              >
                <div className="w-6 h-6 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`} />
                  <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`} />
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              {["home", "about", "skills", "projects", "services", "experience", "education", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block text-foreground hover:text-primary transition-colors capitalize"
                  data-testid={`mobile-nav-link-${section}`}
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-background pt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
            <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0" data-aos="fade-up">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                Hi, I'm <span className="text-primary">Aman Kumar</span>
              </h1>
              <div className="text-2xl lg:text-3xl text-muted-foreground mb-6">
                I'm a <span className="text-primary typing-animation">{typingText}</span>
              </div>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0">
                Passionate about creating beautiful, responsive web applications with modern technologies like React, JavaScript, and cutting-edge design principles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-semibold transition-all hover:scale-105"
                  data-testid="button-hire-me"
                >
                  <i className="fas fa-briefcase mr-2" />Hire Me
                </Button>
                <Button 
                  variant="outline"
                  className="border-border hover:bg-secondary px-8 py-3 font-semibold transition-all hover:scale-105"
                  data-testid="button-download-cv"
                >
                  <i className="fas fa-download mr-2" />Download CV
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center" data-aos="zoom-in" data-aos-delay="200">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                  alt="Aman Kumar - Frontend Developer" 
                  className="w-80 h-80 rounded-full object-cover shadow-2xl border-4 border-primary"
                  data-testid="profile-image"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary rounded-full p-4 shadow-lg animate-bounce-slow">
                  <i className="fas fa-code text-primary-foreground text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">About Me</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Get to know me!</h3>
                <p className="text-muted-foreground mb-6">
                  I'm a passionate Frontend Developer with expertise in building responsive, user-friendly web applications. 
                  I love turning complex problems into simple, beautiful designs and bringing ideas to life through code.
                </p>
                <p className="text-muted-foreground mb-8">
                  With a strong foundation in React, JavaScript, and modern web technologies, I create digital experiences 
                  that are not only functional but also delightful to use. I'm always eager to learn new technologies 
                  and improve my craft.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center space-x-3" data-testid="contact-info-name">
                    <i className="fas fa-user text-primary" />
                    <span>Name: Aman Kumar</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="contact-info-email">
                    <i className="fas fa-envelope text-primary" />
                    <span>Email: aman@example.com</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="contact-info-location">
                    <i className="fas fa-map-marker-alt text-primary" />
                    <span>Location: India</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="contact-info-phone">
                    <i className="fas fa-phone text-primary" />
                    <span>Phone: +91 12345 67890</span>
                  </div>
                </div>

                <div className="flex space-x-4 mb-8">
                  <a 
                    href="#" 
                    className="text-primary hover:text-primary/80 text-2xl transition-colors" 
                    aria-label="LinkedIn"
                    data-testid="social-linkedin"
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                  <a 
                    href="#" 
                    className="text-primary hover:text-primary/80 text-2xl transition-colors" 
                    aria-label="GitHub"
                    data-testid="social-github"
                  >
                    <i className="fab fa-github" />
                  </a>
                  <a 
                    href="#" 
                    className="text-primary hover:text-primary/80 text-2xl transition-colors" 
                    aria-label="Instagram"
                    data-testid="social-instagram"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 font-semibold transition-all hover:scale-105"
                  data-testid="button-lets-talk"
                >
                  Let's Talk
                </Button>
              </div>
              
              <div data-aos="fade-left" data-aos-delay="200">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                  alt="Developer workspace with laptop and coding setup" 
                  className="rounded-xl shadow-2xl w-full h-auto"
                  data-testid="workspace-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">My Skills</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <Card 
                key={skill.name}
                className="hover-lift text-center p-6"
                data-aos="flip-left" 
                data-aos-delay={`${(index + 1) * 100}`}
                data-testid={`skill-card-${skill.name.toLowerCase()}`}
              >
                <CardContent className="p-0">
                  <i className={`${skill.icon} text-4xl ${skill.color} mb-4`} />
                  <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">My Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <Card 
                key={project.title}
                className="overflow-hidden hover-lift"
                data-aos="fade-up" 
                data-aos-delay={`${(index + 1) * 100}`}
                data-testid={`project-card-${index}`}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  data-testid={`project-image-${index}`}
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                        data-testid={`tech-tag-${tech.toLowerCase()}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold"
                      data-testid={`button-live-demo-${index}`}
                    >
                      <i className="fas fa-external-link-alt mr-2" />Live Demo
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-border hover:bg-secondary text-sm font-semibold"
                      data-testid={`button-github-${index}`}
                    >
                      <i className="fab fa-github mr-2" />GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">My Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "fas fa-code",
                title: "Web Development",
                description: "Custom web applications built with modern technologies and best practices.",
                features: ["React & JavaScript", "Responsive Design", "Performance Optimization"],
              },
              {
                icon: "fas fa-mobile-alt",
                title: "Responsive UI",
                description: "Mobile-first responsive interfaces that work seamlessly across all devices.",
                features: ["Mobile Optimization", "Cross-browser Compatibility", "Touch-friendly Interfaces"],
              },
              {
                icon: "fas fa-spa",
                title: "React SPA",
                description: "Single Page Applications with smooth navigation and dynamic content loading.",
                features: ["State Management", "Component Architecture", "API Integration"],
              },
              {
                icon: "fas fa-paint-brush",
                title: "Figma to Code",
                description: "Converting design mockups into pixel-perfect, functional web interfaces.",
                features: ["Pixel-perfect Implementation", "Design System Integration", "Interactive Prototypes"],
              },
            ].map((service, index) => (
              <Card 
                key={service.title}
                className="hover-lift text-center p-8"
                data-aos="fade-up" 
                data-aos-delay={`${(index + 1) * 100}`}
                data-testid={`service-card-${index}`}
              >
                <CardContent className="p-0">
                  <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className={`${service.icon} text-primary text-2xl`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">Experience</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {[
                {
                  title: "Senior Frontend Developer",
                  company: "TechCorp Solutions",
                  period: "2023 - Present",
                  description: "Led the development of multiple React-based web applications, mentored junior developers, and implemented best practices for code quality and performance optimization.",
                  achievements: [
                    "Built and maintained 5+ production React applications",
                    "Improved application performance by 40% through optimization",
                    "Mentored 3 junior developers and established coding standards",
                  ],
                },
                {
                  title: "Frontend Developer",
                  company: "Digital Innovations Ltd",
                  period: "2021 - 2023",
                  description: "Developed responsive web applications using React, JavaScript, and modern CSS frameworks. Collaborated with design teams to create pixel-perfect user interfaces.",
                  achievements: [
                    "Developed 10+ responsive web applications",
                    "Collaborated with UX/UI designers on 15+ projects",
                    "Implemented accessibility standards (WCAG 2.1)",
                  ],
                },
                {
                  title: "Junior Web Developer",
                  company: "StartUp Solutions",
                  period: "2020 - 2021",
                  description: "Started my career building static websites and learning modern web technologies. Gained experience in HTML, CSS, JavaScript, and basic React development.",
                  achievements: [
                    "Built 20+ static websites using HTML, CSS, JavaScript",
                    "Learned React and modern frontend tooling",
                    "Participated in code reviews and team meetings",
                  ],
                },
              ].map((exp, index) => (
                <div 
                  key={exp.title}
                  className="timeline-item relative pl-12 pb-12"
                  data-aos="fade-right"
                  data-aos-delay={`${index * 200}`}
                  data-testid={`experience-item-${index}`}
                >
                  <div className="absolute left-0 top-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <i className={`fas ${index === 0 ? 'fa-briefcase' : index === 1 ? 'fa-laptop-code' : 'fa-code'} text-primary-foreground`} />
                  </div>
                  <Card className="ml-4">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        <span className="text-primary font-medium">{exp.period}</span>
                      </div>
                      <p className="text-primary mb-3">{exp.company}</p>
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {exp.achievements.map((achievement) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">Education</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  degree: "Master of Computer Applications",
                  period: "2018 - 2020",
                  institution: "University of Technology",
                  description: "Specialized in software development, data structures, algorithms, and modern programming languages. Completed projects in web development, database management, and software engineering.",
                  grade: "First Class with Distinction (8.5/10 CGPA)",
                  subjects: "Software Engineering, Web Technologies, Database Systems",
                },
                {
                  degree: "Bachelor of Computer Applications",
                  period: "2015 - 2018",
                  institution: "State University",
                  description: "Foundation in computer science principles, programming fundamentals, and basic web development. Developed strong analytical and problem-solving skills through various programming assignments.",
                  grade: "First Class (7.8/10 CGPA)",
                  subjects: "Programming in C/C++, Java, Web Development, Mathematics",
                },
              ].map((edu, index) => (
                <Card 
                  key={edu.degree}
                  className="hover-lift p-8"
                  data-aos="fade-up" 
                  data-aos-delay={`${(index + 1) * 100}`}
                  data-testid={`education-card-${index}`}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                        <i className={`fas ${index === 0 ? 'fa-graduation-cap' : 'fa-user-graduate'} text-primary text-xl`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{edu.degree}</h3>
                        <p className="text-primary">{edu.period}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      <strong>{edu.institution}</strong>
                    </p>
                    <p className="text-muted-foreground mb-4">{edu.description}</p>
                    <div className="border-t border-border pt-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Grade:</strong> {edu.grade}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong>Key Subjects:</strong> {edu.subjects}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">Get In Touch</h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div data-aos="fade-right">
                <h3 className="text-2xl font-semibold mb-6">Let's work together!</h3>
                <p className="text-muted-foreground mb-8">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you have a project in mind or just want to say hello, feel free to reach out!
                </p>
                
                <div className="space-y-6">
                  {[
                    { icon: "fas fa-envelope", title: "Email", value: "aman.developer@example.com" },
                    { icon: "fas fa-phone", title: "Phone", value: "+91 12345 67890" },
                    { icon: "fas fa-map-marker-alt", title: "Location", value: "Mumbai, India" },
                  ].map((contact) => (
                    <div key={contact.title} className="flex items-center space-x-4" data-testid={`contact-${contact.title.toLowerCase()}`}>
                      <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center">
                        <i className={`${contact.icon} text-primary`} />
                      </div>
                      <div>
                        <p className="font-medium">{contact.title}</p>
                        <p className="text-muted-foreground">{contact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4 mt-8">
                  {[
                    { icon: "fab fa-linkedin", label: "LinkedIn" },
                    { icon: "fab fa-github", label: "GitHub" },
                    { icon: "fab fa-instagram", label: "Instagram" },
                    { icon: "fab fa-twitter", label: "Twitter" },
                  ].map((social) => (
                    <a 
                      key={social.label}
                      href="#" 
                      className="bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center transition-all" 
                      aria-label={social.label}
                      data-testid={`social-${social.label.toLowerCase()}`}
                    >
                      <i className={`${social.icon} text-xl`} />
                    </a>
                  ))}
                </div>
              </div>

              <div data-aos="fade-left">
                <Card className="p-8">
                  <CardContent className="p-0">
                    <form onSubmit={handleSubmit} data-testid="contact-form">
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your Name"
                            required
                            data-testid="input-name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                            data-testid="input-email"
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                        <Input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Project Discussion"
                          data-testid="input-subject"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          placeholder="Tell me about your project..."
                          required
                          data-testid="textarea-message"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-semibold transition-all hover:scale-[1.02]"
                        data-testid="button-send-message"
                      >
                        <i className="fas fa-paper-plane mr-2" />Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Aman Kumar</h3>
              <p className="text-muted-foreground mb-4">
                Frontend Developer passionate about creating beautiful and functional web experiences.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: "fab fa-linkedin", label: "LinkedIn" },
                  { icon: "fab fa-github", label: "GitHub" },
                  { icon: "fab fa-instagram", label: "Instagram" },
                  { icon: "fab fa-twitter", label: "Twitter" },
                ].map((social) => (
                  <a 
                    key={social.label}
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors" 
                    aria-label={social.label}
                    data-testid={`footer-social-${social.label.toLowerCase()}`}
                  >
                    <i className={`${social.icon} text-xl`} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["home", "about", "skills", "projects", "contact"].map((section) => (
                  <li key={section}>
                    <button 
                      onClick={() => scrollToSection(section)}
                      className="text-muted-foreground hover:text-primary transition-colors capitalize"
                      data-testid={`footer-link-${section}`}
                    >
                      {section}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {["Web Development", "Responsive Design", "React Applications", "UI/UX Implementation"].map((service) => (
                  <li key={service}>
                    <span className="text-muted-foreground">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground">
              © 2025 Aman Kumar. All rights reserved. Built with ❤️ and React.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
          data-testid="button-back-to-top"
        >
          <i className="fas fa-arrow-up" />
        </Button>
      )}
    </div>
  );
}
