'use client';

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import RemoveIcon from '@mui/icons-material/Remove';
import ReplayIcon from '@mui/icons-material/Replay';
import SecurityIcon from '@mui/icons-material/Security';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery, useTheme
} from '@mui/material';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  BannerTxt,
  Bgimage,
  Textoverimg1
} from "./style";

// --- Mock Data & Utilities ---

const mockProducts = [
  {
    id: 1, name: 'Premium Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    price: 299.99, variant: 'Color: Midnight Black', stock: 5, deliveryDays: '3-5 Business Days',
  },
  {
    id: 2, name: 'Minimalist Leather Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
    price: 159.00, variant: 'Size: 42mm | Brown Strap', stock: 2, deliveryDays: '2-4 Business Days',
  },
  {
    id: 3, name: 'Smart Home Speaker', image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=300',
    price: 89.50, variant: 'Color: Sandstone', stock: 10, deliveryDays: '1-3 Business Days',
  },
  {
    id: 4, name: 'Premium Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    price: 299.99, variant: 'Color: Midnight Black', stock: 15, deliveryDays: '3-5 Business Days',
  },
];

const recommendedProducts = [
  { id: 4, name: 'Watch Stand', price: 29.00, image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300' },
  { id: 5, name: 'Headphone Case', price: 19.00, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300' },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// --- Types ---

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  variant: string;
  stock: number;
  deliveryDays: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  savedForLater: CartItem[];
  coupon: { code: string; percentage: number } | null;
  loading: boolean;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  saveForLater: (id: number) => void;
  moveToCart: (id: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
  subTotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

// --- Context ---

const CartContext = createContext<CartContextType | undefined>(undefined);

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<{ code: string; percentage: number } | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce_cart');
    const savedLater = localStorage.getItem('ecommerce_saved_later');
    if (savedCart) setItems(JSON.parse(savedCart));
    if (savedLater) setSavedForLater(JSON.parse(savedLater));
    
    // Demo: Pre-fill cart if empty for better preview
    if (!savedCart || JSON.parse(savedCart).length === 0) {
        const initialItems = mockProducts.map(p => ({...p, quantity: 1}));
        setItems(initialItems);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('ecommerce_cart', JSON.stringify(items));
      localStorage.setItem('ecommerce_saved_later', JSON.stringify(savedForLater));
    }
  }, [items, savedForLater, loading]);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setItems(items.map(item => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeItem = (id: number) => setItems(items.filter(item => item.id !== id));

  const saveForLater = (id: number) => {
    const itemToSave = items.find(item => item.id === id);
    if (itemToSave) {
      setSavedForLater([...savedForLater, { ...itemToSave, quantity: 1 }]);
      removeItem(id);
    }
  };

  const moveToCart = (id: number) => {
    const itemToMove = savedForLater.find(item => item.id === id);
    if (itemToMove) {
      setItems([...items, itemToMove]);
      setSavedForLater(savedForLater.filter(item => item.id !== id));
    }
  };

  const applyCoupon = (code: string) => {
    if (code === 'DISCOUNT10') {
      setCoupon({ code: 'DISCOUNT10', percentage: 10 });
      return true;
    }
    return false;
  };

  const removeCoupon = () => setCoupon(null);
  const clearCart = () => setItems([]);

  const subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = coupon ? (subTotal * coupon.percentage) / 100 : 0;
  const shipping = subTotal > 500 ? 0 : 15.00;
  const tax = (subTotal - discount) * 0.08;
  const total = subTotal - discount + shipping + tax;

  return (
    <CartContext.Provider value={{
      items, savedForLater, coupon, loading, updateQuantity, removeItem, saveForLater,
      moveToCart, applyCoupon, removeCoupon, clearCart, subTotal, discount, shipping, tax, total
    }}>
      {children}
    </CartContext.Provider>
  );
};

// --- Sub-Components ---

const MobileCartItem = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeItem, saveForLater } = useCart();
  const [swipeX, setSwipeX] = useState(0);
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => touchStartX.current = e.touches[0].clientX;
  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.touches[0].clientX;
    if (diff > 0) setSwipeX(Math.min(diff, 100));
  };
  const handleTouchEnd = () => {
    if (swipeX > 80) removeItem(item.id);
    setSwipeX(0);
  };

  return (
    <Box sx={{ position: 'relative', mb: 2, overflow: 'hidden', borderRadius: 2 }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '100%', bgcolor: 'error.main', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 3, borderRadius: 2 }}>
        <DeleteIcon sx={{ color: 'white' }} />
      </Box>
      <Paper
        elevation={0}
        sx={{
          transform: `translateX(-${swipeX}px)`, transition: swipeX === 0 ? 'transform 0.2s' : 'none',
          display: 'flex', border: '1px solid', borderColor: 'divider', touchAction: 'pan-y', bgcolor: 'background.paper'
        }}
        onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
      >
        <CardMedia component="img" sx={{ width: 120, height: 120, objectFit: 'cover' }} image={item.image} alt={item.name} />
        <Box sx={{ p: 2, flex: 1 }}>
          <Typography variant="subtitle2" noWrap fontWeight="bold">{item.name}</Typography>
          <Typography variant="body2" color="text.secondary">{item.variant}</Typography>
          <Typography variant="body2" color="primary" fontWeight="bold" sx={{ mt: 1 }}>{formatCurrency(item.price)}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', borderRadius: 1 }}>
              <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}><RemoveIcon fontSize="small" /></IconButton>
              <Typography sx={{ width: 24, textAlign: 'center' }}>{item.quantity}</Typography>
              <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}><AddIcon fontSize="small" /></IconButton>
            </Box>
            <IconButton size="small" onClick={() => saveForLater(item.id)}><FavoriteBorderIcon fontSize="small" /></IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

