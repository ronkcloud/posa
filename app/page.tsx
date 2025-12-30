import Image from "next/image";
import { Settings, Bell, Lamp } from 'lucide-react'
import { SidePanel } from "./components/side-panel";

export default function Home() {
    const sidebarItems = [
        { icon: <Bell size={20} />, label: "Notifications" },
        { icon: <Settings size={20} />, label: "Settings" },
        { icon: <Lamp size={20} />, label: "Ideas" },
    ]

    return (
        <div id="app" className="flex w-full h-full bg-bg">
            <SidePanel items={sidebarItems} />
        </div>
    )
}
