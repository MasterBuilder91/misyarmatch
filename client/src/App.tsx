import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Browse from "./pages/Browse";
import SpeedChat from "./pages/SpeedChat";
import Matches from "./pages/Matches";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import ProfileCreate from "./pages/ProfileCreate";
import ProfileEdit from "./pages/ProfileEdit";
import ProfileView from "./pages/ProfileView";
import Pricing from "./pages/Pricing";
import WhatIsMisyar from "./pages/WhatIsMisyar";
import HowItWorks from "./pages/HowItWorks";
import YouDoMisyarAlready from "./pages/YouDoMisyarAlready";
import WhyMisyarWorks from "./pages/WhyMisyarWorks";
import FAQ from "./pages/FAQ";
import Safety from "./pages/Safety";
import AdminImport from "./pages/AdminImport";
import WhoLikedMe from "./pages/WhoLikedMe";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/browse" component={Browse} />
      <Route path="/speed-chat" component={SpeedChat} />
      <Route path="/matches" component={Matches} />
      <Route path="/messages" component={Messages} />
      <Route path="/messages/:matchId" component={Messages} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/profile/create" component={ProfileCreate} />
      <Route path="/profile/edit" component={ProfileEdit} />
      <Route path="/profile/:userId" component={ProfileView} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/what-is-misyar" component={WhatIsMisyar} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/why-misyar-works" component={WhyMisyarWorks} />
      <Route path="/you-do-misyar-already" component={YouDoMisyarAlready} />
      <Route path="/faq" component={FAQ} />
      <Route path="/safety" component={Safety} />
      <Route path="/admin/import" component={AdminImport} />
      <Route path="/who-liked-me" component={WhoLikedMe} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster richColors position="top-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
