import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

export default function Settings() {
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your admin preferences and account settings</p>
      </div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                 MS
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
                <p className="text-xs text-muted-foreground">JPG, PNG. Max size 2MB</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="Madiraju Sudhakar" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="sudhakarmadiraju@gmail.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+91 6302720982" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue="Super Admin" disabled />
              </div>
            </div>

            <Button onClick={handleSave}>Save Changes</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>

            <Button onClick={handleSave}>Update Password</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Orders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new orders are placed
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts when products are running low
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Customer Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified of new customer support messages
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email summaries of daily activities
                  </p>
                </div>
                <Switch />
              </div>
            </div>

            <Button onClick={handleSave}>Save Preferences</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { toast } from "sonner";

// export default function Settings() {
//   const [admin, setAdmin] = useState(null);

//   // FETCH ADMIN DATA
//   useEffect(() => {
//     fetch("http://localhost:5000/api/admin/me", {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setAdmin({
//           ...data.admin,
//           currentPassword: "",
//           newPassword: "",
//           confirmPassword: "",
//           notifications: data.admin.notifications || {
//             newOrders: true,
//             lowStock: true,
//             customerMessages: true,
//             emailNotifications: false,
//           },
//         });
//       })
//       .catch(() => toast.error("Failed to load admin profile"));
//   }, []);

//   if (!admin) return <p>Loading...</p>;

//   // --- UPDATE PROFILE ---
//   const handleSaveProfile = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/admin/update-profile", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           name: admin.name,
//           email: admin.email,
//           phone: admin.phone,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       toast.success("Profile updated");
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   // --- CHANGE PASSWORD ---
//   const handlePasswordUpdate = async () => {
//     if (admin.newPassword !== admin.confirmPassword) {
//       toast.error("New passwords do not match");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/admin/change-password", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           currentPassword: admin.currentPassword,
//           newPassword: admin.newPassword,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       toast.success("Password updated");
//       setAdmin({ ...admin, currentPassword: "", newPassword: "", confirmPassword: "" });
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   // --- UPDATE NOTIFICATIONS ---
//   const handleSaveNotifications = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/admin/update-notifications", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(admin.notifications),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       toast.success("Notification preferences saved");
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   // --- UPLOAD AVATAR ---
//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("avatar", file);

//     try {
//       const res = await fetch("http://localhost:5000/api/admin/upload-avatar", {
//         method: "PUT",
//         credentials: "include",
//         body: formData,
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       setAdmin({ ...admin, profileImage: data.imageUrl });
//       toast.success("Profile photo updated");
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold">Settings</h1>
//         <p className="text-muted-foreground mt-1">
//           Manage your admin preferences and account settings
//         </p>
//       </div>

//       {/* Profile Settings */}
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//         <Card className="glass">
//           <CardHeader>
//             <CardTitle>Profile Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {/* Avatar */}
//             <div className="flex items-center gap-4">
//               <Avatar className="h-20 w-20">
//                 <AvatarImage src={admin.profileImage} />
//                 <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
//                   {admin.name?.charAt(0)}
//                 </AvatarFallback>
//               </Avatar>

//               <label className="cursor-pointer">
//                 <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
//                 <Button variant="outline" size="sm">Change Avatar</Button>
//               </label>
//             </div>

//             {/* Inputs */}
//             <div className="grid gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label>Full Name</Label>
//                 <Input
//                   value={admin.name}
//                   onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Email</Label>
//                 <Input
//                   type="email"
//                   value={admin.email}
//                   onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Phone</Label>
//                 <Input
//                   value={admin.phone}
//                   onChange={(e) => setAdmin({ ...admin, phone: e.target.value })}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Role</Label>
//                 <Input value={admin.role} disabled />
//               </div>
//             </div>

//             <Button onClick={handleSaveProfile}>Save Changes</Button>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Security */}
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//         <Card className="glass">
//           <CardHeader>
//             <CardTitle>Security</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Current Password</Label>
//                 <Input
//                   type="password"
//                   value={admin.currentPassword}
//                   onChange={(e) => setAdmin({ ...admin, currentPassword: e.target.value })}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>New Password</Label>
//                 <Input
//                   type="password"
//                   value={admin.newPassword}
//                   onChange={(e) => setAdmin({ ...admin, newPassword: e.target.value })}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Confirm New Password</Label>
//                 <Input
//                   type="password"
//                   value={admin.confirmPassword}
//                   onChange={(e) => setAdmin({ ...admin, confirmPassword: e.target.value })}
//                 />
//               </div>
//             </div>

//             <Button onClick={handlePasswordUpdate}>Update Password</Button>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Notification Settings */}
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//         <Card className="glass">
//           <CardHeader>
//             <CardTitle>Notifications</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             {/* Toggle Items */}
//             {Object.keys(admin.notifications).map((key) => (
//               <div key={key}>
//                 <div className="flex items-center justify-between">
//                   <div className="space-y-0.5">
//                     <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
//                     <p className="text-sm text-muted-foreground">Manage {key}</p>
//                   </div>
//                   <Switch
//                     checked={admin.notifications[key]}
//                     onCheckedChange={(v) =>
//                       setAdmin({
//                         ...admin,
//                         notifications: { ...admin.notifications, [key]: v },
//                       })
//                     }
//                   />
//                 </div>
//                 <Separator />
//               </div>
//             ))}

//             <Button onClick={handleSaveNotifications}>Save Preferences</Button>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }


