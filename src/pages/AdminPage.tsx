import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Lock, 
  CheckCircle2, 
  UserCheck, 
  Database,
  Search,
  RefreshCw,
  Sparkles,
  Layers,
  Scissors,
  Baby,
  Gem,
  Home,
  ArrowRight,
  ChevronRight,
  Filter,
  Plus,
  X,
  Tag,
  Edit3,
  Trash2,
  Save,
  Check,
  Calendar,
  Clock,
  Unlock,
  PlusCircle,
  Upload,
  ImagePlus,
  Pencil,
  Minus,
  Globe,
  Eye,
  EyeOff
} from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth, UserProfile } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { SEO } from '../components/SEO';
import { Product } from '../types';

export const AdminPage: React.FC = () => {
  const { userProfile, logoutUser } = useAuth();
  const { products: productList, saveProducts, addProduct, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'products' | 'orders'>('overview');
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userSearch, setUserSearch] = useState('');

  // Selected category in sidebar (default: 'Sarees')
  const [selectedCategory, setSelectedCategory] = useState<string>('Sarees');
  const [productSearch, setProductSearch] = useState('');

  // Selected product ID being edited in right panel
  const [selectedProductId, setSelectedProductId] = useState<string>(() => productList[0]?.id || 'bs-01');

  // Controlled form state for active editing product
  const [formData, setFormData] = useState<Product>(() => productList[0] || ({} as Product));
  
  // Specifications edit mode state
  const [isEditingSpecs, setIsEditingSpecs] = useState(false);

  // Notification toast
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Fetch all registered users from Firestore
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const list: UserProfile[] = [];
      querySnapshot.forEach((docSnap) => {
        list.push({ uid: docSnap.id, ...docSnap.data() } as UserProfile);
      });
      setUsersList(list);
    } catch (err) {
      console.warn('Error fetching users list from Firestore:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (userProfile?.role === 'admin') {
      fetchUsers();
    }
  }, [userProfile]);

  // Category Options configuration (Line-by-line sidebar order)
  const CATEGORY_OPTIONS = [
    {
      id: 'Sarees',
      name: 'Sarees',
      emoji: '🥻',
      description: 'Silk & Handloom Sarees',
      badgeBg: 'bg-rose-100 text-rose-800',
      matchFn: (p: Product) => p.category === 'sarees' || p.category === 'women'
    },
    {
      id: 'Kurti & Sets',
      name: 'Kurti & Sets',
      emoji: '👗',
      description: 'Kurtis & Suit Materials',
      badgeBg: 'bg-amber-100 text-amber-800',
      matchFn: (p: Product) => p.category === 'kurti-sets'
    },
    {
      id: 'Fabrics',
      name: 'Fabrics',
      emoji: '🧵',
      description: 'Running Meterage Fabrics',
      badgeBg: 'bg-purple-100 text-purple-800',
      matchFn: (p: Product) => p.category === 'fabrics'
    },
    {
      id: "Women's Nightwear",
      name: "Women's Nightwear",
      emoji: '🌙',
      description: 'Nighties, Kaftans & Pyjama Sets',
      badgeBg: 'bg-pink-100 text-pink-800',
      matchFn: (p: Product) => p.category === 'nightwear'
    },
    {
      id: 'Kids Wear',
      name: 'Kids Wear',
      emoji: '👧',
      description: 'Ethnic & Festive Wear for Kids',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      matchFn: (p: Product) => p.category === 'kids'
    },
    {
      id: 'Accessories',
      name: 'Accessories',
      emoji: '👜',
      description: 'Jhumkas, Jewelry & Stoles',
      badgeBg: 'bg-blue-100 text-blue-800',
      matchFn: (p: Product) => p.category === 'accessories'
    },
    {
      id: 'Home & Living',
      name: 'Home & Living',
      emoji: '🏡',
      description: 'Cushion Covers & Linens',
      badgeBg: 'bg-indigo-100 text-indigo-800',
      matchFn: (p: Product) => p.category === 'home-living'
    }
  ];

  // Active category matcher
  const activeOption = CATEGORY_OPTIONS.find((c) => c.id === selectedCategory) || CATEGORY_OPTIONS[0];

  // Products under selected category with smart SKU & text search
  const categoryProducts = productList.filter((product) => {
    const matchesCategory = activeOption.matchFn(product);
    if (!matchesCategory) return false;
    if (!productSearch.trim()) return true;

    const term = productSearch.toLowerCase().trim();
    const cleanNumbersOnlyTerm = term.replace(/[^0-9]/g, '');
    const cleanProductSkuNumbers = (product.sku || '').replace(/[^0-9]/g, '');

    // Match full SKU ("DJ-919872"), raw numbers ("919872"), product name, color, or ID
    const matchesSkuFull = (product.sku || '').toLowerCase().includes(term);
    const matchesSkuDigits = cleanNumbersOnlyTerm.length > 0 && cleanProductSkuNumbers.includes(cleanNumbersOnlyTerm);
    const matchesName = (product.name || '').toLowerCase().includes(term);
    const matchesColor = (product.color || '').toLowerCase().includes(term);
    const matchesId = (product.id || '').toLowerCase().includes(term);

    return matchesSkuFull || matchesSkuDigits || matchesName || matchesColor || matchesId;
  });

  // Sync form data when selecting a product
  const handleSelectProduct = (product: Product) => {
    setSelectedProductId(product.id);
    setFormData({ ...product });
  };

  // Switch category
  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    const catObj = CATEGORY_OPTIONS.find((c) => c.id === catId);
    if (catObj) {
      const match = productList.find(catObj.matchFn);
      if (match) {
        setSelectedProductId(match.id);
        setFormData({ ...match });
      } else {
        setSelectedProductId('');
        setFormData({} as Product);
      }
    }
  };

  // Add new product skeleton (Starts with empty fields & empty images)
  const handleAddNewProduct = () => {
    const newId = `prod-${Date.now().toString().slice(-4)}`;
    
    // Generate guaranteed unique SKU code
    let uniqueSku = `DJ-${Math.floor(100000 + Math.random() * 900000)}`;
    while (productList.some((p) => p.sku.trim().toLowerCase() === uniqueSku.toLowerCase())) {
      uniqueSku = `DJ-${Math.floor(100000 + Math.random() * 900000)}`;
    }

    const catMap: Record<string, Product['category']> = {
      'Sarees': 'sarees',
      'Kurti & Sets': 'kurti-sets',
      'Fabrics': 'fabrics',
      "Women's Nightwear": 'nightwear',
      'Kids Wear': 'kids',
      'Accessories': 'accessories',
      'Home & Living': 'home-living'
    };

    const newProd: Product = {
      id: newId,
      slug: `product-${newId}`,
      name: '',
      category: catMap[selectedCategory] || 'sarees',
      subcategory: selectedCategory,
      fabric: '',
      occasion: 'Festive',
      price: 0,
      originalPrice: 0,
      rating: 5.0,
      reviewCount: 0,
      topCut: '',
      bottomCut: '',
      dupattaCut: '',
      description: '',
      features: [],
      images: [],
      badge: 'New Arrival',
      inStock: true,
      published: false, // Default: Draft mode (Hidden from storefront until toggled live)
      sku: uniqueSku,
      color: ''
    };

    addProduct(newProd);
    setSelectedProductId(newId);
    setFormData({ ...newProd });
    showToast(`Added new item under ${selectedCategory}. Fill in details & upload images!`);
  };

  // Save changes to current product with unique SKU check
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanSku = (formData.sku || '').trim();
    if (!cleanSku) {
      showToast('❌ Error: SKU Code cannot be empty!');
      return;
    }

    const duplicateSku = productList.some(
      (p) => p.id !== formData.id && p.sku.trim().toLowerCase() === cleanSku.toLowerCase()
    );

    if (duplicateSku) {
      showToast(`❌ Cannot save: SKU Code "${cleanSku}" is already used by another product!`);
      return;
    }

    updateProduct({ ...formData, sku: cleanSku });
    showToast(`Product "${formData.name || formData.id}" saved successfully!`);
  };

  // Delete current product
  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      // Filter remaining products within the current active category only
      const remainingInCategory = categoryProducts.filter((p) => p.id !== id);
      if (remainingInCategory.length > 0) {
        setSelectedProductId(remainingInCategory[0].id);
        setFormData({ ...remainingInCategory[0] });
      } else {
        setSelectedProductId('');
        setFormData({} as Product);
      }
      showToast('Product deleted from catalog.');
    }
  };


  // Toast feedback
  const showToast = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => setSaveSuccessMessage(null), 3000);
  };

  // Dynamic Specifications handling
  const getActiveSpecs = (): { id: string; label: string; value: string }[] => {
    if (formData.specifications && formData.specifications.length > 0) {
      return formData.specifications;
    }
    const defaults: { id: string; label: string; value: string }[] = [];
    if (formData.topCut) defaults.push({ id: 'spec-top', label: 'Top / Kurta Cut', value: formData.topCut });
    if (formData.bottomCut) defaults.push({ id: 'spec-bottom', label: 'Bottom / Salwar Cut', value: formData.bottomCut });
    if (formData.dupattaCut) defaults.push({ id: 'spec-dupatta', label: 'Dupatta / Stole Cut', value: formData.dupattaCut });
    if (defaults.length === 0) {
      defaults.push(
        { id: 'spec-1', label: 'Top / Kurta Cut', value: '' },
        { id: 'spec-2', label: 'Bottom / Salwar Cut', value: '' },
        { id: 'spec-3', label: 'Dupatta / Stole Cut', value: '' }
      );
    }
    return defaults;
  };

  const handleUpdateSpecLabel = (index: number, newLabel: string) => {
    const specs = [...getActiveSpecs()];
    specs[index] = { ...specs[index], label: newLabel };
    setFormData({ ...formData, specifications: specs });
  };

  const handleUpdateSpecValue = (index: number, newValue: string) => {
    const specs = [...getActiveSpecs()];
    specs[index] = { ...specs[index], value: newValue };
    const updated = { ...formData, specifications: specs };
    if (index === 0) updated.topCut = newValue;
    if (index === 1) updated.bottomCut = newValue;
    if (index === 2) updated.dupattaCut = newValue;
    setFormData(updated);
  };

  const handleRemoveSpec = (index: number) => {
    const specs = getActiveSpecs().filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: specs });
  };

  const handleAddSpec = () => {
    const current = getActiveSpecs();
    const newSpec = { id: `spec-${Date.now()}`, label: `Specification ${current.length + 1}`, value: '' };
    setFormData({ ...formData, specifications: [...current, newSpec] });
  };

  // Feature handling
  const handleFeatureChange = (index: number, val: string) => {
    const updated = [...formData.features];
    updated[index] = val;
    setFormData({ ...formData, features: updated });
  };

  const handleAddFeature = () => {
    setFormData({ ...formData, features: [...formData.features, 'New Feature'] });
  };

  const handleRemoveFeature = (index: number) => {
    const updated = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updated });
  };

  // Image handling (Maximum 10 images, min count requirement removed)
  const handleImageChange = (index: number, val: string) => {
    const updated = [...formData.images];
    updated[index] = val;
    setFormData({ ...formData, images: updated });
  };

  const handleAddImage = () => {
    if (formData.images.length >= 10) {
      showToast('Maximum 10 images allowed per product.');
      return;
    }
    setFormData({ ...formData, images: [...formData.images, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'] });
  };

  const handleRemoveImage = (index: number) => {
    // No minimum image count required (allows removing down to 0)
    const updated = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updated });
  };

  // Handle uploading local image files from system device (capped at 10)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetIndex?: number) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (typeof targetIndex !== 'number' && formData.images.length >= 10) {
      showToast('Maximum 10 images allowed per product.');
      e.target.value = '';
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (!result) return;

      if (typeof targetIndex === 'number') {
        const updated = [...formData.images];
        updated[targetIndex] = result;
        setFormData((prev) => ({ ...prev, images: updated }));
      } else {
        if (formData.images.length >= 10) {
          showToast('Maximum 10 images allowed per product.');
          return;
        }
        setFormData((prev) => ({ ...prev, images: [...prev.images, result] }));
      }
      showToast(`Uploaded "${file.name}" from your device!`);
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Guard for Non-Admin
  if (!userProfile || userProfile.role !== 'admin') {
    return (
      <div className="bg-[#faf9f6] min-h-[75vh] py-16 px-4 flex items-center justify-center">
        <SEO 
          title="Admin Access Denied - DJ Style Hub" 
          description="Admin area access restriction notice for DJ Style Hub."
        />
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-red-200 p-8 text-center space-y-4">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Admin Panel Access Restricted</h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            You are currently signed in as <strong>{userProfile?.name || 'Guest'}</strong> (Role: <span className="uppercase font-semibold">{userProfile?.role || 'Guest'}</span>).
            <br />
            To access the Admin Panel, your account role in Firebase Firestore must be changed to <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-red-700">"admin"</code>.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              to="/login"
              className="bg-[#580c22] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#450719] transition"
            >
              Sign In as Admin
            </Link>
            <Link
              to="/"
              className="bg-neutral-100 text-neutral-700 text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-neutral-200 transition"
            >
              Return to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredUsers = usersList.filter((u) => 
    u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.role?.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="bg-neutral-50 text-neutral-800 min-h-screen py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO 
        title="Admin Dashboard - DJ Style Hub" 
        description="DJ Style Hub Admin Control Panel for user management, catalog, and orders."
      />

      {/* Toast Notification */}
      {saveSuccessMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto space-y-5">
        
        {/* Top Header Bar */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-[#580c22] text-white rounded-xl flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl font-bold text-neutral-900">Admin Control Panel</h1>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Logged in as <strong className="text-neutral-800">{userProfile.name}</strong> ({userProfile.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchUsers()}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition flex items-center gap-1.5 text-xs font-medium border border-neutral-200"
              title="Refresh Firestore Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingUsers ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
            <button
              onClick={async () => {
                await logoutUser();
                navigate('/login');
              }}
              className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs">
          <div className="border-b border-neutral-200 px-6 pt-3 flex gap-6 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition ${
                activeTab === 'overview'
                  ? 'border-[#580c22] text-[#580c22]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Dashboard Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-3 border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'users'
                  ? 'border-[#580c22] text-[#580c22]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <span>User Database ({usersList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-3 border-b-2 transition ${
                activeTab === 'products'
                  ? 'border-[#580c22] text-[#580c22]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Products Management
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 border-b-2 transition ${
                activeTab === 'orders'
                  ? 'border-[#580c22] text-[#580c22]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Orders &amp; Enquiries
            </button>
          </div>

          <div className="p-5">
            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center border border-purple-100">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Registered Users</p>
                      <p className="text-xl font-bold text-neutral-900 mt-0.5">{usersList.length}</p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center border border-amber-100">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Catalog Products</p>
                      <p className="text-xl font-bold text-neutral-900 mt-0.5">{productList.length}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-neutral-900 mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setActiveTab('users')}
                      className="p-4 border border-neutral-200 rounded-xl hover:border-[#580c22] text-left transition bg-white shadow-xs"
                    >
                      <Users className="w-5 h-5 text-[#580c22] mb-2" />
                      <h5 className="font-semibold text-xs text-neutral-900">Manage User Roles</h5>
                      <p className="text-[11px] text-neutral-500 mt-0.5">View registered users and active permissions.</p>
                    </button>
                    <button
                      onClick={() => setActiveTab('products')}
                      className="p-4 border border-neutral-200 rounded-xl hover:border-[#580c22] text-left transition bg-white shadow-xs"
                    >
                      <Package className="w-5 h-5 text-[#580c22] mb-2" />
                      <h5 className="font-semibold text-xs text-neutral-900">Products Management</h5>
                      <p className="text-[11px] text-neutral-500 mt-0.5">Edit all 10+ fields for Sarees, Kurtis, Fabrics, etc.</p>
                    </button>
                    <Link
                      to="/"
                      className="p-4 border border-neutral-200 rounded-xl hover:border-[#580c22] text-left transition bg-white block shadow-xs"
                    >
                      <ShoppingBag className="w-5 h-5 text-[#580c22] mb-2" />
                      <h5 className="font-semibold text-xs text-neutral-900">View Live Storefront</h5>
                      <p className="text-[11px] text-neutral-500 mt-0.5">Check how the store looks to regular users.</p>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Users Database */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <input
                      type="text"
                      placeholder="Search registered users by name, email, role..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-[#580c22]"
                    />
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                  </div>
                  <button
                    onClick={fetchUsers}
                    className="text-xs text-[#580c22] hover:underline font-semibold flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reload from Firestore</span>
                  </button>
                </div>

                <div className="border border-neutral-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs text-neutral-700">
                    <thead className="bg-neutral-100 text-neutral-600 uppercase text-[10px] tracking-wider font-semibold border-b border-neutral-200">
                      <tr>
                        <th className="py-3 px-4">User Name</th>
                        <th className="py-3 px-4">Email Address</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Assigned Role</th>
                        <th className="py-3 px-4">Firebase UID</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 bg-white">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-neutral-400 text-xs">
                            No users found in Firestore. Register a user at <code>/register</code> to see them here!
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((u) => (
                          <tr key={u.uid} className="hover:bg-neutral-50/80 transition">
                            <td className="py-3 px-4 font-semibold text-neutral-900">{u.name || 'Anonymous'}</td>
                            <td className="py-3 px-4">{u.email}</td>
                            <td className="py-3 px-4">{u.phone || '—'}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                u.role === 'admin'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-neutral-100 text-neutral-700'
                              }`}>
                                {u.role === 'admin' && <ShieldCheck className="w-3 h-3" />}
                                {u.role || 'user'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-neutral-400 font-mono text-[10px] truncate max-w-[120px]">{u.uid}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Products Management (Side-by-Side Panel Layout in Light Theme) */}
            {activeTab === 'products' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT SIDEBAR PANEL (Width: 4/12) - Line-by-line options */}
                <div className="lg:col-span-4 space-y-4">
                  
                  {/* Category Options Header */}
                  <div className="bg-white border border-neutral-200/90 rounded-2xl p-4 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-serif text-sm font-bold text-neutral-900 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#580c22]" />
                        <span>Categories Menu</span>
                      </h3>
                      <span className="text-[10px] bg-neutral-100 text-neutral-600 font-bold px-2 py-0.5 rounded-full border border-neutral-200">
                        7 Categories
                      </span>
                    </div>

                    {/* Line-by-Line Categories List */}
                    <div className="space-y-2">
                      {CATEGORY_OPTIONS.map((cat) => {
                        const count = productList.filter(cat.matchFn).length;
                        const isSelected = selectedCategory === cat.id;

                        return (
                          <button
                            key={cat.id}
                            onClick={() => handleSelectCategory(cat.id)}
                            className={`w-full text-left px-3.5 py-3 rounded-xl border transition-all flex items-center justify-between group ${
                              isSelected
                                ? 'bg-[#580c22] border-[#580c22] text-white font-semibold shadow-md'
                                : 'bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl leading-none">{cat.emoji}</span>
                              <div>
                                <h4 className="text-xs font-bold leading-tight">{cat.name}</h4>
                                <p className={`text-[10px] ${isSelected ? 'text-rose-100' : 'text-neutral-500'}`}>
                                  {cat.description}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isSelected ? 'bg-white/20 text-white' : cat.badgeBg
                              }`}>
                                {count}
                              </span>
                              <ChevronRight className={`w-3.5 h-3.5 transition ${
                                isSelected ? 'text-white transform rotate-90' : 'text-neutral-400 group-hover:translate-x-1'
                              }`} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* SKU Code & Name Search Bar */}
                  <div className="bg-white border border-neutral-200/90 rounded-2xl p-3 shadow-xs">
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
                      <input
                        type="text"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        placeholder="Search SKU (e.g. DJ-919872 or 919872)..."
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-xl py-2 pl-9 pr-8 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580c22] focus:bg-white transition"
                      />
                      {productSearch && (
                        <button
                          type="button"
                          onClick={() => setProductSearch('')}
                          className="absolute right-2.5 p-1 text-neutral-400 hover:text-neutral-700 transition"
                          title="Clear search"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Items in Selected Category List */}
                  <div className="bg-white border border-neutral-200/90 rounded-2xl p-4 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xs text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-[#580c22]" />
                        <span>Items under {activeOption.name}</span>
                      </h4>
                      <button
                        onClick={handleAddNewProduct}
                        className="bg-[#580c22] hover:bg-[#450719] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition shadow-xs"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Item</span>
                      </button>
                    </div>

                    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                      {categoryProducts.length === 0 ? (
                        <div className="py-6 text-center text-neutral-400 text-xs border border-dashed border-neutral-300 rounded-xl px-3">
                          {productSearch ? (
                            <span>No items match SKU/search "<strong>{productSearch}</strong>" under {activeOption.name}.</span>
                          ) : (
                            <span>No products found in this category. Click "+ Add Item" to create one!</span>
                          )}
                        </div>
                      ) : (
                        categoryProducts.map((p) => {
                          const isEditingThis = selectedProductId === p.id;
                          return (
                            <div
                              key={p.id}
                              onClick={() => handleSelectProduct(p)}
                              className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center gap-3 ${
                                isEditingThis
                                  ? 'bg-rose-50 border-[#580c22] ring-1 ring-[#580c22]/40'
                                  : 'bg-white border-neutral-200 hover:border-neutral-300'
                              }`}
                            >
                              {p.images && p.images.length > 0 ? (
                                <img
                                  src={p.images[0]}
                                  alt={p.name || 'Product Image'}
                                  className="w-10 h-10 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-neutral-100 text-neutral-400 shrink-0 border border-neutral-200 flex items-center justify-center">
                                  <Package className="w-5 h-5" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-bold text-neutral-900 truncate">
                                  {p.name.trim() !== '' ? p.name : `Untitled Product (${p.id})`}
                                </h5>
                                <div className="flex items-center justify-between text-[10px] mt-0.5 gap-1">
                                  <span className="text-[#580c22] font-bold">
                                    {p.price > 0 ? `₹${p.price.toLocaleString('en-IN')}` : 'Price Pending'}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <span className={p.published !== false ? 'text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-semibold' : 'text-amber-700 bg-amber-50 px-1 py-0.5 rounded font-semibold'}>
                                      {p.published !== false ? 'Live' : 'Draft'}
                                    </span>
                                    <span className={p.inStock ? 'text-emerald-700 font-medium' : 'text-red-600 font-medium'}>
                                      {p.inStock ? 'In Stock' : 'Out'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>


                  </div>

                </div>

                {/* RIGHT CONFIGURATION & EDITING PANEL (Width: 8/12) */}
                <div className="lg:col-span-8 space-y-4">
                  
                  {!formData.id ? (
                    <div className="bg-white border border-neutral-200/90 rounded-2xl p-12 text-center space-y-4 shadow-xs">
                      <Package className="w-12 h-12 text-neutral-300 mx-auto" />
                      <h3 className="font-serif text-lg font-bold text-neutral-900">Your Store Catalog is Empty</h3>
                      <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                        All previous sample items have been removed. Click below to add your first product under <strong>{selectedCategory}</strong>!
                      </p>
                      <button
                        type="button"
                        onClick={handleAddNewProduct}
                        className="bg-[#580c22] hover:bg-[#450719] text-white font-bold px-6 py-2.5 rounded-xl text-xs inline-flex items-center gap-2 transition shadow-xs"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add First Product</span>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveProduct} className="space-y-4">
                    
                    {/* Top Configuration Bar Card */}
                    <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{activeOption.emoji}</span>
                            <h3 className="font-serif text-lg font-bold text-neutral-900">Product Configuration &amp; Editor</h3>
                          </div>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            Editing Product ID: <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-[#580c22] font-mono text-[11px] border border-neutral-200">{formData.id}</code>
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(formData.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                          <button
                            type="submit"
                            className="bg-[#580c22] hover:bg-[#450719] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-xs"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                          </button>
                        </div>
                      </div>

                      {/* Top Row Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                            Product Category
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl py-2 px-3 text-xs text-neutral-900 focus:outline-none focus:border-[#580c22] focus:bg-white"
                          >
                            <option value="sarees">🥻 Sarees</option>
                            <option value="kurti-sets">👗 Kurti &amp; Sets</option>
                            <option value="fabrics">🧵 Fabrics</option>
                            <option value="nightwear">🌙 Women's Nightwear</option>
                            <option value="kids">👧 Kids Wear</option>
                            <option value="accessories">👜 Accessories</option>
                            <option value="home-living">🏡 Home &amp; Living</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                            Sub Type / Collection
                          </label>
                          <input
                            type="text"
                            value={formData.subcategory}
                            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl py-2 px-3 text-xs text-neutral-900 focus:outline-none focus:border-[#580c22] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                            Occasion / Pattern
                          </label>
                          <select
                            value={formData.occasion}
                            onChange={(e) => setFormData({ ...formData, occasion: e.target.value as any })}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl py-2 px-3 text-xs text-neutral-900 focus:outline-none focus:border-[#580c22] focus:bg-white"
                          >
                            <option value="Daily Wear">Daily Wear</option>
                            <option value="Festive">Festive</option>
                            <option value="Party Wear">Party Wear</option>
                            <option value="Wedding Occasion">Wedding Occasion</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                            Store Visibility
                          </label>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, published: formData.published === false ? true : false })}
                            className={`w-full py-2 px-2.5 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1 transition ${
                              formData.published !== false
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                : 'bg-amber-50 border-amber-300 text-amber-800'
                            }`}
                          >
                            {formData.published !== false ? <Eye className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <EyeOff className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                            <span>{formData.published !== false ? 'Live on Store' : 'Draft (Hidden)'}</span>
                          </button>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                            Stock Status
                          </label>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, inStock: !formData.inStock })}
                            className={`w-full py-2 px-2.5 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1 transition ${
                              formData.inStock
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                : 'bg-red-50 border-red-300 text-red-700'
                            }`}
                          >
                            <Unlock className="w-3.5 h-3.5 shrink-0" />
                            <span>{formData.inStock ? 'In Stock' : 'Out of Stock'}</span>
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Verified Cut Yardage Specifications Card */}
                    <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
                      <div className="flex items-center justify-between border-b border-neutral-200 pb-2 gap-2">
                        <div className="flex items-center gap-1.5 flex-1 min-w-0">
                          <Scissors className="w-4 h-4 text-[#580c22] shrink-0" />
                          {isEditingSpecs ? (
                            <input
                              type="text"
                              value={formData.specificationsTitle ?? 'VERIFIED CUT YARDAGE SPECIFICATIONS'}
                              onChange={(e) => setFormData({ ...formData, specificationsTitle: e.target.value })}
                              placeholder="Enter Box Heading Title..."
                              className="font-bold text-xs text-[#580c22] uppercase tracking-wider bg-neutral-50 border border-neutral-300 rounded-lg px-2 py-1 w-full focus:outline-none focus:border-[#580c22]"
                            />
                          ) : (
                            <h4 className="font-semibold text-xs text-[#580c22] uppercase tracking-wider truncate">
                              {formData.specificationsTitle || 'VERIFIED CUT YARDAGE SPECIFICATIONS'}
                            </h4>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setIsEditingSpecs(!isEditingSpecs)}
                            className={`p-1.5 rounded-lg border transition text-xs flex items-center gap-1 font-bold ${
                              isEditingSpecs
                                ? 'bg-[#580c22] text-white border-[#580c22]'
                                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-200'
                            }`}
                            title={isEditingSpecs ? "Finish Editing Heading & Fields" : "Edit Heading & Field Labels"}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span className="text-[11px]">{isEditingSpecs ? 'Done Editing' : 'Edit Box & Labels'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Fields grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {getActiveSpecs().map((spec, idx) => (
                          <div key={spec.id || idx} className="space-y-1 relative group">
                            {isEditingSpecs ? (
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <input
                                  type="text"
                                  value={spec.label}
                                  onChange={(e) => handleUpdateSpecLabel(idx, e.target.value)}
                                  placeholder="Field Name (e.g. Top Cut)"
                                  className="text-[10px] font-bold text-[#580c22] uppercase tracking-wider bg-neutral-50 border border-neutral-300 rounded px-1.5 py-0.5 w-full focus:outline-none focus:border-[#580c22]"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSpec(idx)}
                                  className="w-5 h-5 rounded-full bg-red-100 hover:bg-red-200 text-red-700 flex items-center justify-center shrink-0 border border-red-200 transition"
                                  title="Remove this specification field"
                                >
                                  <Minus className="w-3.5 h-3.5 stroke-[3]" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between mb-1">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block truncate">
                                  {spec.label}
                                </label>
                              </div>
                            )}

                            <input
                              type="text"
                              value={spec.value}
                              onChange={(e) => handleUpdateSpecValue(idx, e.target.value)}
                              placeholder={`e.g. Enter ${spec.label}...`}
                              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl py-2 px-3 text-xs text-neutral-900 font-mono focus:outline-none focus:border-[#580c22] focus:bg-white"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Add field button in Edit mode */}
                      {isEditingSpecs && (
                        <div className="pt-2 border-t border-dashed border-neutral-200 flex justify-end">
                          <button
                            type="button"
                            onClick={handleAddSpec}
                            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-neutral-300 flex items-center gap-1 transition"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#580c22]" />
                            <span>Add Specification Field</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Product Basic Info & Pricing Card */}
                    <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
                      <h4 className="font-semibold text-xs text-[#580c22] uppercase tracking-wider border-b border-neutral-200 pb-2">
                        Product Details &amp; Pricing
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                            Product Name / Title
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl py-2 px-3 text-xs text-neutral-900 font-semibold focus:outline-none focus:border-[#580c22] focus:bg-white"
                          />
                        </div>

                        <div>
                          {(() => {
                            const isDuplicate = productList.some(
                              (p) => p.id !== formData.id && p.sku.trim().toLowerCase() === (formData.sku || '').trim().toLowerCase()
                            );
                            return (
                              <>
                                <div className="flex items-center justify-between mb-1">
                                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                                    SKU Code (Must be Unique)
                                  </label>
                                  {isDuplicate && (
                                    <span className="text-[9px] text-red-600 font-bold">⚠️ Duplicate SKU!</span>
                                  )}
                                </div>
                                <input
                                  type="text"
                                  value={formData.sku}
                                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                  className={`w-full bg-neutral-50 border rounded-xl py-2 px-3 text-xs font-mono focus:outline-none focus:bg-white ${
                                    isDuplicate
                                      ? 'border-red-500 text-red-700 bg-red-50 focus:border-red-600'
                                      : 'border-neutral-300 text-neutral-900 focus:border-[#580c22]'
                                  }`}
                                />
                              </>
                            );
                          })()}
                        </div>
                      </div>

                      <div className={`grid grid-cols-1 ${formData.category === 'kids' || selectedCategory === 'Kids Wear' ? 'sm:grid-cols-5' : 'sm:grid-cols-4'} gap-3`}>
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                            Selling Price (₹)
                          </label>
                          <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl py-2 px-3 text-xs text-[#580c22] font-bold focus:outline-none focus:border-[#580c22] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                            Original MRP (₹)
                          </label>
                          <input
                            type="number"
                            value={formData.originalPrice}
                            onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl py-2 px-3 text-xs text-neutral-500 focus:outline-none focus:border-[#580c22] focus:bg-white"
                          />
                        </div>

                        {(formData.category === 'kids' || selectedCategory === 'Kids Wear') && (
                          <div>
                            <label className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block mb-1">
                              Age / Size Group
                            </label>
                            <input
                              type="text"
                              value={formData.ageGroup || ''}
                              onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                              placeholder="e.g. 2-3 Yrs, 4-6 Yrs"
                              className="w-full bg-purple-50/60 border border-purple-300 rounded-xl py-2 px-3 text-xs text-purple-900 font-bold focus:outline-none focus:border-[#580c22] focus:bg-white"
                            />
                          </div>
                        )}

                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                            Color Variant
                          </label>
                          <input
                            type="text"
                            value={formData.color}
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl py-2 px-3 text-xs text-neutral-900 focus:outline-none focus:border-[#580c22] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                            Badge Tag
                          </label>
                          <input
                            type="text"
                            value={formData.badge || ''}
                            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                            placeholder="e.g. Best Seller"
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl py-2 px-3 text-xs text-amber-800 font-semibold focus:outline-none focus:border-[#580c22] focus:bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                          Product Description &amp; Fabric Info
                        </label>
                        <textarea
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-300 rounded-xl py-2 px-3 text-xs text-neutral-800 focus:outline-none focus:border-[#580c22] focus:bg-white leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Key Features Bullet List Card */}
                    <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                        <h4 className="font-semibold text-xs text-[#580c22] uppercase tracking-wider">
                          Key Features (Bullet Points)
                        </h4>
                        <button
                          type="button"
                          onClick={handleAddFeature}
                          className="text-[11px] text-[#580c22] hover:underline font-bold flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Feature</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {formData.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-[#580c22] text-xs font-bold">✓</span>
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => handleFeatureChange(idx, e.target.value)}
                              className="flex-1 bg-neutral-50 border border-neutral-300 rounded-xl py-1.5 px-3 text-xs text-neutral-800 focus:outline-none focus:border-[#580c22] focus:bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(idx)}
                              className="text-neutral-400 hover:text-red-600 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Product Images Card with System File Upload */}
                    <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-xs text-[#580c22] uppercase tracking-wider flex items-center gap-1.5">
                              <ImagePlus className="w-4 h-4" />
                              <span>Product Images &amp; Uploads</span>
                            </h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              formData.images.length >= 10
                                ? 'bg-amber-100 text-amber-800 border-amber-200'
                                : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                            }`}>
                              {formData.images.length}/10 Max
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-0.5">
                            Upload images directly from your device or paste web URLs (Up to 10 images max per product).
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className={`text-[11px] font-bold px-3 py-1.5 rounded-xl cursor-pointer flex items-center gap-1.5 transition shadow-xs ${
                            formData.images.length >= 10
                              ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                              : 'bg-[#580c22] hover:bg-[#450719] text-white'
                          }`}>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload from Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={formData.images.length >= 10}
                              onChange={(e) => handleFileUpload(e)}
                            />
                          </label>

                          <button
                            type="button"
                            onClick={handleAddImage}
                            disabled={formData.images.length >= 10}
                            className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl border flex items-center gap-1 transition ${
                              formData.images.length >= 10
                                ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed'
                                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-200'
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add URL Slot</span>
                          </button>
                        </div>
                      </div>

                      {formData.images.length === 0 ? (
                        <div className="py-8 text-center text-neutral-400 text-xs border border-dashed border-neutral-300 rounded-xl space-y-1">
                          <p className="font-semibold text-neutral-600">No images added for this product.</p>
                          <p className="text-[11px]">Click "Upload from Device" or "Add URL Slot" to add up to 10 images.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {formData.images.map((imgUrl, idx) => (
                            <div key={idx} className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl flex flex-col sm:flex-row sm:items-center gap-3">
                              <img
                                src={imgUrl}
                                alt={`Preview ${idx + 1}`}
                                className="w-14 h-14 rounded-lg object-cover bg-white shrink-0 border border-neutral-200 shadow-2xs"
                              />
                              
                              <div className="flex-1 min-w-0">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-0.5">
                                  Image #{idx + 1} {idx === 0 ? '(Main Display Image)' : '(Thumbnail)'}
                                </label>
                                <input
                                  type="text"
                                  value={imgUrl.length > 120 ? `${imgUrl.slice(0, 110)}... [Local File]` : imgUrl}
                                  onChange={(e) => handleImageChange(idx, e.target.value)}
                                  placeholder="Image URL (https://... or Local Data URL)"
                                  className="w-full bg-white border border-neutral-300 rounded-lg py-1.5 px-3 text-xs text-neutral-700 font-mono focus:outline-none focus:border-[#580c22]"
                                />
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-center">
                                <label className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-[10px] font-bold px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center gap-1 transition">
                                  <Upload className="w-3 h-3 text-[#580c22]" />
                                  <span>Change File</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e, idx)}
                                  />
                                </label>

                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(idx)}
                                  className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                  title="Remove image"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Save Footer Action Bar */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={handleAddNewProduct}
                        className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition border border-neutral-200"
                      >
                        <PlusCircle className="w-4 h-4 text-[#580c22]" />
                        <span>Add New Product</span>
                      </button>

                      <button
                        type="submit"
                        className="bg-[#580c22] hover:bg-[#450719] text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition shadow-xs"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save All Changes</span>
                      </button>
                    </div>

                  </form>
                  )}

                </div>

              </div>
            )}

            {/* Tab 4: Orders Placeholder */}
            {activeTab === 'orders' && (
              <div className="py-12 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-neutral-300 mx-auto" />
                <h3 className="font-semibold text-sm text-neutral-800">Admin Orders Panel Ready</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  This section is ready for the custom order management and admin functionalities you tell me to add next!
                </p>
              </div>
            )}

          </div>
        </div>

      </div>



    </div>
  );
};

