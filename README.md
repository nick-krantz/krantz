# krantz.app

## Tooling

Framework: [react](https://reactjs.org/) & [remix](https://remix.run)  
Auth & Database: [supabase](https://supabase.com/)  
UI Styling: [tailwindcss](https://tailwindcss.com/)  
Icons: [react-icons/fi](https://react-icons.github.io/react-icons/icons?name=fi)  

## Todo

- [x] ~~EmailInput & PasswordInput have hardcoded names. The consuming forms use the name to get the value and could lead to bugs if one or the other changes accidentally.~~ CharkaUI removed the need for this.
- [x] Rename `signup` route to `sign-up`.
- [x] Move `access_token` string to a constant, because constants are better and cooler.
- [x] Flush out readme with better information about packages/tech/things used.
- [ ] Automatically update types via [github actions](https://supabase.com/docs/reference/javascript/generating-types)
- [x] Make DB types more developer friendly
- [x] Figure out why I need to use `--ignore-engines` so often when installing packages
- [x] eslint unused imports should be an error
- [x] submit-recipe, find a cleaner way to determine where data should come from
- [x] ~~Modal - focus on input first rather than close button.~~ This is by default, so I'm going to leave it as standard behavior.
- [x] Min width of recipe icons
- [x] Update Catch & Error boundary html & styles
- [ ] Update metadata for search engines / previews
- [ ] make dark/light mode toggle
- [ ] add testing
