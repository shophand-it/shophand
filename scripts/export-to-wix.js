// ShopHand™ Data Export Script for Wix Migration
const fs = require('fs');
const path = require('path');

// Export directory
const EXPORT_DIR = './wix-migration-data';

// Mock data for demonstration (replace with actual database queries)
const mockData = {
    users: [
        {
            id: 1,
            email: "customer@example.com",
            username: "customer1",
            firstName: "John",
            lastName: "Doe",
            userType: "customer",
            createdAt: new Date()
        }
    ],
    parts: [
        {
            id: 1,
            name: "Brake Pads",
            description: "High-quality brake pads for Toyota Camry",
            price: 89.99,
            categoryId: 1,
            partnerId: 1,
            condition: "new",
            inStock: true,
            quantity: 50
        }
    ],
    orders: [
        {
            id: 1,
            orderNumber: "SH-2024-001",
            userId: 1,
            status: "completed",
            total: 89.99,
            deliveryAddress: "123 Main St, City, State",
            createdAt: new Date()
        }
    ],
    drivers: [
        {
            id: 1,
            userId: 2,
            vehicleInfo: { make: "Honda", model: "Civic", year: 2020 },
            isOnline: true,
            rating: 4.8,
            earnings: 2500.00
        }
    ],
    categories: [
        {
            id: 1,
            name: "Brakes",
            description: "Brake components and accessories"
        }
    ],
    partners: [
        {
            id: 1,
            name: "AutoZone",
            email: "supplier@autozone.com",
            partnerType: "store",
            isActive: true,
            rating: 4.5
        }
    ]
};

// Ensure export directory exists
if (!fs.existsSync(EXPORT_DIR)) {
    fs.mkdirSync(EXPORT_DIR, { recursive: true });
}

// Wix-compatible data transformation functions
function transformUserForWix(user) {
    return {
        _id: user.id.toString(),
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        createdAt: user.createdAt,
        title: `${user.firstName} ${user.lastName}`,
        slug: user.username || user.email.split('@')[0]
    };
}

function transformPartForWix(part) {
    return {
        _id: part.id.toString(),
        title: part.name,
        description: part.description,
        price: part.price,
        categoryId: part.categoryId?.toString(),
        partnerId: part.partnerId?.toString(),
        vehicleCompatibility: JSON.stringify(part.vehicleCompatibility || {}),
        condition: part.condition,
        inStock: part.inStock,
        slug: part.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        mainMedia: part.imageUrl || "https://static.wixstatic.com/media/placeholder.jpg",
        ribbon: part.condition === 'new' ? 'New' : '',
        inventory: {
            trackInventory: true,
            inStock: part.inStock,
            quantity: part.quantity || 1
        }
    };
}

function transformOrderForWix(order) {
    return {
        _id: order.id.toString(),
        orderNumber: order.orderNumber,
        buyerInfo: {
            userId: order.userId?.toString(),
            email: order.userEmail || ''
        },
        billingInfo: {
            address: order.deliveryAddress || {}
        },
        shippingInfo: {
            address: order.deliveryAddress || {}
        },
        paymentStatus: order.status === 'completed' ? 'PAID' : 'PENDING',
        fulfillmentStatus: order.status.toUpperCase(),
        totals: {
            total: order.total,
            subtotal: order.subtotal || order.total,
            tax: order.tax || 0,
            shipping: order.shippingCost || 0
        },
        lineItems: [],
        createdDate: order.createdAt,
        updatedDate: order.updatedAt || order.createdAt
    };
}

function transformDriverForWix(driver) {
    return {
        _id: driver.id.toString(),
        userId: driver.userId?.toString(),
        vehicleInfo: JSON.stringify(driver.vehicleInfo || {}),
        isOnline: driver.isOnline,
        rating: driver.rating,
        earnings: driver.earnings || 0,
        currentLocation: JSON.stringify(driver.currentLocation || {}),
        status: driver.isOnline ? 'ACTIVE' : 'INACTIVE'
    };
}

function transformCategoryForWix(category) {
    return {
        _id: category.id.toString(),
        name: category.name,
        description: category.description || '',
        slug: category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        visible: true,
        numberOfProducts: 0
    };
}

function transformPartnerForWix(partner) {
    return {
        _id: partner.id.toString(),
        name: partner.name,
        email: partner.email,
        phone: partner.phone || '',
        address: JSON.stringify(partner.address || {}),
        partnerType: partner.partnerType,
        isActive: partner.isActive !== false,
        rating: partner.rating || 5.0
    };
}

// Export functions
function exportData(dataType, transformFunction) {
    try {
        console.log(`Exporting ${dataType}...`);
        const data = mockData[dataType] || [];
        const wixData = data.map(transformFunction);
        
        fs.writeFileSync(
            path.join(EXPORT_DIR, `${dataType}.json`),
            JSON.stringify(wixData, null, 2)
        );
        
        console.log(`✅ Exported ${wixData.length} ${dataType}`);
        return wixData.length;
    } catch (error) {
        console.error(`❌ Error exporting ${dataType}:`, error.message);
        return 0;
    }
}

