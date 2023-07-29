

// Generate a random access token
function generateAccessToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength = 16;
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  }
  
  // Check if the user is logged in and redirect accordingly
  const user = JSON.parse(localStorage.getItem('user'));
  const logoutButton = document.getElementById('logout-btn');
  
  if (user && user.accessToken) {
    // User is logged in, show the profile page
    const profileDetailsElement = document.getElementById('profile-details');
    profileDetailsElement.innerHTML = `
    <p><strong>Your name:</strong> ${user.yourname}</p>
           <p><strong>Your email:</strong> ${user.youremail}</p>
           <p><strong>Password:</strong> ${user.password}</p>
          <p><strong>Confirm Password:</strong> ${user.confirmpassword}</p>
    `;
  
    // Logout functionality
    logoutButton.addEventListener('click', function () {
      // Clear user details from local storage and redirect to the signup page
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    });
  } else {
    // User is not logged in, show the signup page
    const signupForm = document.getElementById('signup-form');
    const messageElement = document.getElementById('message');
  
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Get form data
      const formData = new FormData(signupForm);
      const userDetails = {
        // firstName: formData.get('firstName'),
        // lastName: formData.get('lastName'),
        // email: formData.get('email'),
        // yourname: formData.get('yourname'),
                yourname: formData.get('yourname'),
                youremail: formData.get('youremail'),
                password: formData.get('password'),
                confirmpassword : formData.get('confirmpassword')
        // Add other necessary user details from the form
      };
       
    //   if (!userDetails.yourname || !userDetails.youremail || !userDetails.password || userDetails.confirmpassword) {
    //     messageElement.textContent = 'Error: All fields are mandatory';
    //     return;
    //   }


      // Generate access token
      userDetails.accessToken = generateAccessToken();
  
      // Store user details in local storage
      localStorage.setItem('user', JSON.stringify(userDetails));
  
      // Show success message and redirect to profile page
      messageElement.textContent = 'Signup successful!';
      setTimeout(function () {
        window.location.href = 'profile.html';
      }, 1500);
    });
  }
  