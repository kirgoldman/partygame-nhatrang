// Ленивая загрузка видео: файл скачивается, только когда ролик попал в экран.
// У <video> вместо src указан data-src; пока ролик не виден, показывается постер.
// Вне экрана видео ставится на паузу, чтобы не качать и не крутить лишнее.
const saveData = !!(navigator as any).connection?.saveData;
const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video[data-src]'));

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
