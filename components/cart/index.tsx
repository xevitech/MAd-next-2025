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
import { apiClient } from "@/components/common/common";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { toast } from "react-toastify";
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



const recommendedProducts = [
  { id: 4, name: 'Watch Stand', price: 29.00, image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300' },
  { id: 5, name: 'Headphone Case', price: 19.00, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300' },
];

const formatCurrency = (amount: number, symbol = '$') => {
  return `${symbol}${amount.toFixed(2)}`;
};

// --- Types ---

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  currency?: string;
  unit_price?: number;
  saved_for_later?: boolean | number;
}

interface CartContextType {
  items: CartItem[];
  // savedForLater: CartItem[]; // we will keep saved for later as a flag in the same items array to avoid sync issues
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
  // const [savedForLater, setSavedForLater] = useState<CartItem[]>([]); // now we will keep saved for later as a flag in the same items array to avoid sync issues
  const [coupon, setCoupon] = useState<{ code: string; percentage: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  // Initialize from api
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);

        const curr = localStorage.getItem("currency");

        let user_id = "";

        const userData = localStorage.getItem("userData");
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          user_id = parsedUserData.id;
          setUserId(user_id);
        }

        const res = await apiClient(
          `cart/list?user_id=${user_id}&currency_id=${curr}`,
          "get",
          {
            headers: {
              Accept: "application/json"
            }
          }
        );

        if (res.status) {
          const mappedItems = res.data.map((item: any) => ({
            id: item.id,
            name: item.product_name,
            image: item.product_image,
            price: parseFloat(item.price), // important
            unit_price: parseFloat(item.unit_price), // important
            quantity: item.quantity,
            currency: item.currency,
            saved_for_later: item.saved_for_later,
          }));

          setItems(mappedItems);
        }
      } catch (error) {
        console.error("Cart API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('ecommerce_cart', JSON.stringify(items));
      // localStorage.setItem('ecommerce_saved_later', JSON.stringify(savedForLater));
    }
  }, [items, loading]);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setItems(items.map(item => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeItem = async (id: number) => {
    const prevItems = items;
    setItems((prev) => prev.filter(item => item.id !== id));
    try {
      const res = await apiClient(
        `cart/remove?cart_id=${id}`,
        "delete",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (res.status) {
        toast.success(res.message || "Item removed from cart");
      } else {
        throw new Error(res.message || "Delete failed");
      }

    } catch (error) {
      console.error("Delete API error:", error);
      setItems(prevItems);
      toast.error("Failed to remove cart item");
    }
  };

  const saveForLater = async (id: number) => {
    const prevItems = items;

    // ✅ update UI instantly (move item to saved)
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, saved_for_later: 1 } : item
      )
    );

    try {
      const res = await apiClient(
        `cart/save-for-later?cart_id=${id}&saved_for_later=1`,
        "post",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (res.status) {
        toast.success(res.message || "Saved for later");
      } else {
        throw new Error(res.message || "Failed");
      }

    } catch (error) {
      console.error("Save for later error:", error);

      // rollback
      setItems(prevItems);
      toast.error("Failed to save item for later");
    }
  };

  // const moveToCart = async (id: number) => {
  //   const itemToMove = savedForLater.find(item => item.id === id);
  //   if (itemToMove) {
  //     setItems([...items, itemToMove]);
  //     setSavedForLater(savedForLater.filter(item => item.id !== id));
  //   }
  // };

  const moveToCart = async (id: number) => {
    const prevItems = items;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, saved_for_later: 0 } : item
      )
    );

    try {
      const res = await apiClient(
        `cart/save-for-later?cart_id=${id}&saved_for_later=0`,
        "post",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!res.status) {
        throw new Error(res.message || "Failed");
      }

    } catch (error) {
      setItems(prevItems);
      toast.error("Failed to move item to cart");
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
  const cartItems = items.filter(i => !i.saved_for_later);

  const subTotal = cartItems.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
  const discount = coupon ? (subTotal * coupon.percentage) / 100 : 0;
  const shipping = subTotal > 500 ? 0 : 15.00;
  const tax = (subTotal - discount) * 0.08;
  const total = subTotal - discount + shipping + tax;

  return (
    <CartContext.Provider value={{
      items, coupon, loading, updateQuantity, removeItem, saveForLater,
      moveToCart, applyCoupon, removeCoupon, clearCart, subTotal, discount, shipping, tax, total
    }}> 
    {/* // we can also provide savedForLater here by filtering items with saved_for_later flag, but to avoid confusion we will keep it as a separate state for now */}
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
          {/* <Typography variant="body2" color="text.secondary">{item.variant}</Typography> */}
          <Typography variant="body2" color="primary" fontWeight="bold" sx={{ mt: 1 }}>{formatCurrency(item.unit_price, item.currency)}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', borderRadius: 1 }}>
              <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}><RemoveIcon fontSize="small" /></IconButton>
              <Typography sx={{ width: 24, textAlign: 'center' }}>{item.quantity}</Typography>
              <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}><AddIcon fontSize="small" /></IconButton>
            </Box>
            <IconButton size="small" onClick={() => saveForLater(item.id)}><BookmarkBorderIcon fontSize="small" /></IconButton>
            <IconButton onClick={() => removeItem(item.id)} color="error"><DeleteIcon fontSize="small" /></IconButton>
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
          {/* <Typography variant="caption" color="text.secondary">{item.variant}</Typography> */}
          {/* <Chip label={`${item.stock} in stock`} size="small" color="success" sx={{ mt: 0.5, height: 20, fontSize: '0.7rem' }} /> */}
        </Box>
      </TableCell>
      <TableCell>{formatCurrency(item.unit_price, item.currency)}</TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', borderRadius: 1, width: 'fit-content' }}>
          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}><RemoveIcon fontSize="small" /></IconButton>
          <Typography sx={{ width: 30, textAlign: 'center' }}>{item.quantity}</Typography>
          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}><AddIcon fontSize="small" /></IconButton>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Typography fontWeight="bold">{formatCurrency(item.unit_price * item.quantity, item.currency)}</Typography>
        {/* <Typography variant="caption" color="text.secondary">{item.deliveryDays}</Typography> */}
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Save for later"><IconButton onClick={() => saveForLater(item.id)}><BookmarkBorderIcon fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="Remove">
          <IconButton onClick={() => removeItem(item.id)} color="error"><DeleteIcon fontSize="small" /></IconButton>
        </Tooltip>
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
            <Button  color="error" variant="outlined" onClick={handleApplyCoupon}>Apply</Button>
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
      <Button variant="contained" color="error" fullWidth size="large" sx={{ mt: 3, py: 1.5 }} href='/checkout' startIcon={<PaymentIcon />}>Proceed to Checkout</Button>
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
  const { items, moveToCart } = useCart();

  const savedItems = items.filter(i => i.saved_for_later === 1);

  if (savedItems.length === 0) return null;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Saved For Later ({savedItems.length})
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {savedItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card variant="outlined">
              <Box sx={{ display: 'flex', p: 1 }}>
                <CardMedia component="img" sx={{ width: 80, height: 80 }} image={item.image} />
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Typography variant="subtitle2">{item.name}</Typography>
                  <Typography variant="body2" color="error" fontWeight="bold">
                    {formatCurrency(item.unit_price, item.currency)}
                  </Typography>
                </Box>
              </Box>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button  color="error" size="small" onClick={() => moveToCart(item.id)}>
                  Move to Cart
                </Button>
              </CardActions>
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

  const cartItems = items.filter(i => !i.saved_for_later);

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
          <Typography variant="h4" fontWeight="bold">Shopping Cart ({cartItems.length} items)</Typography>
          <Button variant='outlined' color="error" onClick={clearCart} startIcon={<DeleteIcon />}>Clear Cart</Button>
      </Box>
      
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{display: 'flex', justifyContent:'space-around', mb:3}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid container spacing={4}>
              <Grid xs={12} md={8}>
                  {isMobile ? (
                      <Box>{cartItems.map((item) => <MobileCartItem key={item.id} item={item} />)}</Box>
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
                          <TableBody>{cartItems.map((item) => <DesktopCartItem key={item.id} item={item} />)}</TableBody>
                      </Table>
                      </TableContainer>
                  )}
                  <Button  color="error" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>Continue Shopping</Button>
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
export { CartProvider };