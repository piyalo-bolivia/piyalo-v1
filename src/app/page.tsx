import { Metadata } from 'next';
import Link from 'next/link';
import { SearchIcon, WrenchIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'PIYALO - Conecta con Técnicos Locales en Santa Cruz',
  description: 'Encuentra técnicos confiables para electricidad, plomería, aire acondicionado y más en Santa Cruz de la Sierra, Bolivia.',
  openGraph: {
    title: 'PIYALO - Conecta con Técnicos Locales en Santa Cruz',
    description: 'Encuentra técnicos confiables para electricidad, plomería, aire acondicionado y más en Santa Cruz de la Sierra, Bolivia.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://piyalo.com',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://piyalo.com',
  },
};

const services = [
  { id: 'electricidad', name: 'Electricidad', icon: '⚡' },
  { id: 'plomeria', name: 'Plomería', icon: '🚰' },
  { id: 'aire-acondicionado', name: 'Aire acondicionado', icon: '❄️' },
  { id: 'llaves-y-chapas', name: 'Llaves y chapas', icon: '🗝️' },
  { id: 'computadoras', name: 'Computadoras', icon: '💻' },
  { id: 'electrodomesticos', name: 'Electrodomésticos', icon: '🏠' },
  { id: 'camaras-y-seguridad', name: 'Cámaras y seguridad', icon: '📹' },
  { id: 'soldadura-y-herreria', name: 'Soldadura y herrería', icon: ' hammer' },
  { id: 'pintura-y-mantenimiento', name: 'Pintura y mantenimiento', icon: '🎨' },
  { id: 'construccion-y-reparaciones', name: 'Construcción y reparaciones', icon: '🏗️' },
];

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies });

  // Fetch technicians count
  const { count: techniciansCount } = await supabase
    .from('technicians')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved');

  // Fetch recent services
  const { data: recentServices } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">PIYALO</h1>
          </div>
          <Link href="/unete-como-tecnico" className="text-blue-600 font-medium">
            Únete como técnico
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Qué necesitas resolver?
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Conectamos a personas con técnicos locales confiables en Santa Cruz de la Sierra, Bolivia
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar servicio..."
                className="w-full py-4 px-6 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <p className="text-gray-600">
              <span className="font-semibold">{techniciansCount || 0}</span> técnicos disponibles en Santa Cruz
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Servicios populares</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {services.map((service) => (
              <Link 
                key={service.id}
                href={`/servicios/${service.id}`}
                className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                <span className="text-3xl mb-2">{service.icon}</span>
                <span className="text-gray-700 text-center text-sm font-medium">{service.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">{techniciansCount || 0}</div>
              <div className="text-gray-600 mt-2">Técnicos verificados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">10</div>
              <div className="text-gray-600 mt-2">Categorías de servicio</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">Santa Cruz</div>
              <div className="text-gray-600 mt-2">Cobertura local</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">1. Busca tu problema</h3>
              <p className="text-gray-600">Describe lo que necesitas resolver o selecciona un servicio</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <WrenchIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">2. Encuentra técnicos</h3>
              <p className="text-gray-600">Selecciona entre técnicos verificados en tu zona</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">3. Contacta vía WhatsApp</h3>
              <p className="text-gray-600">Conecta directamente con el técnico que necesitas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Eres técnico?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Únete a nuestra plataforma y conecta con clientes en tu área
          </p>
          <Link 
            href="/unete-como-tecnico"
            className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            Regístrate como técnico
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <h3 className="text-lg font-bold">PIYALO</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Conectando personas con técnicos locales en Santa Cruz de la Sierra, Bolivia.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/servicios/electricidad" className="hover:text-white">Electricidad</Link></li>
                <li><Link href="/servicios/plomeria" className="hover:text-white">Plomería</Link></li>
                <li><Link href="/servicios/aire-acondicionado" className="hover:text-white">Aire acondicionado</Link></li>
                <li><Link href="/servicios/llaves-y-chapas" className="hover:text-white">Llaves y chapas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/unete-como-tecnico" className="hover:text-white">Únete como técnico</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/terminos" className="hover:text-white">Términos</Link></li>
                <li><Link href="/privacidad" className="hover:text-white">Privacidad</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} PIYALO. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
