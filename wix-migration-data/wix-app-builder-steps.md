# Build ShopHand™ App in Wix App Builder - Step by Step

## App Configuration

### 1. Basic App Settings
```
App Name: ShopHand™
Description: Premium auto parts delivery platform
Package Name: com.starsoulent.shophand
Category: Shopping
```

### 2. Design Theme
```
Primary Color: #000000 (Black)
Accent Color: #FFD700 (Gold)
Text Color: #FFFFFF (White)
Button Style: Rounded corners, gold background
Font: Modern, clean sans-serif
```

## Screen 1: Browse Parts (Main Tab)

### Screen Type: Collection List
**Data Source:** Parts Collection

### Layout Configuration:
- **Display Style:** Grid (2 columns)
- **Item Template:** Card style
- **Search Bar:** Enabled at top
- **Filter Options:** Category tabs below search

### Card Design:
```
Part Card Components:
┌─────────────────────┐
│    Product Image    │ ← mainMedia field
├─────────────────────┤
│ Part Name           │ ← title field
│ $99.99              │ ← price field
│ ⭐ New • In Stock   │ ← condition + inStock
└─────────────────────┘
```

### Search & Filter Setup:
- **Search Field:** title, description
- **Filter Tabs:** "All", "Automotive", "Marine", "Aviation", "Recreational"
- **Sort Options:** Price (Low to High), Price (High to Low), Name (A-Z)

### Actions:
- **Tap Card:** Navigate to Part Detail Screen
- **Add to Cart:** Quick add button on card

## Screen 2: Part Detail

### Screen Type: Item Detail
**Data Source:** Parts Collection (single item)

### Components (Top to Bottom):
1. **Image Gallery** 
   - Field: mainMedia
   - Style: Full width, swipeable

2. **Part Information**
   ```
   ShopHand™ Brake Pads          ← title
   $89.99                        ← price
   ⭐ New Condition              ← condition
   ✅ In Stock (25 available)    ← inStock + quantity
   ```

3. **Description Section**
   - Field: description
   - Style: Expandable text

4. **Vehicle Compatibility**
   - Field: vehicleCompatibility
   - Display: Compatible vehicle list

5. **Supplier Information**
   - Field: partnerId
   - Display: Partner name, rating

6. **Action Buttons**
   ```
   [Add to Cart - Gold Button]
   [Buy Now - Black Button]
   ```

## Screen 3: Orders History

### Screen Type: Collection List
**Data Source:** Orders Collection
**Filter:** userId = currentUser.id

### Layout: List View

### Order Card Design:
```
Order Card Components:
┌─────────────────────────────┐
│ Order #SH-2024-001          │ ← orderNumber
│ Dec 1, 2024                 │ ← createdDate
│ Status: Delivered ✅        │ ← fulfillmentStatus
│ Total: $156.78              │ ← totals.total
│ 3 items                     │ ← lineItems count
└─────────────────────────────┘
```

### Status Icons:
- 🟡 Pending
- 🔵 Processing  
- 🚚 Shipped
- ✅ Delivered

### Actions:
- **Tap Order:** Navigate to Order Detail Screen
- **Reorder Button:** For completed orders

## Screen 4: Order Detail

### Screen Type: Item Detail
**Data Source:** Orders Collection

### Components (Top to Bottom):

1. **Order Header**
   ```
   Order #SH-2024-001
   Placed: December 1, 2024
   Status: Delivered ✅
   ```

2. **Delivery Tracking** (if shipped)
   ```
   Driver: John Smith ⭐ 4.8
   Vehicle: Honda Civic
   [Track Location] [Call Driver]
   ```

3. **Items List**
   ```
   🔧 Brake Pads (Qty: 2)     $179.98
   🔧 Air Filter (Qty: 1)     $ 24.99
   ```

4. **Order Totals**
   ```
   Subtotal:        $204.97
   Delivery Fee:    $ 15.00
   Tax:            $ 16.40
   ─────────────────────────
   Total:          $236.37
   ```

5. **Actions**
   - [Reorder Items]
   - [Rate Driver] (if delivered)
   - [Contact Support]

## Screen 5: Driver Dashboard (Driver Users Only)

### Screen Type: Custom Dashboard
**Visible For:** userType = "driver"

### Components (Top to Bottom):

1. **Status Toggle**
   ```
   ┌─────────────────────┐
   │ 🟢 ONLINE          │ ← Toggle switch
   │ Ready for pickups   │
   └─────────────────────┘
   ```

