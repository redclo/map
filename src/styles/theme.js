module.exports = {
  /* color */
  primary_color: '#E88B00',
  // border
  border_color: 'var(--border-color)',//'#1F1F1F',

  // text
  text_color: 'var(--text-color)',//'#A9ABAF',
  text_active_color: '#fff',
  text_gray_color: 'rgba(255,255,255,0.7)',
  text_blue: '#5a7bef',
  text_error: '#f5222d',
  // components
  component_bg: '#383838',
  component_border_radius: '4px',

  // item
  item_active_bg: '#262626',
  item_hover_bg: '#262626',
  list_item_bg: '#303030',

  // layout
  layout_bg: '#262626',
  layout_body_bg: '#F1F3F5',
  layout_border_color: '#1f1f1f',

  // radio
  radios_btn_bg: '#1A1A1A',
  radios_btn_checked_bg: '#414141',
  radio_btn_wrapper_bg: '#313131',

  //tree
  tree_title_height: '32px',


  //input
  input_hover_border_color: 'rgba(252, 254, 255, 0.3)',
  input_bg: '#303030',
  // function
  setIconColor(color) {
    return `
    .inf-icon svg{
      --icon-color: ${color};
    }
  `;
  },

  setScrollBar(barColor = '#414141') {
    return `
      ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0);
      }
      ::-webkit-scrollbar-thumb {
        background-color: ${barColor};
      }
    `;
  },

  colorRatio(color, ratio) {
    const [, r, g, b] = color.match(/^#(.{2})(.{2})(.{2})$/);
    let rgb = [r, g, b];
    rgb = rgb.map((d) => parseInt(d, 16));
    return `rgba(${[...rgb].join(' ')} / ${ratio * 100}%)`;
  },

  colorOpacity(color, opacity) {
    const [, r, g, b] = color.match(/^#(.{2})(.{2})(.{2})$/);
    let rgb = [r, g, b];
    rgb = rgb.map((d) => parseInt(d, 16));
    return `rgba(${[...rgb, opacity].join(',')})`;
  },
};
