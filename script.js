document.addEventListener("DOMContentLoaded", () => {
  renderYearDropdown();
  displayMovies();

  document.getElementById("addMovieBtn").addEventListener("click", (e) => {
    e.preventDefault();
    showAddForm();
  });

  document.getElementById("homeLink").addEventListener("click", (e) => {
    e.preventDefault();
    showHome();
  });

  document.addEventListener("change", (e) => {
    if (e.target.id === "formatSelect" && e.target.value === "Phim lẻ") {
      const statusInput = document.getElementById("statusInput");
      if (statusInput) statusInput.value = "FULL";
    }
  });
});

function renderYearDropdown() {
  const yearContent = document.getElementById("yearContent");
  for (let y = 2000; y <= 2025; y++) {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = y;
    yearContent.appendChild(link);
  }
}

function getMovies() {
  return JSON.parse(localStorage.getItem("movies")) || [];
}

function saveMovies(movies) {
  localStorage.setItem("movies", JSON.stringify(movies));
}

function generateCountryOptions(selected = "") {
  const items = document.querySelectorAll("#nationContent a");
  let options = "";
  items?.forEach(item => {
    const value = item.textContent.trim();
    const isSelected = value === selected ? "selected" : "";
    options += `<option value="${value}" ${isSelected}>${value}</option>`;
  });
  return options;
}

function generateGenreOptions(selected = "") {
  const items = document.querySelectorAll("#genreContent a");
  let options = "";
  items?.forEach(item => {
    const value = item.textContent.trim();
    const isSelected = value === selected ? "selected" : "";
    options += `<option value="${value}" ${isSelected}>${value}</option>`;
  });
  return options;
}

function displayMovies() {
  const list = document.getElementById("movie-list");
  const countTotal = document.getElementById("count-total");
  const countToday = document.getElementById("count-today");
  const movies = getMovies();
  const today = new Date().toISOString().slice(0, 10);

  list.innerHTML = "";

  movies.forEach((movie, index) => {
    const div = document.createElement("div");
    div.className = "movie-card";
    div.innerHTML = `
      <img src="${movie.thumbnail}" />
      <div class="movie-info">
        <h3>${movie.name}</h3>
        <p>Trạng thái: ${movie.status}</p>
        <p>Định dạng: ${movie.format}</p>
        <p>Thể loại: ${movie.genre}</p>
        <p>Năm: ${movie.year}</p>
        <p>Quốc gia: ${movie.country}</p>
        <p>Ngày cập nhật: ${movie.updateDate}</p>
        <div class="movie-actions">
          <button onclick="editMovie(${index})">Sửa</button>
          <button onclick="deleteMovie(${index})">Xoá</button>
        </div>
      </div>`;
    list.appendChild(div);
  });

  countTotal.textContent = movies.length;
  countToday.textContent = movies.filter(m => m.updateDate === today).length;
}

function showAddForm() {
  const main = document.getElementById("main-content");
  const today = new Date().toISOString().slice(0, 10);
  const countryOptions = generateCountryOptions();
  const genreOptions = generateGenreOptions();

  main.innerHTML = `
    <h2>Thêm phim mới</h2>
    <form id="add-form" class="movie-form">
      <input placeholder="Tên phim" required />
      <input type="file" accept="image/*" id="thumbnailFile" required />
      <input placeholder="Trạng thái (VD: 12/12)" id="statusInput" required />
      <select id="formatSelect" required>
        <option value="">--Chọn định dạng--</option>
        <option value="Phim lẻ">Phim lẻ</option>
        <option value="Phim bộ">Phim bộ</option>
      </select>
      <select id="genreSelect" required>
        <option value="">--Chọn thể loại--</option>
        ${genreOptions}
      </select>
      <input type="number" placeholder="Năm" required value="2025" />
      <select id="countrySelect" required>
        <option value="">--Chọn quốc gia--</option>
        ${countryOptions}
      </select>
      <input value="${today}" readonly />
      <div id="episodeLinks"></div>
      <button type="submit">Lưu phim</button>
    </form>
  `;

  const statusInput = document.getElementById("statusInput");
  const episodeLinksDiv = document.getElementById("episodeLinks");
  statusInput.addEventListener("input", () => {
    const parts = statusInput.value.split("/");
    if (parts.length === 2 && !isNaN(parts[1])) {
      const total = parseInt(parts[1]);
      episodeLinksDiv.innerHTML = "";
      for (let i = 0; i < total; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "episode-link";
        input.placeholder = `Link tập ${i + 1}`;
        episodeLinksDiv.appendChild(input);
      }
    }
  });

  const form = document.getElementById("add-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll("input, select");
    const name = inputs[0].value.trim();
    const file = document.getElementById('thumbnailFile').files[0];

    if (!file) return alert("Vui lòng chọn ảnh thumbnail.");

    const reader = new FileReader();
    reader.onload = () => {
      const thumbnail = reader.result;
      const status = inputs[2].value.trim();
      const format = inputs[3].value.trim();
      const genre = inputs[4].value.trim();
      const year = inputs[5].value.trim();
      const country = inputs[6].value.trim();
      const updateDate = inputs[7].value.trim();
      const linkInputs = document.querySelectorAll(".episode-link");
      const links = Array.from(linkInputs).map(input => input.value.trim());

      const movies = getMovies();
      movies.push({ name, thumbnail, status, format, genre, year, country, updateDate, links });
      saveMovies(movies);
      alert("Đã thêm phim!");
      showHome();
    };
    reader.readAsDataURL(file);
  });
}

