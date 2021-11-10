/* eslint-disable no-undef */
window.PluginDarkMode = {
    /**
     * The function defined as the onready callback within the plugin configuration.
     */
    init: function() {
        const $button = document.createRange().createContextualFragment('<button id="ToggleDarkMode" class="pl-c-button pl-c-button--medium pl-c-button--icon-only" onClick="PluginDarkMode.toggleDarkMode();"><span class="pl-c-button__icon"><svg class="c-icon c-icon--settings c-icon--auto" viewBox="0 0 24 24"><use xlink:href="#theme-dark"></use></svg></span></button>');
        function addDarkMode() {
            const $nav = document.querySelector('.pl-c-tools');
            $nav.prepend($button);
            document.querySelector('iframe').onload = function() {
                PluginDarkMode.setDarkMode(PluginDarkMode.state)
            }
        }

        // workaround to try recovering from load order race conditions
        if (window.patternlab && window.patternlab.panels) {
            addDarkMode();
        } else {
            document.addEventListener('patternLab.pageLoad', addDarkMode);
        }
    },
    getiFrame: function() {
        const $iframe = document.querySelector('iframe');
        return $iframe.contentDocument || $iframe.contentWindow.document;
    },
    getClassName: function() {
        return window?.config?.plugins["patternlab-plugin-darkmode"]?.options?.className || 'dark-mode';
    },
    getTargetElement: function() {
        return window?.config?.plugins["patternlab-plugin-darkmode"]?.options?.targetElement || 'body';
    },
    toggleDarkMode: function() {
        const $container = this.getiFrame().querySelector(this.getTargetElement());
        $container.classList.toggle(this.getClassName());
        $container.classList.contains(this.getClassName()) ? this.setState(true) : this.setState(false);
    },
    setDarkMode: function(mode) {
        const $el = this.getTargetElement();
        const $body = this.getiFrame().querySelector($el);
        mode ? $body.classList.add(this.getClassName()) : $body.classList.remove(this.getClassName());
        this.setState(mode);
    },
    setState: function(mode) {
        PluginDarkMode.state = mode;
        const icon = this.state ? '#theme-light' : '#theme-dark';
        document.getElementById('ToggleDarkMode').querySelector('svg use').setAttribute('href', icon);
    },
    state: false,
};