document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("movieTableBody");
  const searchInput = document.querySelector(".search");
  const allMenuItems = document.querySelectorAll(".dropdown-menu li");
  const movies = JSON.parse(localStorage.getItem("movies") || "[]");

  displayMovies(movies);

  // Click vào dropdown menu để lọc
  allMenuItems.forEach(item => {
    item.addEventListener("click", function () {
      const type = item.dataset.filterType;
      const value = item.dataset.filterValue;
      filterMovies(type, value);
    });
  });

  // Tìm kiếm tên phim
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const keyword = searchInput.value.trim().toLowerCase();
      const filtered = movies.filter(m =>
        m.name.toLowerCase().includes(keyword) ||
        (m.name_en || "").toLowerCase().includes(keyword)
      );
      displayMovies(filtered);
    });
  }

  function displayMovies(list) {
    tableBody.innerHTML = "";

    list.forEach((movie) => {
      const isFavorite = getFavorites().some(fav => fav.id == movie.id);
      const favText = isFavorite ? "💔 Bỏ thích" : "❤️ Yêu thích";

      const tr = document.createElement("tr");
      tr.innerHTML = `
  <td>
    <div class="movie-name">
      <img src="${movie.thumb || 'https://via.placeholder.com/60x90?text=No+Image'}" alt="${movie.name}" width="60">
      <div>
        <div class="movie-name-title">
          <a href="film_watch.html?id=${movie.id}" class="movie-link" style="color: white;">${movie.name}</a>
        </div>
        <div class="movie-name-sub">${movie.name_en || ""}</div>
      </div>
    </div>
  </td>
  <td><span class="status-label">${movie.status}</span></td>
  <td>${movie.format}</td>
  <td>${movie.year}</td>
  <td>${movie.country}</td>
  <td>
    ${movie.updatedAt}<br/>
    <button class="fav-btn" data-id="${movie.id}">${favText}</button>
  </td>
`;

      tableBody.appendChild(tr);
    });

    document.querySelectorAll(".fav-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;
        toggleFavorite(id);
        displayMovies(JSON.parse(localStorage.getItem("movies") || "[]"));
      });
    });
  }

  function filterMovies(type, value) {
    const filtered = movies.filter(movie => {
      switch (type) {
        case "genre":
          return (movie.genre || "").toLowerCase() === value.toLowerCase();
        case "country":
          return (movie.country || "").toLowerCase() === value.toLowerCase();
        case "year":
          return String(movie.year) === value;
        default:
          return true;
      }
    });

    displayMovies(filtered);
  }
});

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const movies = JSON.parse(localStorage.getItem("movies") || "[]");
  const exists = favorites.find(m => m.id == id);
  if (exists) {
    localStorage.setItem("favorites", JSON.stringify(favorites.filter(m => m.id != id)));
  } else {
    const movie = movies.find(m => m.id == id);
    if (movie) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }
}

window.availableGenres = [
  "Hành Động", "Phiêu Lưu", "Hoạt Hình", "Hài", "Hình Sự", "Tài Liệu", "Chính Kịch", "Gia Đình",
  "Giả Tưởng", "Lịch Sử", "Kinh Dị", "Nhạc", "Bí Ẩn", "Lãng Mạn", "Khoa Học Viễn Tưởng", "Gây Cấn",
  "Chiến Tranh", "Tâm Lý", "Tình Cảm", "Cổ Trang", "Miền Tây"
];

window.availableCountries = [
  "Âu Mỹ", "Anh", "Trung Quốc", "Indonesia", "Việt Nam", "Pháp", "Hồng Kông", "Hàn Quốc",
  "Nhật Bản", "Thái Lan", "Đài Loan", "Nga", "Hà Lan", "Philippines", "Ấn Độ", "Quốc gia khác"
];