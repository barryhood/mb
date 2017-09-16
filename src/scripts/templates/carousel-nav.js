export function carouselNav(arr) {
  return ` 
    <div class="wrap carousel__nav-wrapper">
      <div class="carousel__nav">
        ${arr.map((b, i) => `<button class="carousel__nav-item" data-slide=${i}></button>`)}
      </div>
      <button data-carousel-scroll class="carousel__scroll">More</button>
    </div>`;
};
