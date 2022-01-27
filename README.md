# Darkmode Plugin for Pattern Lab Node

Do you ever build your components with a light and dark theme, to use depending on a user's prefers-color-scheme or a dynamically set class, or just want to toggle between how components would look in two themes you're developing? I found this difficult to do with Pattern Lab, so I added a button to the left of the configuration button that would toggle a dark mode class on a top level element across my entire pattern library.

The configuration options are easy, but should be versatile enough to use with most CSS frameworks, including TailwindCSS.

## Installation



To add the UI Extension Plugin to your project using [npm](https://www.npmjs.com/) type:

    npm install patternlab-plugin-darkmode --save

Or add it directly to your project's `package.json` file and run `npm install`

> As far as I can tell, the next big of functionality is no longer supported by Pattern Lab, or at least I couldn't get it to work with any plugins I tried. I'm leaving it here for legacy purposes.

During installation, the plugin is added as a key to the `plugins` object in your main Pattern Lab project's `patternlab-config.json` file

> If you don't see this object, manually add it as per the example below.

## Configuration

Post-installation, you will see the following in your `patternlab-config.json`:

Example:

``` json
"plugins": {
  "patternlab-plugin-darkmode": {
    "enabled": true,
    "initialized": false,
    "options": {
      "className": "dark-mode",
      "targetElement": "body"
    }
  }
}
```
The two configuration options are fairly self explanatory. `className` is whatever class you want to appear when the button is pushed. `targetElement` is whichever element you want the class to appear on within the iFrame that loads all your patterns. `targetElement` can take an element name, like "body" or "html", a class selector, such as ".content" or any string that can be passed into `.querySelector()`.
