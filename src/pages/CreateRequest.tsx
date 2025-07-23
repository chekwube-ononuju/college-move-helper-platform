import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/MainLayout';
import { MapView } from '@/components/MapView';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { MoveRequest } from '@/types';
import { createMoveRequest } from '@/services/dataService';
import { Label } from '@/components/ui/label';
import { CalendarIcon, DollarSignIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

export default function CreateRequest() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('14:00');
  const [price, setPrice] = useState<number>(25);
  const [isHourly, setIsHourly] = useState(true);
  const [estimatedHours, setEstimatedHours] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // For the map marker preview - default to a location in Los Angeles
  const [location, setLocation] = useState({ lat: 34.0522, lng: -118.2437 });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a move request",
        variant: "destructive"
      });
      return;
    }
    
    if (!title || !description || !address || !date) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // In a real app, we would geocode the address to get lat/lng
      // For this MVP, we'll use a dummy location near the entered address
      // with a small random offset to show different pins on the map
      const randomOffset = (Math.random() - 0.5) * 0.01;
      const geoLocation = {
        lat: location.lat + randomOffset,
        lng: location.lng + randomOffset
      };
      
      const newRequest: Omit<MoveRequest, 'id' | 'createdAt'> = {
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        title,
        description,
        location: {
          address,
          lat: geoLocation.lat,
          lng: geoLocation.lng
        },
        date: date ? format(date, 'yyyy-MM-dd') : '',
        time,
        price,
        isHourly,
        estimatedHours: isHourly ? estimatedHours : undefined,
        status: 'open'
      };
      
      await createMoveRequest(newRequest);
      
      toast({
        title: "Request Created",
        description: "Your moving request has been posted successfully!"
      });
      
      navigate('/my-requests');
    } catch (error) {
      console.error('Error creating request:', error);
      toast({
        title: "Error",
        description: "Failed to create your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Update map when location changes
  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress);
    
    // In a real app, we would geocode the address
    // For this MVP, we'll just add small random offsets to the default location
    if (newAddress) {
      const randomLat = (Math.random() - 0.5) * 0.05;
      const randomLng = (Math.random() - 0.5) * 0.05;
      setLocation({
        lat: 34.0522 + randomLat,
        lng: -118.2437 + randomLng
      });
    }
  };
  
  return (
    <MainLayout title="Create Moving Request">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Help moving my furniture to dorm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you need help with, how many items, special requirements, etc."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Location</Label>
                  <Input
                    id="address"
                    placeholder="Enter the address where you need help"
                    value={address}
                    onChange={(e) => handleAddressChange(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Pricing Type</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="hourly-pricing"
                        checked={isHourly}
                        onCheckedChange={setIsHourly}
                      />
                      <Label htmlFor="hourly-pricing" className="text-sm">
                        {isHourly ? 'Hourly Rate' : 'Fixed Price'}
                      </Label>
                    </div>
                  </div>
                  
                  {isHourly && (
                    <div className="space-y-2">
                      <Label htmlFor="estimated-hours">Estimated Hours Needed</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                        <Input
                          id="estimated-hours"
                          type="number"
                          min="1"
                          max="12"
                          step="0.5"
                          className="pl-8"
                          value={estimatedHours}
                          onChange={(e) => setEstimatedHours(parseFloat(e.target.value))}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        How many hours do you estimate this job will take?
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      {isHourly ? 'Hourly Rate ($)' : 'Total Price ($)'}
                    </Label>
                    <div className="relative">
                      <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input
                        id="price"
                        type="number"
                        min="5"
                        max="500"
                        className="pl-8"
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        required
                      />
                    </div>
                    {isHourly && estimatedHours > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Estimated total: ${(price * estimatedHours).toFixed(2)} ({estimatedHours} hours × ${price}/hour)
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Label>Location Preview</Label>
                  <div className="mt-2 border rounded-md overflow-hidden">
                    <MapView 
                      markers={[{
                        id: 'preview',
                        position: location,
                        title: title || 'Your Request',
                        price: price
                      }]}
                      center={location}
                      height="300px"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    This is approximately where your request will appear on the map.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Creating...
                    </>
                  ) : (
                    'Post Request'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}