2. **Earnings Summary**
   ```
   Today: $125.50
   This Week: $687.25
   Total: $3,245.78
   ```

3. **Available Pickups Section**
   ```
   📦 New Pickup Available
   AutoZone → 123 Main St
   Distance: 2.3 miles
   Payout: $18.50
   [Accept] [Decline]
   ```

4. **Active Deliveries**
   ```
   🚚 In Progress
   Order #SH-2024-001
   Deliver to: 456 Oak Ave
   [Navigate] [Mark Delivered]
   ```

### Actions:
- **Accept Pickup:** Assigns order to driver
- **Navigate:** Opens GPS navigation
- **Mark Delivered:** Completes delivery

## Screen 6: Profile

### Screen Type: User Profile

### Components (Top to Bottom):

1. **User Information**
   ```
   👤 John Doe
   📧 john@example.com
   📱 (555) 123-4567
   [Edit Profile]
   ```

2. **Subscription Status**
   ```
   ShopHand™ Premium
   Next billing: Jan 1, 2025
   [Manage Subscription]
   ```

3. **Payment Methods**
   ```
   💳 •••• 1234 (Default)
   💳 •••• 5678
   [Add Payment Method]
   ```

4. **Delivery Addresses**
   ```
   🏠 Home: 123 Main St
   🏢 Work: 456 Office Blvd
   [Add Address]
   ```

5. **Settings**
   - 🔔 Push Notifications
   - 📍 Location Services
   - 🔒 Privacy Settings
   - 📱 App Preferences

6. **Account Actions**
   - [Help & Support]
   - [Terms of Service]
   - [Sign Out]

## Screen 7: Cart & Checkout

### Screen Type: Shopping Cart

### Cart Screen Components:

1. **Cart Items List**
   ```
   🔧 Brake Pads
   Qty: 2 × $89.99 = $179.98
   [Remove] [Edit Qty]
   
   🔧 Air Filter  
   Qty: 1 × $24.99 = $24.99
   [Remove] [Edit Qty]
   ```

2. **Delivery Options**
   ```
   📦 Standard ($15.00)
   🚀 Express ($25.00)
   ⭐ Premium ($35.00)
   ```

3. **Cart Summary**
   ```
   Subtotal:     $204.97
   Delivery:     $ 15.00
   Tax:         $ 16.40
   ─────────────────────
   Total:       $236.37
   ```

4. **Checkout Button**
   ```
   [Proceed to Checkout - Gold Button]
   ```

### Checkout Screen:
1. **Delivery Address Selection**
2. **Payment Method Selection**
3. **Order Review**
4. **Place Order Button**

## Navigation Setup

### Bottom Tab Bar:
```
┌─────┬─────┬─────┬─────┐
│  🔍 │ 📦  │ 🚗  │ 👤  │
│Browse│Orders│Drive│Profile│
└─────┴─────┴─────┴─────┘
```

### Tab Visibility:
- **Browse:** All users
- **Orders:** Logged in users
- **Drive:** Driver users only
- **Profile:** All users

## User Authentication

### Login Screen:
```
ShopHand™ Logo
"Need a part? Shop Hand it!"

[📧 Email Address]
[🔒 Password]
[Sign In - Gold Button]

Don't have an account?
[Create Account]

[Forgot Password?]
```

### Registration Screen:
```
Create Your Account

[First Name]
[Last Name]
[📧 Email]
[📱 Phone Number]
[🔒 Password]
[🔒 Confirm Password]

Account Type:
( ) Customer
( ) Driver

[Create Account - Gold Button]

Already have an account?
[Sign In]
```

## Implementation Notes

### Database Collections Required:
1. **Parts** - Product catalog
2. **Orders** - Order management
3. **Users** - User accounts
4. **Drivers** - Driver profiles
5. **Categories** - Part categories
6. **Partners** - Supplier information

### Key Features to Enable:
- Push notifications for order updates
- Location services for driver tracking
- Camera for delivery confirmations
- Payment processing integration
- Real-time order status updates

### Testing Checklist:
- [ ] User registration/login
- [ ] Browse and search parts
- [ ] Add items to cart
- [ ] Place orders
- [ ] Track deliveries
- [ ] Driver pickup/delivery flow
- [ ] Payment processing
- [ ] Push notifications

This structure will create a professional ShopHand™ mobile app with all the features of your platform!