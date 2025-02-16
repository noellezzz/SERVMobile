const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config')

let config = getDefaultConfig(__dirname)

// Modify resolver for SVG support
config.resolver.assetExts = config.resolver.assetExts.filter(
  ext => ext !== 'svg',
)
config.resolver.sourceExts.push('svg')
config.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer',
)

// Apply NativeWind config
config = withNativeWind(config, { input: './app/styles/global.css' })

// Wrap with Reanimated config
config = wrapWithReanimatedMetroConfig(config)

module.exports = config
