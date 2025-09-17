document.addEventListener('pointerover', e => {
    if (e.composedPath().includes(document.querySelector('.sgog-list'))) {
        e.composedPath().find(node => node.tagName === 'LI').querySelector('picture').style.viewTransitionName = 'sgog-single-image';
    }
});

document.addEventListener('pointerout', e => {
    if (e.composedPath().includes(document.querySelector('.sgog-list'))) {
        e.composedPath().find(node => node.tagName === 'LI').querySelector('picture').style.viewTransitionName = null;
    }
});