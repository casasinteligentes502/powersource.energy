(() => {
  'use strict';
  document.documentElement.classList.add('has-js');
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .08, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  const contactForm = document.querySelector('.js-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const recipient = 'powersourceenergy' + '@' + 'yahoo.com';
      const name = (data.get('name') || '').toString().trim();
      const company = (data.get('company') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const interest = (data.get('interest') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      const subjectBase = interest ? `${interest} Inquiry` : 'Project Inquiry';
      const subject = encodeURIComponent(company ? `${subjectBase} - ${company}` : subjectBase);
      const body = encodeURIComponent([
        'PowerSource Energy website inquiry',
        '',
        `Name: ${name}`,
        `Company: ${company || 'N/A'}`,
        `Email: ${email}`,
        `Phone: ${phone || 'N/A'}`,
        `Product Interest: ${interest || 'General Inquiry'}`,
        '',
        'Message:',
        message
      ].join('\n'));
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }

})();
