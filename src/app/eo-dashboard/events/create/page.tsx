// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ArrowLeft, Calendar, MapPin, Save } from "lucide-react";
// import Link from "next/link";
// import { CreateEventRequest, EventCategory } from "@/types/api";

// // Mock categories - replace with actual API call
// const mockCategories: EventCategory[] = [
//   { id: 1, name: "Technology", description: "Tech events and conferences" },
//   { id: 2, name: "Music", description: "Concerts and music festivals" },
//   { id: 3, name: "Food & Drink", description: "Culinary events and tastings" },
//   { id: 4, name: "Sports", description: "Sports events and competitions" },
//   { id: 5, name: "Business", description: "Business conferences and networking" },
//   { id: 6, name: "Arts & Culture", description: "Art exhibitions and cultural events" },
// ];

// interface FormErrors {
//   name?: string;
//   description?: string;
//   location?: string;
//   startDate?: string;
//   endDate?: string;
//   categoryId?: string;
// }

// export default function CreateEventPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [formData, setFormData] = useState<CreateEventRequest>({
//     name: "",
//     description: "",
//     location: "",
//     startDate: "",
//     endDate: "",
//     categoryId: 0,
//   });

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Event name is required";
//     } else if (formData.name.length < 3) {
//       newErrors.name = "Event name must be at least 3 characters";
//     }

//     if (!formData.description.trim()) {
//       newErrors.description = "Description is required";
//     } else if (formData.description.length < 10) {
//       newErrors.description = "Description must be at least 10 characters";
//     }

//     if (!formData.location.trim()) {
//       newErrors.location = "Location is required";
//     }

//     if (!formData.startDate) {
//       newErrors.startDate = "Start date is required";
//     }

//     if (!formData.endDate) {
//       newErrors.endDate = "End date is required";
//     } else if (formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
//       newErrors.endDate = "End date must be after start date";
//     }

//     if (!formData.categoryId || formData.categoryId === 0) {
//       newErrors.categoryId = "Category is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       setLoading(true);
//       // TODO: Replace with actual API call
//       // const token = getAuthToken();
//       // await eventApi.create(formData, token);
      
//       console.log('Creating event:', formData);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       router.push('/eo-dashboard/events');
//     } catch (error) {
//       console.error('Error creating event:', error);
//       // Handle error (show toast, etc.)
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field: keyof CreateEventRequest, value: string | number) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     // Clear error when user starts typing
//     if (errors[field as keyof FormErrors]) {
//       setErrors(prev => ({ ...prev, [field]: undefined }));
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex items-center space-x-4">
//         <Button variant="ghost" size="sm" asChild>
//           <Link href="/eo-dashboard/events">
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Events
//           </Link>
//         </Button>
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
//           <p className="text-muted-foreground">
//             Fill in the details below to create a new event.
//           </p>
//         </div>
//       </div>

//       {/* Form */}
//       <Card className="max-w-2xl">
//         <CardHeader>
//           <CardTitle>Event Details</CardTitle>
//           <CardDescription>
//             Provide the basic information about your event.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Event Name */}
//             <div className="space-y-2">
//               <Label htmlFor="name">Event Name *</Label>
//               <Input
//                 id="name"
//                 placeholder="Enter event name"
//                 value={formData.name}
//                 onChange={(e) => handleInputChange('name', e.target.value)}
//                 className={errors.name ? "border-red-500" : ""}
//               />
//               {errors.name && (
//                 <p className="text-sm text-red-500">{errors.name}</p>
//               )}
//             </div>

//             {/* Description */}
//             <div className="space-y-2">
//               <Label htmlFor="description">Description *</Label>
//               <Textarea
//                 id="description"
//                 placeholder="Describe your event"
//                 value={formData.description}
//                 onChange={(e) => handleInputChange('description', e.target.value)}
//                 className={errors.description ? "border-red-500" : ""}
//                 rows={4}
//               />
//               {errors.description && (
//                 <p className="text-sm text-red-500">{errors.description}</p>
//               )}
//             </div>

//             {/* Location */}
//             <div className="space-y-2">
//               <Label htmlFor="location">Location *</Label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="location"
//                   placeholder="Enter event location"
//                   value={formData.location}
//                   onChange={(e) => handleInputChange('location', e.target.value)}
//                   className={`pl-10 ${errors.location ? "border-red-500" : ""}`}
//                 />
//               </div>
//               {errors.location && (
//                 <p className="text-sm text-red-500">{errors.location}</p>
//               )}
//             </div>

//             {/* Date Range */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="startDate">Start Date *</Label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="startDate"
//                     type="date"
//                     value={formData.startDate}
//                     onChange={(e) => handleInputChange('startDate', e.target.value)}
//                     className={`pl-10 ${errors.startDate ? "border-red-500" : ""}`}
//                   />
//                 </div>
//                 {errors.startDate && (
//                   <p className="text-sm text-red-500">{errors.startDate}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="endDate">End Date *</Label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="endDate"
//                     type="date"
//                     value={formData.endDate}
//                     onChange={(e) => handleInputChange('endDate', e.target.value)}
//                     className={`pl-10 ${errors.endDate ? "border-red-500" : ""}`}
//                   />
//                 </div>
//                 {errors.endDate && (
//                   <p className="text-sm text-red-500">{errors.endDate}</p>
//                 )}
//               </div>
//             </div>

//             {/* Category */}
//             <div className="space-y-2">
//               <Label htmlFor="category">Category *</Label>
//               <Select
//                 value={formData.categoryId.toString()}
//                 onValueChange={(value) => handleInputChange('categoryId', parseInt(value))}
//               >
//                 <SelectTrigger className={errors.categoryId ? "border-red-500" : ""}>
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {mockCategories.map((category) => (
//                     <SelectItem key={category.id} value={category.id.toString()}>
//                       {category.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {errors.categoryId && (
//                 <p className="text-sm text-red-500">{errors.categoryId}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="flex items-center space-x-4 pt-4">
//               <Button type="submit" disabled={loading}>
//                 <Save className="mr-2 h-4 w-4" />
//                 {loading ? "Creating..." : "Create Event"}
//               </Button>
//               <Button type="button" variant="outline" asChild>
//                 <Link href="/eo-dashboard/events">
//                   Cancel
//                 </Link>
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }