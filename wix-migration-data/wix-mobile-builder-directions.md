# ShopHand™ Wix Mobile App Builder - Exact Build Directions

## Start Building Your App

### 1. Create New Mobile App
- Open Wix Mobile App Builder
- Click "Create New App"
- Choose "Custom App" (not template)
- Enter App Name: **ShopHand™**

### 2. App Settings Setup
```
Basic Info:
- App Name: ShopHand™
- App Description: Premium auto parts delivery platform
- Category: Shopping
- Keywords: auto parts, delivery, automotive, shopping
```

### 3. Design Theme Configuration
```
Colors:
- Primary Color: #000000 (Black)
- Secondary Color: #FFD700 (Gold)
- Text Color: #FFFFFF (White)
- Background: #1a1a1a (Dark Gray)

Typography:
- Font Family: System Default (Modern)
- Header Size: Large
- Body Text: Medium
```

## Database Collections Setup

### Create Collections (In Order):

#### Collection 1: Categories
```
Collection Name: Categories
Permissions: Site visitors can read

Fields:
- _id (Text, Primary Key)
- name (Text, Required)
- description (Text)
- slug (Text, Unique)
- visible (Boolean, Default: true)
```

#### Collection 2: Partners
```
Collection Name: Partners  
Permissions: Site visitors can read

Fields:
- _id (Text, Primary Key)
- name (Text, Required)
- email (Text)
- phone (Text)
- partnerType (Text, Options: dealership, store, dismantler)
- rating (Number, Range: 1-5)
- isActive (Boolean, Default: true)
```

#### Collection 3: Parts
```
Collection Name: Parts
Permissions: Site visitors can read

Fields:
- _id (Text, Primary Key)
- title (Text, Required)
- description (Rich Text)
- price (Number, Required)
- categoryId (Text, Reference to Categories)
- partnerId (Text, Reference to Partners)
- condition (Text, Options: new, used, refurbished)
- inStock (Boolean, Default: true)
- mainImage (Image, Required)
- vehicleYear (Number)
- vehicleMake (Text)
- vehicleModel (Text)
```

#### Collection 4: Orders
```
Collection Name: Orders
Permissions: Site members can read their own

Fields:
- _id (Text, Primary Key)
- orderNumber (Text, Unique, Required)
- userId (Text, Reference to Members)
- customerEmail (Text, Required)
- customerName (Text, Required)
- shippingAddress (Text, Required)
- paymentStatus (Text, Options: PENDING, PAID, FAILED)
- orderStatus (Text, Options: PENDING, PROCESSING, SHIPPED, DELIVERED)
- totalAmount (Number, Required)
- orderItems (JSON)
- createdDate (Date & Time, Default: Now)
- driverId (Text, Reference to Drivers)
```

#### Collection 5: Drivers
```
Collection Name: Drivers
Permissions: Admin only

Fields:
- _id (Text, Primary Key)
- userId (Text, Reference to Members)
- driverName (Text, Required)
- vehicleInfo (Text)
- isOnline (Boolean, Default: false)
- rating (Number, Range: 1-5)
- totalEarnings (Number, Default: 0)
- currentLocation (Text)
- phoneNumber (Text)
```

## Screen Creation Process

### Screen 1: Home/Browse Parts

#### Create Screen:
1. Click "Add Screen"
2. Choose "Collection List"
3. Name: "Browse Parts"
4. Connect to: Parts Collection

#### Layout Setup:
```
Display Style: Grid
Columns: 2
Item Height: 250px
Show Search: Yes
Show Filter: Yes
Show Sort: Yes
```

#### Design Each Card:
```
Card Components (Top to Bottom):
1. Image Element
   - Source: mainImage field
   - Size: 150x150px
   - Position: Top center

2. Text Element (Title)
   - Source: title field
   - Font: Bold, 16px
   - Color: White (#FFFFFF)
   - Max Lines: 2

3. Text Element (Price)
   - Source: price field
   - Font: Bold, 18px
   - Color: Gold (#FFD700)
   - Format: Currency ($)

4. Text Element (Condition)
   - Source: condition field
   - Font: Regular, 12px
   - Color: Light Gray
```

#### Search & Filter Configuration:
```
Search Fields: title, description
Filter Options:
- Category (from categoryId field)
- Condition (new, used, refurbished)
- Price Range (slider: $0-$500)

Sort Options:
- Price: Low to High
- Price: High to Low
- Name: A to Z
```

