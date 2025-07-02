# ShopHand™ Wix Setup Instructions

## Step 2: Enable Wix Velo Development Mode

1. **Open Your Wix Site Editor**
   - Go to your Wix dashboard
   - Click "Edit Site" on your ShopHand™ site

2. **Enable Dev Mode**
   - In the top menu bar, click **"Dev Mode"**
   - Click **"Turn on Dev Mode"**
   - Choose **"Start Coding"**
   - This enables Velo (Wix's development platform)

3. **Database Access**
   - Once Dev Mode is enabled, you'll see a **"Database"** option in the left panel
   - Click it to access your database manager

## Step 3: Create Database Collections

Create these collections in your Wix Database (click "+ Add Collection"):

### 1. Users Collection
```
Collection Name: Users
Permissions: Admin (for security)

Fields:
- _id (Text) - Primary Key
- email (Text) - Unique
- username (Text)
- firstName (Text)
- lastName (Text)
- userType (Text) - Values: customer, driver, business
- title (Text) - Full name display
- slug (Text) - URL-friendly username
- createdAt (Date)
```

### 2. Parts Collection (Products)
```
Collection Name: Parts
Permissions: Anyone can read

Fields:
- _id (Text) - Primary Key
- title (Text) - Part name
- description (Rich Text)
- price (Number)
- categoryId (Text) - Reference to Categories
- partnerId (Text) - Reference to Partners
- vehicleCompatibility (JSON)
- condition (Text) - Values: new, used, refurbished
- inStock (Boolean)
- slug (Text) - URL-friendly title
- mainMedia (Media) - Product image
- ribbon (Text) - Status badge
- inventory (JSON) - Stock tracking
```

### 3. Orders Collection
```
Collection Name: Orders
Permissions: Admin

Fields:
- _id (Text) - Primary Key
- orderNumber (Text) - Unique order ID
- buyerInfo (JSON) - Customer details
- billingInfo (JSON) - Billing address
- shippingInfo (JSON) - Delivery address
- paymentStatus (Text) - Values: PAID, PENDING, FAILED
- fulfillmentStatus (Text) - Values: PENDING, PROCESSING, SHIPPED, DELIVERED
- totals (JSON) - Price breakdown
- lineItems (JSON) - Ordered parts
- createdDate (Date)
- updatedDate (Date)
```

### 4. Drivers Collection
```
Collection Name: Drivers
Permissions: Admin

Fields:
- _id (Text) - Primary Key
- userId (Text) - Reference to Users
- vehicleInfo (JSON) - Vehicle details
- isOnline (Boolean)
- rating (Number)
- earnings (Number)
- currentLocation (JSON) - GPS coordinates
- status (Text) - Values: ACTIVE, INACTIVE, BUSY
```

### 5. Categories Collection
```
Collection Name: Categories
Permissions: Anyone can read

Fields:
- _id (Text) - Primary Key
- name (Text)
- description (Text)
- slug (Text) - URL-friendly name
- visible (Boolean)
- numberOfProducts (Number)
```

### 6. Partners Collection
```
Collection Name: Partners
Permissions: Admin

Fields:
- _id (Text) - Primary Key
- name (Text)
- email (Text)
- phone (Text)
- address (JSON)
- partnerType (Text) - Values: dealership, store, dismantler
- isActive (Boolean)
- rating (Number)
```

## Step 4: Set Up Backend Code

1. **Create Backend Files**
   - In Dev Mode, go to **"Backend"** in left panel
   - Create new file: **"shophand-data.js"**

2. **Copy Import Script**
   - Open your `wix-import-script.js` file
   - Copy all the code into your new Wix backend file
   - Save the file

3. **Test Database Connection**
   ```javascript
   // Add this test function to verify setup
   import wixData from 'wix-data';
   
   export async function testDatabaseConnection() {
       try {
           const result = await wixData.query("Users").limit(1).find();
           console.log("Database connected successfully!");
           return { success: true, collections: ["Users", "Parts", "Orders", "Drivers", "Categories", "Partners"] };
       } catch (error) {
           console.error("Database connection failed:", error);
           return { success: false, error: error.message };
       }
   }
   ```

## Step 5: Import Your ShopHand™ Data

1. **Prepare Data Files**
   - Open each JSON file from your export:
     - users.json
     - parts.json
     - orders.json
     - drivers.json
     - categories.json
     - partners.json

2. **Update Import Functions**
   - Replace the empty arrays in each import function with your actual data
   - Example for users:
   ```javascript
   export async function importUsers() {
       const users = [
           // Paste content from users.json here
           {
               "_id": "1",
               "email": "customer@example.com",
               "username": "customer1",
               // ... rest of user data
           }
       ];
       
       for (const user of users) {
           try {
               await wixData.insert("Users", user);
               console.log(`Imported user: ${user.email}`);
           } catch (error) {
               console.error(`Error importing user ${user.email}:`, error);
           }
       }
   }
   ```

3. **Run Import Process**
   - In Wix Editor, open the **Console** (F12)
   - Call your import function:
   ```javascript
   import { importAllShopHandData } from 'backend/shophand-data';
   
   importAllShopHandData()
       .then(() => console.log("Import completed!"))
       .catch(error => console.error("Import failed:", error));
   ```

## Step 6: Configure Custom Domain

1. **Domain Settings**
   - In Wix Dashboard, go to **Settings** → **Domains**
   - Click **"Connect a Domain You Already Own"**
   - Enter: **shophandit.com**

2. **DNS Configuration**
   - You'll receive DNS instructions
   - Update your domain registrar's DNS settings
   - Add the provided CNAME and A records

3. **SSL Setup**
   - SSL certificate is automatically provided by Wix
   - Your site will be secure with HTTPS

## Step 7: Design Your Frontend

1. **Page Structure**
   Create these pages in Wix:
   - Home (Customer Interface)
   - Parts Catalog
   - Driver Dashboard
   - Business Analytics
   - User Profile
   - Checkout
   - Order Tracking

2. **Design Elements**
   - Use your black and gold ShopHand™ theme
   - Add the trademark notice: "ShopHand™ - Star Soul Enterprise LLC"
   - Include slogan: "Need a part? Shop Hand it!"

3. **Mobile Optimization**
   - Enable mobile-responsive design
   - Test on different screen sizes
   - Optimize for mobile commerce

## Troubleshooting

### Common Issues:

**Database Permissions Error:**
- Ensure collections have correct read/write permissions
- Admin collections should be restricted to site members

**Import Failures:**
- Check data format matches collection schema
- Verify required fields are present
- Look for special characters in data

**Domain Connection Issues:**
- DNS changes can take 24-48 hours
- Verify CNAME and A records are correct
- Contact your domain registrar if needed

### Support Resources:
- Wix Velo Documentation: dev.wix.com
- Wix Support: support.wix.com
- ShopHand™ Migration Guide: WIX_MIGRATION_GUIDE.md

## Next Steps After Setup

1. Test all functionality
2. Configure payment processing
3. Set up customer registration
4. Enable driver dashboard features
5. Launch your permanent ShopHand™ platform

Your ShopHand™ platform will be live on a professional domain with enterprise-grade hosting!