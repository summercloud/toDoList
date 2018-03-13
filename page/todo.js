define([
    'text!./todo.html'
], function(template) {
    var Component = Regular.extend({
        template: template,
        config: function(data) {
            this.supr(data);
            data.current = '',
            data.todoList = [],
            data.count = 0;
            data.test = true;
            data.visible = 'all';
        },
        onKeyup: function(e){
            if(e.event.keyCode === 13){
                var temp = {
                    completed: false,
                    value: this.data.current
                }
                this.data.todoList.push(temp);
                this.data.count++;
                this.data.current = '';
            }
        },
        check: function(index){
            if(!this.data.todoList[index].completed){
                this.data.count--;
            } else {
                this.data.count++;
            }
            this.data.todoList[index].completed = !this.data.todoList[index].completed;
        },
        remove: function(index){
            if(!this.data.todoList[index].completed){
                this.data.count--;
            }
            this.data.todoList.splice(index, 1);
        },
        change: function(type){
            this.data.visible = type;
        }
    })
    
    return Component;
});