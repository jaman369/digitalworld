document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.08)';
      header.style.borderBottomColor = 'rgba(0, 0, 0, 0.08)';
    } else {
      header.style.boxShadow = 'none';
      header.style.borderBottomColor = 'rgba(0, 0, 0, 0.05)';
    }
  });

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // --- Active Nav Link Handler ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --- Category Filters (Portfolio & Blog) ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const itemsToFilter = document.querySelectorAll('[data-category]');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-filter');

      // Set active button style
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter items
      itemsToFilter.forEach(item => {
        const itemCategories = item.getAttribute('data-category').split(' ');
        if (category === 'all' || itemCategories.includes(category)) {
          item.style.display = 'flex';
          // Force reflow for fade in transition effect
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- FAQ Accordion Toggle ---
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all items
      document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- Toast Notification helper ---
  function showToast(message, type = 'success') {
    // Create toast container if not exists
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '✓';
    if (type === 'error') icon = '✕';
    
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-msg">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Remove toast after duration
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4000);
  }

  // --- Contact Form Submission Handler ---
  const contactForm = document.getElementById('project-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather input values
      const name = document.getElementById('your-name').value.trim();
      const email = document.getElementById('email-address').value.trim();
      const service = document.getElementById('service-needed').value;
      const goals = document.getElementById('your-goals').value.trim();

      // Basic validation check
      if (!name || !email || !service || !goals) {
        showToast('Please fill out all required fields marked with *', 'error');
        return;
      }

      // Successful simulated submission
      showToast(`Thank you, ${name}! Your inquiry has been sent successfully. We'll be in touch!`);
      contactForm.reset();
    });
  }

  // --- Newsletter Form Submission Handler ---
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const email = emailInput.value.trim();

      if (!email) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      showToast(`Success! You have subscribed to our weekly newsletter.`);
      emailInput.value = '';
    });
  }
});
