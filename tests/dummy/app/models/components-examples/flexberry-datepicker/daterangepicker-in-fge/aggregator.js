import DS from 'ember-data';
import BaseModel from 'ember-flexberry/models/base';
import { Projection } from 'ember-flexberry-data';

var Model = BaseModel.extend({
  // This property is for daterangepicker-example component.
  // Inverse relationship is necessary here.
  details: DS.hasMany('components-examples/flexberry-datepicker/daterangepicker-in-fge/detail', {
    inverse: 'aggregator',
    async: false
  })
});

// Edit form projection.
Model.defineProjection('AggregatorE', 'components-examples/flexberry-datepicker/daterangepicker-in-fge/aggregator', {
  details: Projection.hasMany('components-examples/flexberry-datepicker/daterangepicker-in-fge/detail', 'Details', {
    date: Projection.attr('Date'),
  })
});

export default Model;