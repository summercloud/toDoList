NEJ.define([
    'util/chain/chainable',
    'util/cache/storage',
    'base/element',
    'base/event'
],function($, _j, _e, _v){
    var todoListTpl = $('#todolist');
    var countTpl = $('#count');
    var allBut = $('#allBut');
    var actBut = $('#actBut');
    var comBut = $('#comBut');
    var currentState = 'all';
    var tpl = function(item, index) {
        var className = item.completed ? 'active' : '';
        return `<div class="list-item ${className}" list-index="${index}">
                    <div class="chooseIcon"></div>
                    <div class="list-text">
                        <span>${item.value}</span>
                    </div>
                    <div class="list-remove"}>X</div>
                </div>`;
    };
    var getTodoList = () => JSON.parse(_j._$getDataInStorage('todoList') || "[]");
    var setTodoList = list => _j._$setDataInStorage('todoList', JSON.stringify(list));
    var setListTpl = function(flag){
        // flag = all / active / completed
        var all = JSON.parse(_j._$getDataInStorage('todoList') || "[]");
        var active = [];
        var complete = [];
        var list;
        allBut[0].className = 'todo-type';
        actBut[0].className = 'todo-type';
        comBut[0].className = 'todo-type';
        all.forEach(item => {
            if(item.completed){
                complete.push(item);
            }else{
                active.push(item);
            }
        });
        if(flag==='all'){
            allBut[0].className = 'todo-type choosed';
            currentState = 'all';
            list = all;
        }
        else if(flag === 'active'){
            actBut[0].className = 'todo-type choosed';
            currentState = 'active';
            list = active;
        }
        else{
            comBut[0].className = 'todo-type choosed';
            currentState = 'complete';
            list = complete;
        }
        
        var html = '';
        list.forEach((item, index) => {
            html += tpl(item, index);
        });
        todoListTpl[0].innerHTML = html;
        countTpl[0].innerHTML = active.length;
    }

    //初始化
    setListTpl('all');

    _v._$addEvent(allBut[0],'click',function(_event){
        setListTpl('all');
    });
    _v._$addEvent(actBut[0],'click',function(_event){
        setListTpl('active');
    });
    _v._$addEvent(comBut[0],'click',function(_event){
        setListTpl('complete');
    });

   _v._$addEvent('input', 'enter', function(_event){
            var temp = {
                completed: false,
                value: _event.target.value
            }
            const tempList = getTodoList();
            tempList.push(temp);
            setTodoList(tempList);
            _event.target.value = '';

            setListTpl(currentState);
        }, false
    );

    todoListTpl._$on('click','.chooseIcon', function(){
        var parent = $(this)._$parent('.list-item');
        var tempTodoList =  getTodoList();
        var index = _e._$attr(parent[0], 'list-index');
        parent._$remove();
        tempTodoList[index].completed = true;
        setTodoList(tempTodoList);
        setListTpl(currentState);
    });

    todoListTpl._$on('click','.list-remove', function(){
        var parent = $(this)._$parent('.list-item');
        var tempTodoList =  getTodoList();
        var index = _e._$attr(parent[0], 'list-index');
        parent._$remove();
        tempTodoList.splice(index, 1);
        setTodoList(tempTodoList);
        setListTpl(currentState);
    });
});