'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import {
  Alert,
  Box,
  Button,
  CardMedia,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment, Link, MenuItem,
  Paper,
  Radio, RadioGroup,
  Stack,
  Step, StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

// --- Types & Mock Data ---

interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

// Mock Cart Data (In real app, this comes from CartContext or API)
const mockCartItems: CartItem[] = [
  { id: 1, name: 'Premium Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', price: 299.99, quantity: 1, variant: 'Black' },
  { id: 2, name: 'Minimalist Leather Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300', price: 159.00, quantity: 1, variant: '42mm' },
];

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

// --- Context ---

interface CheckoutContextType {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  contactInfo: { email: string; phone: string };
  setContactInfo: React.Dispatch<React.SetStateAction<{ email: string; phone: string }>>;
  shippingAddress: Address;
  setShippingAddress: React.Dispatch<React.SetStateAction<Address>>;
  billingAddress: Address;
  setBillingAddress: React.Dispatch<React.SetStateAction<Address>>;
  sameAsBilling: boolean;
  setSameAsBilling: React.Dispatch<React.SetStateAction<boolean>>;
  shippingMethod: string;
  setShippingMethod: React.Dispatch<React.SetStateAction<string>>;
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  cardDetails: { number: string; expiry: string; cvv: string; name: string };
  setCardDetails: React.Dispatch<React.SetStateAction<{ number: string; expiry: string; cvv: string; name: string }>>;
  orderNotes: string;
  setOrderNotes: React.Dispatch<React.SetStateAction<string>>;
  isProcessing: boolean;
  placeOrder: () => void;
  orderError: string | null;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error('useCheckout must be used within CheckoutProvider');
  return context;
};

export const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  
  // Form States
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [shippingAddress, setShippingAddress] = useState<Address>({
    firstName: '', lastName: '', address1: '', city: '', state: '', zip: '', country: 'US', phone: ''
  });
  const [billingAddress, setBillingAddress] = useState<Address>({
    firstName: '', lastName: '', address1: '', city: '', state: '', zip: '', country: 'US', phone: ''
  });
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [orderNotes, setOrderNotes] = useState('');

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const placeOrder = () => {
    setIsProcessing(true);
    setOrderError(null);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate success or error
      const success = true; // Math.random() > 0.2;
      if (success) {
        setActiveStep(4); // Confirmation Step
      } else {
        setOrderError("Payment failed. Please check your card details or try another method.");
      }
    }, 2500);
  };

  return (
    <CheckoutContext.Provider value={{
      activeStep, handleNext, handleBack, contactInfo, setContactInfo,
      shippingAddress, setShippingAddress, billingAddress, setBillingAddress,
      sameAsBilling, setSameAsBilling, shippingMethod, setShippingMethod,
      paymentMethod, setPaymentMethod, cardDetails, setCardDetails,
      orderNotes, setOrderNotes, isProcessing, placeOrder, orderError
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};

// --- 1. Customer Details Component ---

const CustomerDetails = () => {
  const { contactInfo, setContactInfo, handleNext } = useCheckout();
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Contact Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            required
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            fullWidth
            required
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
            helperText="For delivery updates only"
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">Already have an account?</Typography>
            <Link href="#" underline="hover" onClick={(e) => e.preventDefault()}>Log In</Link>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={handleNext}>Continue to Shipping</Button>
      </Box>
    </Box>
  );
};

// --- 2. Shipping Address Component ---

const ShippingAddressSection = () => {
  const { shippingAddress, setShippingAddress, shippingMethod, setShippingMethod, handleNext, handleBack } = useCheckout();
  
  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', price: 5.00, time: '5-7 Business Days' },
    { id: 'express', name: 'Express Shipping', price: 15.00, time: '2-3 Business Days' },
    { id: 'sameday', name: 'Same Day Delivery', price: 25.00, time: 'Order within 2 hrs' },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField required label="First Name" fullWidth value={shippingAddress.firstName} onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label="Last Name" fullWidth value={shippingAddress.lastName} onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} />
        </Grid>
        <Grid item xs={12}>
          <TextField required label="Address Line 1" fullWidth value={shippingAddress.address1} onChange={(e) => setShippingAddress({ ...shippingAddress, address1: e.target.value })} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Address Line 2 (Optional)" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label="City" fullWidth value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label="State/Province" fullWidth value={shippingAddress.state} onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label="Zip/Postal Code" fullWidth value={shippingAddress.zip} onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField select required label="Country" fullWidth value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}>
            <MenuItem value="US">United States</MenuItem>
            <MenuItem value="CA">Canada</MenuItem>
            <MenuItem value="UK">United Kingdom</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Delivery Instructions (Optional)" fullWidth multiline rows={2} />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>Shipping Method</Typography>
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <RadioGroup value={shippingMethod} onChange={(e) => setShippingMethod(e.target.value)}>
          {shippingOptions.map((option) => (
            <Paper key={option.id} variant="outlined" sx={{ p: 2, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderColor: shippingMethod === option.id ? 'primary.main' : 'divider' }}>
              <FormControlLabel
                value={option.id}
                control={<Radio />}
                label={<Box>
                  <Typography fontWeight="bold">{option.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{option.time}</Typography>
                </Box>}
              />
              <Typography fontWeight="bold">{formatCurrency(option.price)}</Typography>
            </Paper>
          ))}
        </RadioGroup>
      </FormControl>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleBack}>Back</Button>
        <Button variant="contained" onClick={handleNext}>Continue to Payment</Button>
      </Box>
    </Box>
  );
};

