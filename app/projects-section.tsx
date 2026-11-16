import "./projects-section.css";

const projects = [
  {number:"01", name:"Tactio", category:"SOFTWARE · BALONMANO", image:"/hero/proyecto-tactio.png", alt:"Pantalla de bienvenida de Tactio con una pizarra de balonmano", description:"Un espacio táctico para equipos de balonmano donde crear y compartir jugadas.", url:"https://tactio-rho.vercel.app"},
  {number:"02", name:"Buen Rollito", category:"WEB · HOSTELERÍA", image:"/hero/proyecto-buen-rollito.png", alt:"Página de inicio de Buen Rollito Chimney Cake", description:"Una web para descubrir los chimney cakes de Buen Rollito en León, consultar la carta y encontrar cómo visitar el local o hacer un pedido.", url:"https://buenrollitochimneycake-one.vercel.app"},
];
export function ProjectsSection() {
 return <section id="proyectos" className="projects-section" aria-labelledby="projects-title" tabIndex={-1}>
  <div className="projects-heading"><div><p>UNA SELECCIÓN DE MI TRABAJO / 2026</p><h2 id="projects-title">Proyectos<span>.</span></h2></div><p>Ideas que se convierten<br/>en experiencias reales. ↘</p></div>
  <div className="projects-list">{projects.map(project=><article className="project" key={project.number}>
   <a className="project-image" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visitar ${project.name}, abre en una pestaña nueva`}><img src={project.image} alt={project.alt} loading="lazy"/><span aria-hidden="true">VER PROYECTO ↗</span></a>
   <div className="project-info"><div className="project-meta"><span>{project.number} / {project.category}</span><span>EN DIRECTO ↗</span></div><h3>{project.name}<span>.</span></h3><p>{project.description}</p><a className="project-link" href={project.url} target="_blank" rel="noopener noreferrer">Visitar proyecto <span aria-hidden="true">↗</span><span className="sr-only"> (abre en una pestaña nueva)</span></a></div>
  </article>)}</div>
 </section>;
}
