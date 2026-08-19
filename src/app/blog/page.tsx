import { Metadata } from 'next';
import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Blog de PIYALO - Consejos sobre Servicios Técnicos',
  description: 'Artículos útiles sobre electricidad, plomería, aire acondicionado y otros servicios técnicos en Santa Cruz de la Sierra, Bolivia.',
  openGraph: {
    title: 'Blog de PIYALO - Consejos sobre Servicios Técnicos',
    description: 'Artículos útiles sobre electricidad, plomería, aire acondicionado y otros servicios técnicos en Santa Cruz de la Sierra, Bolivia.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
  },
};

export default async function BlogPage() {
  const supabase = createServerComponentClient({ cookies });

  // Fetch blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false });

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
          <Link href="/" className="text-blue-600 font-medium">
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Blog de PIYALO
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Artículos útiles sobre servicios técnicos, consejos de mantenimiento y cómo elegir al mejor profesional para tu hogar
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-600"></div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{new Date(post.published_at).toLocaleDateString()}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{post.read_time} de lectura</span>
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="text-blue-600 font-medium hover:text-blue-800"
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
              1
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg">
              2
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg">
              3
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg">
              Siguiente →
            </button>
          </nav>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
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
