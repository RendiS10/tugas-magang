// Fungsi untuk scroll ke atas
const goToTop = () => {
  location.href = "#header";
};

// Animasi pada scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.profil, .program, .informasi, .topik, .media');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(element => {
    observer.observe(element);
  });
};

document.addEventListener('DOMContentLoaded', animateOnScroll);

// Kontrol musik latar
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    backgroundMusic.pause();
    musicToggle.classList.remove('playing');
  } else {
    backgroundMusic.play();
    musicToggle.classList.add('playing');
  }
  isPlaying = !isPlaying;
});

// Smooth scroll
function smoothScroll(target, duration) {
  var target = document.querySelector(target);
  var targetPosition = target.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

var topButton = document.getElementById('topButton');
topButton.addEventListener('click', function(e) {
  e.preventDefault();
  smoothScroll('body', 1000);
});

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    topButton.style.display = 'flex';
  } else {
    topButton.style.display = 'none';
  }
});

// Smooth scroll untuk link internal
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    document.body.classList.add('scrolling');
    
    setTimeout(() => {
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }, 10);

    setTimeout(() => {
      document.body.classList.remove('scrolling');
    }, 1000);
  });
});

// Fungsi untuk slideshow di bagian Galeri Foto dan Video
let slideIndex = 1;
showSlides(slideIndex, 'topik');

function plusSlides(n) {
  showSlides(slideIndex += n, 'topik');
}

function currentSlide(n) {
  showSlides(slideIndex = n, 'topik');
}

function showSlides(n, className) {
  let i;
  let slides = document.querySelector('.' + className).getElementsByClassName("mySlides");
  let dots = document.querySelector('.' + className).getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Fungsi untuk slideshow di bagian Galeri dan Video
let slideIndexMedia = 1;
showSlidesMedia(slideIndexMedia, 'media');

function plusSlidesMedia(n) {
  showSlidesMedia(slideIndexMedia += n, 'media');
}

function currentSlideMedia(n) {
  showSlidesMedia(slideIndexMedia = n, 'media');
}

function showSlidesMedia(n, className) {
  let i;
  let slides = document.querySelector('.' + className).getElementsByClassName("mySlides");
  let dots = document.querySelector('.' + className).getElementsByClassName("dot");
  if (n > slides.length) {slideIndexMedia = 1}
  if (n < 1) {slideIndexMedia = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndexMedia-1].style.display = "block";
  dots[slideIndexMedia-1].className += " active";
}

// Data jadwal (bisa dipindahkan ke file JSON terpisah jika diperlukan)
const jadwalKelas = [
  { kelas: "Kelas Sharaf 1", hari: "Sabtu", jam: "13.00 - 15.00" },
  { kelas: "Kelas Sharaf 1", hari: "Sabtu", jam: "16.20 - 18.20" },
  { kelas: "Kelas Sharaf 2", hari: "Minggu", jam: "13.00 - 15.00" },
  { kelas: "Kelas Sharaf 2", hari: "Minggu", jam: "16.20 - 18.20" },
  { kelas: "Kelas Sharaf 3", hari: "Sabtu", jam: "13.00 - 15.00" },
  { kelas: "Kelas Sharaf 3", hari: "Sabtu", jam: "16.20 - 18.20" },
  { kelas: "Kelas Nahwu 1", hari: "Sabtu", jam: "13.00 - 15.00" },
  { kelas: "Kelas Nahwu 1", hari: "Sabtu", jam: "16.20 - 18.20" },
  { kelas: "Kelas Nahwu 1", hari: "Minggu", jam: "13.00 - 15.00" },
  { kelas: "Kelas Nahwu 1", hari: "Minggu", jam: "16.20 - 18.20" },
  { kelas: "Kelas Nahwu 2", hari: "Sabtu", jam: "13.00 - 15.00" },
  { kelas: "Kelas Nahwu 2", hari: "Sabtu", jam: "16.20 - 18.20" },
  { kelas: "Kelas Nahwu 2", hari: "Minggu", jam: "13.00 - 15.00" },
  { kelas: "Kelas Nahwu 2", hari: "Minggu", jam: "16.20 - 18.20" },
  { kelas: "Kelas Diskusi", hari: "Minggu", jam: "19.30 - 21.30" }
];

// Fungsi untuk menampilkan jadwal
function tampilkanJadwal(filter = 'semua') {
  const jadwalBody = document.getElementById('jadwalBody');
  jadwalBody.innerHTML = '';

  jadwalKelas.forEach(jadwal => {
    if (filter === 'semua' || jadwal.kelas.includes(filter)) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${jadwal.kelas}</td>
        <td>${jadwal.hari}</td>
        <td>${jadwal.jam}</td>
      `;
      jadwalBody.appendChild(row);
    }
  });
}

// Event listener untuk perubahan pada select
document.getElementById('kelasFilter').addEventListener('change', function() {
  tampilkanJadwal(this.value);
});

// Tampilkan semua jadwal saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  tampilkanJadwal();
});