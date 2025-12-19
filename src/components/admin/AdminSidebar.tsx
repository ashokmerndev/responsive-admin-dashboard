// import { NavLink } from '@/components/NavLink';
// import { useLocation } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   Package,
//   ShoppingCart,
//   Users,
//   MessageSquare,
//   Settings,
//   BarChart3,
//   Boxes,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from '@/components/ui/sidebar';
// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';

// const mainMenuItems = [
//   { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
//   { title: 'Products', url: '/admin/products', icon: Package },
//   { title: 'Orders', url: '/admin/orders', icon: ShoppingCart },
//   { title: 'Customers', url: '/admin/customers', icon: Users },
//   { title: 'Inventory', url: '/admin/inventory', icon: Boxes },
//   { title: 'Support', url: '/admin/support', icon: MessageSquare },
//   { title: 'Analytics', url: '/admin/analytics', icon: BarChart3 },
// ];

// const settingsItems = [
//   { title: 'Settings', url: '/admin/settings', icon: Settings },
// ];

// export function AdminSidebar() {
//   const { open, toggleSidebar } = useSidebar();
//   const location = useLocation();

//   const isActive = (path: string) => {
//     if (path === '/admin') {
//       return location.pathname === '/admin';
//     }
//     return location.pathname.startsWith(path);
//   };

//   return (
//     <Sidebar className="border-r border-sidebar-border" collapsible="icon">
//       <SidebarContent className="bg-sidebar">
//         {/* Logo Section */}
//         <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
//           {open && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex items-center gap-2"
//             >
//               <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
//                 <span className="text-primary-foreground font-bold text-sm">H</span>
//               </div>
//               <div>
//                 <h1 className="text-sm font-bold text-sidebar-foreground">VARSHINI HYUNDAI</h1>
//                 <p className="text-xs text-sidebar-foreground/70">Spares Admin</p>
//               </div>
//             </motion.div>
//           )}
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={toggleSidebar}
//             className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
//           >
//             {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
//           </Button>
//         </div>

//         {/* Main Menu */}
//         <SidebarGroup className="mt-4">
//           <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase px-4">
//             {open ? 'Main Menu' : ''}
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {mainMenuItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <NavLink
//                       to={item.url}
//                       end={item.url === '/admin'}
//                       className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-smooth rounded-md"
//                       activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium border-l-2 border-primary"
//                     >
//                       <item.icon className="h-5 w-5" />
//                       {open && <span>{item.title}</span>}
//                     </NavLink>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         {/* Settings */}
//         <SidebarGroup className="mt-auto">
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {settingsItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <NavLink
//                       to={item.url}
//                       className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-smooth rounded-md"
//                       activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium"
//                     >
//                       <item.icon className="h-5 w-5" />
//                       {open && <span>{item.title}</span>}
//                     </NavLink>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild>
//                   <button
//                     onClick={() => {/* Handle logout */}}
//                     className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/80 hover:text-destructive hover:bg-sidebar-accent transition-smooth rounded-md w-full"
//                   >
//                     <LogOut className="h-5 w-5" />
//                     {open && <span>Logout</span>}
//                   </button>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }



import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  BarChart3,
  Boxes,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mainMenuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Products", url: "/admin/products", icon: Package },
  { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { title: "Customers", url: "/admin/customers", icon: Users },
  { title: "Inventory", url: "/admin/inventory", icon: Boxes },
  { title: "Support", url: "/admin/support", icon: MessageSquare },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
];

const settingsItems = [
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  const [logoutPopup, setLogoutPopup] = useState(false);

  const handleLogoutConfirm = () => {
    try {
      Cookies.remove("token", { sameSite: "strict" });
      Cookies.remove("admin", { sameSite: "strict" });

      localStorage.clear();
      sessionStorage.clear();

      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/auth/login";
    }
  };

  return (
    <>
      {/* 🔥 Stylish Logout Popup */}
      {logoutPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[999]"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="
              bg-white/10 backdrop-blur-xl border border-white/20 
              rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm text-center 
              text-white
            "
          >
            <h2 className="text-xl font-bold mb-3">Confirm Logout</h2>
            <p className="text-purple-200 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setLogoutPopup(false)}
                className="
                  px-5 py-2 rounded-lg 
                  bg-white/20 hover:bg-white/30 
                  transition-all border border-white/20
                "
              >
                Cancel
              </button>

              <button
                onClick={handleLogoutConfirm}
                className="
                  px-5 py-2 rounded-lg 
                  bg-red-500 hover:bg-red-600 
                  transition-all shadow-lg shadow-red-500/40
                "
              >
                Logout
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Sidebar
        className="
          border-r border-purple-500/20
          bg-gradient-to-b from-[#3b1d99] via-[#2f186c] to-[#1c1047]
          text-white shadow-xl
        "
        collapsible="icon"
      >
        <SidebarContent>
          {/* LOGO */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
            {open && (
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="
                    w-10 h-10 rounded-xl 
                    bg-gradient-to-br from-purple-500 to-blue-500 
                    flex items-center justify-center 
                    shadow-lg shadow-purple-500/50
                  "
                >
                  <span className="font-bold text-lg text-white">H</span>
                </motion.div>

                <div>
                  <h1 className="text-base font-extrabold tracking-wide">
                    VARSHINI HYUNDAI
                  </h1>
                  <p className="text-xs text-purple-200/70">Spares Admin</p>
                </div>
              </motion.div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-white hover:bg-white/10"
            >
              {open ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          </div>

          {/* MAIN MENU */}
          <SidebarGroup className="mt-5">
            {open && (
              <SidebarGroupLabel className="uppercase text-xs tracking-wider px-4 text-purple-200/60">
                Main Menu
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu>
                {mainMenuItems.map((item) => {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-2 rounded-lg 
                            transition-all duration-300

                            ${
                              isActive
                                ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30 text-white border border-white/20"
                                : "text-purple-200 hover:bg-white/10 hover:text-white"
                            }
                          `}
                        >
                          <item.icon className="h-5 w-5" />
                          {open && <span className="text-sm">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* SETTINGS */}
          <SidebarGroup className="mt-auto mb-4">
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) => `
                          flex items-center gap-3 px-4 py-2 rounded-lg
                          transition-all

                          ${
                            isActive
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg border border-white/20 text-white"
                              : "text-purple-200 hover:text-white hover:bg-white/10"
                          }
                        `}
                      >
                        <item.icon className="h-5 w-5" />
                        {open && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {/* LOGOUT */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => setLogoutPopup(true)}
                      className="
                        flex items-center gap-3 px-4 py-2 rounded-lg
                        text-red-300 hover:text-red-400 hover:bg-red-400/10
                        transition-all
                      "
                    >
                      <LogOut className="h-5 w-5" />
                      {open && <span className="text-sm">Logout</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
