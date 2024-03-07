const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const sourceExts = require('metro-config/src/defaults/defaults').sourceExts;
const assetExts = require('metro-config/src/defaults/defaults').assetExts;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => {
        return {
          transform: {
            experimentalImportSupport: false,
            inlineRequires: true,
          },
        };
      },
    },
    resolver: {
      assetExts: assetExts.filter((ext) => { return ext !== 'svg'; }),
      sourceExts: [...sourceExts, 'svg'],
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
