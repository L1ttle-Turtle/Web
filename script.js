document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("movieTableBody");
  const movies = JSON.parse(localStorage.getItem("movies") || "[]");

  const searchInput = document.querySelector(".search");
  const allMenuItems = document.querySelectorAll(".dropdown-menu li");

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
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <div class="movie-name">
            <img src="${movie.thumb}" alt="${movie.name}" width="60">
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
        <td>${movie.updatedAt}</td>
      `;
      tableBody.appendChild(tr);
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
