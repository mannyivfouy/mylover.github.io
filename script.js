document.addEventListener('DOMContentLoaded', function () {
    // Create floating hearts
    function createHearts() {
        const container = document.getElementById('hearts-container');
        const heartCount = 50;

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('i');
            heart.classList.add('fas', 'fa-heart', 'heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (10 + Math.random() * 30) + 'px';
            heart.style.animationDuration = 2 + Math.random() * 8 + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(heart);
        }
    }

    // Close popup functionality
    document.getElementById('close-btn').addEventListener('click', function () {
        document.getElementById('popup').style.display = 'none';

        // Create more hearts when closing
        createHearts();

        // Reopen popup after 5 seconds
        // setTimeout(() => {
        //     document.getElementById('popup').style.display = 'flex';
        // }, 5000);
    });

    // Initialize
    createHearts();

    // Create new hearts every 3 seconds
    setInterval(() => {
        createHearts();
    }, 3000);
});


document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('floating-container');
    const photoPaths = [
        "images/1.jpg",
        "images/2.jpg",
        "images/3.jpg",
        "images/4.jpg",
        "images/5.jpg",
        "images/6.jpg",
        "images/7.jpg",
        "images/8.jpg",
        "images/9.jpg",
        // Add photo        
    ];

    // function createFloatingElement(isPhoto) {
    //     const element = isPhoto ? document.createElement('img') : document.createElement('i');

    //     if(isPhoto) {
    //         element.classList.add('floating-photo');
    //         element.src = photoPaths[Math.floor(Math.random() * photoPaths.length)];
    //         element.style.width = '130px';  
    //         element.style.height = '130px';
    //         element.style.border = '3px solid white';            
    //     } else {
    //         element.classList.add('fas', 'fa-heart', 'floating-heart');
    //     }

    //     element.style.left = Math.random() * 100 + 'vw';
    //     element.style.animationDuration = (isPhoto ? 8 : 4) + Math.random() * 8 + 's';
    //     element.style.animationDelay = Math.random() * 5 + 's';

    //     // Add slight rotation for photos
    //     if(isPhoto) {
    //         element.style.transformOrigin = 'center';
    //         element.style.animation = `float ${8 + Math.random() * 8}s linear infinite`;
    //     }

    //     container.appendChild(element);

    //     // Remove element after animation completes
    //     setTimeout(() => {
    //         element.remove();
    //     }, 20000);
    // }


    function createFloatingElement(isPhoto) {
        const element = isPhoto ? document.createElement('img') : document.createElement('i');
        const isMobile = window.innerWidth < 768; // Check if mobile device

        if (isPhoto) {
            element.classList.add('floating-photo');
            element.src = photoPaths[Math.floor(Math.random() * photoPaths.length)];

            // Responsive photo sizing
            const photoSize = isMobile ? 80 : 130; // Smaller on mobile
            element.style.width = `${photoSize}px`;
            element.style.height = `${photoSize}px`;
            element.style.border = '3px solid white';
            element.style.borderRadius = isMobile ? '8px' : '50%'; // Less rounded on mobile

            // Error handling
            element.onerror = function () {
                console.error("Failed to load image:", this.src);
                this.remove();
            };
        } else {
            element.classList.add('fas', 'fa-heart', 'floating-heart');
            // Responsive heart sizing
            const heartSize = isMobile ?
                `${10 + Math.random() * 15}px` :  // 10-25px on mobile
                `${15 + Math.random() * 25}px`;   // 15-40px on desktop
            element.style.fontSize = heartSize;
        }

        // Position and animation
        element.style.left = `${Math.random() * 100}vw`;

        // Longer duration on desktop
        const duration = (isPhoto ? 8 : 4) + Math.random() * (isMobile ? 6 : 8);
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${Math.random() * 5}s`;

        // Photo-specific animations
        if (isPhoto) {
            element.style.transformOrigin = 'center';
            const rotation = isMobile ? 180 : 360; // Less rotation on mobile
            element.style.animation = `
            float ${duration}s linear infinite,
            rotate ${duration * 2}s linear infinite
        `;
            element.style.setProperty('--rotation', `${rotation}deg`);
        }

        container.appendChild(element);

        // Cleanup - shorter duration on mobile
        setTimeout(() => element.remove(), isMobile ? 15000 : 20000);
        return element;
    }


    // Create initial elements
    for (let i = 0; i < 30; i++) {
        createFloatingElement(i % 5 === 0);
        if (i % 10 === 0) createFloatingElement(false);
    }

    // Continuous creation
    setInterval(() => {
        createFloatingElement(Math.random() < 0.5); // 20% chance of being a photo
    }, 800);
});