// --- 3. Payment Method Component ---

const PaymentMethodSection = () => {
  const { 
    paymentMethod, setPaymentMethod, cardDetails, setCardDetails, 
    sameAsBilling, setSameAsBilling, handleNext, handleBack, 
    placeOrder, isProcessing, orderError 
  } = useCheckout();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Payment Method</Typography>
      
      <FormControl component="fieldset" sx={{ width: '100%', mb: 2 }}>
        <RadioGroup row value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
          <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'card' && (
        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Cardholder Name" fullWidth required value={cardDetails.name} onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label="Card Number" 
                fullWidth required 
                InputProps={{ startAdornment: (<InputAdornment position="start"><CreditCardIcon /></InputAdornment>) }}
                value={cardDetails.number} 
                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})} 
                placeholder="XXXX XXXX XXXX XXXX"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Expiry Date" fullWidth required placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="CVV" fullWidth required type="password" value={cardDetails.cvv} onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} />
            </Grid>
          </Grid>
        </Paper>
      )}

      {paymentMethod === 'paypal' && (
        <Alert severity="info" sx={{ mb: 3 }}>You will be redirected to PayPal to complete your purchase securely.</Alert>
      )}

      <FormControlLabel
        control={<Checkbox checked={sameAsBilling} onChange={(e) => setSameAsBilling(e.target.checked)} />}
        label="Billing address same as shipping"
      />
      
      {!sameAsBilling && (
        <Box sx={{ mt: 2, p: 2, border: '1px dashed grey', borderRadius: 1 }}>
          <Typography variant="subtitle2">Billing Address Form would go here</Typography>
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <TextField
          label="Order Notes (Optional)"
          fullWidth
          multiline
          rows={2}
          placeholder="Special instructions for the seller..."
        />
      </Box>

      <FormControlLabel
        control={<Checkbox required />}
        label={<Typography variant="body2">I agree to the <Link href="#">Terms & Conditions</Link> and <Link href="#">Privacy Policy</Link></Typography>}
        sx={{ mt: 2 }}
      />

      {orderError && <Alert severity="error" sx={{ mt: 2 }}>{orderError}</Alert>}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button onClick={handleBack} disabled={isProcessing}>Back</Button>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={placeOrder} 
          disabled={isProcessing}
          startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <LockIcon />}
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </Button>
      </Box>
    </Box>
  );
};

// --- 4. Order Summary Component ---

const OrderSummaryCheckout = () => {
  const items = mockCartItems; // Would come from context
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15.00; // Static for simplicity
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Order Summary</Typography>
      
      <Box sx={{ maxHeight: 250, overflow: 'auto', mb: 2 }}>
        {items.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', mb: 2 }}>
            <CardMedia
              component="img"
              image={item.image}
              sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1, mr: 2 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight="bold">{item.name}</Typography>
              <Typography variant="caption" color="text.secondary">Variant: {item.variant}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption">Qty: {item.quantity}</Typography>
                <Typography variant="body2">{formatCurrency(item.price)}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <TextField
        label="Discount Code"
        size="small"
        fullWidth
        InputProps={{ endAdornment: <Button size="small">Apply</Button> }}
        sx={{ mb: 2 }}
      />

      <Divider sx={{ my: 1 }} />
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Subtotal</Typography>
          <Typography variant="body2">{formatCurrency(subtotal)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Shipping</Typography>
          <Typography variant="body2">{formatCurrency(shipping)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Tax</Typography>
          <Typography variant="body2">{formatCurrency(tax)}</Typography>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
          <Typography variant="subtitle1" fontWeight="bold">{formatCurrency(total)}</Typography>
        </Box>
      </Stack>
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, gap: 1, color: 'text.secondary' }}>
        <LockIcon fontSize="small" />
        <Typography variant="caption">Secure Checkout - SSL Encrypted</Typography>
      </Box>
    </Paper>
  );
};

// --- Confirmation Component ---

const OrderConfirmation = () => (
  <Box sx={{ textAlign: 'center', py: 5 }}>
    <Box sx={{ color: 'success.main', mb: 2 }}>
      <svg style={{ width: 80, height: 80 }} viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    </Box>
    <Typography variant="h4" gutterBottom>Order Placed Successfully!</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
      Thank you for your purchase. You will receive an email confirmation shortly.
    </Typography>
    <Button variant="contained" color="primary" href="/">Continue Shopping</Button>
  </Box>
);

// --- Main Checkout Component ---

export function CheckoutComponent() {
  const { activeStep, isProcessing } = useCheckout();
  
  const steps = ['Customer Details', 'Shipping Address', 'Payment Method'];

  return (
    <Box sx={{ py: 4 }}>

      <Button variant='outlined' startIcon={<ArrowBackIcon />} href="/pages/cart" sx={{ mb: 2 }} disabled={isProcessing}>
        Back to Cart
      </Button>
      
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <OrderConfirmation />
      ) : (
        <Box sx={{display:'flex', justifyContent:'space-around', mb:3 }}>

            <Grid container spacing={8}>
                <Grid item xs={12} md={7}>
                    <Paper variant="outlined" sx={{ p: 3 }}>
                    {activeStep === 0 && <CustomerDetails />}
                    {activeStep === 1 && <ShippingAddressSection />}
                    {activeStep === 2 && <PaymentMethodSection />}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box sx={{ position: { md: 'sticky' }, top: 20 }}>
                    <OrderSummaryCheckout />
                    </Box>
                </Grid>
            </Grid>
        </Box>
        
      )}
    </Box>
  );
}