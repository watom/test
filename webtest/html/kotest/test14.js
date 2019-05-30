/*
*   Mapping
* */

var data={
    serverTime: '2010-01-07',
    numUsers: 3
}

var viewModel = ko.mapping.fromJS(data);
//==================分割线=======================
var data01={
    serverTime01: '2019-05-30',
    numUsers01: 88
}

ko.mapping.fromJS(data01, viewModel);
//==================分割线=======================
var data02 = {
    name: 'Scot',
    children: "hhh",
    bar:"piee"
}
ko.mapping.fromJS(data02, viewModel);
//==================分割线=======================
// var mapping = {
//     'children': {
//         create: function (options) {
//             return new myChildModel(options.data);
//         }
//     }
// }
//
// var viewModel = ko.mapping.fromJS(data02, mapping);

//==================分割线=======================
var data03 = {
    name03: 'Graham',
}

var mapping = {
    'name03': {
        update: function(options) {
            return options.data + '--》我的更新值!';
        }
    }
}
var viewModel=ko.mapping.fromJS(data03, mapping);
alert(viewModel.name03());

//==================分割线=======================
var obj = [
    { id: 1 },
    { id: 2 }
]

var result = ko.mapping.fromJS(obj, {
    key: function (item) {
        return ko.utils.unwrapObservable(item.id);
    }
});

result.mappedRemove({ id: 2 });
//==================分割线=======================
