import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: (typeof window !== 'undefined' && localStorage.getItem('cartItems'))
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        visits: (typeof window !== 'undefined' && localStorage.getItem('cartVisits'))
            ? JSON.parse(localStorage.getItem('cartVisits'))
            : []
    }),
    actions: {
        initializeCart() {
            if (typeof window !== 'undefined') {
                const storedItems = localStorage.getItem('cartItems');
                const storedVisits = localStorage.getItem('cartVisits');
                if (storedItems) {
                    this.items = JSON.parse(storedItems);
                }
                if (storedVisits) {
                    this.visits = JSON.parse(storedVisits);
                }
            }
        },
        addItem(item) {
            const existingItem = this.items.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({ ...item, quantity: 1 });
            }
            this.saveToLocalStorage();
        },
        addVisit(visit) {
            const existingVisit = this.visits.find(v => v.id === visit.id);
            if (existingVisit) {
                existingVisit.quantity += 1;
            } else {
                this.visits.push({ ...visit, quantity: 1 });
            }
            this.saveToLocalStorage();
        },
        updateItemQuantity(itemId, quantity) {
            const item = this.items.find(i => i.id === itemId);
            if (item && quantity > 0) {
                item.quantity = quantity;
            } else if (item && quantity === 0) {
                this.removeItem(itemId);
            }
            this.saveToLocalStorage();
        },
        updateVisitQuantity(visitId, quantity) {
            const visit = this.visits.find(v => v.id === visitId);
            if (visit && quantity > 0) {
                visit.quantity = quantity;
            } else if (visit && quantity === 0) {
                this.removeVisit(visitId);
            }
            this.saveToLocalStorage();
        },
        removeItem(itemId) {
            this.items = this.items.filter(item => item.id !== itemId);
            this.saveToLocalStorage();
        },
        removeVisit(visitId) {
            this.visits = this.visits.filter(visit => visit.id !== visitId);
            this.saveToLocalStorage();
        },
        clearCart() {
            this.items = [];
            this.visits = [];
            this.saveToLocalStorage();
        },
        saveToLocalStorage() {
            if (typeof window !== 'undefined') {
                localStorage.setItem('cartItems', JSON.stringify(this.items));
                localStorage.setItem('cartVisits', JSON.stringify(this.visits));
            }
        }
    },
    getters: {
        cartItems: (state) => state.items,
        cartVisits: (state) => state.visits,
        cartItemCount: (state) => state.items.length + state.visits.length
    }
});