const DesktopCartItem = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeItem, saveForLater } = useCart();
  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CardMedia component="img" image={item.image} sx={{ width: 80, height: 80, borderRadius: 1, objectFit: 'cover' }} />
        <Box>
          <Typography variant="subtitle2" fontWeight="bold">{item.name}</Typography>
          <Typography variant="caption" color="text.secondary">{item.variant}</Typography>
          <Chip label={`${item.stock} in stock`} size="small" color="success" sx={{ mt: 0.5, height: 20, fontSize: '0.7rem' }} />
        </Box>
      </TableCell>
      <TableCell>{formatCurrency(item.price)}</TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', borderRadius: 1, width: 'fit-content' }}>
          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}><RemoveIcon fontSize="small" /></IconButton>
          <Typography sx={{ width: 30, textAlign: 'center' }}>{item.quantity}</Typography>
          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}><AddIcon fontSize="small" /></IconButton>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Typography fontWeight="bold">{formatCurrency(item.price * item.quantity)}</Typography>
        <Typography variant="caption" color="text.secondary">{item.deliveryDays}</Typography>
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Save for later"><IconButton onClick={() => saveForLater(item.id)}><FavoriteBorderIcon fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="Remove"><IconButton onClick={() => removeItem(item.id)} color="error"><DeleteIcon fontSize="small" /></IconButton></Tooltip>
      </TableCell>
    </TableRow>
  );
};

const OrderSummary = ({ isMobile }: { isMobile: boolean }) => {
  const { subTotal, discount, shipping, tax, total, coupon, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);

  const handleApplyCoupon = () => {
    if (applyCoupon(couponInput)) {
      setCouponInput(''); setCouponError(false);
    } else { setCouponError(true); }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">Order Summary</Typography>
      <Box sx={{ mb: 2 }}>
        {coupon ? (
          <Alert severity="success" action={<IconButton size="small" onClick={removeCoupon}><DeleteIcon /></IconButton>}>
            Coupon `{coupon.code}` applied! You saved {formatCurrency(discount)}
          </Alert>
        ) : (
          <Stack direction="row" spacing={1}>
            <TextField size="small" placeholder="Promo Code" fullWidth value={couponInput} onChange={(e) => setCouponInput(e.target.value)} error={couponError} helperText={couponError ? "Invalid code" : ""} />
            <Button variant="outlined" onClick={handleApplyCoupon}>Apply</Button>
          </Stack>
        )}
      </Box>
      <Accordion variant="outlined" elevation={0} sx={{ mb: 2, bgcolor: 'background.paper' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2">Estimate Shipping & Tax</Typography></AccordionSummary>
        <AccordionDetails>
          <TextField type="select" size="small" label="Country" fullWidth sx={{ mb: 1 }} defaultValue="US">Select</TextField>
          <TextField size="small" label="Zip Code" fullWidth />
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography color="text.secondary">Subtotal</Typography><Typography>{formatCurrency(subTotal)}</Typography></Box>
        {discount > 0 && <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'success.main' }}><Typography>Discount</Typography><Typography>- {formatCurrency(discount)}</Typography></Box>}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography color="text.secondary">Shipping</Typography><Typography>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</Typography></Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography color="text.secondary">Estimated Tax</Typography><Typography>{formatCurrency(tax)}</Typography></Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="h6" fontWeight="bold">Total</Typography><Typography variant="h6" fontWeight="bold">{formatCurrency(total)}</Typography></Box>
      </Stack>
      <Button variant="contained" color="primary" fullWidth size="large" sx={{ mt: 3, py: 1.5 }} href='/pages/checkout' startIcon={<PaymentIcon />}>Proceed to Checkout</Button>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3, color: 'text.secondary' }}>
        <Tooltip title="Secure Checkout"><SecurityIcon fontSize="small" /></Tooltip>
        <Tooltip title="Free Shipping over $500"><LocalShippingIcon fontSize="small" /></Tooltip>
        <Tooltip title="Easy Returns"><ReplayIcon fontSize="small" /></Tooltip>
      </Stack>
    </Box>
  );
};

