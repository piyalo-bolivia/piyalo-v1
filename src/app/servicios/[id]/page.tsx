import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PhoneIcon, ClockIcon, CheckCircleIcon, QuestionMarkCircleIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { LeadForm } from '@/components/LeadForm';

// Servicios disponibles
const serviciosDisponibles = [
  { id: 'electricidad', name: 'Electricidad', icon: '⚡', description: 'Instalaciones eléctricas, reparaciones, cambios de enchufes y bombillas, cuadros eléctricos' },
  { id: 'plomeria', name: 'Plomería', icon: '🚰', description: 'Reparación de cañerías, instalación de grifos, desatascos, cambio de sellos y válvulas' },
  { id: 'aire-acondicionado', name: 'Aire acondicionado', icon: '❄️', description: 'Instalación, mantenimiento y reparación de equipos de aire acondicionado' },
  { id: 'llaves-y-chapas', name: 'Llaves y chapas', icon: '🗝️', description: 'Copias de llaves, aperturas, cambio y reparación de chapas, llaves de vehículos' },
  { id: 'computadoras', name: 'Computadoras', icon: '💻', description: 'Reparación de computadoras, mantenimiento preventivo, instalación de software' },
  { id: 'electrodomesticos', name: 'Electrodomésticos', icon: '🏠', description: 'Reparación de lavadoras, refrigeradores, microondas y otros electrodomésticos' },
  { id: 'camaras-y-seguridad', name: 'Cámaras y seguridad', icon: '📹', description: 'Instalación de cámaras de seguridad, alarmas, cajas fuertes y cerraduras electrónicas' },
  { id: 'soldadura-y-herreria', name: 'Soldadura y herrería', icon: ' hammer', description: 'Fabricación y reparación de estructuras metálicas, barandales, puertas y ventanas' },
  { id: 'pintura-y-mantenimiento', name: 'Pintura y mantenimiento', icon: '🎨', description: 'Pintura interior y exterior, impermeabilización, pequeños trabajos de mantenimiento' },
  { id: 'construccion-y-reparaciones', name: 'Construcción y reparaciones', icon: '🏗️', description: 'Albañilería, construcción de divisiones, colocación de cerámica, yeso y pintura' },
];

interface ServicePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const servicio = serviciosDisponibles.find(s => s.id === params.id);
  
  if (!servicio) {
    return {};
  }

  return {
    title: `${servicio.name} en Santa Cruz | PIYALO`,
    description: `${servicio.description}. Encuentra técnicos calificados en Santa Cruz de la Sierra, Bolivia.`,
    openGraph: {
      title: `${servicio.name} en Santa Cruz | PIYALO`,
      description: `${servicio.description}. Encuentra técnicos calificados en Santa Cruz de la Sierra, Bolivia.`,
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/servicios/${params.id}`,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/servicios/${params.id}`,
    },
  };
}

