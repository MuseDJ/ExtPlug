import Backbone from 'backbone';
import $ from 'jquery';
import Events from 'plug/core/Events';

/**
 * A checkbox setting item.
 */
export default class CheckboxView extends Backbone.View {
  className = 'item';

  initialize(o) {
    this.label = o.label;
    this.description = o.description;
    this.enabled = o.enabled || false;
    this.onChange = this.onChange.bind(this);
  }

  render() {
    this.$el
      .append('<i class="icon icon-check-blue" />')
      .append($('<span />').text(this.label));

    if (this.description) {
      this.$el
        .on('mouseenter', () => {
          Events.trigger('tooltip:show', this.description, this.$el);
        })
        .on('mouseleave', () => {
          Events.trigger('tooltip:hide');
        });
    }

    if (this.enabled) {
      this.$el.addClass('selected');
    }

    this.$el.on('click', this.onChange);
    return this;
  }

  onChange() {
    this.$el.toggleClass('selected');
    const enabled = this.enabled;
    this.enabled = this.$el.hasClass('selected');
    if (enabled !== this.enabled) {
      this.trigger('change', this.enabled);
    }
  }
}
