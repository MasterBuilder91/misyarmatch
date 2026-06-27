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
import MisyarForHer from "./pages/MisyarForHer";
import MisyarForHim from "./pages/MisyarForHim";
import NoFakeProfiles from "./pages/NoFakeProfiles";
import WhyMisyarWorks from "./pages/WhyMisyarWorks";
import FAQ from "./pages/FAQ";
import Safety from "./pages/Safety";
import AdminImport from "./pages/AdminImport";
import WhoLikedMe from "./pages/WhoLikedMe";

import BlogIndex from "@/pages/blog/BlogIndex";
import ArticleAfterDivorce from "@/pages/blog/ArticleAfterDivorce";
import ArticleLongDistance from "@/pages/blog/ArticleLongDistance";
import ArticleWidows from "@/pages/blog/ArticleWidows";
import ArticleWhyStaySingle from "@/pages/blog/ArticleWhyStaySingle";
import ArticleHalalAlternatives from "@/pages/blog/ArticleHalalAlternatives";
import ArticleSingleParents from "@/pages/blog/ArticleSingleParents";
import ArticleTalkingBeforeMarriage from "@/pages/blog/ArticleTalkingBeforeMarriage";
import ArticleWaliRights from "@/pages/blog/ArticleWaliRights";
import ArticleSecretNikah from "@/pages/blog/ArticleSecretNikah";
import ArticleLoneliness from "@/pages/blog/ArticleLoneliness";
import ArticleDuaForSpouse from "@/pages/blog/ArticleDuaForSpouse";
import ArticleWifesRights from "@/pages/blog/ArticleWifesRights";
import ArticleIntimacyInIslam from "@/pages/blog/ArticleIntimacyInIslam";
import ArticleWomanDivorce from "@/pages/blog/ArticleWomanDivorce";
import ArticleSecondMarriage from "@/pages/blog/ArticleSecondMarriage";
import ArticleWomanLivingAlone from "@/pages/blog/ArticleWomanLivingAlone";
import ArticleNikahFirst from "@/pages/blog/ArticleNikahFirst";
import ArticleMusicInIslam from "@/pages/blog/ArticleMusicInIslam";
import ArticleBoyfriendGirlfriend from "@/pages/blog/ArticleBoyfriendGirlfriend";
import ArticleGhusl from "@/pages/blog/ArticleGhusl";
import ArticleCryptoHalal from "@/pages/blog/ArticleCryptoHalal";
import ArticleBirthdays from "@/pages/blog/ArticleBirthdays";
import ArticleDepressionIslam from "@/pages/blog/ArticleDepressionIslam";
import ArticleTattoos from "@/pages/blog/ArticleTattoos";
import ArticleConvertingToIslam from "@/pages/blog/ArticleConvertingToIslam";
import ArticleAfterDeathIslam from "@/pages/blog/ArticleAfterDeathIslam";
import ArticleMissFridayPrayer from "@/pages/blog/ArticleMissFridayPrayer";
import ArticleVictorianMarriage from "@/pages/blog/ArticleVictorianMarriage";
import ArticlePornAddiction from "@/pages/blog/ArticlePortAddiction";
import ArticleArrangedMarriage from "@/pages/blog/ArticleArrangedMarriage";
import ArticleMuslimWomanDesire from "@/pages/blog/ArticleMuslimWomanDesire";
import ArticleMuslimDivorceSpiral from "@/pages/blog/ArticleMuslimDivorceSpiral";
import ArticleWaitingForPerfect from "@/pages/blog/ArticleWaitingForPerfect";
import ArticleSecondWife from "@/pages/blog/ArticleSecondWife";
import ArticleHalalDating from "@/pages/blog/ArticleHalalDating";
import ArticleMuslimWomenSexuality from "@/pages/blog/ArticleMuslimWomenSexuality";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/browse" component={Browse} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/muslim-marriage-after-divorce" component={ArticleAfterDivorce} />
      <Route path="/blog/long-distance-islamic-marriage" component={ArticleLongDistance} />
      <Route path="/blog/muslim-widows-remarriage" component={ArticleWidows} />
      <Route path="/blog/why-muslims-stay-single" component={ArticleWhyStaySingle} />
      <Route path="/blog/halal-alternatives-to-dating" component={ArticleHalalAlternatives} />
      <Route path="/blog/muslim-single-parents-marriage" component={ArticleSingleParents} />
      <Route path="/blog/talking-before-marriage" component={ArticleTalkingBeforeMarriage} />
      <Route path="/blog/wali-rights-thayyib" component={ArticleWaliRights} />
      <Route path="/blog/secret-nikah" component={ArticleSecretNikah} />
      <Route path="/blog/loneliness-in-islam" component={ArticleLoneliness} />
      <Route path="/blog/dua-for-spouse" component={ArticleDuaForSpouse} />
      <Route path="/blog/wifes-rights-in-islam" component={ArticleWifesRights} />
      <Route path="/blog/intimacy-in-islam" component={ArticleIntimacyInIslam} />
      <Route path="/blog/woman-divorce-islam" component={ArticleWomanDivorce} />
      <Route path="/blog/second-marriage-islam" component={ArticleSecondMarriage} />
      <Route path="/blog/muslim-woman-living-alone" component={ArticleWomanLivingAlone} />
      <Route path="/blog/nikah-first-always" component={ArticleNikahFirst} />
      <Route path="/blog/music-in-islam" component={ArticleMusicInIslam} />
      <Route path="/blog/boyfriend-girlfriend-islam" component={ArticleBoyfriendGirlfriend} />
      <Route path="/blog/how-to-perform-ghusl" component={ArticleGhusl} />
      <Route path="/blog/is-crypto-halal" component={ArticleCryptoHalal} />
      <Route path="/blog/birthdays-in-islam" component={ArticleBirthdays} />
      <Route path="/blog/depression-and-islam" component={ArticleDepressionIslam} />
      <Route path="/blog/tattoos-in-islam" component={ArticleTattoos} />
      <Route path="/blog/how-to-convert-to-islam" component={ArticleConvertingToIslam} />
      <Route path="/blog/what-happens-after-death-islam" component={ArticleAfterDeathIslam} />
      <Route path="/blog/missing-friday-prayer" component={ArticleMissFridayPrayer} />
      <Route path="/blog/victorian-muslim-marriage" component={ArticleVictorianMarriage} />
      <Route path="/blog/pornography-muslim-men" component={ArticlePornAddiction} />
      <Route path="/blog/arranged-marriage-reality" component={ArticleArrangedMarriage} />
      <Route path="/blog/muslim-woman-desire" component={ArticleMuslimWomanDesire} />
      <Route path="/blog/muslim-divorce-spiral" component={ArticleMuslimDivorceSpiral} />
      <Route path="/blog/waiting-for-perfect-marriage" component={ArticleWaitingForPerfect} />
      <Route path="/blog/being-the-second-wife" component={ArticleSecondWife} />
      <Route path="/blog/halal-dating-contradiction" component={ArticleHalalDating} />
      <Route path="/blog/muslim-women-sexuality-classical" component={ArticleMuslimWomenSexuality} />
      {/* Speed chat removed */}
      <Route path="/matches" component={Matches} />
      <Route path="/messages" component={Messages} />
      <Route path="/messages/:matchId" component={Messages} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/profile/create" component={ProfileCreate} />
      <Route path="/profile/edit" component={ProfileEdit} />
      <Route path="/profile/:userId" component={ProfileView} />
      {/* Pricing hidden — free during launch */}
      <Route path="/what-is-misyar" component={WhatIsMisyar} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/why-misyar-works" component={WhyMisyarWorks} />
      <Route path="/you-do-misyar-already" component={YouDoMisyarAlready} />
      <Route path="/misyar-for-her" component={MisyarForHer} />
      <Route path="/misyar-for-him" component={MisyarForHim} />
      <Route path="/no-fake-profiles" component={NoFakeProfiles} />
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
