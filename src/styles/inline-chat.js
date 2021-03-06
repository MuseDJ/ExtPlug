/* eslint-disable quote-props */
// inline chat messages show the message contents immediately after
// the username instead of below it.
export default {
  '#chat-messages .cm.inline': {
    'min-height': '0',

    '.badge-box': {
      // remove badge background
      'margin': '5px 8px 6px',
      'height': '16px',
      'border-radius': '0px',
      'background': 'transparent',

      // center badge icons
      '.icon': {
        'top': '50%',
        'margin-top': '-15px',
      },

      // center & resize actual user badges
      '.bdg': {
        'top': '-7px',
        'transform': 'scale(0.5)',
      },
    },
    '.from': {
      'display': 'inline',
    },
    '.text': {
      'display': 'inline',
      'margin-left': '5px',
    },
    '.delete-button': {
      'padding': '3px 10px',
      'top': '3px',
    },
  },
  // remove the empty circle for badge-less users
  // (it doesn't fit in a 16px high message)
  '#chat-messages .cm .no-badge .icon': {
    'width': '30px',
    'height': '30px',
    'top': '0px',
    'left': '0px',
    'border': 'none',
    'border-radius': '0px',
  },
};
/* eslint-enable quote-props */
