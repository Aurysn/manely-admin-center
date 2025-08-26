import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ArrowRight, Droplets, Scissors, Package } from "lucide-react"

export default function Home() {
  const categories = [
    {
      title: "SKINCARE",
      description: "Essential daily care",
      href: "/skincare",
      icon: Droplets
    },
    {
      title: "BEARD CARE",
      description: "Sculpt and maintain", 
      href: "/beard",
      icon: Scissors
    },
    {
      title: "GROOMING KITS",
      description: "Complete solutions",
      href: "/grooming-kits", 
      icon: Package
    }
  ]

  const featuredProducts = [
    {
      name: "Daily Face Cleanser",
      price: 32,
      category: "Skincare"
    },
    {
      name: "Beard Oil Premium",
      price: 28,
      category: "Beard Care"
    },
    {
      name: "Matte Hair Paste",
      price: 24,
      category: "Hair Care"
    },
    {
      name: "Essential Kit",
      price: 89,
      category: "Grooming Kits"
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-32 lg:py-40">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight tracking-tight">
                Grooming<br />
                Essentials<br />
                for Men
              </h1>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Quality men's care products. Clean formulas, refined results, essential for the modern man.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center bg-primary text-primary-foreground px-8 py-4 hover:opacity-90 transition-opacity group text-sm font-medium tracking-wide uppercase"
              >
                Explore Products
                <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-muted">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                GROOMING CATEGORIES
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Curated collections designed for specific care routines
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Link
                    key={category.title}
                    href={category.href}
                    className="group bg-background border border-border p-8 hover:border-foreground transition-all duration-300"
                  >
                    <IconComponent className="h-8 w-8 text-foreground mb-6" />
                    <h3 className="text-xl font-semibold text-foreground mb-2 tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-foreground group-hover:translate-x-1 transition-transform">
                      Shop Collection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                FEATURED PRODUCTS
              </h2>
              <p className="text-muted-foreground">
                Our most essential grooming products
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                >
                  <div className="bg-muted aspect-square mb-4 flex items-center justify-center group-hover:bg-border transition-colors">
                    <span className="text-muted-foreground text-sm">
                      PRODUCT IMAGE
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {product.category}
                    </p>
                    <h3 className="font-medium text-foreground">
                      {product.name}
                    </h3>
                    <p className="text-foreground font-semibold">
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Link
                href="/products"
                className="inline-flex items-center text-foreground font-medium hover:opacity-70 transition-opacity text-sm tracking-wide uppercase"
              >
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-muted">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6 tracking-tight">
                  SIMPLE.<br />
                  EFFECTIVE.<br />
                  ESSENTIAL.
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Our philosophy centers on quality and effectiveness. 
                  Each product serves a purpose, contains clean ingredients, 
                  and delivers visible results without unnecessary complexity.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center text-foreground font-medium hover:opacity-70 transition-opacity text-sm tracking-wide uppercase"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="bg-background aspect-square flex items-center justify-center border border-border">
                <span className="text-muted-foreground text-sm">
                  BRAND IMAGE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
              STAY INFORMED
            </h2>
            <p className="text-muted-foreground mb-12 max-w-md mx-auto">
              Subscribe for product updates, grooming tips, and exclusive access to new releases.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex border border-border">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-4 py-4 bg-background text-foreground focus:outline-none text-sm"
                />
                <button className="bg-foreground text-background px-8 py-4 hover:opacity-90 transition-opacity text-sm font-medium tracking-wide uppercase">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
