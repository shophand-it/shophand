
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
            console.log(`Imported user: ${user.email}`);
        } catch (error) {
            console.error(`Error importing user ${user.email}:`, error);
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
            console.log(`Imported part: ${part.title}`);
        } catch (error) {
            console.error(`Error importing part ${part.title}:`, error);
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
            console.log(`Imported order: ${order.orderNumber}`);
        } catch (error) {
            console.error(`Error importing order ${order.orderNumber}:`, error);
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
            console.log(`Imported driver: ${driver._id}`);
        } catch (error) {
            console.error(`Error importing driver ${driver._id}:`, error);
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
            console.log(`Imported category: ${category.name}`);
        } catch (error) {
            console.error(`Error importing category ${category.name}:`, error);
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
            console.log(`Imported partner: ${partner.name}`);
        } catch (error) {
            console.error(`Error importing partner ${partner.name}:`, error);
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