function editMovie(index) {
  const movies = getMovies();
  const movie = movies[index];
  const today = new Date().toISOString().slice(0, 10);
  const countryOptions = generateCountryOptions(movie.country);
  const genreOptions = generateGenreOptions(movie.genre);
  const main = document.getElementById("main-content");

  main.innerHTML = `
    <h2>Sửa phim</h2>
    <form id="edit-form" class="movie-form">
      <input value="${movie.name}" required />
      <input type="file" accept="image/*" id="editThumbnailFile" />
      <input value="${movie.status}" id="statusInput" required />
      <select id="formatSelect" required>
        <option value="Phim lẻ" ${movie.format === "Phim lẻ" ? "selected" : ""}>Phim lẻ</option>
        <option value="Phim bộ" ${movie.format === "Phim bộ" ? "selected" : ""}>Phim bộ</option>
      </select>
      <select id="genreSelect" required>
        <option value="">--Chọn thể loại--</option>
        ${genreOptions}
      </select>
      <input type="number" value="${movie.year}" required />
      <select id="countrySelect" required>
        <option value="">--Chọn quốc gia--</option>
        ${countryOptions}
      </select>
      <input value="${today}" readonly />
      <div id="episodeLinks"></div>
      <div class="movie-actions">
        <button type="submit">Cập nhật</button>
        <button type="button" id="cancelEdit">Huỷ</button>
      </div>
    </form>
  `;

  const statusInput = document.getElementById("statusInput");
  const episodeLinksDiv = document.getElementById("episodeLinks");

  const populateEpisodeInputs = () => {
    const parts = statusInput.value.split("/");
    if (parts.length === 2 && !isNaN(parts[1])) {
      const total = parseInt(parts[1]);
      episodeLinksDiv.innerHTML = "";
      for (let i = 0; i < total; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "episode-link";
        input.placeholder = `Link tập ${i + 1}`;
        input.value = movie.links?.[i] || "";
        episodeLinksDiv.appendChild(input);
      }
    }
  };

  statusInput.addEventListener("input", populateEpisodeInputs);
  populateEpisodeInputs();

  document.getElementById("cancelEdit").addEventListener("click", showHome);

  const form = document.getElementById("edit-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll("input, select");
    const name = inputs[0].value.trim();
    const file = document.getElementById("editThumbnailFile").files[0];
    const status = inputs[2].value.trim();
    const format = inputs[3].value.trim();
    const genre = inputs[4].value.trim();
    const year = inputs[5].value.trim();
    const country = inputs[6].value.trim();
    const updateDate = today;
    const linkInputs = document.querySelectorAll(".episode-link");
    const links = Array.from(linkInputs).map(input => input.value.trim());

    const updateMovie = (thumbnail) => {
      movies[index] = { name, thumbnail, status, format, genre, year, country, updateDate, links };
      saveMovies(movies);
      alert("Đã cập nhật!");
      showHome();
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => updateMovie(reader.result);
      reader.readAsDataURL(file);
    } else {
      updateMovie(movie.thumbnail);
    }
  });
}

function deleteMovie(index) {
  const movies = getMovies();
  if (confirm("Xoá phim này?")) {
    movies.splice(index, 1);
    saveMovies(movies);
    displayMovies();
  }
}

function showHome() {
  document.getElementById("main-content").innerHTML = `
    <h1 style="padding: 2rem;">Nội dung trang web</h1>
    <div id="movie-list" class="movie-list"></div>
  `;
  displayMovies();
}