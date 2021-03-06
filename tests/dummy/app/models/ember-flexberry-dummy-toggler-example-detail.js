import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';

var Model = Projection.Model.extend({
  togglerExampleDetailProperty: DS.attr('string'),
  togglerExampleMaster: DS.belongsTo('ember-flexberry-dummy-toggler-example-master', {
    inverse: 'togglerExampleDetail',
    async: false
  }),

  // Model validation rules.
  validations: {
    togglerExampleDetailProperty: {
      presence: {
        message: 'Deteil property is required'
      }
    }
  }

});

Model.defineProjection('TogglerExampleDetailE', 'ember-flexberry-dummy-toggler-example-detail', {
  togglerExampleDetailProperty: Projection.attr('Наименование детейла')
});
Model.defineProjection('TogglerExampleDetailL', 'ember-flexberry-dummy-toggler-example-detail', {
  togglerExampleDetailProperty: Projection.attr('Наименование детейла')
});

export default Model;
