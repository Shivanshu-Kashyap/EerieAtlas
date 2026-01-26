import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { AuthPage } from "./pages/AuthPage";
import { CreateStoryPage } from "./pages/CreateStoryPage";
import { StoriesPage } from "./pages/StoriesPage";
import { StoryDetailPage } from "./pages/StoryDetailPage";

function App() {
  return (
    <div className="antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/create-story" element={<CreateStoryPage />} />
        <Route path="/explore" element={<StoriesPage />} />
        <Route path="/stories/:id" element={<StoryDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
