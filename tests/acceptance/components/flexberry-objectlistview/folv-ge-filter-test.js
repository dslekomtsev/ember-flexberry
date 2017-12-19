import Ember from 'ember';
import { executeTest } from './execute-folv-test';
import { filterCollumn } from './folv-tests-functions';
import { Query } from 'ember-flexberry-data';

executeTest('check ge filter', (store, assert, app) => {
  assert.expect(3);
  let path = 'components-acceptance-tests/flexberry-objectlistview/folv-filter';
  let modelName = 'ember-flexberry-dummy-suggestion';
  let filtreInsertOperation = 'ge';
  let filtreInsertParametr;

  visit(path + '?perPage=500');
  andThen(function() {
    assert.equal(currentPath(), path);
    let builder2 = new Query.Builder(store).from(modelName).top(1);
    store.query(modelName, builder2.build()).then((result) => {
      let arr = result.toArray();
      filtreInsertParametr = arr.objectAt(0).get('votes');
    }).then(function() {
      let $filterButtonDiv = Ember.$('.buttons.filter-active');
      let $filterButton = $filterButtonDiv.children('button');
      let $objectListView = Ember.$('.object-list-view');

      // Activate filtre row.
      $filterButton.click();

      filterCollumn($objectListView, 2, filtreInsertOperation, filtreInsertParametr);

      let done = assert.async();
      window.setTimeout(() => {
        // Apply filter.
        let refreshButton = Ember.$('.refresh-button')[0];
        refreshButton.click();

        let done1 = assert.async();
        window.setTimeout(() => {
          let controller = app.__container__.lookup('controller:' + currentRouteName());
          let filtherResult = controller.model.content;
          let $notSuccessful = true;
          for (let i = 0; i < filtherResult.length; i++) {
            let votes = filtherResult[0]._data.votes;
            if (votes <= filtreInsertParametr) {
              $notSuccessful = false;
            }
          }

          assert.equal(filtherResult.length >= 1, true, 'Filtered list is not empty');
          assert.equal($notSuccessful, true, 'Filter successfully worked');
          done1();
        }, 1000);
        done();
      }, 1000);
    });
  });
});
