// blossom.js - Dynamic cherry blossom petal generation

class BlossomManager {
    constructor() {
        this.petalContainer = null;
        this.petalCount = 24; // Increased from 12 to 24
        this.petals = [];
        this.flowTypes = ['flow-left-down', 'flow-straight-down', 'flow-diagonal-down']; // Added diagonal movement
        this.init();
    }

    init() {
        // Find or create the petal container
        this.petalContainer = document.querySelector('.petal-container');
        if (!this.petalContainer) {
            this.createPetalContainer();
        }

        // Set initial visibility to hidden
        this.petalContainer.style.visibility = 'hidden';

        // Show after 2 seconds
        setTimeout(() => {
            this.petalContainer.style.visibility = 'visible';
            // Generate petals
            this.generatePetals();
        }, 2000);
    }

    createPetalContainer() {
        this.petalContainer = document.createElement('div');
        this.petalContainer.className = 'petal-container';
        document.body.appendChild(this.petalContainer);
    }

    generatePetals() {
        // Clear existing petals
        this.petalContainer.innerHTML = '';
        this.petals = [];

        for (let i = 0; i < this.petalCount; i++) {
            const petal = this.createPetal(i);
            this.petals.push(petal);
            this.petalContainer.appendChild(petal);
        }
    }

    createPetal(index) {
        const petal = document.createElement('div');
        petal.className = 'cherry-petal';
        petal.id = `petal${index + 1}`;

        // Randomly assign flow direction
        const flowType = this.flowTypes[Math.floor(Math.random() * this.flowTypes.length)];
        petal.classList.add(flowType);

        // Calculate random positions and delays for natural variation
        const top = 120 + (Math.random() * 20 - 10); // 110-130px
        const right = 5 + (Math.random() * 40); // 5-45px
        const delay = (index * 0.15) + (Math.random() * 0.5); // Reduced delay for more petals

        // Apply styles
        petal.style.top = `${top}px`;
        petal.style.right = `${right}px`;
        petal.style.animationDelay = `${delay}s`;

        return petal;
    }

    // Method to refresh petals (useful for respawning)
    refreshPetals() {
        this.generatePetals();
    }

    // Method to add more petals
    addPetals(count) {
        const startIndex = this.petals.length;
        for (let i = 0; i < count; i++) {
            const petal = this.createPetal(startIndex + i);
            this.petals.push(petal);
            this.petalContainer.appendChild(petal);
        }
        this.petalCount += count;
    }

    // Method to remove petals
    removePetals(count) {
        const removeCount = Math.min(count, this.petals.length);
        for (let i = 0; i < removeCount; i++) {
            const petal = this.petals.pop();
            if (petal && petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }
        this.petalCount = Math.max(0, this.petalCount - count);
    }
}

// Initialize blossom manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.blossomManager = new BlossomManager();
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlossomManager;
}
