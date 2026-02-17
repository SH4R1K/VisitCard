import MinecraftWindow from '../components/minecraft-window/minecraft-window';
import { useNavigate } from 'react-router-dom';
import "./ProjectsPage.css"

function ProjectsPage() {
  const navigate = useNavigate();

  // Массив проектов (замените на свои данные)
  const projects = [
    {
      title: 'PumpkinCatch',
      description: 'Небольшая игра на WPF в тематике хэллоуина',
      github: 'https://github.com/SH4R1K/PumpkinCatch',
      icon: '🌍'
    },
    {
      title: 'TechInvent',
      description: 'Информационная система для инвентаризации компьютеров',
      github: 'https://github.com/SH4R1K/TechInvent',
      icon: '🌍'
    },
    {
      title: 'TechInvent',
      description: 'Информационная система для инвентаризации компьютеров',
      github: 'https://github.com/SH4R1K/TechInvent',
      icon: '🌍'
    },
    {
      title: 'TechInvent',
      description: 'Информационная система для инвентаризации компьютеров',
      github: 'https://github.com/SH4R1K/TechInvent',
      icon: '🌍'
    },
    {
      title: 'TechInvent',
      description: 'Информационная система для инвентаризации компьютеров',
      github: 'https://github.com/SH4R1K/TechInvent',
      icon: '🌍'
    },
    {
      title: 'TechInvent',
      description: 'Информационная система для инвентаризации компьютеров',
      github: 'https://github.com/SH4R1K/TechInvent',
      icon: '🌍'
    },
    {
      title: 'TechInvent',
      description: 'Информационная система для инвентаризации компьютеров',
      github: 'https://github.com/SH4R1K/TechInvent',
      icon: '🌍'
    },
    {
      title: 'TechInvent',
      description: 'Информационная система для инвентаризации компьютеров',
      github: 'https://github.com/SH4R1K/TechInvent',
      icon: '🌍'
    },
  ];

  const handleProjectClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <MinecraftWindow title="Мои проекты" onClose={() => navigate('/')}>
      <div className="projects-list">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-item"
            onClick={() => handleProjectClick(project.github)}
          >
            <div className="project-icon">{project.icon}</div>
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </div>
            <div className="project-open">▶</div>
          </div>
        ))}
      </div>
    </MinecraftWindow>
  );
}

export default ProjectsPage;