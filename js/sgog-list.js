document.addEventListener('pointerdown', e => {
    if (e.composedPath().includes(document.querySelector('.sgog-list'))) {
        e.composedPath().find(node => node.tagName === 'LI').querySelector('picture').style.viewTransitionName = 'sgog-single-image';
    }
});