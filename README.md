TailwindCSS
===

_This extension makes it easy to integrate TailwindCSS (https://tailwindcss.com/) into Quasar (https://quasar.dev)._


# Install
This extension now uses `TailwindCSS v3.2.24`.

# Credits
this is a fork from https://github.com/matzeso/quasar-app-extension-tailwindcss Thanks to matzeso ;)

```bash
quasar ext add tailwindcss-3
```

## in order to make dark variant works, you need to add a watcher to adjust html element as quasar uses body element for controlling darkMode
### Snippet:

```javascript
    // mind the prefix
    function override_dark_setup_for_tailwind(val) {
      const html_element = document.querySelector("html");
      html_element.classList.remove(val === true ? "tw-light" : "tw-dark"); 
      html_element.classList.add(val === true ? "tw-dark" : "tw-light");
    }

    if ($q.dark.mode == "auto" && $q.dark.isActive)
      override_dark_setup_for_tailwind(true);

    watch(
      () => $q.dark.isActive,
      (isDark) => {
        override_dark_setup_for_tailwind(isDark);
      }
    );

// now you can use dark utility as usual

```

