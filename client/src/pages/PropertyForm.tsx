import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Button } from '../components/ui/button';
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from '../components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Upload, ImagePlus, MapPin, Home, User, DollarSign, BedDouble, Bath, SquareIcon } from 'lucide-react';
import { uploadImageToSanity, sanityClient } from '../lib/sanityClient';
import { v4 as uuidv4 } from 'uuid';
// import sanityClient from your sanity client setup

const PROPERTY_TYPES = [
  { label: 'Apartment', value: 'apartment' },
  { label: 'House', value: 'house' },
  { label: 'Villa', value: 'villa' },
  { label: 'Commercial', value: 'commercial' },
];

interface FormValues {
  title: string;
  description: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  images: FileList;
  featured: boolean;
  available: boolean;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerImage: FileList;
  city: string;
  state: string;
  country: string;
  latitude?: string;
  longitude?: string;
}

const PropertyForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [propertyImages, setPropertyImages] = useState<string[]>([]);
  const [ownerImage, setOwnerImage] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    defaultValues: {
      ownerName: user?.firstName || '',
      ownerEmail: user?.primaryEmailAddress?.emailAddress || '',
      featured: false,
      available: true,
    }
  });
  
  const { control, handleSubmit, reset, formState: { isSubmitting } } = form;

  const handlePropertyImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newImagePreviews: string[] = [];
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImagePreviews.push(e.target.result as string);
          setPropertyImages([...propertyImages, ...newImagePreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleOwnerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setOwnerImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // Convert numeric fields to numbers
      const price = Number(data.price);
      const bedrooms = Number(data.bedrooms);
      const bathrooms = Number(data.bathrooms);
      const size = Number(data.size);

      // 1. Upload property images
      const propertyImageFiles = Array.from(data.images || []);
      const propertyImages = await Promise.all(
        propertyImageFiles.map(async (file: File) => {
          const asset = await uploadImageToSanity(file);
          return { ...asset, _key: uuidv4() };
        })
      );

      // 2. Upload owner image (if provided)
      let ownerImageAsset = null;
      if (data.ownerImage && data.ownerImage.length > 0) {
        ownerImageAsset = await uploadImageToSanity(data.ownerImage[0]);
      }

      // 3. Create or find owner
      // Try to find owner by email
      const existingOwners = await sanityClient.fetch(
        '*[_type == "owner" && email == $email][0]',
        { email: data.ownerEmail }
      );
      let ownerRef;
      if (existingOwners) {
        // Update owner name and phone if changed
        await sanityClient.patch(existingOwners._id).set({
          name: data.ownerName,
          phone: data.ownerPhone
        }).commit();
        ownerRef = { _type: 'reference', _ref: existingOwners._id };
      } else {
        const ownerDoc = await sanityClient.create({
          _type: 'owner',
          name: data.ownerName,
          email: data.ownerEmail,
          phone: data.ownerPhone,
          profileImage: ownerImageAsset,
        });
        ownerRef = { _type: 'reference', _ref: ownerDoc._id };
      }

      // 4. Create location (approved: false)
      const locationDoc = await sanityClient.create({
        _type: 'location',
        city: data.city,
        state: data.state,
        country: data.country,
        coordinates: (data.latitude && data.longitude) ? {
          _type: 'geopoint',
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude),
        } : undefined,
        approved: false,
      });
      const locationRef = { _type: 'reference', _ref: locationDoc._id };

      // 5. Create property
      await sanityClient.create({
        _type: 'property',
        title: data.title,
        description: data.description,
        price,
        propertyType: data.propertyType,
        bedrooms,
        bathrooms,
        size,
        images: propertyImages,
        featured: data.featured,
        available: data.available,
        owner: ownerRef,
        location: locationRef,
        createdAt: new Date().toISOString(),
      });

      setSuccess(true);
      reset();
    } catch (err) {
      if (err instanceof Error) {
        alert('Error submitting property: ' + err.message);
      } else {
        alert('Error submitting property.');
      }
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
        <Card className="w-full max-w-md bg-[#1e293b] border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Property Submitted!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-300">Your property listing has been submitted and is pending admin approval.</p>
            <Button 
              onClick={() => navigate('/dashboard')} 
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white pt-20 pb-20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
          List New Property
        </h1>
        
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Property Details */}
            <Card className="bg-[#1e293b] border border-gray-700 shadow-lg overflow-hidden">
              <CardHeader className="bg-[#172033] border-b border-gray-700">
                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
                  <Home className="h-5 w-5 text-yellow-500" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <FormField
                  name="title"
                  control={control}
                  rules={{ required: 'Title is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Title</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Property Title" 
                          className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="description"
                  control={control}
                  rules={{ required: 'Description is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Property Description" 
                          rows={4} 
                          className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="price"
                  control={control}
                  rules={{ required: 'Price is required', min: { value: 0, message: 'Price must be positive' } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-yellow-500" />
                          Price (₹)
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          placeholder="Price" 
                          className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="propertyType"
                  control={control}
                  rules={{ required: 'Property type is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Property Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-[#0f172a] border-gray-700 focus:ring-yellow-500">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#1e293b] border-gray-700 text-white">
                          {PROPERTY_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value} className="focus:bg-[#2d3748] focus:text-white">
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="bedrooms"
                    control={control}
                    rules={{ required: 'Bedrooms required', min: { value: 1, message: 'Minimum 1 bedroom' } }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">
                          <div className="flex items-center gap-2">
                            <BedDouble className="h-4 w-4 text-yellow-500" />
                            Bedrooms
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            placeholder="Bedrooms" 
                            className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="bathrooms"
                    control={control}
                    rules={{ required: 'Bathrooms required', min: { value: 1, message: 'Minimum 1 bathroom' } }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">
                          <div className="flex items-center gap-2">
                            <Bath className="h-4 w-4 text-yellow-500" />
                            Bathrooms
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            placeholder="Bathrooms" 
                            className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  name="size"
                  control={control}
                  rules={{ required: 'Size required', min: { value: 100, message: 'Minimum 100 sq ft' } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        <div className="flex items-center gap-2">
                          <SquareIcon className="h-4 w-4 text-yellow-500" />
                          Size (sq ft)
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          placeholder="Size in sq ft" 
                          className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="images"
                  control={control}
                  rules={{ required: 'At least one image is required' }}
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        <div className="flex items-center gap-2">
                          <ImagePlus className="h-4 w-4 text-yellow-500" />
                          Property Images
                        </div>
                      </FormLabel>
                      <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
                        <FormControl>
                          <div className="space-y-2">
                            <Upload className="h-8 w-8 mx-auto text-gray-400" />
                            <Label htmlFor="property-images" className="cursor-pointer text-yellow-500 hover:text-yellow-400">
                              Click to upload or drag and drop
                            </Label>
                            <p className="text-xs text-gray-400">PNG, JPG or WEBP (max 10MB)</p>
                            <Input 
                              id="property-images"
                              type="file" 
                              accept="image/*" 
                              multiple 
                              className="hidden"
                              onChange={(e) => {
                                onChange(e.target.files);
                                handlePropertyImageChange(e);
                              }}
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                      {propertyImages.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                          {propertyImages.map((img, i) => (
                            <div key={i} className="relative h-24 rounded-lg overflow-hidden border border-gray-700">
                              <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="featured"
                    control={control}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border border-gray-700 bg-[#0f172a]">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-gray-300">Featured Property</FormLabel>
                          <p className="text-xs text-gray-400">This property will be highlighted on the homepage</p>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="available"
                    control={control}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border border-gray-700 bg-[#0f172a]">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-gray-300">Available for Rent</FormLabel>
                          <p className="text-xs text-gray-400">Uncheck if property is currently occupied</p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Owner Details */}
            <Card className="bg-[#1e293b] border border-gray-700 shadow-lg overflow-hidden">
              <CardHeader className="bg-[#172033] border-b border-gray-700">
                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
                  <User className="h-5 w-5 text-yellow-500" />
                  Owner Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <FormField
                  name="ownerName"
                  control={control}
                  rules={{ required: 'Owner name required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Owner Name" 
                          className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="ownerEmail"
                  control={control}
                  rules={{ 
                    required: 'Owner email required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          {...field} 
                          placeholder="Owner Email" 
                          className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="ownerPhone"
                  control={control}
                  rules={{ 
                    required: 'Phone number required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Phone number must be 10 digits'
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Phone Number" 
                          className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="ownerImage"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Profile Image</FormLabel>
                      <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
                        <FormControl>
                          <div className="space-y-2">
                            <Upload className="h-8 w-8 mx-auto text-gray-400" />
                            <Label htmlFor="owner-image" className="cursor-pointer text-yellow-500 hover:text-yellow-400">
                              Click to upload profile image
                            </Label>
                            <p className="text-xs text-gray-400">PNG, JPG or WEBP (max 5MB)</p>
                            <Input 
                              id="owner-image"
                              type="file" 
                              accept="image/*" 
                              className="hidden"
                              onChange={(e) => {
                                onChange(e.target.files);
                                handleOwnerImageChange(e);
                              }}
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                      {ownerImage && (
                        <div className="mt-4 flex justify-center">
                          <div className="h-24 w-24 rounded-full overflow-hidden border border-gray-700">
                            <img src={ownerImage} alt="Owner preview" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card className="bg-[#1e293b] border border-gray-700 shadow-lg overflow-hidden">
              <CardHeader className="bg-[#172033] border-b border-gray-700">
                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
                  <MapPin className="h-5 w-5 text-yellow-500" />
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <FormField
                  name="city"
                  control={control}
                  rules={{ required: 'City required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">City</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="City" 
                          className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="state"
                  control={control}
                  rules={{ required: 'State required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">State</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="State" 
                          className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="country"
                  control={control}
                  rules={{ required: 'Country required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Country</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Country" 
                          className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="latitude"
                    control={control}
                    rules={{
                      validate: (value) => !value || (!isNaN(Number(value)) && Math.abs(Number(value)) <= 90) || 'Latitude must be a number between -90 and 90',
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Latitude (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Latitude" 
                            className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="longitude"
                    control={control}
                    rules={{
                      validate: (value) => !value || (!isNaN(Number(value)) && Math.abs(Number(value)) <= 180) || 'Longitude must be a number between -180 and 180',
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Longitude (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Longitude" 
                            className="bg-[#0f172a] border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></div>
                  <span>Submitting...</span>
                </div>
              ) : 'Submit Property'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PropertyForm;