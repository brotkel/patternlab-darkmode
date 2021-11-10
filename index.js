'use strict';

const pluginName = 'patternlab-plugin-darkmode';
const safePluginName = pluginName;

const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const glob = require('glob');

function writeConfigToOutput(patternlab, pluginConfig) {
    try {
        _.each(patternlab.uikits, uikit => {
            fs.outputFileSync(
                path.join(
                    process.cwd(),
                    uikit.outputDir,
                    patternlab.config.paths.public.root,
                    'patternlab-components',
                    'packages',
                    `/${safePluginName}.json`
                ),
                JSON.stringify(pluginConfig, null, 2)
            );
        });
    } catch (ex) {
        console.trace(
            pluginName + ': Error occurred while writing pluginFile configuration'
        );
        console.log(ex);
    }
}

/**
 * A single place to define the frontend configuration
 * This configuration is outputted to the frontend explicitly as well as included in the plugins object.
 *
 */
 function getPluginFrontendConfig() {
    return {
        name: pluginName,
        templates: [],
        stylesheets: [],
        javascripts: [
            `patternlab-components/pattern-lab/${safePluginName}/js/${safePluginName}.js`,
        ],
        onready: 'PluginDarkMode.init()',
        callback: '',
    };
}

  /**
 * The entry point for the plugin. You should not have to alter this code much under many circumstances.
 * Instead, alter getPluginFrontendConfig() and registerEvents() methods
 */
function pluginInit(patternlab) {
    if (!patternlab) {
        console.error('patternlab object not provided to pluginInit');
        process.exit(1);
    }

    //write the plugin json to public/patternlab-components
    const pluginConfig = getPluginFrontendConfig();
    pluginConfig.className =
        patternlab.config.plugins[pluginName].options.className;
    pluginConfig.targetElement =
        patternlab.config.plugins[pluginName].options.targetElement;
    writeConfigToOutput(patternlab, pluginConfig);
  
    //add the plugin config to the patternlab-object
    if (!patternlab.plugins) {
        patternlab.plugins = [];
    }
    patternlab.plugins.push(pluginConfig);

    //Send the plugin config to the frontend
    // patternlab.events.emit('patternlab-plugin-config', pluginConfig);

    //write the plugin dist folder to public/pattern-lab
    const pluginFiles = glob.sync(__dirname + '/dist/**/*');
  
    if (pluginFiles && pluginFiles.length > 0) {
        for (let i = 0; i < pluginFiles.length; i++) {
            try {
                const fileStat = fs.statSync(pluginFiles[i]);
                if (fileStat.isFile()) {
                    const relativePath = path
                    .relative(__dirname, pluginFiles[i])
                    .replace('dist', ''); //dist is dropped
                    const writePath = path.join(
                        patternlab.config.paths.public.root,
                        'patternlab-components',
                        'pattern-lab',
                        safePluginName,
                        relativePath
                    );
                    fs.copySync(pluginFiles[i], writePath);
                }
            } catch (ex) {
                console.trace(
                    pluginName + ': Error occurred while copying pluginFile',
                    pluginFiles[i]
                );
                console.log(ex);
            }
        }
    }
  
    //setup listeners if not already active. we also enable and set the plugin as initialized
    if (!patternlab.config.plugins) {
        patternlab.config.plugins = {};
    }
  
    //attempt to only register hooks once
    if (
        patternlab.config.plugins[pluginName] !== undefined &&
        patternlab.config.plugins[pluginName].enabled &&
        !patternlab.config.plugins[pluginName].initialized
    ) {
        //set the plugin initialized flag to true to indicate it is installed and ready
        patternlab.config.plugins[pluginName].initialized = true;
    }
}
  
module.exports = pluginInit;