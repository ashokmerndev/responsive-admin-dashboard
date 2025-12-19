// import { useState } from 'react';
// import { useAdmin } from '@/contexts/AdminContext';
// import { motion } from 'framer-motion';
// import {
//   Plus,
//   Search,
//   Filter,
//   Edit,
//   Trash2,
//   AlertCircle,
//   X,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { toast } from 'sonner';
// import { ProductImageGallery } from '@/components/admin/ProductImageGallery';
// import { ImageUpload } from '@/components/ImageUpload';

// export default function Products() {
//   const { products, deleteProduct } = useAdmin();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [uploadedImages, setUploadedImages] = useState<string[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch =
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.model.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

//     return matchesSearch && matchesCategory;
//   });

//   const categories = Array.from(new Set(products.map((p) => p.category)));

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'In Stock':
//         return <Badge className="bg-success text-success-foreground">In Stock</Badge>;
//       case 'Low Stock':
//         return <Badge className="bg-warning text-warning-foreground">Low Stock</Badge>;
//       case 'Out of Stock':
//         return <Badge variant="destructive">Out of Stock</Badge>;
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   const handleDelete = (id: string, name: string) => {
//     if (window.confirm(`Are you sure you want to delete ${name}?`)) {
//       deleteProduct(id);
//       toast.success('Product deleted successfully');
//     }
//   };

//   const handleAddProduct = () => {
//     if (uploadedImages.length === 0) {
//       toast.error('Please add at least one product image');
//       return;
//     }
//     toast.success('Product added successfully');
//     setUploadedImages([]);
//     setIsDialogOpen(false);
//   };

//   return (
//     <div className="space-y-4 sm:space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold">Products</h1>
//           <p className="text-muted-foreground text-sm sm:text-base mt-1">Manage your Hyundai spare parts inventory</p>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="gap-2 w-full sm:w-auto">
//               <Plus className="h-4 w-4" />
//               Add Product
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-2 sm:mx-auto">
//             <DialogHeader>
//               <DialogTitle>Add New Product</DialogTitle>
//               <DialogDescription>
//                 Add a new Hyundai spare part to your inventory
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               {/* Image Upload Section */}
//               <div className="space-y-2">
//                 <Label>Product Images</Label>
//                 <ImageUpload
//                   images={uploadedImages}
//                   onImagesChange={setUploadedImages}
//                   maxImages={10}
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   First image will be the main display image.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Product Name</Label>
//                   <Input id="name" placeholder="e.g., i20 Brake Pad Set" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="partNumber">Part Number</Label>
//                   <Input id="partNumber" placeholder="e.g., 58101-C8A00" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="category">Category</Label>
//                   <Select>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {categories.map((cat) => (
//                         <SelectItem key={cat} value={cat}>
//                           {cat}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="model">Compatible Model</Label>
//                   <Input id="model" placeholder="e.g., i20 Elite (2014-2020)" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="price">Price (₹)</Label>
//                   <Input id="price" type="number" placeholder="2499" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="stock">Stock Quantity</Label>
//                   <Input id="stock" type="number" placeholder="45" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="description">Description</Label>
//                 <Input id="description" placeholder="Product description" />
//               </div>
//             </div>
//             <div className="flex justify-end gap-2">
//               <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
//               <Button onClick={handleAddProduct}>Add Product</Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Filters */}
//       <Card className="glass">
//         <CardContent className="p-4">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search products by name, part number, or model..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger className="w-full md:w-[200px]">
//                 <Filter className="h-4 w-4 mr-2" />
//                 <SelectValue placeholder="Filter by category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 {categories.map((cat) => (
//                   <SelectItem key={cat} value={cat}>
//                     {cat}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Products Table */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <Card className="glass">
//           <CardContent className="p-0">
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Product</TableHead>
//                     <TableHead>Part Number</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Model</TableHead>
//                     <TableHead>Price</TableHead>
//                     <TableHead>Stock</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredProducts.map((product) => (
//                     <TableRow key={product.id} className="hover:bg-muted/50 transition-smooth">
//                       <TableCell>
//                         <div className="flex items-center gap-3">
//                           <ProductImageGallery
//                             images={product.images}
//                             productName={product.name}
//                           />
//                           <div>
//                             <p className="font-medium">{product.name}</p>
//                             <p className="text-xs text-muted-foreground">{product.supplier}</p>
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell className="font-mono text-sm">{product.partNumber}</TableCell>
//                       <TableCell>{product.category}</TableCell>
//                       <TableCell className="text-sm">{product.model}</TableCell>
//                       <TableCell className="font-semibold">{formatCurrency(product.price)}</TableCell>
//                       <TableCell>
//                         <span className={product.stock < 10 ? 'text-destructive font-semibold' : ''}>
//                           {product.stock}
//                         </span>
//                       </TableCell>
//                       <TableCell>{getStatusBadge(product.status)}</TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <Button variant="ghost" size="icon" className="h-8 w-8">
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 text-destructive hover:text-destructive"
//                             onClick={() => handleDelete(product.id, product.name)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Results Count */}
//       <div className="flex items-center justify-between text-sm text-muted-foreground">
//         <p>
//           Showing {filteredProducts.length} of {products.length} products
//         </p>
//         {filteredProducts.some((p) => p.stock < 10) && (
//           <div className="flex items-center gap-2 text-warning">
//             <AlertCircle className="h-4 w-4" />
//             <p>{filteredProducts.filter((p) => p.stock < 10).length} products low on stock</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ProductImageGallery } from "@/components/admin/ProductImageGallery"; // keep or swap with simple <img>
import Image from "@/components/Image"; // optional wrapper if you have one
// import useAdmin if you still want central store - this example uses local fetches.

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Add Product dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form fields for new product
  const [form, setForm] = useState({
    name: "",
    partNumber: "",
    category: "",
    model: "",
    price: "",
    stock: "",
    description: "",
  });

  // local image files + previews
  const [selectedFiles, setSelectedFiles] = useState([]); // File[]
  const [previews, setPreviews] = useState([]); // base64 or object url
  const [uploadProgress, setUploadProgress] = useState(0);
  const [creating, setCreating] = useState(false);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await axios.get("http://localhost:5000/api/products", {
        withCredentials: true,
      });
      // if backend responds { success:true, products: [...] } use that
      const data = res.data.products ?? res.data;
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // derive categories
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
    [products]
  );

  // previews when files change
  useEffect(() => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setPreviews([]);
      return;
    }
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    // cleanup
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [selectedFiles]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch = !q
      ? true
      : (product.name || "").toLowerCase().includes(q) ||
        (product.partNumber || "").toLowerCase().includes(q) ||
        (product.model || "").toLowerCase().includes(q);

    const matchesCategory =
      categoryFilter === "all" || !categoryFilter ? true : product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Status badge helper
  const getStatusBadge = (stock) => {
    if (stock <= 0)
      return <Badge variant="destructive">Out of Stock</Badge>;
    if (stock < 10)
      return <Badge className="bg-warning text-warning-foreground">Low Stock</Badge>;
    return <Badge className="bg-success text-success-foreground">In Stock</Badge>;
  };

  // Delete product
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        withCredentials: true,
      });
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p._id !== id && p.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  // Handle file selection
  const onFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    // simple validation: limit number
    if (files.length + selectedFiles.length > 10) {
      toast.error("Max 10 images allowed");
      return;
    }
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeSelectedImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Create product (multipart/form-data upload to backend)
  const handleCreateProduct = async () => {
    if (!form.name || !form.price || selectedFiles.length === 0) {
      toast.error("Please provide product name, price and at least one image");
      return;
    }

    try {
      setCreating(true);
      setUploadProgress(0);

      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("partNumber", form.partNumber || "");
      fd.append("category", form.category || "");
      fd.append("model", form.model || "");
      fd.append("price", form.price);
      fd.append("stock", form.stock || 0);
      fd.append("description", form.description || "");

      // append images under field name 'images' (backend multer expects "images")
      selectedFiles.forEach((file) => fd.append("images", file));

      const res = await axios.post("http://localhost:5000/api/products", fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      const created = res.data.product ?? res.data; // accommodate both shapes
      toast.success("Product created");
      // refresh product list (or append)
      await fetchProducts();

      // reset
      setForm({
        name: "",
        partNumber: "",
        category: "",
        model: "",
        price: "",
        stock: "",
        description: "",
      });
      setSelectedFiles([]);
      setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create product");
    } finally {
      setCreating(false);
      setUploadProgress(0);
    }
  };

  // simple editing: prefill form (optional)
  const openAddDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground text-sm md:text-base mt-1">Manage your Hyundai spare parts inventory</p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products by name, part number, or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px] ml-2">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="ml-2" onClick={openAddDialog}>
            <Plus className="h-4 w-4 mr-2" /> Add Product
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <Card className="glass">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Part Number</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loadingProducts ? (
                  // simple loading rows
                  Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i} className="animate-pulse">
                      <TableCell><div className="h-6 bg-muted rounded w-40" /></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-24" /></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-20" /></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-20" /></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-16" /></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-12" /></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-16" /></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-24" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product._id ?? product.id} className="hover:bg-muted/50 transition-all">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {/* use ProductImageGallery if you have it, fallback to first image */}
                          {product.images && product.images.length > 0 ? (
                            <img src={product.images[0]} alt={product.name} className="h-12 w-12 object-cover rounded-md" />
                          ) : (
                            <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center text-sm">No Img</div>
                          )}

                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.supplier ?? ""}</p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="font-mono text-sm">{product.partNumber}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-sm">{product.model}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(product.price)}</TableCell>
                      <TableCell>
                        <span className={product.stock < 10 ? "text-destructive font-semibold" : ""}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(product.stock)}</TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(product._id ?? product.id, product.name)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Results count + low stock alert */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing {filteredProducts.length} of {products.length} products</p>
        {filteredProducts.some((p) => p.stock < 10) && (
          <div className="flex items-center gap-2 text-warning">
            <AlertCircle className="h-4 w-4" />
            <p>{filteredProducts.filter((p) => p.stock < 10).length} products low on stock</p>
          </div>
        )}
      </div>

      {/* ---------- Add Product Dialog ---------- */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl mx-2 sm:mx-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Add a new Hyundai spare part to your inventory</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Product Images (max 10)</Label>
              <div className="border rounded p-3">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onFilesSelected}
                />
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {previews.map((src, i) => (
                    <div key={i} className="relative">
                      <img src={src} alt={`preview-${i}`} className="h-20 w-20 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeSelectedImage(i)}
                        className="absolute -top-1 -right-1 bg-destructive text-white rounded-full h-6 w-6 flex items-center justify-center"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                {uploadProgress > 0 && creating && (
                  <div className="mt-3">
                    <div className="h-2 bg-muted rounded">
                      <div className="h-2 bg-primary rounded" style={{ width: `${uploadProgress}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Uploading... {uploadProgress}%</p>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">First image will be used as main product image.</p>
            </div>

            {/* Product fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Product Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g., i20 Brake Pad Set" />
              </div>
              <div>
                <Label>Part Number</Label>
                <Input value={form.partNumber} onChange={(e) => setForm({ ...form, partNumber: e.target.value })} placeholder="e.g., 58101-C8A00" />
              </div>
              <div>
                <Label>Category</Label>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Engine / Brake / Suspension" />
              </div>
              <div>
                <Label>Model Compatibility</Label>
                <Input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="e.g., i20 Elite (2014-2020)" />
              </div>
              <div>
                <Label>Price (₹)</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g., 2499" />
              </div>
              <div>
                <Label>Stock Quantity</Label>
                <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="e.g., 45" />
              </div>
              <div className="sm:col-span-2">
                <Label>Description</Label>
                <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-3">
              <Button variant="outline" onClick={() => { setIsDialogOpen(false); setSelectedFiles([]); }}>Cancel</Button>
              <Button onClick={handleCreateProduct} disabled={creating}>{creating ? "Creating..." : "Add Product"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
