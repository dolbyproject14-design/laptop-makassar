import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppCTA() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="relative bg-gradient-to-br from-green-500 to-green-700 rounded-3xl overflow-hidden p-8 md:p-12 text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-white space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Konsultasi Gratis</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Butuh Bantuan Pilih Laptop?
          </h2>

          <p className="text-lg text-white/90">
            Tim kami siap membantu kamu 24/7. Konsultasi gratis, tanpa
            paksaan, langsung dari ahlinya.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <a
              href="https://wa.me/6282296497423?text=Halo%20Laptop%20Makassar,%20saya%20butuh%20konsultasi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-white text-green-700 hover:bg-gray-100 font-bold gap-2 h-12 px-6"
              >
                <MessageCircle className="w-5 h-5" />
                Chat WhatsApp
              </Button>
            </a>
            <a href="tel:+6282296497423">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-green-700 gap-2 h-12 px-6"
              >
                <Phone className="w-5 h-5" />
                Telepon Kami
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}