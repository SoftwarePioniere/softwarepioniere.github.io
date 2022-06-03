lightSchemeIcon = document.querySelector('link#light-scheme-icon');
darkSchemeIcon = document.querySelector('link#dark-scheme-icon');
favicon = document.querySelector('link#favicon');

function onUpdate() {
    if (matcher.matches) {
        favicon.remove();
        lightSchemeIcon.remove();
        document.head.append(darkSchemeIcon);
    } else {
        document.head.append(lightSchemeIcon);
        darkSchemeIcon.remove();
        favicon.remove();
    }
}

matcher = window.matchMedia('(prefers-color-scheme: dark)');
matcher.addListener(onUpdate);
onUpdate();

