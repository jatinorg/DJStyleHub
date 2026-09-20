import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  writeBatch 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  saveProducts: (newProducts: Product[]) => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  clearAllProducts: () => Promise<void>;
  resetToDefault: () => Promise<void>;
  getProductBySlugOrId: (identifier: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
}

const STORAGE_KEY = 'dj_style_hub_catalog_v3';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading initial product cache:', e);
    }
    return INITIAL_PRODUCTS;
  });
  const [loading, setLoading] = useState(true);

  // Subscribe to real-time updates from Firestore 'products' collection
  useEffect(() => {
    const productsRef = collection(db, 'products');

    const unsubscribe = onSnapshot(
      productsRef,
      async (snapshot) => {
        const firestoreList: Product[] = [];
        snapshot.forEach((docSnap) => {
          firestoreList.push({ ...docSnap.data() } as Product);
        });

        // Auto-migration check: If Firestore has NO products yet, but localStorage has existing products added by Admin, upload them!
        if (firestoreList.length === 0) {
          try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved !== null) {
              const localProducts = JSON.parse(saved);
              if (Array.isArray(localProducts) && localProducts.length > 0) {
                console.log('Migrating local products to Firestore...', localProducts.length);
                const batch = writeBatch(db);
                localProducts.forEach((p: Product) => {
                  if (p.id) {
                    const docRef = doc(db, 'products', p.id);
                    const cleanProduct = JSON.parse(JSON.stringify(p));
                    batch.set(docRef, cleanProduct);
                  }
                });
                await batch.commit();
                return;
              }
            }
          } catch (migrationErr) {
            console.warn('Local products migration notice:', migrationErr);
          }
        }

        setProducts(firestoreList);
        setLoading(false);

        // Update local cache
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(firestoreList));
        } catch (e) {
          console.warn('Error updating local storage cache:', e);
        }
      },
      (error) => {
        console.error('Firestore products onSnapshot error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addProduct = async (product: Product) => {
    setProducts((prev) => {
      const updated = [product, ...prev.filter((p) => p.id !== product.id)];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      const cleanProduct = JSON.parse(JSON.stringify(product));
      await setDoc(doc(db, 'products', product.id), cleanProduct);
    } catch (err) {
      console.error('Firestore addProduct error:', err);
    }
  };

  const updateProduct = async (product: Product) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === product.id ? { ...product } : p));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      const cleanProduct = JSON.parse(JSON.stringify(product));
      await setDoc(doc(db, 'products', product.id), cleanProduct);
    } catch (err) {
      console.error('Firestore updateProduct error:', err);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      console.error('Firestore deleteProduct error:', err);
    }
  };

  const saveProducts = async (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
      const batch = writeBatch(db);
      newProducts.forEach((p) => {
        if (p.id) {
          const docRef = doc(db, 'products', p.id);
          const cleanProduct = JSON.parse(JSON.stringify(p));
          batch.set(docRef, cleanProduct);
        }
      });
      await batch.commit();
    } catch (err) {
      console.error('Firestore saveProducts error:', err);
    }
  };

  const clearAllProducts = async () => {
    setProducts([]);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      const batch = writeBatch(db);
      products.forEach((p) => {
        batch.delete(doc(db, 'products', p.id));
      });
      await batch.commit();
    } catch (err) {
      console.error('Firestore clearAllProducts error:', err);
    }
  };

  const resetToDefault = async () => {
    await clearAllProducts();
  };

  const getProductBySlugOrId = (identifier: string): Product | undefined => {
    const cleanId = identifier.toLowerCase().trim();
    return products.find((p) => p.slug.toLowerCase() === cleanId || p.id.toLowerCase() === cleanId);
  };

  const getProductsByCategory = (category: string): Product[] => {
    if (category === 'all') return products;
    return products.filter(
      (p) => p.category === category || p.subcategory.toLowerCase().includes(category.toLowerCase())
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        saveProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        clearAllProducts,
        resetToDefault,
        getProductBySlugOrId,
        getProductsByCategory
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

