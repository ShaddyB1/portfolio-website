// Direct modal button handlers
document.addEventListener("DOMContentLoaded", function() {
    console.log("Modal handlers loaded");
    
    // Setup demo buttons 
    var aiBtn = document.getElementById("aiModalBtn");
    if (aiBtn) {
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
    }
    
    var cryptoBtn = document.getElementById("cryptoModalBtn");
    if (cryptoBtn) {
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
    }
    
    var eegBtn = document.getElementById("eegModalBtn");
    if (eegBtn) {
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
    }
    
    var cxBtn = document.getElementById("cxAnalyticsModalBtn");
    if (cxBtn) {
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
}); 

// Global function to close modals (used by onclick attributes)
function closeModal(modalId) {
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