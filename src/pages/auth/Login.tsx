// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { toast } from "sonner";
// import { Lock, Mail } from "lucide-react";
// import Cookies from "js-cookie";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error("Please enter email and password");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.message || "Invalid login credentials");
//         return;
//       }

//       //  Store token in cookies (expires in 1 day)
//       Cookies.set("token", data.token, {
//         expires: 1,          // 1 day
//         secure: false,       // true for HTTPS
//         sameSite: "strict",
//       });

//       //  Store admin as JSON string in cookie
//       Cookies.set("admin", JSON.stringify(data.admin), {
//         expires: 1,
//         secure: false,
//         sameSite: "strict",
//       });

//       toast.success("Login successful!");

//       navigate("/admin", { replace: true });

//     } catch (error) {
//       toast.error("Server error! Check backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4 }}
//         className="w-full max-w-md"
//       >
//         <Card className="glass shadow-xl">
//           <CardHeader className="space-y-3 text-center">
//             <div className="w-16 h-16 rounded-2xl bg-primary mx-auto flex items-center justify-center mb-2">
//               <span className="text-primary-foreground font-bold text-2xl">
//                 H
//               </span>
//             </div>
//             <CardTitle className="text-3xl font-bold">Hyundai Spares</CardTitle>
//             <CardDescription className="text-base">
//               Admin Panel Login
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleLogin} className="space-y-5">
//               {/* Email Field */}
//               <div className="space-y-2">
//                 <Label>Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     type="email"
//                     placeholder="admin@hyundai.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div className="space-y-2">
//                 <Label>Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     type="password"
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Button */}
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? "Signing in..." : "Sign In"}
//               </Button>
//             </form>

//             <p className="text-center text-sm text-muted-foreground mt-6">
//               Protected area — Authorized personnel only
//             </p>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import HyundaiLogo from "@/assets/logo.png"; // ⭐ Add your logo here

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email & password");
      triggerShake();
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid login credentials");
        triggerShake();
        return;
      }

      Cookies.set("token", data.token, { expires: 1, sameSite: "strict" });
      Cookies.set("admin", JSON.stringify(data.admin), {
        expires: 1,
        sameSite: "strict",
      });

      toast.success("Login successful!");
      navigate("/admin", { replace: true });
    } catch (error) {
      toast.error("Server error! Please try again.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* ⭐ Card Hover Animation */}
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 25px rgba(0, 140, 255, 0.4)",
          }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass shadow-2xl backdrop-blur-xl w-[400px]">

            <CardHeader className="space-y-3 text-center">

              {/* ⭐ Hyundai Logo */}
              <motion.img
                src={HyundaiLogo}
                alt="Hyundai"
                className="w-28 mx-auto mb-0 drop-shadow-lg border-radius-lg"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />

              <CardTitle className="text-3xl font-bold mt-1">
                Hyundai Spares
              </CardTitle>
              <CardDescription className="text-base">
                Admin Panel Login
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">

                {/* Email */}
                <div className="space-y-2">
                  <Label>Email</Label>
                  <motion.div whileFocusWithin={{ scale: 1.03 }}>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="admin@hyundai.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label>Password</Label>
                  <motion.div whileFocusWithin={{ scale: 1.03 }}>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                      />

                      {/* ⭐ Show / Hide password */}
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Login Button */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button type="submit" className="w-full h-11" disabled={loading}>
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </motion.div>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Authorized access only
              </p>
            </CardContent>

          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