const Recommendations = ({ title, products }: { title: string; products: any[] }) => (
  <Box sx={{ mt: 5 }}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>{title}</Typography>
    <Divider sx={{ mb: 2 }} />
    <Grid container spacing={2}>
      {products.map((prod) => (
        <Grid item xs={6} sm={4} md={2} key={prod.id}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardMedia component="img" height="140" image={prod.image} alt={prod.name} sx={{ objectFit: 'cover' }} />
            <CardContent><Typography variant="body2" noWrap>{prod.name}</Typography><Typography variant="body2" fontWeight="bold">{formatCurrency(prod.price)}</Typography></CardContent>
            <CardActions><Button size="small" fullWidth>Add</Button></CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const SavedForLaterSection = () => {
  const { savedForLater, moveToCart } = useCart();
  if (savedForLater.length === 0) return null;
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>Saved For Later ({savedForLater.length})</Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {savedForLater.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card variant="outlined">
              <Box sx={{ display: 'flex', p: 1 }}>
                <CardMedia component="img" sx={{ width: 80, height: 80 }} image={item.image} />
                <Box sx={{ ml: 2, flex: 1 }}><Typography variant="subtitle2">{item.name}</Typography><Typography variant="body2" color="primary">{formatCurrency(item.price)}</Typography></Box>
              </Box>
              <CardActions sx={{ justifyContent: 'flex-end' }}><Button size="small" onClick={() => moveToCart(item.id)}>Move to Cart</Button></CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const EmptyCart = () => (
  <Paper sx={{ p: 5, textAlign: 'center', mt: 4 }}>
    <ShoppingCartOutlinedIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
    <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>Looks like you haven't added anything to your cart yet.</Typography>
    <Button variant="contained" size="large" startIcon={<ArrowBackIcon />}>Start Shopping</Button>
  </Paper>
);

// --- Main Component Export ---

export function CartComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { items, loading, clearCart, total } = useCart();
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /></Box>;
  }

  if (items.length === 0) {
    return (
      <Box sx={{ py: 4 }}>
        <EmptyCart />
        <Recommendations title="You might be interested in" products={recommendedProducts} />
      </Box>
    );
  }

  return (
<>

      <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box>
                <Bgimage>
                  <BannerTxt>
                    <Box>
                      <Textoverimg1 variant="h1">Cart</Textoverimg1>
                    </Box>
                  </BannerTxt>
                </Bgimage>
              </Box>
            </Grid>
      </Grid>
      
      
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 10, mt: 5 }}>
          <Typography variant="h4" fontWeight="bold">Shopping Cart ({items.length} items)</Typography>
          <Button variant='outlined' color="error" onClick={clearCart} startIcon={<DeleteIcon />}>Clear Cart</Button>
      </Box>
      
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{display: 'flex', justifyContent:'space-around', mb:3}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid container spacing={4}>
              <Grid xs={12} md={8}>
                  {isMobile ? (
                      <Box>{items.map((item) => <MobileCartItem key={item.id} item={item} />)}</Box>
                  ) : (
                      <TableContainer component={Paper} variant="outlined">
                      <Table>
                          <TableHead>
                          <TableRow>
                              <TableCell>Product Details</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell align="right">Subtotal</TableCell>
                              <TableCell align="right">Actions</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>{items.map((item) => <DesktopCartItem key={item.id} item={item} />)}</TableBody>
                      </Table>
                      </TableContainer>
                  )}
                  <Button startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>Continue Shopping</Button>
                  <SavedForLaterSection />
                  <Recommendations title="Frequently Bought Together" products={recommendedProducts} />
              </Grid>

              {!isMobile && (
              <Grid md={4}>
                  <Paper variant="outlined" sx={{ position: 'sticky', top: 20 }}>
                  <OrderSummary isMobile={false} />
                  </Paper>
              </Grid>
              )}
          </Grid>

          {isMobile && (
              <>
              <Drawer anchor="bottom" open={mobileSummaryOpen} onClose={() => setMobileSummaryOpen(false)} PaperProps={{ sx: { borderRadius: '16px 16px 0 0' } }}>
                  <OrderSummary isMobile />
              </Drawer>
              <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, p: 2, zIndex: 1000, borderTop: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} elevation={3}>
                  <Box>
                  <Typography variant="body2" color="text.secondary">Total</Typography>
                  <Typography variant="h6" fontWeight="bold">{formatCurrency(total)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" onClick={() => setMobileSummaryOpen(true)}>Details</Button>
                  <Button variant="contained" color="primary">Checkout</Button>
                  </Box>
              </Paper>
              </>
          )}
        </Box>
      </Grid>

      
      
</>
    
    
  );
}

// Export the Provider wrapped version for convenience if needed, or just the component
export { CartProvider };

