// Libraries Imports
import { useEffect, useState } from "react";
import { Gpu } from "lucide-react";
// Local Imports
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    setIsInstalled(isStandalone);

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("🔔 Install prompt available");
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("appinstalled", () => {
      console.log("🎉 PWA was installed");
      setIsInstalled(true);
      setIsVisible(false);
    });

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log("❌ No deferred prompt available");
      return;
    }

    try {
      console.log("🔄 Showing install prompt...");
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      console.log(`📝 User response: ${outcome}`);

      if (outcome === "accepted") {
        console.log("✅ User accepted the install prompt");
      } else {
        console.log("❌ User dismissed the install prompt");
      }
    } catch (error) {
      console.error("💥 Error during installation:", error);
    } finally {
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  if (isInstalled || !isVisible || !deferredPrompt) {
    return null;
  }

  return (
    <>
      <Button
        onClick={handleInstallClick}
        variant="outline"
        size="sm"
        className="rounded-lg border cursor-pointer border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400
          hover:bg-gray-900 hover:text-white hover:border-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all bg-white dark:bg-gray-800"
      >
        <Gpu size={14} className="mr-1.5" />
        Install App
      </Button>
    </>
  );
}
