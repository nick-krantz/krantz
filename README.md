# krantz.app

## Tooling

Framework: [react](https://reactjs.org/) & [remix](https://remix.run)  
Auth & Database: [supabase](https://supabase.com/)  
UI Styling: [tailwindcss](https://tailwindcss.com/)  
Icons: [react-icons/fi](https://react-icons.github.io/react-icons/icons?name=fi)  
Animation: [framer motion](https://www.framer.com/motion/)  

## Acknowledgements

[Tints and Shades](https://github.com/edelstone/tints-and-shades/): A _lot_ of learning about color manipulation from their examples.

## TODOs

- [ ] style recipe detail page
- [ ] update detailed recipe type
- [ ] convert existing recipes to stored
- [ ] increase recipe scrapers
- [ ] only load recipe images that are in view
- [ ] recipes without images
- [ ] add sign out
- [ ] make dark/light mode toggle
- [ ] Automatically update types via [github actions](https://supabase.com/docs/reference/javascript/generating-types)
- [x] rework auth to be a global instance ~~provider~~
- [x] Send authentication with recipe calls
- [x] Build "add bookmark" functionality
- [x] Update metadata to use Nick Krantz instead of just krantz
- [x] add ability to copy a shade/tint color
- [x] add color increasing/decreasing increments on colors page
- [x] replace other field like UI elements with Field component
- [x] add Burger Page
- [x] Update default color of carets on home page (more contrast needed)
- [x] Move image cards to use `img` tags versus background images
- [x] Update metadata for search engines / previews
- [x] initial focus on menu close button
- [x] Reduce repetition in logo motion
- [x] add About Page
- [x] Update metadata for search engines / previews
- [x] replace other field like UI elements with Field component
- [x] Move image cards to use `img` tags versus background images
- [x] ~~EmailInput & PasswordInput have hardcoded names. The consuming forms use the name to get the value and could lead to bugs if one or the other changes accidentally.~~ CharkaUI removed the need for this.
- [x] Rename `signup` route to `sign-up`.
- [x] Move `access_token` string to a constant, because constants are better and cooler.
- [x] Flush out readme with better information about packages/tech/things used.
- [x] Make DB types more developer friendly
- [x] Figure out why I need to use `--ignore-engines` so often when installing packages
- [x] eslint unused imports should be an error
- [x] submit-recipe, find a cleaner way to determine where data should come from
- [x] ~~Modal - focus on input first rather than close button.~~ This is by default, so I'm going to leave it as standard behavior.
- [x] Min width of recipe icons
- [x] Update Catch & Error boundary html & styles
- [x] add RGBA to color route
- [x] trap focus in menu
- [x] add usage to color route
- [x] add edit for recipes
- [x] change authenticated param order, guardedRoute should be before the callback 
- [x] dynamic theme-color meta tag based on user preference
- [x] add active state to menu nav items
- [x] switch all namings/variables of 'title' for recipe name to 'name'
- [x] ~~GitHub action to update todo list~~ Used husky instead to do trigger _before_ commit, otherwise vercel will get triggered twice.
