// Product Detail Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery Functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const newImageSrc = this.getAttribute('data-image');
            mainImage.src = newImageSrc;
        });
    });
    
    // Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Purchase Function
function purchaseProduct(productName, price) {
    const message = `Purchase Request:\n\nProduct: ${productName}\nPrice: $${price}\n\nPlease contact us on Discord: kjl9 to complete your purchase.`;
    
    // Create a temporary textarea to copy the message
    const textarea = document.createElement('textarea');
    textarea.value = message;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Show confirmation
    alert('Purchase information copied!\n\nPlease paste this message in Discord to complete your purchase:\n\n' + message);
    
    // Optional: Redirect to Discord
    // window.open('https://discord.com', '_blank');
}