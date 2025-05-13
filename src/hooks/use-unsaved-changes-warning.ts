"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useUnsavedChangesWarning = (hasUnsavedChanges: boolean) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPathRef = useRef(pathname);
  const [nextPath, setNextPath] = useState<string | null>(null);

  // Handle refresh or tab close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    const currentPath = window.location.pathname;

    // Push a dummy state to allow us to detect back navigation
    window.history.replaceState(
      { hasUnsavedChangesCheck: true },
      "",
      currentPath,
    );

    const handlePopState = (event: PopStateEvent) => {
      const isGoingBack = event.state && event.state.hasUnsavedChangesCheck;

      if (hasUnsavedChanges && isGoingBack) {
        const confirmLeave = window.confirm(
          "You have unsaved changes. Do you want to leave this page?",
        );

        if (!confirmLeave) {
          // User cancelled: push the same state again to block going back
          window.history.pushState(
            { hasUnsavedChangesCheck: true },
            "",
            currentPath,
          );
        } else {
          // Let user go: remove our flag so they don't get stuck in a loop
          window.history.replaceState({}, "", window.location.pathname);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasUnsavedChanges]);

  // Detect route change via usePathname
  useEffect(() => {
    if (nextPath && nextPath !== pathname) {
      currentPathRef.current = pathname;
      setNextPath(null);
    }
  }, [pathname, nextPath]);

  // Override router.push (programmatic navigation)
  useEffect(() => {
    const originalPush = router.push;
    const customPush = (url: string, options?: any) => {
      if (hasUnsavedChanges) {
        const confirmLeave = window.confirm(
          "You have unsaved changes. Leave this page?",
        );
        if (!confirmLeave) return;
      }
      setNextPath(url);
      originalPush(url, options);
    };

    // @ts-ignore
    router.push = customPush;
    return () => {
      // @ts-ignore
      router.push = originalPush;
    };
  }, [hasUnsavedChanges, router]);

  // Intercept <a> tag clicks (e.g., from <Link>)
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;

      // If it's not a local Next.js route, ignore
      const isInternal =
        href.startsWith("/") || href.startsWith(window.location.origin);
      if (!isInternal) return;

      if (hasUnsavedChanges) {
        const confirmLeave = window.confirm(
          "You have unsaved changes. Leave this page?",
        );
        if (!confirmLeave) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener("click", handleLinkClick, true);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
    };
  }, [hasUnsavedChanges]);
};
