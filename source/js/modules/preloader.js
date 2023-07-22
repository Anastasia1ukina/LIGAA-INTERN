import { ScrollLock } from "../utils/scroll-lock";

class Preloader {
  constructor() {
    this.сontainer = document.querySelector('[data-preloader]');

    this.scrollLock = new ScrollLock();
    this.event = new Event('loaderOff');
    this.pageLoaded = false;

    this.off = this.off.bind(this);
    this.hide = this.hide.bind(this);
    this.resize = this.resize.bind(this);

    this.init();
  }

  setAnimation() {
    this.timeline = gsap.timeline({
      repeat: -1,
      onRepeat: this.hide,
    });
    this.timeline.addLabel('start');
    this.timeline.to('[data-preloader-box]', { y: -window.innerHeight / 2, scale: 1.3, duration: 0.8, ease: 'power1.out' }, 'start');
    this.timeline.addLabel('boxOnTop');
    this.timeline.to('[data-preloader-box]', { rotate: 360, duration: 1.6, ease: 'slow(0.1, 2, true)' }, 'start');
    this.timeline.to('[data-preloader-box]', { y: 0, scale: 1, duration: 0.8, ease: 'power1.in' }, 'boxOnTop');
  }

  hide() {
    if (!this.pageLoaded) {
      return;
    }

    this.timeline.pause();
    const timeline = gsap.timeline();
    timeline.to('[data-preloader-box]', { y: window.innerHeight / 2, scale: 0.5, duration: 0.5, ease: 'power1.out' });
    timeline
      .then(() => this.сontainer.classList.add('is-hidden'))
      .then(this.showPage)
      .then(this.off);
  }

  showPage() {
    const timeline = gsap.timeline();
    timeline.to('[data-intro-title] span', { y: 0, ease: 'back.out(2)', duration: 0.5, stagger: { amount: 0.5 } });
    return timeline;
  }

  resize() {
    this.timeline.seek(0).kill();
    this.setAnimation();
  }

  on() {
    // this.scrollLock.disableScrolling();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(document.documentElement);

    if (this.сontainer) {
      this.setAnimation();
      window.addEventListener('load', () => {
        this.pageLoaded = true;
      });
    } else {
      window.addEventListener('load', this.off);
    }
  }

  off() {
    this.pageLoaded = true;
    // this.scrollLock.enableScrolling();
    this.resizeObserver.unobserve(document.documentElement);
    window.dispatchEvent(this.event);
  }

  init() {
    window.scrollTo(0, 0);
    this.on();
  }
}

new Preloader();

window.addEventListener('loaderOff', () => {
  console.log('loader off');
  // тут все скрипты, что должны запуститься после снятия лоадера
});
