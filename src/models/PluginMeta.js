import { Model } from 'backbone';

export default class PluginMeta extends Model {
  defaults = {
    id: '',
    fullUrl: '',
    enabled: false,
    name: '',
    description: '',
    instance: null,
    class: null,
  };

  initialize() {
    this.get('instance')
      .on('enable', () => this.set('enabled', true))
      .on('disable', () => this.set('enabled', false));
  }

  enable() {
    if (!this.get('enabled')) {
      this.get('instance').enable();
    }
  }

  disable() {
    if (this.get('enabled')) {
      this.get('instance').disable();
    }
  }
}
