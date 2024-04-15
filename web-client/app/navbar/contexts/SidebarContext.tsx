import { ReactNode } from "react";

let isLargeOpen = true;
let isSmallOpen = false;

function isScreenSmall() {
    return typeof window !== 'undefined' && window.innerWidth < 1024;
}

function toggle() {
    if (isScreenSmall()) {
        isSmallOpen = !isSmallOpen;
    } else {
        isLargeOpen = !isLargeOpen;
    }
}

function close() {
    if (isScreenSmall()) {
        isSmallOpen = false;
    } else {
        isLargeOpen = false;
    }
}

const SidebarContext = {
    isLargeOpen,
    isSmallOpen,
    toggle,
    close,
};

function useSidebarContext() {
    return SidebarContext;
}

type SidebarProviderProps = {
    children: ReactNode
  }

function SidebarProvider({ children }: SidebarProviderProps) {
    return (
        <div>
            {children}
        </div>
    );
}

export { useSidebarContext, SidebarProvider };
