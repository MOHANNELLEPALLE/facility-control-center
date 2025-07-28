import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, X, FileImage } from "lucide-react";

interface FacilityManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  facility?: any;
}

const FacilityManagementModal: React.FC<FacilityManagementModalProps> = ({
  isOpen,
  onClose,
  facility,
}) => {
  const [facilityName, setFacilityName] = useState(facility?.facility || "");
  const [facilityType, setFacilityType] = useState(facility?.facilityType || "");
  const [description, setDescription] = useState("");
  const [addressLine1, setAddressLine1] = useState("venkat reddy nagar, Ramathapur");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Telangana");
  const [city, setCity] = useState("Hyderabad");
  const [pincode, setPincode] = useState("500013");
  const [website, setWebsite] = useState("http://google.com");
  const [email, setEmail] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const serviceOptions = [
    "Emergency Care",
    "General Medicine",
    "Surgery",
    "Pediatrics",
    "Cardiology",
    "Orthopedics",
    "Radiology",
    "Laboratory Services",
    "Pharmacy",
    "Mental Health",
  ];

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setServices([...services, service]);
    } else {
      setServices(services.filter((s) => s !== service));
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted with data:", {
      facilityName,
      facilityType,
      description,
      addressLine1,
      addressLine2,
      country,
      state,
      city,
      pincode,
      website,
      email,
      services,
      logoFile,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Facility Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="facilityName">
                Facility Name
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="facilityName"
                value={facilityName}
                onChange={(e) => setFacilityName(e.target.value.slice(0, 50))}
                placeholder="Enter facility name"
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">
                {facilityName.length}/50 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="facilityType">
                Facility Type
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Select value={facilityType} onValueChange={setFacilityType}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select facility type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="NPO">NPO</SelectItem>
                  <SelectItem value="NGO">NGO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
              placeholder="Enter facility description..."
              className="min-h-[100px] bg-background resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/1000 characters
            </p>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
              📍 Address Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="Apartment, suite, etc. (optional)"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Telangana">Telangana</SelectItem>
                    <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Secunderabad">Secunderabad</SelectItem>
                    <SelectItem value="Warangal">Warangal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter pincode"
                  className="bg-background"
                />
              </div>
            </div>
          </div>

          {/* Other Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
              🌐 Other Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Official Email Address (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="facility@example.com"
                  className="bg-background"
                />
              </div>
            </div>
          </div>

          {/* Services Offered */}
          <div className="space-y-4">
            <Label>Services Offered</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {serviceOptions.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={services.includes(service)}
                    onCheckedChange={(checked) =>
                      handleServiceChange(service, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={service}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Logo Upload */}
          <div className="space-y-4">
            <Label>Logo Upload</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 bg-background/50">
              {logoPreview ? (
                <div className="flex items-center justify-center space-x-4">
                  <div className="relative">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={handleRemoveLogo}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Logo uploaded successfully
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <FileImage className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FacilityManagementModal;
