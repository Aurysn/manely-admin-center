import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-24">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-foreground mb-4 tracking-tight">MANELY</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Scandinavian-inspired men's grooming essentials. 
              Clean, minimal, effective products for the modern man.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground text-sm tracking-wider uppercase">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/skincare" className="text-muted-foreground hover:text-foreground transition-colors">Skincare</Link></li>
              <li><Link href="/beard" className="text-muted-foreground hover:text-foreground transition-colors">Beard Care</Link></li>
              <li><Link href="/hair" className="text-muted-foreground hover:text-foreground transition-colors">Hair Care</Link></li>
              <li><Link href="/body" className="text-muted-foreground hover:text-foreground transition-colors">Body</Link></li>
              <li><Link href="/grooming-kits" className="text-muted-foreground hover:text-foreground transition-colors">Grooming Kits</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground text-sm tracking-wider uppercase">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">Returns</Link></li>
              <li><Link href="/sizing" className="text-muted-foreground hover:text-foreground transition-colors">Size Guide</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © 2024 MANELY. Minimal grooming essentials.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
