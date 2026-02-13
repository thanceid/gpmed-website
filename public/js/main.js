// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Fade-in on scroll (Intersection Observer)
const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach((el) => observer.observe(el));
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// --- Hearing Quiz ---
let quizScore = 0;
let quizCurrentStep = 1;

function quizAnswer(btn) {
  const value = parseInt(btn.dataset.value, 10);
  quizScore += value;

  // Highlight selected
  btn.classList.add('selected');

  // Move to next step after brief delay
  setTimeout(() => {
    const currentStep = document.querySelector('.quiz-step.active');
    currentStep.classList.remove('active');

    quizCurrentStep++;

    if (quizCurrentStep <= 3) {
      const nextStep = document.querySelector(`[data-step="${quizCurrentStep}"]`);
      nextStep.classList.add('active');
    } else {
      showQuizResult();
    }
  }, 300);
}

function showQuizResult() {
  const resultStep = document.querySelector('[data-step="result"]');
  const icon = document.getElementById('quizResultIcon');
  const title = document.getElementById('quizResultTitle');
  const text = document.getElementById('quizResultText');

  if (quizScore <= 1) {
    icon.textContent = '\u2705';
    title.textContent = 'Η ακοή σας φαίνεται καλή!';
    text.textContent = 'Με βάση τις απαντήσεις σας, δεν φαίνεται να υπάρχει σημαντικό πρόβλημα. Ωστόσο, ένας προληπτικός έλεγχος είναι πάντα καλή ιδέα.';
  } else if (quizScore <= 3) {
    icon.textContent = '\u26A0\uFE0F';
    title.textContent = 'Πιθανά σημάδια απώλειας ακοής';
    text.textContent = 'Οι απαντήσεις σας δείχνουν ότι ενδέχεται να υπάρχει κάποια μείωση ακοής. Σας συνιστούμε έναν δωρεάν έλεγχο στο κέντρο μας για ακριβή διάγνωση.';
  } else {
    icon.textContent = '\u2757';
    title.textContent = 'Σας συνιστούμε έλεγχο ακοής';
    text.textContent = 'Οι απαντήσεις σας υποδεικνύουν πιθανή απώλεια ακοής. Μην ανησυχείτε — υπάρχουν εξαιρετικές λύσεις. Κλείστε ένα δωρεάν ραντεβού για εξατομικευμένη αξιολόγηση.';
  }

  resultStep.classList.add('active');
}

function resetQuiz() {
  quizScore = 0;
  quizCurrentStep = 1;

  // Hide all steps
  document.querySelectorAll('.quiz-step').forEach(step => {
    step.classList.remove('active');
  });

  // Clear selections
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.classList.remove('selected');
  });

  // Show first step
  document.querySelector('[data-step="1"]').classList.add('active');
}
