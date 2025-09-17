import { registerFunctionComponent } from 'https://cdn.skypack.dev/webact';

function CoCoen () {
  const { html, css, postRender, $ } = this;
  
  html`
    <slot></slot>
    <figure part="marker"></figure>
  `;

  css`
    :host {
      position: relative;
      display: block;
      width: 100%;
      user-select: none;
      cursor: col-resize;
      overflow: hidden;
    }

    ::slotted(picture),
    ::slotted(img) {
      display: block;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      pointer-events: none;
    }
    
    ::slotted(picture:last-child),
    ::slotted(img:last-child) {
      clip-path: polygon(var(--x-pos) 0%, 100% 0%, 100% 100%, var(--x-pos) 100%);
    }
    
    figure {
      contain: strict;
      all: unset;
      position: absolute;
      top: 0;
      left: var(--x-pos);
      bottom: 0;
      width: 5px;
      color: white;
      background-color: currentColor;
      z-index: 1;
      transform-box: view-box;
      transform: translateX(-50%);
    }
  `;
  
  function cutImage (percent) {
    const xPos = Math.floor(percent * 100);
    
    requestAnimationFrame(() => {
      $().style.setProperty('--x-pos', xPos + '%');
    });
  }
  
  function clickHandler (event) {
    const x = event.offsetX;
    const componentWidth = $().offsetWidth;
    const percent = x / componentWidth;
    
    cutImage(percent);
  }
  
  function getLastImage () {
    const slottedImages = $('slot').assignedNodes()
      .filter(node => node instanceof HTMLImageElement);
    
    return slottedImages.pop();
  }
  
  function imageLoad () {
    const lastImage = getLastImage();
    
    return new Promise(resolve => {
      if (lastImage.complete) {
        resolve(lastImage);
      } else {
        lastImage.addEventListener('load', () => resolve(lastImage), false);
      }
    });
  }
  
  async function updateComponentHeight () {
    const lastImage = await imageLoad();
    
    $().style.aspectRatio = `${lastImage.naturalWidth} / ${lastImage.naturalHeight}`;
  }
  
  postRender(() => {
    const self = $();
    
    self.addEventListener('pointerup', e => clickHandler(e), { passive: true });
    self.addEventListener('pointermove', e => {
      console.log(e);
      if (e.pressure > 0) {
        clickHandler(e);
      }
    }, { passive: true });
    
    cutImage(0.5);
    updateComponentHeight();
  });
}

registerFunctionComponent(CoCoen);
