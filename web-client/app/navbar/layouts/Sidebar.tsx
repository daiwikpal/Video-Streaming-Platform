import { BookAudioIcon, BookCheckIcon, ChevronDown, ChevronUp, Clock, Home, Library, PlaySquare, Repeat } from "lucide-react";
import { Children, ElementType, ReactNode, useState} from "react";
import { Button, buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import React from "react";
import { useSidebarContext } from "../contexts/SidebarContext";

export function Sidebar() {

    const { isLargeOpen, isSmallOpen, close } = useSidebarContext()
    
    return (
        <>
        <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}>
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={BookCheckIcon} title="My Courses" url="/suscription" />
        <SmallSidebarItem Icon={Repeat} title="WatchPage" url="/watch" />
        </aside>
        
        <aside 
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
            isLargeOpen ? "lg:flex" : "lg:hidden"
          } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
        >
        <LargeSidebarSection>
            <LargeSidebarItem isActive Icon={Home} title="Home" url="/" />
            <LargeSidebarItem Icon={BookCheckIcon} title="My Courses" url="/MyCourses" />
            <LargeSidebarItem Icon={Repeat} title="WatchPage" url="/watch" />
        </LargeSidebarSection>

        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            Icon={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            Icon={BookAudioIcon}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            Icon={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            Icon={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
        </LargeSidebarSection>

        </aside>
        </>
    )
}

type SmallSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string

}

function SmallSidebarItem({Icon, title, url}:
SmallSidebarItemProps) {
    return (
    <a href={url} className={twMerge(buttonStyles({variant: "ghost"}), "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
        <Icon className="w-6 h-6" />
        <div className="text-sm"> {title} </div>
    </a>
    )
}

type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function LargeSidebarSection({ children, title, visibleItemCount = Number.POSITIVE_INFINITY }: LargeSidebarSectionProps) {
    const showExpandButton = React.Children.count(children) > visibleItemCount;
    const visibleChildren = React.Children.toArray(children).slice(0, visibleItemCount);

    return (
        <div>
            {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
            {visibleChildren}
            {showExpandButton && (
                <Button variant="ghost" className="w-full flex items-center rounded-lg gap-4 p-3">
                    <ChevronDown className="w-6 h-6" />
                    <div>Show More</div>
                </Button>
            )}
        </div>
    );
}

type LargeSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
    isActive?: boolean
}
function LargeSidebarItem({Icon, title, url, isActive = false,}: LargeSidebarItemProps) {
    return (
    <a 
        href={url}
        className={twMerge(
            buttonStyles({variant: "ghost"}),
            `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
        )}
    >
    <Icon className="w-6 h-6" />
    <div className="whitespace-nonwrap overflow-hidden text-ellipsis">
        {title}
    </div>
    </a>
    )
}