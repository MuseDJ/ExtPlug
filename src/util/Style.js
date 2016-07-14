import $ from 'jquery';
import _ from 'underscore';
import { Sistyl } from 'sistyl';
import Class from 'plug/core/Class';
import popoutView from 'plug/views/rooms/popout/PopoutView';

export default class Style {
  constructor(defaults) {
    this.sistyl = new Sistyl(defaults);
    this.timeout = null;

    this.refresh = this.refresh.bind(this);
    this.id = _.uniqueId('eps-');

    this.el = $('<style />').addClass('extplug-style')
                            .attr('id', this.id)
                            .attr('type', 'text/css')
                            .appendTo('head');
    if (popoutView._window) { // eslint-disable-line no-underscore-dangle
      this.el.clone().appendTo(popoutView.$document.find('head'));
    }
    this.refresh();
  }

  $() {
    let el = this.el;
    if (popoutView._window) { // eslint-disable-line no-underscore-dangle
      el = el.add(popoutView.$document.find(`#${this.id}`));
    }
    return el;
  }

  set(sel, props) {
    this.sistyl.set(sel, props);

    // throttle updates
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.refresh, 1);
    return this;
  }

  unset(sel, prop) {
    this.sistyl.unset(sel, prop);
    return this;
  }

  rulesets() {
    return this.sistyl.rulesets();
  }

  refresh() {
    this.$().text(this.toString());
  }

  remove() {
    this.$().remove();
  }

  toString() {
    return this.sistyl.toString();
  }
}
