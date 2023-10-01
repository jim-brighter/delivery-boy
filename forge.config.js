module.exports = {
  packagerConfig: {
    asar: true,
    name: 'Delivery Boy',
    executableName: 'Delivery Boy'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux', 'win32'],
    },
    {
      name: '@electron-forge/maker-dmg', // macOS
      config: {},
    },
    {
      name: '@electron-forge/maker-squirrel', // windows
      config: {},
    },
    {
      name: '@electron-forge/maker-deb', // debian & ubuntu
      config: {},
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