#### Actions:
```
Card Tap Action: Navigate to Part Detail Screen
Add Quick Actions:
- Heart Icon (Favorites)
- Cart Icon (Add to Cart)
```

### Screen 2: Part Detail

#### Create Screen:
1. Click "Add Screen"
2. Choose "Item Detail"
3. Name: "Part Detail"
4. Connect to: Parts Collection

#### Layout Design:
```
Components (Top to Bottom):

1. Image Gallery
   - Source: mainImage field
   - Height: 300px
   - Style: Full width

2. Part Info Container
   - Background: Dark (#1a1a1a)
   - Padding: 20px

3. Title Text
   - Source: title field
   - Font: Bold, 24px
   - Color: White

4. Price Text
   - Source: price field
   - Font: Bold, 28px
   - Color: Gold (#FFD700)

5. Condition Badge
   - Source: condition field
   - Style: Pill shape
   - Background: Green (new), Orange (used), Blue (refurbished)

6. Description Section
   - Source: description field
   - Font: Regular, 16px
   - Color: Light Gray
   - Expandable: Yes

7. Vehicle Compatibility
   - Text: "Fits: [vehicleYear] [vehicleMake] [vehicleModel]"
   - Font: Regular, 14px
   - Color: Gold

8. Supplier Info
   - Source: partnerId (display partner name)
   - Include partner rating stars

9. Action Buttons Container
   - Two buttons side by side:
     * "Add to Cart" (Gold background)
     * "Buy Now" (Black outline)
```

### Screen 3: Orders List

#### Create Screen:
1. Click "Add Screen"
2. Choose "Collection List"
3. Name: "My Orders"
4. Connect to: Orders Collection
5. Filter: userId = Current User ID

#### Layout Design:
```
Display Style: List
Show Search: No
Show Filter: Yes (by order status)

Card Design:
1. Order Header
   - Order Number (large, bold)
   - Order Date (small, gray)

2. Status Badge
   - Background color based on orderStatus:
     * Yellow: PENDING
     * Blue: PROCESSING
     * Green: SHIPPED
     * Dark Green: DELIVERED

3. Order Summary
   - Total Amount (large, gold)
   - Item Count (small text)

4. Action Button
   - "View Details" (outline button)
```

#### Filter Options:
```
Status Filters:
- All Orders
- Pending
- Processing
- Shipped
- Delivered
```

### Screen 4: Order Detail

#### Create Screen:
1. Click "Add Screen"
2. Choose "Item Detail"
3. Name: "Order Detail"
4. Connect to: Orders Collection

#### Layout Components:
```
1. Order Header
   - Order Number (large)
   - Order Date
   - Status Badge

2. Shipping Info Card
   - Customer Name
   - Shipping Address
   - Phone Number

3. Driver Info (if assigned)
   - Driver Name
   - Vehicle Info
   - Contact Button
   - Track Button

4. Items List
   - Repeater connected to orderItems JSON
   - Show: Product name, quantity, price

5. Total Summary
   - Subtotal
   - Delivery Fee
   - Tax
   - Total (large, gold)

6. Action Buttons
   - "Reorder Items"
   - "Contact Support"
   - "Rate Driver" (if delivered)
```

### Screen 5: Driver Dashboard

#### Create Screen:
1. Click "Add Screen"
2. Choose "Custom"
3. Name: "Driver Dashboard"
4. Visibility: Drivers only

#### Layout Components:
```
1. Status Toggle
   - Switch element
   - Connected to: isOnline field in Drivers
   - Text: "Available for Pickups"

2. Earnings Cards
   - 3 cards in row:
     * Today's Earnings
     * This Week
     * Total Earnings
   - Source: Calculate from completed orders

3. Available Pickups Section
   - Repeater connected to Orders
   - Filter: orderStatus = PROCESSING AND driverId = null
   - Show: Order number, pickup location, payout
   - Action: "Accept Order" button

4. Current Deliveries
   - Repeater connected to Orders
   - Filter: driverId = Current Driver AND orderStatus = SHIPPED
   - Show: Order details, delivery address
   - Actions: "Navigate", "Mark Delivered"
```

### Screen 6: User Profile

