import Ember from 'ember';
import BaseEditFormController from 'ember-flexberry/controllers/edit-form';
import EditFormControllerOperationsIndicationMixin from 'ember-flexberry/mixins/edit-form-controller-operations-indication';
import { Query } from 'ember-flexberry-data';

const { StringPredicate } = Query;

export default BaseEditFormController.extend(EditFormControllerOperationsIndicationMixin, {
  /**
    Route name for transition after close edit form.

    @property parentRoute
    @type String
    @default 'ember-flexberry-dummy-suggestion-list'
   */
  parentRoute: 'components-examples/flexberry-groupedit/ember-flexberry-dummy-suggestion-list-groupedit-with-lookup-with-computed-atribute',

  /**
    Name of model.comments edit route.

    @property commentsEditRoute
    @type String
    @default 'ember-flexberry-dummy-comment-edit'
   */
  commentsEditRoute: 'ember-flexberry-dummy-comment-edit',

  /**
    Name of model.comments edit route.

    @property commentsEditRoute
    @type String
    @default 'ember-flexberry-dummy-comment-edit'
   */
  checkboxValue: false,
  fieldvalue: undefined,

  lookupReadonly: Ember.computed('lookupReadonly', function() {
    return this.get('checkboxValue');
  }),

  lookupLimitFunction: Ember.computed('limitFunction', function() {
    if(this.get('fieldvalue')) {
      return new StringPredicate('name').contains(this.get('fieldvalue'));
    }
    else {
      return undefined;
    }
  }),

  /**
    Method to get type and attributes of a component,
    which will be embeded in object-list-view cell.

    @method getCellComponent.
    @param {Object} attr Attribute of projection property related to current table cell.
    @param {String} bindingPath Path to model property related to current table cell.
    @param {DS.Model} modelClass Model class of data record related to current table row.
    @return {Object} Object containing name & properties of component, which will be used to render current table cell.
    { componentName: 'my-component',  componentProperties: { ... } }.
   */
  getCellComponent(attr, bindingPath, model) {
    let cellComponent = this._super(...arguments);
    if (attr.kind === 'belongsTo') {
      switch (`${model.modelName}+${bindingPath}`) {
        case 'ember-flexberry-dummy-vote+author':
          cellComponent.componentProperties = {
            choose: 'showLookupDialog',
            remove: 'removeLookupValue',
            displayAttributeName: 'name',
            required: true,
            relationName: 'author',
            projection: 'ApplicationUserL',
            autocomplete: true,
            lookupLimitPredicate: this.get('lookupLimitFunction'),
            readonly: this.get('lookupReadonly')
          };
          break;

        case 'ember-flexberry-dummy-comment+author':
          cellComponent.componentProperties = {
            choose: 'showLookupDialog',
            remove: 'removeLookupValue',
            displayAttributeName: 'name',
            required: true,
            relationName: 'author',
            projection: 'ApplicationUserL',
            autocomplete: true,
          };
          break;

      }
    }

    return cellComponent;
  },

  actions: {
    configurateFilesRow(rowConfig, record) {
      Ember.set(rowConfig, 'customClass', 'positive ');
      let readonlyColumns = [];
      if (record.get('order') === 1) {
        readonlyColumns.push('order');
        readonlyColumns.push('file');
      }

      Ember.set(rowConfig, 'readonlyColumns', readonlyColumns);
    },

    configurateVotesRow(rowConfig, record) {
      let readonlyColumns = [];
      if (record.get('author.name') === 'Иван') {
        readonlyColumns.push('author');
      }

      Ember.set(rowConfig, 'readonlyColumns', readonlyColumns);
    }
  }
});
