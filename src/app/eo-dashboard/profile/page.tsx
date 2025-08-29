"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Save, 
  Edit, 
  User,
  Calendar,
  DollarSign
} from "lucide-react";
import { EventOrganizer, UpdateEventOrganizerRequest } from "@/types/api";

// Mock data - replace with actual API call
const mockEventOrganizer: EventOrganizer = {
  id: 1,
  userId: 1,
  organizationName: "TechEvents Indonesia",
  description: "Leading technology event organizer in Indonesia, specializing in conferences, workshops, and networking events for the tech community.",
  contactEmail: "contact@techevents.id",
  contactPhone: "+62-21-1234-5678",
  address: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220",
  website: "https://techevents.id",
  socialMedia: {
    instagram: "@techevents_id",
    twitter: "@techevents_id",
    linkedin: "techevents-indonesia"
  },
  isVerified: true,
  createdAt: "2023-01-15T00:00:00Z",
  updatedAt: "2024-01-15T00:00:00Z",
};

interface FormErrors {
  organizationName?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  website?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<EventOrganizer>(mockEventOrganizer);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<UpdateEventOrganizerRequest>({
    organizationName: mockEventOrganizer.organizationName,
    description: mockEventOrganizer.description,
    contactEmail: mockEventOrganizer.contactEmail,
    contactPhone: mockEventOrganizer.contactPhone,
    address: mockEventOrganizer.address,
    website: mockEventOrganizer.website,
    socialMedia: mockEventOrganizer.socialMedia,
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchEventOrganizerProfile();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.organizationName?.trim()) {
      newErrors.organizationName = "Organization name is required";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (!formData.contactEmail?.trim()) {
      newErrors.contactEmail = "Contact email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    if (!formData.contactPhone?.trim()) {
      newErrors.contactPhone = "Contact phone is required";
    }

    if (!formData.address?.trim()) {
      newErrors.address = "Address is required";
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = "Please enter a valid website URL (starting with http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const token = getAuthToken();
      // const updatedProfile = await eventOrganizerApi.update(profile.id, formData, token);
      
      console.log('Updating profile:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setProfile({ ...profile, ...formData });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error (show toast, etc.)
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      organizationName: profile.organizationName,
      description: profile.description,
      contactEmail: profile.contactEmail,
      contactPhone: profile.contactPhone,
      address: profile.address,
      website: profile.website,
      socialMedia: profile.socialMedia,
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UpdateEventOrganizerRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organization Profile</h1>
          <p className="text-muted-foreground">
            Manage your event organizer profile and contact information.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {profile.isVerified && (
            <Badge className="bg-green-100 text-green-800">
              Verified
            </Badge>
          )}
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Since</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDate(profile.createdAt)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Events organized
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 125M</div>
            <p className="text-xs text-muted-foreground">
              All time revenue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Information</CardTitle>
          <CardDescription>
            Basic information about your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Organization Name */}
          <div className="space-y-2">
            <Label htmlFor="organizationName">Organization Name *</Label>
            {isEditing ? (
              <div>
                <Input
                  id="organizationName"
                  value={formData.organizationName || ""}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  className={errors.organizationName ? "border-red-500" : ""}
                />
                {errors.organizationName && (
                  <p className="text-sm text-red-500">{errors.organizationName}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{profile.organizationName}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            {isEditing ? (
              <div>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={errors.description ? "border-red-500" : ""}
                  rows={4}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">{profile.description}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            How people can reach your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email *</Label>
            {isEditing ? (
              <div>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail || ""}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className={errors.contactEmail ? "border-red-500" : ""}
                />
                {errors.contactEmail && (
                  <p className="text-sm text-red-500">{errors.contactEmail}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{profile.contactEmail}</span>
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone *</Label>
            {isEditing ? (
              <div>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone || ""}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  className={errors.contactPhone ? "border-red-500" : ""}
                />
                {errors.contactPhone && (
                  <p className="text-sm text-red-500">{errors.contactPhone}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{profile.contactPhone}</span>
              </div>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            {isEditing ? (
              <div>
                <Textarea
                  id="address"
                  value={formData.address || ""}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={errors.address ? "border-red-500" : ""}
                  rows={3}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address}</p>
                )}
              </div>
            ) : (
              <div className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-1" />
                <span>{profile.address}</span>
              </div>
            )}
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            {isEditing ? (
              <div>
                <Input
                  id="website"
                  value={formData.website || ""}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className={errors.website ? "border-red-500" : ""}
                  placeholder="https://yourwebsite.com"
                />
                {errors.website && (
                  <p className="text-sm text-red-500">{errors.website}</p>
                )}
              </div>
            ) : (
              <div>
                {profile.website ? (
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {profile.website}
                  </a>
                ) : (
                  <span className="text-muted-foreground">No website provided</span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>
            Your organization's social media presence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Instagram */}
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            {isEditing ? (
              <Input
                id="instagram"
                value={formData.socialMedia?.instagram || ""}
                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                placeholder="@your_instagram"
              />
            ) : (
              <span className="text-muted-foreground">
                {profile.socialMedia?.instagram || "Not provided"}
              </span>
            )}
          </div>

          {/* Twitter */}
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            {isEditing ? (
              <Input
                id="twitter"
                value={formData.socialMedia?.twitter || ""}
                onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                placeholder="@your_twitter"
              />
            ) : (
              <span className="text-muted-foreground">
                {profile.socialMedia?.twitter || "Not provided"}
              </span>
            )}
          </div>

          {/* LinkedIn */}
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            {isEditing ? (
              <Input
                id="linkedin"
                value={formData.socialMedia?.linkedin || ""}
                onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                placeholder="your-company-name"
              />
            ) : (
              <span className="text-muted-foreground">
                {profile.socialMedia?.linkedin || "Not provided"}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}