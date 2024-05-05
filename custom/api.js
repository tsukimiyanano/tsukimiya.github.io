let vm = new Vue({
    el: '#app',
    data: {
        mode: 1,//值为1 和 2 代表两个种类
        types:[ // 这个依旧按照首字母排序
            "过滤 | 筛选",
            '循环 | 遍历',
            "查找 | 查询",
            "判断",
            "累加器",   
        ],
        node1:'',
        node2:'',
        // forEach 遍历
        api: {
            //这个模板可以删掉，只是方便添加数据，不影响页面
            like: {
                type: '',
                name: '',
                address: '',
                describe: ``,
                use:
                    ``,
                syntax:
                    ``,
                param:
                    ``,
                return: '',
            },
            every: {
                type: '循环 | 遍历 | 判断',
                name: 'Array.prototype.every()',
                address: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every',
                describe: '每一项都满足判断条件就得到true，只要有任何一项不满足就是false，后面的元素都不会再执行。<br>不会对空数组进行检测，不会改变原始数组',
                use:
`[1,2,3,4,5].erver((num)=>num<10) // true
[1,2,3,4,5].erver((num)=>num>1) // false`,
                syntax:
`every(callbackFn)
every(callbackFn(element,index,array), thisArg)`,
                param:
                    ``,
                return: '布尔值 true/false',
            },
            filter: {//按照首字母排序
                type:'过滤 | 筛选',
                name: 'Array.prototype.filter()',
                address: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
                describe: 
`filter()方法创建给定数组一部分的浅拷贝 -- 返回一个新数组
filter对空数组不会进行检测，不会改变原始数组。`,
                use:
`[1,2,3,4,5].filter((num)=>num>3) // [4, 5]
[1,2,3,4,5].filter((num)=>true) // [1,2,3,4,5]`,
                syntax: 
`filter(callbackFn)
filter(callbackFn(element,index,array), thisArg)`,
                param: 
`1. callbackFn: 为数组中的每个元素执行的函数。它应该返回一个真值以将元素保留在结果数组中，否则返回一个假值。
    该函数被调用时将传入以下参数：
    element: 数组中当前正在处理的元素。
    index: 正在处理的元素在数组中的索引。
    array: 调用了 filter() 的数组本身。
2. thisArg(可选): 执行 callbackFn 时用作 this 的值。参见迭代方法。`,
                return: '返回给定数组的一部分的浅拷贝，其中只包括通过提供的函数实现的测试的元素。如果没有元素通过测试，则返回一个空数组。',
            },
            forEach: {
                type: '循环 | 遍历',
                name: 'Array.prototype.forEach()',
                address: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach',
                describe: 
`forEach() 方法对数组的每个元素执行一次给定的函数。是一个迭代方法。
不会改变其调用的数组，不过可以在callbackFn函数中操作原数组参数array来实现修改
除非抛出异常，否则没有办法停止或中断 forEach() 循环。`,
                use:
`let arr = [1,2,3,4,5]
arr.forEach((num)=>{ num++ })
arr // [1,2,3,4,5],不会改变原数组

arr.forEach((num,index,arr)=>{ arr[index]=index; })
arr // [0,1,2,3,4] , 可以这样来修改原数组`,
                syntax:
`forEach(callbackFn)
forEach(callbackFn(element,index,array), thisArg)`,
                param:
                    ``,
                return: 'undefined',
            },
            reduce: {
                type: '累加器',
                name: 'Array.prototype.reduce()',
                address: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
                describe: `累加器。<br>可以用来计算一组数据的和，每次循环return的值，都会作为下次循环的初始值`,
                use:
`[1,2,3,4,5].reduce( (total,num)=>total+num ) // 15 -- 所有数值的累加和 循环4次
[1,2,3,4,5].reduce((total,num)=>total+num),20) // 35 -- 从初始值20开始累加 循环5次

[1,2,3,4,5].reduce((total,num)=>{
    //没有初始值，第一个数值被赋值给了total作为初始值，函数执行4次
    console.log(total + ' ' + num); // 1 2, 3 3, 6 4 , 10 5
    return total + num;
}) // 15
[1,2,3,4,5].reduce((total,num)=>{
    //传了初始值，函数执行5次
    console.log(total + ' ' + num); // 20 1, 21 2, 23 3, 26 4, 30 5
    return total + num;
},20) // 35

// reduce()函数还可以进行一些复杂的处理，如：融合对象
// 简单的示例：
let c = {c:'c'}; 
[{a:'a'},{b:'b'}].reduce((mix,item)=>Object.assign(mix,item),c)
// 这里作用等同于
Object.assign(c,...[{a:'a'},{b:'b'}]) // c: {a:'a',b:'b',c:'c'}
更复杂的实例参考：
ES6 - 对象的新增方法 - Object.getOwnPropertyDescriptors方法最后一个例子
https://es6.ruanyifeng.com/#docs/object-methods#Object-getOwnPropertyDescriptors`,
                syntax:
`array.reduce(callbackFn(total,currentValue)) //必选的参数
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)`,
                param:
                    ``,
                return: '返回最终的累加值 total',
            },
            some: {
                type: '循环 | 遍历 | 查找 | 查询 | 判断',
                name: 'Array.prototype.some()',
                address: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some',
                describe: `forEach虽然能实现我们的需求，但是性能比较差，不能被终止。<br>从数组里面找元素用some比较合适，因为some找到那一项之后，就可以终止后续的循环`,
                use:
`[1,2,3,4,5].some((item,index)=>{
    console.log(item);// 1 2 3
    if(item == 3){
        return true;//在找到对应的项之后，可以通过 return true 固定语法终止some循环
    }
}) // 这里函数会返回个true，是因为找到了3执行了我们写的return true
[1,2,3,4,5].some(item=>item==3)  
[1,2,3,4,5].some(item=>item>6) //这里返回的false，是数组中没找到符合的元素`,
                syntax: 
`forEach(callbackFn)
forEach(callbackFn(element,index,array), thisArg)`,
                param: 
``,
                return: '可以认为返回true就是找到了，false就是没找到.因为基本上是会给一个判断来查找数组元素的',
            },
            like: {
                type: '',
                name:'',
                address:'',
                describe:``,
                use: 
``,                
                syntax: 
``,
                param:
``,
                return:'',
            },
            like: {
                type: '',
                name: '',
                address: '',
                describe: ``,
                use:
                    ``,
                syntax:
                    ``,
                param:
                    ``,
                return: '',
            },
        }
    },
    computed: {
        
    },
    methods: {
        apioftype(type) {
            return Object.values(this.api).filter((obj) => obj.type.includes(type));
        },
        apiofletter() {
            return Object.values(this.api).filter((obj) => obj.name !='');
        },
        initNavList(){
            // 1. 获取nav列表第三级别的li元素 和 第四级别的li
            let list3 = document.querySelector('.nav-level-3');
            let list4 = document.querySelector('.nav-level-4');
            // 这里只有一个四级子元素，用于后面克隆用
            let originList3 = list3.cloneNode(true);
            
            // 2.获取列表的nav父元素,等后面往里面添加生成的div节点，包住li目录
            let nav = list3.parentNode;
            // console.log(nav);
            // 包着两个列表的div，用来控制显示
            this.node1 = document.createElement('div');
            this.node2 = document.createElement('div');

            // 3. 生成按照功能排序的列表内容，并将其封装到node2中
            this.types.forEach((item, index1) => {
                // console.log(item + ' ' + index);
                let index = index1 + 1;//让索引从零开始
                if(index == 1){// 第一个，修改得到的list3的值
                    this.changeTypeList(list3, index, item);
                    this.node2.append(list3);
                } else {//克隆一份修改
                    let cloneList = originList3.cloneNode(true);
                    this.changeTypeList(cloneList, index, item);
                    this.node2.append(cloneList);
                }
            })
            // 4. 生成按照字母排序的列表内容，并将其封装到node1中
            // 过滤得到所有的存在name的方法，遍历
            Object.values(this.api).filter((obj) => obj.name).forEach((obj, i) => {
                let index = i + 1; // 所以从1开始
                // 这里就不需要分情况了，直接全部克隆自 list4(因为这是list3下的)
                let cloneList = list4.cloneNode(true);
                this.changeList(cloneList, index, obj.name, 'n');
                // 直接添加到node1节点中
                this.node1.append(cloneList);
            })

            // 5. 将nav中的原来的列表移除，然后把node1 node2节点添加进去
            nav.innerHTml = '';
            nav.append(this.node1,this.node2);
            this.toggleDisplay(1);//默认是node1显示
        },
        changeTypeList(node,index,item){//完成每一个type目录及其子目录的初始化
            // 这里只修改了三级索引的值,t是三级的type
            // 如果传入的是t，返回里面的四级li子元素
            let child = this.changeList(node, index, item, 't');
            let id = 't'+index;//用来做这个类下方法的id前缀，防止每个类下的id重复(第一个都是f1)
            // 过滤得到所有的该item分类的方法
            Object.values(this.api).filter((obj) => obj.type.includes(item)).forEach((obj,index) => {
                index++;//索引从1开始
                if (index == 1) {//修改值
                    this.changeList(child, index, obj.name, id+'f');
                } else {//克隆一份再修改
                    let cloneList = child.cloneNode(true);
                    this.changeList(cloneList, index, obj.name, id +'f');
                    // 添加到node节点的第二个子元素ol中
                    node.children[1].append(cloneList);
                }
            })
        },
        // id传 t、f、n三种，对应功能排序的三级、四级 和 字母排序的四级
        changeList(node,index,name,id){//修改List的内容
            let a = node.children[0];
            a.href = '#' + id + index; 
            // console.log();
            let number = a.children[0];
            let text = a.children[1];
            number.textContent = index + '.';
            text.textContent = name;
            if(id == 't'){// 返回三级索引子元素
                return node.children[1].children[0];
            }
        },
        toggleDisplay(m){
            // m = 1，node1显示，node2消失
            // m = 2，node1消失，node2显示
            let show = ['none','block','none']
            this.node1.style.display = show[m];
            this.node2.style.display = show[m-1];
        },
        toggleMode(m){
            if(this.mode == m) // 已经是当前模式，直接return
            return ;
            this.mode = m;
            this.toggleDisplay(m);
        }
    },
    mounted(){
        this.initNavList();
        // console.log(this.node1);
    }
})