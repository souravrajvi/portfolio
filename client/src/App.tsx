import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SplashScreen } from "@/components/SplashScreen";
import { ScratchFilesProvider } from "@/context/ScratchFilesContext";
import { EditorModeProvider } from "@/context/EditorModeContext";
import Home from "@/pages/Home";
import Experiences from "@/pages/Experiences";
import Projects from "@/pages/Projects";
import Skills from "@/pages/Skills";
import Education from "@/pages/Education";
import Music from "@/pages/Music";
import Books from "@/pages/Books";
import Achievements from "@/pages/Achievements";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Writings from "@/pages/Writings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/experience" component={Experiences} />
        <Route path="/projects" component={Projects} />
        <Route path="/skills" component={Skills} />
        <Route path="/education" component={Education} />
        <Route path="/music" component={Music} />
        <Route path="/books" component={Books} />
        <Route path="/achievements" component={Achievements} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/writings" component={Writings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ScratchFilesProvider>
          <EditorModeProvider>
            {showSplash ? (
              <SplashScreen onComplete={handleSplashComplete} />
            ) : (
              <>
                <Toaster />
                <Router />
              </>
            )}
          </EditorModeProvider>
        </ScratchFilesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
