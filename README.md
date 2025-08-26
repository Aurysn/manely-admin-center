# Manely Store - Admin Center

A comprehensive e-commerce admin center built with Next.js, Prisma, and Tailwind CSS, similar to Shopify's admin interface.

## Features

### 🛍️ Product Management
- Add, edit, and delete products
- Manage product categories
- Upload product images
- Set pricing and inventory
- SKU management
- Product status (active/inactive)

### 📊 Analytics & Reporting
- Sales overview with charts
- Order statistics
- Customer metrics
- Top-selling products
- Revenue tracking

### 🛒 Order Management
- View all orders
- Update order status
- Customer information
- Order details and items
- Filtering and search

### 👥 Customer Management
- Customer database
- Order history
- Total spent tracking
- Customer analytics

### 🎫 Discounts & Promotions
- Create promotional codes
- Percentage and fixed amount discounts
- Free shipping offers
- Usage limits and expiration dates
- Product-specific discounts

### 💳 Payment Methods
- Multiple payment options
- Stripe integration
- PayPal support
- Bank transfer
- Cash on delivery

### ⚙️ Store Settings
- Store information
- Currency settings
- Tax rates
- Shipping costs
- Feature toggles

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Icons**: Lucide React
- **Charts**: Custom Canvas implementation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd manely
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

5. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

6. Seed the database with sample data:
```bash
curl -X POST http://localhost:3000/api/admin/seed
```

7. Start the development server:
```bash
npm run dev
```

8. Open [http://localhost:3000/admin](http://localhost:3000/admin) in your browser.

## Admin Center Structure

```
/admin
├── /                    # Dashboard
├── /products           # Product management
├── /categories         # Category management
├── /orders            # Order management
├── /customers         # Customer management
├── /analytics         # Analytics and reports
├── /discounts         # Discount management
├── /payment-methods   # Payment method configuration
└── /settings          # Store settings
```

## Key Components

### Dashboard (`/admin`)
- Overview statistics
- Recent orders
- Sales charts
- Top products
- Customer metrics

### Products (`/admin/products`)
- Product listing with search and filters
- Add new products
- Edit existing products
- Manage inventory
- Product images

### Orders (`/admin/orders`)
- Order listing with status tracking
- Order details and customer info
- Status updates
- Filtering by date, status, amount

### Analytics (`/admin/analytics`)
- Sales performance
- Customer growth
- Product performance
- Revenue trends

### Discounts (`/admin/discounts`)
- Create promotional codes
- Set discount rules
- Track usage
- Expiration dates

## Database Schema

The application uses a comprehensive database schema with the following main entities:

- **Users**: Customers and admin users
- **Products**: Product catalog with categories
- **Orders**: Customer orders with items
- **Categories**: Product categorization
- **Discounts**: Promotional codes and offers
- **PaymentMethods**: Payment options
- **Analytics**: Performance tracking data

## API Endpoints

### Products
- `GET /api/admin/products` - List products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

### Orders
- `GET /api/admin/orders` - List orders
- `PUT /api/admin/orders/[id]` - Update order status

### Analytics
- `GET /api/admin/analytics` - Get analytics data

### Seed Data
- `POST /api/admin/seed` - Populate database with sample data

## Customization

### Adding New Features

1. **Database**: Add new models to `prisma/schema.prisma`
2. **API**: Create new API routes in `src/app/api/admin/`
3. **UI**: Add new pages in `src/app/admin/` and components in `src/components/admin/`
4. **Navigation**: Update `src/components/admin/AdminSidebar.tsx`

### Styling

The admin center uses Tailwind CSS for styling. You can customize the design by:

- Modifying Tailwind classes in components
- Adding custom CSS in `src/app/globals.css`
- Updating the color scheme in `tailwind.config.js`

### Authentication

The admin center uses NextAuth.js for authentication. Configure providers in `src/lib/auth.ts`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub or contact the development team.

---

**Note**: This is a demo application. For production use, ensure proper security measures, error handling, and data validation are implemented.
