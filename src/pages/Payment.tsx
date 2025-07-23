import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CreditCardIcon, DollarSignIcon, ShieldCheckIcon, ArrowLeftIcon } from 'lucide-react';
import { UserProfile, PaymentMethod } from '@/types';
import { getUserById } from '@/services/dataService';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function Payment() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  
  const [recipient, setRecipient] = useState<UserProfile | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock payment methods - in real app, these would come from user's saved methods
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'card1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: 'paypal1',
      type: 'paypal',
      isDefault: false
    },
    {
      id: 'venmo1',
      type: 'venmo',
      isDefault: false
    },
    {
      id: 'cashapp1',
      type: 'cashapp',
      isDefault: false
    }
  ]);

  useEffect(() => {
    const loadRecipient = async () => {
      if (!userId) {
        navigate('/');
        return;
      }

      if (!currentUser) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to make a payment.",
          variant: "destructive"
        });
        navigate('/login');
        return;
      }

      try {
        const profileData = await getUserById(userId);
        
        if (!profileData) {
          toast({
            title: "User Not Found",
            description: "The recipient could not be found.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }

        if (profileData.id === currentUser.id) {
          toast({
            title: "Invalid Payment",
            description: "You cannot pay yourself.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }

        setRecipient(profileData);
        // Set default payment method
        const defaultMethod = paymentMethods.find(m => m.isDefault);
        if (defaultMethod) {
          setSelectedPaymentMethod(defaultMethod.id);
        }
      } catch (error) {
        console.error('Error loading recipient:', error);
        toast({
          title: "Error",
          description: "Failed to load recipient information.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadRecipient();
  }, [userId, currentUser, navigate, toast, paymentMethods]);

  const getPaymentMethodIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'card':
        return <CreditCardIcon className="w-5 h-5" />;
      case 'paypal':
        return <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>;
      case 'venmo':
        return <div className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">V</div>;
      case 'cashapp':
        return <div className="w-5 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">$</div>;
      default:
        return <CreditCardIcon className="w-5 h-5" />;
    }
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    switch (method.type) {
      case 'card':
        return `${method.brand} •••• ${method.last4}`;
      case 'paypal':
        return 'PayPal';
      case 'venmo':
        return 'Venmo';
      case 'cashapp':
        return 'Cash App';
      default:
        return 'Payment Method';
    }
  };

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedPaymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Payment Successful",
        description: `Successfully sent $${amount} to ${recipient?.name}`,
      });

      navigate('/my-requests');
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <MainLayout title="Payment">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!recipient) {
    return (
      <MainLayout title="Payment">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">Recipient Not Found</h2>
          <p className="text-gray-600 mt-2">The payment recipient could not be found.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Send Payment">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Recipient Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSignIcon className="w-5 h-5" />
              Send Payment To
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={recipient.avatar} alt={recipient.name} />
                <AvatarFallback className="text-lg">
                  {recipient.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{recipient.name}</h3>
                <p className="text-gray-600">{recipient.school}</p>
                {recipient.isHelper && (
                  <Badge variant="secondary" className="mt-1">
                    Helper
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <div className="relative">
                <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10"
                  min="0.01"
                  step="0.01"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="What's this payment for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Separator />

            {/* Payment Methods */}
            <div className="space-y-4">
              <Label>Payment Method</Label>
              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
                className="space-y-3"
              >
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <div className="flex items-center gap-3 flex-1">
                      {getPaymentMethodIcon(method.type)}
                      <span className="font-medium">
                        {getPaymentMethodLabel(method)}
                      </span>
                      {method.isDefault && (
                        <Badge variant="outline" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-800">
                <ShieldCheckIcon className="w-5 h-5" />
                <span className="font-medium">Secure Payment</span>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                Your payment information is encrypted and secure. Payments are processed instantly.
              </p>
            </div>

            {/* Payment Summary */}
            {amount && parseFloat(amount) > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Payment Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span>${parseFloat(amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span>$0.00</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${parseFloat(amount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Send Button */}
            <Button
              onClick={handlePayment}
              disabled={!amount || parseFloat(amount) <= 0 || !selectedPaymentMethod || isProcessing}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Processing Payment...
                </>
              ) : (
                <>
                  <DollarSignIcon className="w-4 h-4 mr-2" />
                  Send ${amount || '0.00'}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}