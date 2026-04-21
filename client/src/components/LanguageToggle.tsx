import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-rose-700 hover:bg-rose-50 px-2"
      title={language === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">{language === "en" ? "العربية" : "English"}</span>
    </Button>
  );
}
