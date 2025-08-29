"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { CalendarDays, Clock3, MapPin, Layers, User, Ticket, Info, CheckCircle, XCircle, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

// Mock data untuk halaman detail event
const mockEventDetail = {
  id: "1",
  title: "The Lord Of The Rings The Fellowship Of The Ring In Concert",
  imageUrl: "https://picsum.photos/1200/600?1",
  category: "Pertunjukan",
  location: "JIExpo Grand Theatre",
  startDate: "2025-09-20",
  endDate: "2025-09-20",
  startTime: "14:00",
  endTime: "19:30",
  description: `Untuk pertama kalinya di Jakarta - Indonesia, persiapkan diri Anda untuk perjalanan luar biasa ke tengah Middle-earth! Bergabunglah dengan para hobbit pemberani dari Shire, ditemani sahabat seperjuangan mereka yang gagah berani, dalam upaya mereka melindungi One Ring dari cengkeraman Dark Lord of Mordor yang jahat.

Rasakan ekstravaganza musik yang imersif, dimeriahkan oleh Twilite Orchestra yang berbakat, dengan lebih dari 100 musisi yang tampil dengan beragam instrumen langka. Pertunjukan ini dilengkapi dengan paduan suara megah yang terdiri dari 150 suara, semuanya berkontribusi pada simfoni memukau yang berlangsung lebih dari 3 jam (dengan jeda).

Hanyutkan diri Anda dalam skor musik pemenang penghargaan dari Howard Shore, komposer peraih penghargaan Academy Award dan Grammy Award. Saksikan tontonan visual yang memukau, diproyeksikan di layar raksasa, yang memperkenalkan salah satu saga film paling ikonis di zaman ini. Disutradarai oleh Peter Jackson, mahakarya ini terinspirasi oleh karya-karya abadi J.R.R. Tolkien, yang ceritanya terus memikul penonton di seluruh dunia.`,
  organizer: "SISTIC",
  terms: ["Tiket tidak dapat dikembalikan atau ditukar.", "Penyelenggara berhak untuk mengubah tanggal, waktu, dan lokasi acara jika diperlukan.", "Penonton harus mematuhi protokol keamanan yang berlaku di venue.", "Dilarang membawa makanan dan minuman dari luar.", "Dilarang membawa kamera profesional atau peralatan rekaman.", "Penonton harus hadir 30 menit sebelum acara dimulai.", "Penonton yang terlambat hanya dapat masuk pada jeda pertunjukan."],
  tickets: [
    { name: "EARLY BIRD", price: 500000, discount: 10, quota: 50, status: "SOLD_OUT" },
    { name: "REGULAR", price: 750000, discount: 0, quota: 200, status: "AVAILABLE" },
    { name: "VIP", price: 1500000, discount: 0, quota: 50, status: "AVAILABLE" },
    { name: "PLATINUM", price: 2500000, discount: 0, quota: 20, status: "AVAILABLE" },
  ],
};

// Fungsi format tanggal
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

// Fungsi format waktu
const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":");
  return `${hours}.${minutes} WIB`;
};

// Fungsi format harga
const formatPrice = (price: number, discount: number = 0) => {
  const finalPrice = price - (price * discount) / 100;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(finalPrice);
};

