import { ADD_STORE_TO_USER_URL, UPDATE_STORE_TRANSACTIONS, UPDATE_STORE_URL, UPDATE_STORE_REVENUE_URL,UPDATE_STORE_ORDERS_URL } from './apiConfig';


export async function CreateStore(email, storeData) {
    try {
        const response = await fetch(ADD_STORE_TO_USER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                storeData: storeData,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add store');
        }

        console.log('Store added successfully');
    } catch (error) {
        console.error('Error adding store:', error.message);
    }

}

export async function UpdateStore(email, storeData) {
    try {
        const response = await fetch(UPDATE_STORE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                storeData: storeData,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add store');
        }

        console.log('Store added successfully');
    } catch (error) {
        console.error('Error adding store:', error.message);
    }

}

export async function UpdateStoreRevenue(storeName, revenue_to_add) {
    try {
        const response = await fetch(UPDATE_STORE_REVENUE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storeName: storeName,
                revenue_to_add: revenue_to_add,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add store revenue');
        }

        console.log('Store revenue added successfully');
    } catch (error) {
        console.error('Error adding store revenue:', error.message);
    }

}

export async function UpdateStoreOrders(storeName) {
    try {
        console.log("ABRACADA")
        const response = await fetch(UPDATE_STORE_ORDERS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storeName: storeName,
            }),
        });

        console.log("res")
        if (!response.ok) {
            throw new Error('Failed to add store order');
        }

        console.log('Store order added successfully');
    } catch (error) {
        console.error('Error adding store revenue:', error.message);
    }

}

export async function UpdateStoreTransactions(storeName, productPrice, date) {
    try {
        const response = await fetch(UPDATE_STORE_TRANSACTIONS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storeName: storeName,
                productPrice: productPrice,
                date: date
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update store transactions');
        }

        console.log('Store transactions updated successfully');
    } catch (error) {
        console.error('Error updating store transactions:', error.message);
    }
}
