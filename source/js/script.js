(function ($) {
  ('use strict');

  // Background-images
  $('[data-background]').each(function () {
    $(this).css({
      'background-image': 'url(' + $(this).data('background') + ')'
    });
  });

  // background color
  $('[data-color]').each(function () {
    $(this).css({
      'background-color': $(this).data('color')
    });
  });

  // progress bar
  $('[data-progress]').each(function () {
    $(this).css({
      bottom: $(this).data('progress')
    });
  });

  // Sticky Menu
  $(window).scroll(function () {
    if ($('.navigation').offset().top > 100) {
      $('.navigation').addClass('nav-bg');
    } else {
      $('.navigation').removeClass('nav-bg');
    }
  });
})(jQuery);

// Add this to your script.js file
$(document).ready(function () {
  // Smooth scrolling for navigation links
  $('a[href^="#"]').on('click', function (event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 70 // Adjust for fixed header
          },
          1000
        );
    }
  });

  let navbar = document.getElementById('navbar');
  let lastScrollTop = 0;
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    clearTimeout(scrollTimeout);

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      navbar.style.top = '-550px'; // Adjust based on navbar height
    } else {
      // Scrolling up
      navbar.style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

    scrollTimeout = setTimeout(() => {
      navbar.style.top = '0';
    }, 800);
  });

  // Add active class to navigation items on scroll
  $(window)
    .scroll(function () {
      var scrollDistance = $(window).scrollTop();
      $('section').each(function (i) {
        if ($(this).position().top <= scrollDistance + 100) {
          $('.navbar-nav a.active').removeClass('active');
          $('.navbar-nav a').eq(i).addClass('active');
        }
      });
    })
    .scroll();
// handle form submission
    document.addEventListener('DOMContentLoaded', function () {
      const form = document.getElementById('contact-form');
      const formMessage = document.getElementById('form-message');

      form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('/send', {
          method: 'POST',
          body: new URLSearchParams(formData)
        })
          .then((response) => response.text())
          .then((data) => {
            if (data === 'success') {
              formMessage.innerHTML =
                "<p class='text-success'>Your email has been sent successfully!</p>";
              form.reset();
            } else {
              formMessage.innerHTML =
                "<p class='text-danger'>There was an error sending your email. Please try again later.</p>";
            }
          })
          .catch((error) => {
            formMessage.innerHTML =
              "<p class='text-danger'>There was an error sending your email. Please try again later.</p>";
          });
      });
    });
});
