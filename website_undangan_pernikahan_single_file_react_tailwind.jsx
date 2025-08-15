import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Calendar, MapPin, Clock, Gift, Heart, Phone, Mail, Images } from "lucide-react";

// ================== KONFIGURASI ==================
// Ganti sesuai kebutuhanmu
const CONFIG = {
  couple: {
    groomName: "Rizky Pratama",
    brideName: "Anisa Wulandari",
    hashtag: "#RizkyAnisaForever",
    heroPhoto: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
    groomPhoto: "https://images.unsplash.com/photo-1539109136881-3be0616acf4a?q=80&w=1200&auto=format&fit=crop",
    bridePhoto: "https://images.unsplash.com/photo-1522335789203-9ed94e3ba0b8?q=80&w=1200&auto=format&fit=crop",
  },
  event: {
    dateISO: "2025-10-05T10:00:00+07:00", // tanggal akad (ISO)
    dateText: "Minggu, 5 Oktober 2025",
    timeText: "10.00 WIB — selesai",
    venueName: "Gedung Serbaguna Cendana",
    address: "Jl. Melati No. 123, Jakarta Selatan",
    gmapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.721820079084!2d106.823%20!3d-6.175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e9f%3A0x0!2sJakarta!5e0!3m2!1sid!2sid!4v1610000000000",
  },
  rekening: [
    { bank: "BCA", name: "Rizky Pratama", number: "1234567890" },
    { bank: "BNI", name: "Anisa Wulandari", number: "9876543210" },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501366062246-723b4d3e4eb6?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
  ],
  contact: {
    phone: "+62 812-3456-7890",
    email: "rsvp@rizky-anisa.id",
  },
};
// ================================================

function useCountdown(targetISO) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = useState(Date.now());
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="text-center space-y-2 mb-8">
      <div className="flex items-center justify-center gap-2">
        {Icon && <Icon className="w-5 h-5" />}
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export default function WeddingInvitation() {
  const { days, hours, minutes, seconds } = useCountdown(CONFIG.event.dateISO);
  const audioRef = useRef(null);
  const [copied, setCopied] = useState("");
  const [openImage, setOpenImage] = useState(null);

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(""), 2000);
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src={CONFIG.couple.heroPhoto} alt="hero" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 py-24 sm:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <p className="uppercase tracking-[0.35em] text-xs text-gray-600">Undangan Pernikahan</p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold">
              {CONFIG.couple.groomName} <span className="text-rose-600">&</span> {CONFIG.couple.brideName}
            </h1>
            <p className="mt-4 text-gray-600">{CONFIG.event.dateText} • {CONFIG.event.venueName}</p>
            <div className="mt-8 flex justify-center gap-4">
              <Button onClick={() => audioRef.current?.play()} className="rounded-2xl px-6">Putar Musik</Button>
              <a href="#lokasi"><Button variant="outline" className="rounded-2xl px-6">Lihat Lokasi</Button></a>
            </div>
            <div className="mt-10 grid grid-cols-4 gap-3 max-w-lg mx-auto">
              {[{label:"Hari",value:days},{label:"Jam",value:hours},{label:"Menit",value:minutes},{label:"Detik",value:seconds}].map((it,i)=> (
                <Card key={i} className="rounded-2xl">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{String(it.value).padStart(2,'0')}</div>
                    <div className="text-xs text-muted-foreground">{it.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* COUPLE */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <SectionTitle icon={Heart} title="Kisah Kami" subtitle={CONFIG.couple.hashtag} />
        <div className="grid sm:grid-cols-2 gap-6">
          {[{name: CONFIG.couple.groomName, img: CONFIG.couple.groomPhoto, role: "Mempelai Pria"}, {name: CONFIG.couple.brideName, img: CONFIG.couple.bridePhoto, role: "Mempelai Wanita"}].map((p, idx) => (
            <Card key={idx} className="overflow-hidden rounded-2xl">
              <img src={p.img} alt={p.name} className="w-full h-72 object-cover" />
              <CardHeader>
                <CardTitle className="text-center">{p.name}</CardTitle>
                <p className="text-center text-sm text-muted-foreground">{p.role}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* ACARA */}
      <section id="lokasi" className="max-w-5xl mx-auto px-4 py-16">
        <SectionTitle icon={Calendar} title="Detail Acara" />
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3"><Clock className="w-5 h-5 mt-1"/><div><div className="font-medium">Waktu</div><div className="text-sm text-muted-foreground">{CONFIG.event.dateText} • {CONFIG.event.timeText}</div></div></div>
              <div className="flex items-start gap-3"><MapPin className="w-5 h-5 mt-1"/><div><div className="font-medium">Lokasi</div><div className="text-sm text-muted-foreground">{CONFIG.event.venueName}<br/>{CONFIG.event.address}</div></div></div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[4/3] w-full">
                <iframe title="Google Maps" src={CONFIG.event.gmapsEmbed} className="w-full h-full border-0" loading="lazy" allowFullScreen />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* REKENING */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <SectionTitle icon={Gift} title="Ucapan & Hadiah" subtitle="Terima kasih atas doa restu Anda" />
        <div className="grid sm:grid-cols-2 gap-6">
          {CONFIG.rekening.map((r, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-6 space-y-2">
                <div className="text-lg font-semibold">{r.bank}</div>
                <div className="text-sm">Atas Nama: <span className="font-medium">{r.name}</span></div>
                <div className="flex items-center justify-between bg-muted/50 p-3 rounded-xl">
                  <code className="text-sm">{r.number}</code>
                  <Button size="sm" variant="outline" className="rounded-xl" onClick={() => copyText(r.number)}>
                    <Copy className="w-4 h-4 mr-2"/> Salin
                  </Button>
                </div>
                {copied === r.number && <div className="text-xs text-green-600">Nomor rekening disalin.</div>}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* GALERI */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle icon={Images} title="Galeri Foto" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {CONFIG.gallery.map((src, i) => (
            <button key={i} onClick={() => setOpenImage(src)} className="group relative overflow-hidden rounded-xl shadow hover:shadow-lg focus:outline-none">
              <img src={src} alt={`galeri-${i}`} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </button>
          ))}
        </div>

        {/* Lightbox sederhana */}
        {openImage && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50" onClick={() => setOpenImage(null)}>
            <img src={openImage} alt="preview" className="max-h-[85vh] max-w-[90vw] rounded-xl" />
          </div>
        )}
      </section>

      {/* FOOTER / KONTAK */}
      <footer className="px-4 pb-20">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <p className="text-sm text-muted-foreground">Untuk konfirmasi kehadiran:</p>
          <div className="flex items-center justify-center gap-3">
            <a href={`https://wa.me/${CONFIG.contact.phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer">
              <Button className="rounded-2xl"><Phone className="w-4 h-4 mr-2"/> WhatsApp</Button>
            </a>
            <a href={`mailto:${CONFIG.contact.email}`}>
              <Button variant="outline" className="rounded-2xl"><Mail className="w-4 h-4 mr-2"/> Email</Button>
            </a>
          </div>
          <div className="text-xs text-muted-foreground">Dengan penuh rasa syukur, kami menantikan kehadiran dan doa restu Anda.</div>
        </div>
      </footer>

      {/* AUDIO */}
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2022/08/19/audio_3a38b5d7d4.mp3?filename=romantic-piano-ambient-117997.mp3" preload="none" />
    </div>
  );
}
