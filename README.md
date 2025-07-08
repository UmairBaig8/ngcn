# ngcn

> ⚡️ Next-Gen Component CLI for Angular – Generate themed, standalone-ready Angular components instantly.

---

## ✨ What is it?

`ngcn` is a CLI utility that helps you scaffold Angular components *your way*:

✅ Choose themes (e.g. Tailwind, SCSS)  
✅ Support for Angular standalone components  
✅ Customizable output paths  
✅ User config file for defaults  
✅ Works with any Angular project

---

## 🚀 Installation

You can use it directly with npx:

```bash
npx ngcn add button
```

Or install globally:

```bash
npm install -g ngcn
```


🛠️ Usage
Add a new component
```bash
npx ngcn add <component-name>
```

Example:

```bash
npx ngcn add button
```

Options
✅ Choose a theme:

```bash
npx ngcn add button --theme scss
```

✅ Use standalone component flag:

```bash
npx ngcn add button --standalone
```

✅ Combine options:

```bash
npx ngcn add card --theme tailwind --standalone
```

Configuration file
To avoid typing options every time, add a .ngcn.json config file in your Angular project root:

```
.your-angular-project/
  .ngcn.json
```

Example:

```json
{
  "theme": "tailwind",
  "standalone": true,
  "targetPath": "src/app/ui"
}
```

✅ Now you can just run:

```bash
npx ngcn add button
and it will use your defaults!
```


📦 Template Structure
ngcn comes with a set of component templates organized by theme:

```css
templates/
  scss/
    button/
      button.component.ts
      button.component.html
      button.component.scss
  tailwind/
    button/
      ...
```

✅ You can extend the CLI by adding your own components in the templates folder.

🧩 How It Works
✅ Copies your chosen component template
✅ Replaces variables like:

```
{{ComponentName}}

{{StandaloneFlag}}
```

✅ Supports fully customizable theming and paths

🗂️ Example Generated Output
In your Angular app:

```css
src/app/ui/button/
  button.component.ts
  button.component.html
  button.component.scss
```

Example generated button.component.ts with standalone:
```ts
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {}
```

🌟 Why use ngcn?
✅ Rapidly scaffold consistent, themed components
✅ Supports modern Angular standalone components
✅ Easily extendable with your own templates
✅ Simple CLI interface with powerful config options

🤝 Contributing
Pull requests are welcome! Feel free to fork this repo and add:

More themes

More component templates

Additional CLI features
