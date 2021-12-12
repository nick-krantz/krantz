import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';
import { changeCaretColor } from './utilities/change-caret-color';

// Add listeners for changing caret colors
window.addEventListener('mousemove', changeCaretColor);
window.addEventListener('touchmove', changeCaretColor);

hydrate(<RemixBrowser />, document);
