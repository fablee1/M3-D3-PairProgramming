/*<div class="col-md-4">
<div class="card mb-4 shadow-sm">
  <img src="" class="img-fluid">
  <div class="card-body">
    <p class="card-text">
      This is a wider card with supporting text below as a natural
      lead-in to additional content. This content is a little bit
      longer.
    </p>
    <div
      class="d-flex justify-content-between align-items-center"
    >
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
        >
          View
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
        >
          Edit
        </button>
      </div>
      <small class="text-muted">9 mins</small>
    </div>
  </div>
</div>
</div>*/


fetch("http://www.splashbase.co/api/v1/images/search?query=forest").then(response => response.json())
.then((data) => {
    console.log(data);
    const lastCarousel = document.getElementsByClassName("carousel-inner")[0];
    for (let i = 0; i < data.length; i++) {
      const div = document.createElement("div");
      div.className = "carousel-item";
      const img = document.createElement("img")
      img.className = "d-block w-100"
      img.src = `${data[i].url}`;
      div.appendChild(img)
      lastCarousel.appendChild(div);
      
    }
  });