export async function generateStaticParams() {
  return serviciosDisponibles.map((servicio) => ({
    id: servicio.id,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const servicio = serviciosDisponibles.find(s => s.id === params.id);

  if (!servicio) {
    notFound();
  }

  const supabase = createServerComponentClient({ cookies });

  // Fetch technicians for this service
  const { data: technicians } = await supabase
    .from('technicians')
    .select(`
      id, 
      full_name, 
      specialty, 
      rating, 
      zones, 
      schedule, 
      description, 
      verified,
      technician_services!inner(service_id)
    `)
    .eq('technician_services.service_id', params.id)
    .eq('status', 'approved')
    .order('rating', { ascending: false });

  // Preguntas frecuentes
  const faqs = [
    {
      pregunta: '¿Cuánto tiempo tardan en llegar?',
      respuesta: 'Los técnicos suelen llegar entre 30 minutos a 1 hora dependiendo de la ubicación y disponibilidad.'
    },
    {
      pregunta: '¿Ofrecen garantía por el trabajo realizado?',
      respuesta: 'Sí, todos nuestros técnicos verificados ofrecen garantía por sus servicios, el tiempo varía según el tipo de trabajo.'
    },
    {
      pregunta: '¿Qué formas de pago aceptan?',
      respuesta: 'La mayoría de nuestros técnicos aceptan efectivo, transferencias bancarias y pagos móviles.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white py-3 px-4 border-b">
        <div className="container mx-auto">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Inicio</Link></li>
            <li>/</li>
            <li>Servicios</li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{servicio.name}</li>
          </ol>
        </div>
      </nav>

      {/* Header del servicio */}
      <header className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <span className="text-4xl mr-4">{servicio.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{servicio.name}</h1>
              <p className="text-gray-600 mt-2">{servicio.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información del servicio */}
          <div className="lg:col-span-2">
            {/* Problemas comunes */}
            <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Problemas comunes</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Reparación de enchufes y cables dañados</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Instalación de interruptores y reguladores</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Mantenimiento preventivo de instalaciones</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Reemplazo de cuadros eléctricos obsoletos</span>
                </li>
              </ul>
            </section>

            {/* Tipos de trabajos */}
            <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Trabajos comunes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900">Instalaciones nuevas</h3>
                  <p className="text-gray-600 text-sm mt-1">Instalaciones eléctricas en viviendas nuevas o reformas</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900">Reparaciones</h3>
                  <p className="text-gray-600 text-sm mt-1">Solución de problemas eléctricos comunes</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900">Mantenimiento</h3>
                  <p className="text-gray-600 text-sm mt-1">Revisiones periódicas y prevención de fallas</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900">Emergencias</h3>
                  <p className="text-gray-600 text-sm mt-1">Atención inmediata a cortocircuitos o fallas eléctricas</p>
                </div>
              </div>
            </section>

            {/* Preguntas frecuentes */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Preguntas frecuentes</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none">
                        <h3 className="font-medium text-gray-900">{faq.pregunta}</h3>
                        <svg className="ml-1.5 h-5 w-5 text-gray-600 shrink-0 transition duration-300 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <p className="mt-2 text-gray-600">{faq.respuesta}</p>
                    </details>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Columna derecha - Técnicos y ubicación */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Técnicos disponibles</h2>
              
              <div className="space-y-4">
                {technicians?.map(tech => (
                  <div key={tech.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{tech.full_name}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-sm text-gray-600">{tech.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{tech.specialty}</p>
                      </div>
                      {tech.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <CheckCircleIcon className="w-4 h-4 mr-1" /> Verificado
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-3 flex items-center text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      <span>{tech.schedule}</span>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="block">Zonas: {(tech.zones as string[]).join(', ')}</span>
                    </div>
                    
                    <button 
                      onClick={() => alert(`Conectando con ${tech.full_name} vía WhatsApp...`)}
                      className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
                    >
                      <PhoneIcon className="w-5 h-5 mr-2" />
                      Contactar vía WhatsApp
                    </button>
                  </div>
                ))}
                
                {!technicians || technicians.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <QuestionMarkCircleIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                    <p>No hay técnicos disponibles para este servicio aún</p>
                    <p className="text-sm mt-2">¡Sé el primero en ofrecer este servicio!</p>
                    <Link href="/unete-como-tecnico" className="text-blue-600 font-medium mt-2 inline-block">
                      Regístrate como técnico
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Formulario de ubicación para lead generation */}
              <LeadForm serviceName={servicio.name} />
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-2">¿Eres técnico?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Ofrece tus servicios en esta categoría y conecta con clientes locales
                </p>
                <Link 
                  href="/unete-como-tecnico"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center block text-sm"
                >
                  Únete como técnico
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": servicio.name,
            "description": servicio.description,
            "provider": {
              "@type": "LocalBusiness",
              "name": "PIYALO",
              "areaServed": "Santa Cruz de la Sierra, Bolivia"
            },
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />
    </div>
  );
}
