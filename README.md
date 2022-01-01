# krantz.app

## Built with Remix!

[Remix Docs](https://remix.run/docs)


TODO:
- [x] ~~EmailInput & PasswordInput have hardcoded names. The consuming forms use the name to get the value and could lead to bugs if one or the other changes accidentally.~~ CharkaUI removed the need for this.
- [x] Rename `signup` route to `sign-up`.
- [ ] Move `access_token` string to a constant, because constants are better and cooler.
- [ ] Flush out readme with better information about packages/tech/things used.
- [ ] Automatically update types via [github actions](https://supabase.com/docs/reference/javascript/generating-types)
- [ ] Make DB types more developer friendly
- [ ] Figure out why I need to use `--ignore-engines` so often when installing packages
- [ ] eslint unused imports should be an error
- [ ] submit-recipe, find a cleaner way to determine where data should come from
- [ ] Modal - focus on input first rather than close button
- [ ] Min width of recipe icons
