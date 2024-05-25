import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: (typeof window !== 'undefined' && localStorage.getItem('cartItems'))
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
    }),
    actions: {
        addItem(item) {
            const existingItem = this.items.find(i => i.id === item.id)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                this.items.push({ ...item, quantity: 1 })
            }
            this.saveToLocalStorage()
        },
        updateItemQuantity(itemId, quantity) {
            const item = this.items.find(i => i.id === itemId)
            if (item && quantity > 0) {
                item.quantity = quantity
            } else if (item && quantity === 0) {
                this.removeItem(itemId)
            }
            this.saveToLocalStorage()
        },
        removeItem(itemId) {
            this.items = this.items.filter(item => item.id !== itemId)
            this.saveToLocalStorage()
        },
        clearCart() {
            this.items = []
            this.saveToLocalStorage()
        },
        saveToLocalStorage() {
            if (typeof window !== 'undefined') {
                localStorage.setItem('cartItems', JSON.stringify(this.items))
            }
        }
    },
    getters: {
        cartItems: (state) => state.items,
        cartItemCount: (state) => state.items.length
    }
})
