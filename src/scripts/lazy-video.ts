// Ленивая загрузка видео: файл скачивается, только когда ролик попал в экран.
// У <video> вместо src указан data-src; пока ролик не виден, показывается постер.
// Вне экрана видео ставится на паузу, чтобы не качать и не крутить лишнее.
const saveData = !!(navigator as any).connection?.saveData;
const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video[data-src]'));

// Постеры видео подставляем заранее, но только когда ролик приближается к экрану (запас 600px, чтобы постер уже был на месте).
// Так картинки ниже первого экрана не отнимают канал у главного изображения страницы.
const setPoster = (v: HTMLVideoElement) => {
  if (v.dataset.poster && !v.getAttribute('poster')) v.setAttribute('poster', v.dataset.poster);
};
if ('IntersectionObserver' in window) {
  const posterIo = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        setPoster(e.target as HTMLVideoElement);
        posterIo.unobserve(e.target);
      }),
    { rootMargin: '600px' },
  );
  videos.forEach((v) => posterIo.observe(v));
} else {
  videos.forEach(setPoster);
}
// Ролики в горизонтальных каруселях лежат за краем контейнера и наблюдателем «не видны» до свайпа.
// Чтобы при свайпе не было пустых плиток, остальные постеры подгружаем, когда страница уже загрузилась и браузер свободен.
if (!saveData) {
  const setAll = () => videos.forEach(setPoster);
  const afterLoad = () => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(setAll, { timeout: 3000 }) : setTimeout(setAll, 1500));
  if (document.readyState === 'complete') afterLoad();
  else window.addEventListener('load', afterLoad, { once: true });
}

const start = (v: HTMLVideoElement) => {
  if (!v.getAttribute('src')) {
    v.src = v.dataset.src!;
    v.load();
  }
  v.play().catch(() => {});
};

if (!saveData && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) start(v);
        else if (v.getAttribute('src')) v.pause();
      }),
    { rootMargin: '200px 0px', threshold: 0.01 },
  );
  videos.forEach((v) => io.observe(v));
}
// При экономии трафика или без IntersectionObserver остаётся постер:
// видео запускается кликом (окно просмотра или кнопка звука) и грузится только тогда.
videos.forEach((v) => {
  v.addEventListener('click', () => start(v));
});
