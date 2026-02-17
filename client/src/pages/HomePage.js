import MinecraftMenu from '../components/MinecraftMenu/MinecraftMenu';

function HomePage() {
  return (
    <div className="page home-page">
      <MinecraftMenu items={[
        {label: "Играть", path: "/game"}, 
        {label: "Обо мне", path: "/about"}, 
        {label: "Проекты", path: "/projects"}, 
        {label: "Друзья", path: "/friends"}, 
        {label: "GitHub", path: "https://github.com/sh4r1k"}]}/>
    </div>
  );
}

export default HomePage;