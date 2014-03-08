UI.body.items = Items.find({}, { sort: { rank: 1 } });

SimpleRationalRanks = {
  beforeFirst: function (firstRank) { return firstRank - 1; },
  between: function (beforeRank, afterRank) { return (beforeRank + afterRank) / 2; },
  afterLast: function (lastRank) { return lastRank + 1; }
};

UI.body.rendered = function () {
  $(this.find('#list')).sortable({ // uses the 'sortable' interaction from jquery ui
    stop: function (event, ui) { // fired when an item is dropped
      var el = ui.item.get(0), before = ui.item.prev().get(0), after = ui.item.next().get(0);

      var newRank;
      if (!before) { // moving to the top of the list
        newRank = SimpleRationalRanks.beforeFirst(
          after.$ui.component.data().rank);

      } else if (!after) { // moving to the bottom of the list
        newRank = SimpleRationalRanks.afterLast(
          before.$ui.component.data().rank);

      } else {
        newRank = SimpleRationalRanks.between(
          before.$ui.component.data().rank,
          after.$ui.component.data().rank);

      }

      Items.update(el.$ui.component.data()._id, {$set: {rank: newRank}});
    }
  });
};