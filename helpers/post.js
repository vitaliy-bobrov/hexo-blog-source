const url = require('url');

const postCell = (index, length) => {
  let desktop;
  let tablet;

  if (length < 8 && (index === length - 1 || index === length - 2)) {
    index = index - length;
  }

  switch (index) {
    case 0:
      desktop = 12;
      break;

    case 1:
      desktop = 6;
      break;

    case 2:
      desktop = 6;
      break;

    case 3:
      desktop = 12;
      break;

    case 4:
      desktop = 7;
      break;

    case 5:
      desktop = 5;
      break;

    case 6:
      desktop = 5;
      break;

    case 7:
      desktop = 7;
      break;

    default:
      desktop = 12;
      break;
  }

  return `mdl-cell--${desktop}-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone`;
};

const postIllustration = (tumb, alt) => `
    <picture class="safe-picture">
      <source media="(min-width: 1025px)"
              srcset="${tumb}.webp 1x, ${tumb}@2x.webp 2x"
              type="image/webp">
      <source media="(min-width: 1025px)"
              srcset="${tumb}.jpg 1x, ${tumb}@2x.jpg 2x">
      <source media="(min-width: 768px)"
              srcset="${tumb}-tablet.webp 1x, ${tumb}-tablet@2x.webp 2x"
              type="image/webp">
      <source media="(min-width: 768px)"
              srcset="${tumb}-tablet.jpg 1x, ${tumb}-tablet@2x.jpg 2x">
      <source srcset="${tumb}-mobile.webp 1x, ${tumb}-mobile@2x.webp 2x"
              type="image/webp">
      <source srcset="${tumb}-mobile.jpg 1x, ${tumb}-mobile@2x.jpg 2x">
      <img src="${tumb}.jpg" alt="${alt}" class="safe-picture__img">
    </picture>`;

const postShare = (siteurl, path, id = 0) => {
  let link = url.resolve(siteurl, path);

  return `
    <div class="mdl-card__menu post-share">
      <button id="share-menu-${id}"
              class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect post-share__button"
              title="Share this post">
        <svg class="mdl-svg post-share__icon">
          <use xlink:href="#share"></use>
        </svg>
      </button>
      <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect share-menu"
          for="share-menu-${id}">
        <li class="mdl-menu__item share-menu__item">
          <a href="//twitter.com/home?status=${link}" class="share-menu__link" target="_blank" rel="nofollow">
            <svg class="share-menu__icon">
              <use xlink:href="#twitter"></use>
            </svg>
            Twitter
          </a>
        </li>
        <li class="mdl-menu__item share-menu__item">
          <a href="//www.facebook.com/sharer.php?u=${link}" class="share-menu__link" target="_blank" rel="nofollow">
            <svg class="share-menu__icon">
              <use xlink:href="#facebook"></use>
            </svg>
            Facebook
          </a>
        </li>
      </ul>
    </div>`;
};

module.exports = {
  postCell,
  postIllustration,
  postShare
};
