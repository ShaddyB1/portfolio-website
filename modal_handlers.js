// Direct modal button handlers
document.addEventListener("DOMContentLoaded", function() {
    console.log("Modal handlers loaded");
    
    // Wait a short time to ensure the DOM is fully loaded and rendered
    setTimeout(function() {
        setupModalButtons();
    }, 100);
});

function setupModalButtons() {
    // Setup demo buttons 
    var aiBtn = document.getElementById("aiModalBtn");
    if (aiBtn) {
        console.log("AI Modal button found");
        aiBtn.addEventListener("click", function() {
            console.log("Opening AI modal");
            var modal = document.getElementById("aiModal");
            if (modal) {
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
            } else {
                console.error("AI Modal not found");
            }
        });
    } else {
        console.error("AI Modal button not found");
        // Try to find by class instead
        var aiButtons = document.querySelectorAll(".demo-btn");
        aiButtons.forEach(function(btn) {
            if (btn.innerHTML.includes("Demo") && btn.closest(".project-card") && 
                btn.closest(".project-card").querySelector(".project-title").textContent.includes("AI")) {
                console.log("Found AI button by content");
                btn.addEventListener("click", function() {
                    openModal("aiModal");
                });
            }
        });
    }
    
    var cryptoBtn = document.getElementById("cryptoModalBtn");
    if (cryptoBtn) {
        console.log("Crypto Modal button found");
        cryptoBtn.addEventListener("click", function() {
            console.log("Opening Crypto modal");
            var modal = document.getElementById("cryptoModal");
            if (modal) {
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
            } else {
                console.error("Crypto Modal not found");
            }
        });
    } else {
        console.error("Crypto Modal button not found");
        // Try to find by class instead
        var cryptoButtons = document.querySelectorAll(".demo-btn");
        cryptoButtons.forEach(function(btn) {
            if (btn.innerHTML.includes("Demo") && btn.closest(".project-card") && 
                btn.closest(".project-card").querySelector(".project-title").textContent.includes("Crypto")) {
                console.log("Found Crypto button by content");
                btn.addEventListener("click", function() {
                    openModal("cryptoModal");
                });
            }
        });
    }
    
    var eegBtn = document.getElementById("eegModalBtn");
    if (eegBtn) {
        console.log("EEG Modal button found");
        eegBtn.addEventListener("click", function() {
            console.log("Opening EEG modal");
            var modal = document.getElementById("eegModal");
            if (modal) {
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                
                // Initialize EEG demo
                if (typeof initializeEEGDemo === 'function' && typeof startEEGDemo === 'function') {
                    try {
                        initializeEEGDemo();
                        startEEGDemo();
                    } catch(e) {
                        console.error("Error starting EEG demo:", e);
                    }
                } else {
                    console.error("EEG demo functions not found");
                }
            } else {
                console.error("EEG Modal not found");
            }
        });
    } else {
        console.error("EEG Modal button not found");
        // Try to find by class instead
        var eegButtons = document.querySelectorAll(".demo-btn");
        eegButtons.forEach(function(btn) {
            if (btn.innerHTML.includes("Demo") && btn.closest(".project-card") && 
                btn.closest(".project-card").querySelector(".project-title").textContent.includes("EEG")) {
                console.log("Found EEG button by content");
                btn.addEventListener("click", function() {
                    var modal = document.getElementById("eegModal");
                    if (modal) {
                        modal.style.display = "block";
                        document.body.style.overflow = "hidden";
                        
                        // Initialize EEG demo
                        if (typeof initializeEEGDemo === 'function' && typeof startEEGDemo === 'function') {
                            try {
                                initializeEEGDemo();
                                startEEGDemo();
                            } catch(e) {
                                console.error("Error starting EEG demo:", e);
                            }
                        }
                    }
                });
            }
        });
    }
    
    var cxBtn = document.getElementById("cxAnalyticsModalBtn");
    if (cxBtn) {
        console.log("CX Analytics Modal button found");
        cxBtn.addEventListener("click", function() {
            console.log("Opening CX Analytics modal");
            var modal = document.getElementById("cxAnalyticsModal");
            if (modal) {
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
            } else {
                console.error("CX Analytics Modal not found");
            }
        });
    } else {
        console.error("CX Analytics Modal button not found");
        // Try to find by class instead
        var cxButtons = document.querySelectorAll(".demo-btn");
        cxButtons.forEach(function(btn) {
            if (btn.innerHTML.includes("Demo") && btn.closest(".project-card") && 
                btn.closest(".project-card").querySelector(".project-title").textContent.includes("Customer")) {
                console.log("Found CX Analytics button by content");
                btn.addEventListener("click", function() {
                    openModal("cxAnalyticsModal");
                });
            }
        });
    }
    
    // Setup close buttons
    document.querySelectorAll(".close-modal").forEach(function(closeBtn) {
        closeBtn.addEventListener("click", function() {
            console.log("Close button clicked");
            var modal = this.closest(".modal");
            if (modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
                
                // Stop EEG demo if closing that modal
                if (modal.id === "eegModal" && typeof stopEEGDemo === 'function') {
                    try {
                        stopEEGDemo();
                    } catch(e) {
                        console.error("Error stopping EEG demo:", e);
                    }
                }
            }
        });
    });
    
    // Close when clicking outside modal
    window.addEventListener("click", function(event) {
        if (event.target.classList.contains("modal")) {
            console.log("Modal background clicked");
            event.target.style.display = "none";
            document.body.style.overflow = "auto";
            
            // Stop EEG demo if closing that modal
            if (event.target.id === "eegModal" && typeof stopEEGDemo === 'function') {
                try {
                    stopEEGDemo();
                } catch(e) {
                    console.error("Error stopping EEG demo:", e);
                }
            }
        }
    });
    
    console.log("Modal handlers setup complete");
}

// Function to open a modal by ID - accessible globally
window.openModal = function(modalId) {
    console.log("openModal function called for:", modalId);
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        
        // Initialize EEG demo if opening that modal
        if (modalId === "eegModal" && typeof initializeEEGDemo === 'function' && typeof startEEGDemo === 'function') {
            try {
                initializeEEGDemo();
                startEEGDemo();
            } catch(e) {
                console.error("Error starting EEG demo:", e);
            }
        }
    } else {
        console.error("Modal not found:", modalId);
    }
}

// Global function to close modals (used by onclick attributes)
window.closeModal = function(modalId) {
    console.log("closeModal function called for:", modalId);
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        
        // Stop EEG demo if closing that modal
        if (modalId === "eegModal" && typeof stopEEGDemo === 'function') {
            try {
                stopEEGDemo();
            } catch(e) {
                console.error("Error stopping EEG demo:", e);
            }
        }
    } else {
        console.error("Modal not found:", modalId);
    }
} 