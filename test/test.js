var _ = require('../tinyscore');
QUnit.module('tinyscore');
QUnit.test('arrEach', function (assert) {
    var iArr = [1,[2,[3,[4,5,[6]]]]];
    var arr = [];
    _.arrEach(iArr,function(i){
        arr.push(i);    // 返回1,2,3,4,5,6
    });
    console.log(arr);
    assert.equal(arr.join(','), '1,2,3,4,5,6', 'arrEach is ok');
});
