define(function (require, exports, module) {

  const Events = require('plug/core/Events');
  const ShowDialogEvent = require('plug/events/ShowDialogEvent');
  const Style = require('extplug/util/Style');
  const InstallModuleDialog = require('extplug/views/dialogs/InstallModuleDialog');
  const FooterView = require('./GroupFooterView');
  const ControlGroupView = require('./ControlGroupView');

  const ModulesFooterView = FooterView.extend({
    render() {
      this._super();
      this.$install = $('<button />').text('Install Module');
      this.$manage = $('<button />').text('Manage');

      this.$install.on('click', () => {
        Events.dispatch(new ShowDialogEvent(
          ShowDialogEvent.SHOW,
          new InstallModuleDialog()
        ));
      });
      this.$manage.on('click', () => {
        Events.trigger('extplug:modules:manage');
      });

      this.$left.append(this.$install);
      this.$right.append(this.$manage);
      return this;
    },

    remove() {
      this.$install.off();
      this.$manage.off();
    }
  });

  const ModulesListView = ControlGroupView.extend({
    render() {
      this._super();
      this.footer = new ModulesFooterView();
      this.footer.render();
      this.$el.append(this.footer.$el);
      return this;
    }
  });

  module.exports = ModulesListView;

});