TailwindCSS
===

_This extension makes it easy to integrate TailwindCSS (https://tailwindcss.com/) into Quasar (https://quasar.dev)._


# Install
This extension now uses `TailwindCSS v3.2.24`.



```bash
quasar ext add tailwindcss-three
```

## in order to make dark variant works, you need to add a watcher to adjust html element as quasar uses body element for controlling darkMode there is a composable helper
```javascript
// inside App.vue mostly or where you handle DarkMode
import {TailwindDarkFix} from 'src/extensions/tailwindcss/dark-fix'

setup(){
  // this does the trick of handling tailwind dark styles
  TailwindDarkFix();
}
```
### ==> Note: as of tailwind 3 dark mode is enabled by default as 'media', to make our settings work it will be predefiened as 'class' attribute on tailwind config.
###  ==> and if you are not using tailwind dark utils you can disable it by removing darkMode from config file.
# Credits
this is a fork from https://github.com/matzeso/quasar-app-extension-tailwindcss Thanks to matzeso 😊

## License: MIT

## Issues:
In case of any issues, please submit it to https://github.com/risha700/quasar-app-extension-tailwindcss-3/issues