// Generate Wix import scripts
function generateWixImportScripts() {
    const importScript = `
// Wix Velo Import Script for ShopHand™ Data
// Copy this code to your Wix Velo backend files

import wixData from 'wix-data';

// Import Users
export async function importUsers() {
    const users = [
        // Paste users.json content here
    ];
    
    for (const user of users) {
        try {
            await wixData.insert("Users", user);
            console.log(\`Imported user: \${user.email}\`);
        } catch (error) {
            console.error(\`Error importing user \${user.email}:\`, error);
        }
    }
}

// Import Parts (Wix Stores Products)
export async function importParts() {
    const parts = [
        // Paste parts.json content here
    ];
    
    for (const part of parts) {
        try {
            await wixData.insert("Stores/Products", part);
            console.log(\`Imported part: \${part.title}\`);
        } catch (error) {
            console.error(\`Error importing part \${part.title}:\`, error);
        }
    }
}

// Import Orders (Wix Stores Orders)
export async function importOrders() {
    const orders = [
        // Paste orders.json content here
    ];
    
    for (const order of orders) {
        try {
            await wixData.insert("Stores/Orders", order);
            console.log(\`Imported order: \${order.orderNumber}\`);
        } catch (error) {
            console.error(\`Error importing order \${order.orderNumber}:\`, error);
        }
    }
}

// Import Custom Collections
export async function importDrivers() {
    const drivers = [
        // Paste drivers.json content here
    ];
    
    for (const driver of drivers) {
        try {
            await wixData.insert("Drivers", driver);
            console.log(\`Imported driver: \${driver._id}\`);
        } catch (error) {
            console.error(\`Error importing driver \${driver._id}:\`, error);
        }
    }
}

export async function importCategories() {
    const categories = [
        // Paste categories.json content here
    ];
    
    for (const category of categories) {
        try {
            await wixData.insert("Stores/Categories", category);
            console.log(\`Imported category: \${category.name}\`);
        } catch (error) {
            console.error(\`Error importing category \${category.name}:\`, error);
        }
    }
}

export async function importPartners() {
    const partners = [
        // Paste partners.json content here
    ];
    
    for (const partner of partners) {
        try {
            await wixData.insert("Partners", partner);
            console.log(\`Imported partner: \${partner.name}\`);
        } catch (error) {
            console.error(\`Error importing partner \${partner.name}:\`, error);
        }
    }
}

// Run all imports in sequence
export async function importAllShopHandData() {
    console.log('🚀 Starting ShopHand™ data import to Wix...');
    
    try {
        await importCategories();
        console.log('✅ Categories imported');
        
        await importPartners();
        console.log('✅ Partners imported');
        
        await importUsers();
        console.log('✅ Users imported');
        
        await importDrivers();
        console.log('✅ Drivers imported');
        
        await importParts();
        console.log('✅ Parts imported');
        
        await importOrders();
        console.log('✅ Orders imported');
        
        console.log('🎉 ShopHand™ data import completed successfully!');
        
    } catch (error) {
        console.error('❌ Import failed:', error);
    }
}
`;

    fs.writeFileSync(
        path.join(EXPORT_DIR, 'wix-import-script.js'),
        importScript
    );
}

// Main export function
function exportAllData() {
    console.log('🚀 Starting ShopHand™ data export for Wix migration...\n');
    
    const results = {
        users: exportData('users', transformUserForWix),
        parts: exportData('parts', transformPartForWix),
        orders: exportData('orders', transformOrderForWix),
        drivers: exportData('drivers', transformDriverForWix),
        categories: exportData('categories', transformCategoryForWix),
        partners: exportData('partners', transformPartnerForWix)
    };
    
    // Generate import scripts
    generateWixImportScripts();
    
    // Create summary
    const summary = {
        exportDate: new Date().toISOString(),
        platform: 'ShopHand™',
        targetPlatform: 'Wix Velo',
        totalRecords: Object.values(results).reduce((sum, count) => sum + count, 0),
        breakdown: results,
        files: [
            'users.json',
            'parts.json', 
            'orders.json',
            'drivers.json',
            'categories.json',
            'partners.json',
            'wix-import-script.js'
        ]
    };
    
    fs.writeFileSync(
        path.join(EXPORT_DIR, 'export-summary.json'),
        JSON.stringify(summary, null, 2)
    );
    
    console.log('\n📋 Export Summary:');
    console.log(`Total Records: ${summary.totalRecords}`);
    console.log(`Users: ${results.users}`);
    console.log(`Parts: ${results.parts}`);
    console.log(`Orders: ${results.orders}`);
    console.log(`Drivers: ${results.drivers}`);
    console.log(`Categories: ${results.categories}`);
    console.log(`Partners: ${results.partners}`);
    
    console.log(`\n📁 Export files saved to: ${EXPORT_DIR}`);
    console.log('\n🎯 Next Steps:');
    console.log('1. Follow the WIX_MIGRATION_GUIDE.md');
    console.log('2. Set up Wix Velo development environment');
    console.log('3. Create database collections in Wix');
    console.log('4. Import data using the generated scripts');
    console.log('5. Configure custom domain (shophandit.com)');
    
    return summary;
}

// Run the export
if (require.main === module) {
    exportAllData();
}

module.exports = { exportAllData };