#### Create Screen:
1. Click "Add Screen"
2. Choose "Profile"
3. Name: "Profile"

#### Layout Components:
```
1. User Info Section
   - Profile picture (upload)
   - Name (editable)
   - Email (display only)
   - Phone (editable)

2. Account Type Badge
   - Customer/Driver indicator
   - Subscription status

3. Settings List
   - Push Notifications (toggle)
   - Location Services (toggle)
   - Email Notifications (toggle)

4. Account Actions
   - "Payment Methods"
   - "Delivery Addresses"
   - "Help & Support"
   - "Terms of Service"
   - "Sign Out" (red button)
```

## Navigation Setup

### Create Bottom Tab Navigation:
```
Tab 1: Browse
- Icon: Search icon
- Screen: Browse Parts
- Label: "Browse"

Tab 2: Orders  
- Icon: Package icon
- Screen: My Orders
- Label: "Orders"
- Visibility: Logged in users only

Tab 3: Drive
- Icon: Car icon
- Screen: Driver Dashboard
- Label: "Drive"
- Visibility: Drivers only

Tab 4: Profile
- Icon: User icon
- Screen: Profile
- Label: "Profile"
```

### Tab Bar Design:
```
Background: Black (#000000)
Active Tab Color: Gold (#FFD700)
Inactive Tab Color: Gray (#666666)
Icon Size: 24px
Label Font: 12px
```

## Custom Widgets

### Widget 1: Vehicle Selector
```
Purpose: Let users select their vehicle for compatible parts
Components:
- Year Dropdown (1990-2025)
- Make Dropdown (Toyota, Honda, Ford, etc.)
- Model Dropdown (depends on make)
- "Find Parts" Button

Design:
- Background: Dark card
- Gold accent borders
- White text
```

### Widget 2: Add to Cart Button
```
Purpose: Add items to shopping cart
States:
- Default: "Add to Cart" (gold background)
- Loading: Spinner animation
- Added: "Added!" with checkmark (green)

Animation: Scale up slightly when tapped
```

### Widget 3: Order Status Tracker
```
Purpose: Visual progress of order
Components:
- 4 step progress bar
- Icons for each stage
- Current step highlighted in gold

Steps:
1. Order Placed
2. Processing
3. Out for Delivery
4. Delivered
```

### Widget 4: Driver Rating System
```
Purpose: Rate driver after delivery
Components:
- 5 star rating (tap to select)
- Text feedback box
- Submit button

Design:
- Stars: Gold when selected
- Text box: Dark background, white text
```

## User Authentication

### Login Screen Design:
```
Components:
1. App Logo (ShopHand™)
2. Tagline: "Need a part? Shop Hand it!"
3. Email Input Field
4. Password Input Field
5. "Sign In" Button (gold)
6. "Create Account" Link
7. "Forgot Password" Link

Background: Black with subtle pattern
```

### Registration Screen:
```
Fields:
- First Name
- Last Name
- Email
- Phone Number
- Password
- Confirm Password
- Account Type (Customer/Driver radio buttons)

Validation:
- Email format check
- Password strength indicator
- Phone number format
```

## Testing Checklist

Before publishing, test these flows:

### Customer Flow:
- [ ] Register new account
- [ ] Browse parts catalog
- [ ] Search for specific parts
- [ ] View part details
- [ ] Add items to cart
- [ ] Complete checkout
- [ ] Track order status
- [ ] Rate completed delivery

### Driver Flow:
- [ ] Register as driver
- [ ] Toggle online status
- [ ] View available pickups
- [ ] Accept order
- [ ] Mark order as delivered
- [ ] View earnings

### General:
- [ ] All navigation works
- [ ] Images load properly
- [ ] Database connections work
- [ ] Push notifications send
- [ ] App works on different screen sizes

## Publish Settings

### App Store Information:
```
iOS App Store:
- Category: Shopping
- Age Rating: 4+
- Keywords: auto parts, delivery, automotive
- Screenshots: 6.5" and 5.5" iPhone sizes

Google Play Store:
- Category: Shopping
- Content Rating: Everyone
- Keywords: auto parts, car parts, delivery
- Screenshots: Phone and tablet sizes
```

This gives you exact step-by-step directions for building ShopHand™ in Wix Mobile App Builder with all the specific elements, screens, and widgets configured properly.