export default function EventDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"description" | "terms" | "tickets">("description");
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 98,
    hours: 1,
    minutes: 24,
    seconds: 29,
  });

  // Simulasi loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Tampilkan loading state
  useEffect(() => {
    if (isLoading) {
      Swal.fire({
        title: "Loading...",
        text: "Memuat detail event",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [isLoading]);

  // Handle pembelian tiket
  const handleBuyTicket = () => {
    Swal.fire({
      title: "Coming Soon",
      text: "Fitur pembelian tiket akan segera tersedia!",
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    Swal.fire({
      title: isFavorite ? "Dihapus dari Favorit" : "Ditambahkan ke Favorit",
      text: isFavorite ? "Event telah dihapus dari daftar favorit" : "Event telah ditambahkan ke daftar favorit",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockEventDetail.title,
        text: `Jangan lewatkan event ${mockEventDetail.title}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        title: "Link Disalin!",
        text: "Link event telah disalin ke clipboard",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  if (isLoading) {
    return null; // Loading state ditangani oleh Swal
  }

  return (
    <div className="flex flex-col gap-8 pt-50">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1/2 lg:w-1/2 h-[50vh] relative rounded-2xl overflow-hidden group">
          <Image src={mockEventDetail.imageUrl} alt={mockEventDetail.title} fill className="object-cover transition-transform duration-150 ease-in group-hover:scale-105" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,20,0)_50%,rgba(10,10,20,0.5)_100%)] opacity-0 transition-opacity duration-150 ease-in group-hover:opacity-100"></div>

          <div className="absolute top-2 right-2">
            <button onClick={handleFavoriteToggle} className={`w-8 h-8 flex justify-center items-center border border-white/30 rounded-full bg-white/20 backdrop-blur-xl transition-all duration-150 hover:bg-white/30 hover:scale-110 ${isFavorite ? " text-white bg-red-500" : ""}`}>
              <Heart size={16} className={isFavorite ? "fill-current" : ""} />
            </button>
          </div>
        </div>

        <div className="flex-1/2 lg:w-1/2 relative">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">{mockEventDetail.title}</h1>
          </div>

          <div className="flex items-center gap-8 mb-4">
            <div className="flex items-center gap-2">
              <Layers size={18} color="#f54a00" />
              <span className="text-sm font-semibold">{mockEventDetail.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} color="#f54a00" />
              <span className="text-sm font-semibold">{mockEventDetail.location}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="text-center group">
              <div className="w-14 h-14 lg:w-18 lg:h-18 flex flex-col justify-center items-center border-2 border-orange-600 rounded-full transition-transform duration-150 ease-in group-hover:scale-105">
                <span className="text-lg lg:text-xl font-bold text-orange-300">{timeLeft.days.toString().padStart(2, "0")}</span>
                <p className="text-xs text-gray-300 font-semibold">Day</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 lg:w-18 lg:h-18 flex flex-col justify-center items-center border-2 border-orange-600 rounded-full transition-transform duration-150 ease-in group-hover:scale-105">
                <span className="text-lg lg:text-xl font-bold text-orange-300">{timeLeft.hours.toString().padStart(2, "0")}</span>
                <p className="text-xs text-gray-300 font-semibold">O'clock</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 lg:w-18 lg:h-18 flex flex-col justify-center items-center border-2 border-orange-600 rounded-full transition-transform duration-150 ease-in group-hover:scale-105">
                <span className="text-lg lg:text-xl font-bold text-orange-300">{timeLeft.minutes.toString().padStart(2, "0")}</span>
                <p className="text-xs text-gray-300 font-semibold">Minute</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 lg:w-18 lg:h-18 flex flex-col justify-center items-center border-2 border-orange-600 rounded-full transition-transform duration-150 ease-in group-hover:scale-105">
                <span className="text-lg lg:text-xl font-bold text-orange-300">{timeLeft.seconds.toString().padStart(2, "0")}</span>
                <p className="text-xs text-gray-300 font-medium">Second</p>
              </div>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-(--color-surface-1) mb-4">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} color="#f54a00" />
              <span className="text-sm font-semibold">{formatDate(mockEventDetail.startDate)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="px-4 py-2 rounded-lg bg-(--color-surface-1)">
              <h3 className="text-sm text-gray-300 font-bold flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-orange-500"></div>
                Price starts
              </h3>
              <p className="text-xl lg:text-2xl text-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-clip-text">{formatPrice(Math.min(...mockEventDetail.tickets.filter((t) => t.status === "AVAILABLE").map((t) => t.price - (t.price * t.discount) / 100)))}</p>
            </div>
            <button onClick={handleBuyTicket} className="font-bold flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2 transition-all duration-150 ease-in hover:bg-orange-500  hover:scale-105">
              <Ticket size={24} />
              <span>Lihat Tiket</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <div className="flex gap-4">
            <button className="text-gray-300 text-semibold" onClick={() => setActiveTab("description")}>
              Deskripsi
            </button>
            <button className="text-gray-300 text-semibold" onClick={() => setActiveTab("terms")}>
              Syarat & Ketentuan
            </button>
            <button className="text-gray-300 text-semibold" onClick={() => setActiveTab("tickets")}>
              Tiket
            </button>
          </div>
        </div>

        <div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full">
              <div>
                {activeTab === "description" && (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 flex items-center justify-center border border-orange-600/30 rounded-lg bg-gradient-to-br from-orange-500/30 to-orange-600/30">
                        <Info size={20} className="text-orange-600" />
                      </div>
                      <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">Deskripsi Event</h2>
                    </div>
                    <div>
                      <p className="text-gray-200 leading-relaxed text-base whitespace-pre-line">{mockEventDetail.description}</p>
                    </div>
                  </div>
                )}

                {activeTab === "terms" && (
                  <div className="prose prose-invert max-w-none">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-600/20">
                        <CheckCircle size={20} className="text-orange-600" />
                      </div>
                      <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">Syarat & Ketentuan</h2>
                    </div>
                    <div>
                      <ul className="space-y-3">
                        {mockEventDetail.terms.map((term, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 flex-shrink-0"></div>
                            <span>{term}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "tickets" && (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-600/20">
                        <Ticket size={20} className="text-orange-600" />
                      </div>
                      <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">Tiket Tersedia</h2>
                    </div>
                    <div className="space-y-6">
                      {mockEventDetail.tickets.map((ticket, index) => (
                        <div key={index} className="bg-gradient-to-r from-gray-700/60 to-gray-600/60 p-6 rounded-xl border border-gray-600/30 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg text-white group-hover:text-orange-200 transition-colors duration-300">{ticket.name}</h3>
                                {ticket.status === "AVAILABLE" ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 border border-green-500/30 px-3 py-1 text-xs text-green-400">
                                    <CheckCircle size={12} />
                                    AVAILABLE
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 border border-red-500/30 px-3 py-1 text-xs text-red-400">
                                    <XCircle size={12} />
                                    SOLD OUT
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-400 mt-1">
                                {formatDate(mockEventDetail.startDate)}, {formatTime(mockEventDetail.startTime)}
                              </p>
                            </div>
                            <div className="text-right">
                              {ticket.discount > 0 && <p className="text-sm line-through text-gray-400">{formatPrice(ticket.price, 0)}</p>}
                              <p className="font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent text-xl">{formatPrice(ticket.price, ticket.discount)}</p>
                              <div className="flex items-center gap-2 justify-end mt-1">
                                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                <p className="text-sm text-gray-300">{ticket.quota} tiket tersedia</p>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={handleBuyTicket}
                            disabled={ticket.status !== "AVAILABLE"}
                            className={`mt-4 w-full py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium ${ticket.status === "AVAILABLE" ? "bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg hover:shadow-xl hover:shadow-orange-500/25 hover:scale-105 border border-orange-500/30" : "bg-gray-600/50 cursor-not-allowed text-gray-300 border border-gray-500/30"}`}
                          >
                            <Ticket size={18} />
                            {ticket.status === "AVAILABLE" ? "Beli Tiket" : "Sold Out"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3">
              {/* Event Organizer */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm p-8 rounded-xl border border-gray-600/30 hover:border-orange-500/30 transition-all duration-500 shadow-xl mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center">
                    <User size={16} className="text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">Event Organizer</h3>
                </div>
                <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 p-6 rounded-xl border border-gray-600/20 hover:border-orange-500/30 transition-all duration-300 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-2 border-orange-500/30 overflow-hidden shadow-lg">
                      <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="Organizer" width={64} height={64} className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">{mockEventDetail.organizer}</h4>
                      <p className="text-sm text-orange-300 font-medium">Event Organizer</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-gray-300">Verified Organizer</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{mockEventDetail.organizer} adalah penyelenggara event terkemuka dengan pengalaman lebih dari 10 tahun dalam industri hiburan.</p>
              </div>

              {/* Bagikan Event */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm p-8 rounded-xl border border-gray-600/30 hover:border-orange-500/30 transition-all duration-500 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center">
                    <Share2 size={16} className="text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">Bagikan Event</h3>
                </div>
                <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 p-6 rounded-xl border border-gray-600/20">
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="#" className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-800/80 to-blue-900/80 hover:from-blue-900 hover:to-blue-950 text-white py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-600/25 border border-blue-600/30">
                      <span className="sr-only">Facebook</span>
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-sm">Facebook</span>
                    </Link>
                    <Link href="#" className="group flex items-center justify-center gap-2 bg-gradient-to-r from-green-600/80 to-green-700/80 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/25 border border-green-500/30">
                      <span className="sr-only">WhatsApp</span>
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium text-sm">WhatsApp</span>
                    </Link>
                    <Link href="#" className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600/80 to-blue-700/80 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 border border-blue-500/30">
                      <span className="sr-only">Twitter</span>
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      <span className="font-medium text-sm">Twitter</span>
                    </Link>
                    <button onClick={handleShare} className="group flex items-center justify-center gap-2 bg-gradient-to-r from-gray-600/80 to-gray-700/80 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-gray-500/25 border border-gray-500/30">
                      <span className="sr-only">Copy Link</span>
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                      <span className="font-medium text-sm">Copy Link</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
