let zua = new Vue({
    el: "#zua",
    data: {
        //头部变量
        slideShow: 1,//第几个图片显示
        timer1: "",//头部轮播图的定时器
        searchValue: "",
        //中间部分变量
        cicle: [],
        lay: [1, 2, 3, 4, 5],//中间的五层环
        singleAngle: Math.PI * 2 / 12,//30°
        infosList: ["参观预约", "馆内须知", "展馆介绍", "展馆内容"],
        infoIndex: 0,//当前浮现的信息框的索引
        cultureList: ["航院校史", "航空历史", "重要机型", "中国航空", "航空英模", "航院校史", "航空历史", "重要机型"],
        jumpAd: ["university_history", "aerospace_history", "main_model", "China_aerospace", "aerospace_figures", "university_history", "aerospace_history", "main_model"],
        cultureShow: 1,//最大为5，当前位于中间位置显示的索引号 
        timer2: "",//滑动轮播图板块的定时器
        coverTimer: "",//遮罩延迟器
    },
    created() {
        this.cicle = Array(12).fill();
    },
    mounted() {
        let that = this;
        //第一张图片显示，其余隐藏
        $(".container .banner img:first-child").css("opacity", "1").siblings("img").css("opacity", "0");
        //定时器第一次执行需要时间，这里先手动修改一下对应轮播图的图标点
        this.dotsControl();
        this.autoShow();//自动轮播图
        this.createBall();//创建球
        this.infoPartSet();// 信息模块部分的设置
        this.cultureSlide();//航空文化板块轮播图
        this.planeOn();//纸飞机上绑定的事件
        this.formSet()//表单的事件绑定
        this.imgDrug()//航空谱系图拖动
    },
    methods: {
        //头部部分函数开始
        autoShow() {
            let that = this;
            this.timer1 = setInterval(function () {
                that.toggleShow();//slideShow变成下一张图片
                that.dotsControl();//对应的点也改变
            }, 4000);
        },
        toggleShow() {
            $($(".container .banner img")[this.slideShow - 1]).css("opacity", "0");
            if (this.slideShow + 1 == 8) {
                this.slideShow = 1;
            } else {
                this.slideShow++;
            }
            $($(".container .banner img")[this.slideShow - 1]).css("opacity", "1");
        },
        dotsControl() {
            let that = this;
            $(".container .banner .dots .dot").each(function (index) {
                // console.log(index);
                if (index + 1 == that.slideShow) {
                    // console.log(this);
                    $(this).addClass("show").siblings("div").removeClass("show");
                }
            });
        },
        dotsClick(e) {
            // console.log("点击事件");
            clearInterval(this.timer1);
            // console.log($(e.target).index());
            this.slideShow = $(e.target).index() + 1;
            $(e.target).addClass("show").siblings("div").removeClass("show");
            $($(".container .banner img")[this.slideShow - 1]).css("opacity", "1").siblings("img").css("opacity", "0");
            this.autoShow();//重启计时器
        },
        /**
         * 搜索框搜索点击事件
         */
        search() {
            // console.log("搜索");
            // console.log(this.searchValue);
        },
        //头部部分函数结束




        // 中间部分函数开始
        // 星球部分函数开始
        createBall() {
            $(".center").css("transform", "translateZ(80px)");
            $(".center2").css("transform", "translateZ(-100px)");
            this.sphere(1, ".cicle1");
            this.sphere(2, ".cicle2");
            this.sphere(3, ".cicle3");
            let that = this;
            $(this.lay).each(function (index) {
                // console.log(index + 1);
                let n = index + 1;
                let select = ".cicle" + n;
                that.sphere(n, select);
            });
        },
        /**
         * floor 层数 用来计算r和z值，计算出来的r用来计算x y
         * select 选择器
         * @param {} floor 
         */
        sphere(floor, select) {
            // cicles.css("transform", value);
            let that = this;
            $(select).each(function () {
                // console.log(this);
                let angleZ = that.singleAngle * floor;
                let r = 90 * Math.sin(angleZ);
                let z = 90 * Math.cos(angleZ);
                let index = $(this).index(); // 1-12
                let angle = that.singleAngle * index;//每个所在的角度
                let x = r * Math.cos(angle);
                let y = r * Math.sin(angle);
                // console.log(x + " " + y);
                let value = "translate3d(" + x + "px," + y + "px," + (z - 10) + "px)";
                $(this).css("transform", value);
            });
        },
        // 信息模块部分的设置
        infoPartSet() {
            let that = this;
            //  展馆介绍图标大小的设置
            $(".container .content .main .infos .infoPart .border-ex .planet img:eq(2)").css({
                "width": 80,
                "height": 80
            });

            // 给球体绑定悬停事件
            $(".container .content .main .infos .infoPart .border-ex .planet").hover(
                function () {//over 移到上面触发
                    $(this).parent().css({
                        "backgroundColor": "rgb(212, 100, 100, .3)",
                    });
                    $(this).parents(".infoPart").css("transform", "translateY(-20px)");
                },
                function () {//out 移出上面触发
                    $(this).parent().css({
                        "backgroundColor": "rgb(212, 100, 100, .1)",
                    });
                    $(this).parents(".infoPart").css("transform", "");
                }
            );

            // 监听页面有被卷入高度则触发板块划入
            let crollTimer = setInterval(function () {
                if ($("body,html").scrollTop() > 0) {//页面有卷入
                    // console.log("触发");
                    // 信息板块划入，检测到页面下滑触发
                    $(".container .content .main .infos .infoPart").css({
                        "animation": "infoSlide .5s linear 0s",
                        "opacity": 1,
                    });
                    clearInterval(crollTimer);
                }
            }, 250);
        },
        infoPartClick(event) {//给球体绑定点击事件
            // console.log("点击事件");
            // 为了避免点击一个球体信息框还没完全出来连点其他球体导致bug，要将兄弟元素样式取消一下
            // 所以只需要执行一次遮罩的点击事件即可因为再次点击也会触发遮罩显示，所以无碍
            // 因为遮罩取消的样式是对应index的，所以要在更改infoindex值只前执行
            this.coverClick();
            clearTimeout(this.coverTimer);

            let box = $(event.target).parents(".infoPart")[0];
            let rect = box.getBoundingClientRect();
            // console.log(rect);
            this.infoIndex = $(box).index();// 0 - 3 ,点击的第几个
            let offX = rect.x + rect.width / 2;
            let offY = rect.y + rect.height / 2;
            // DOMRect {x: 325, y: 140, width: 141, height: 141, top: 140, …}
            $(".container .content .main .infos .info").eq(this.infoIndex).css({
                "left": offX,
                "top": offY,
                "animation": "fixInfo .55s linear 0s forwards",/* 动画执行共0.55s，0.33s(60%)的位置移动到页面中央，展开时间0.22s */
            });
            $(".container .content .main .infos .info .box").eq(this.infoIndex).css({
                "animation": "makeShow 0.2s linear 0.45s forwards",//延迟0.5-0.1=0.4s，动画执行0.2s
            });
            // 如果是连点，遮罩延迟并不会取消，如果这时候再次连点取消遮罩仍会再次出现
            // 但是算了，反正点一下遮罩就没了
            // 如果要处理，应该设置一个vue变量 管这个东西，每次点击事件都先清除一下定时器
            // 因为不是在这里定义的变量，所以没有变量提升，到这里才会赋值
            this.coverTimer = setTimeout(function () {
                $(".cover").css({
                    "display": "block",
                });
            }, 560);
        },
        coverClick() {//给遮罩绑定点击事件
            // console.log("遮罩点击");
            $(".cover").css({//把遮罩display设置为none
                "display": "none",
            });
            // 恢复当前显示的信息框的原样式
            $(".container .content .main .infos .info").eq(this.infoIndex).css({
                "left": 0,
                "top": 0,
                "animation": "",
            });
            $(".container .content .main .infos .info .box").eq(this.infoIndex).css({
                "animation": "",
            });
            if (this.infoIndex == 0) {//如果此时是第一个信息框，应该恢复内部样式，避免下次打开显示不对
                $(".container .content .main .infos .order .title").text("参观预约");
                $(".container .content .main .infos .order .note").text("");
                // 切换details块显示
                $(".container .content .main .infos .order .noteBox").css("display", "block");
                $(".container .content .main .infos .order .formBox").css("display", "none");
            }
        },
        // 星球部分函数结束


        // 预约申请表函数开始
        // 切换显示表单
        // 这里是第一个信息框，点击cover关闭后，应该恢复样式设置
        toggleForm() {
            // 更换标题文字显示
            $(".container .content .main .infos .order .title").text("航空文化馆团体预约申请表");
            $(".container .content .main .infos .order .note").text("填写完毕后请联系航空文化馆负责人：13608630331（微信同名）");
            // 切换details块显示
            $(".container .content .main .infos .order .noteBox").css("display", "none");
            $(".container .content .main .infos .order .formBox").css("display", "block");
        },
        // 表单元素的一些事件绑定
        formSet() {
            let that = this;
            // input失去焦点触发
            $(".container .content .main .infos .order .details form input").blur(function () {//失去焦点时候
                that.dataCheck(this);
            });
            // date和time的input的值改变时触发
            $(".container .content .main .infos .order .details form input[type='date']").change(function () {//日期的输入框值改变时
                let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
                tomorrow = tomorrow.toISOString().split('T')[0];
                // let today = new Date().toISOString().split('T')[0];//如2024-03-28
                if (new Date($(this).val()) < new Date(tomorrow)) {//是日期且在今天之前，变成今天，然后变红框
                    $(this).val(tomorrow);
                    $(this).css("border-color", "#ff0000");
                    // console.log("日期不对");
                } else {//值没有问题，修改后变蓝框 -- 因为修改前可能已经变成了红框
                    $(this).css("border-color", "#0073ff");
                }
            });
            $(".container .content .main .infos .order .details form input[type='time']").change(function () {//时间的输入框值改变时
                $(this).css("border-color", "#0073ff");//和日期框一样原因
            });
        },
        // 检验数据格式是否正确
        dataCheck(ele) {
            let isValid = 1;//1为数据合格，0为数据不合格，作为检验数据的返回值
            let val = $(ele).val();
            let index = $(ele).index();
            if (val == "" || /^\s*$/.test(val)) {//没有值,或是空白字符串（包括空格、制表符、换行符等）
                $(ele).css("border-color", "#ff0000");
                isValid = 0;
                // console.log(index + "没有值");
            } else if (index == 5 && !(/^\d{11}$/.test(val))) {//是电话，且检验格式不正确
                $(ele).css("border-color", "#ff0000");
                isValid = 0;
                // console.log("电话不对");
            } else if (index == 7 && val < 16) {// 是人数，且小于16人 //虽然默认的最小值为16，但是可以手动输入其他数字
                // 而且可以输入字符e，原因可能是有的数字表示会用到e？，不过输入e或e+数字会识别为无输入？因为输入e进入的依然是第一个if
                $(ele).css("border-color", "#ff0000");
            } else {
                $(ele).css("border-color", "#0073ff");
                // console.log("ok");
            }
            return isValid;
        },
        validateForm(event) {
          let that = this
          let check = true
          // 每个表单数据检验都会返回一个isValid值，如果有一个数据不合格为0则return false
          $('.container .content .main .infos .order .details form input').each(function () {
            if (!that.dataCheck(this)) {
              //有数据不合格
              check = false
            }
          })
          if (check) {
            //预约成功
            alert('预约成功')
            this.submitData() //上传数据&清除数据
            this.coverClick() //调用遮罩点击事件，隐藏信息框&遮罩，恢复原样式
          }
        },
        // 获取并上传数据，清除表单数据
        submitData() {
            let that = this;
            // 每次提交都是创建的一个新的formData对象，不会影响第二次提交
            // let formData = new FormData();// 创建一个新的 FormData 对象
            let data = {}
            let select = $(".container .content .main .infos .order .details form select");
            $(".container .content .main .infos .order .details form input").each(function () {
                // formData.append($(this).attr("id"), $(this).val());
                data[$(this).attr("id")] = $(this).val();
                $(this).val("");
                if ($(this).index() == 7) {
                    // formData.append(select.attr("id"), select.val());
                    data[select.attr("id")] = select.val();
                    select.val("yes");
                }
            });
            // console.log("===formData===");
            // 输出 formData 中的数据（可选）
            // for (let pair of formData.entries()) {
            //     console.log(pair[0] + ', ' + pair[1]);
            // }
            // console.log("===formData===");
            // console.log(formData);
            // console.log(data);

            // axios发送数据
            // axios.post('http://127.0.0.1:8080/form', data).then((result) => {
            //     console.log(result.data);
            // })
            axios.post('http://192.168.137.1:8080/form', data).then((result) => {
              // console.log(result.data);
            })
        },
        // 预约申请表函数结束



        // 轮播图部分开始
        // 轮播图移动
        cultureSlide() {
            let that = this;
            // 给标记绑定点击事件
            $(".container .content .main .cultures .show .sign img").click(function () {
                clearInterval(that.timer2);//清除定时器 // 点击的时候取消自动轮播，然后再恢复
                that.cultureShow = $(this).index() + 1;
                that.moveSlide();
                that.autoSlide();//绑定定时器
            });
            $(".container .content .main .cultures ul").hover(
                function () {//over 移到上面触发
                    clearInterval(that.timer2);//清除定时器
                },
                function () {//out 移出上面触发
                    that.autoSlide();//绑定定时器
                }
            )
            this.autoSlide();
        },
        moveSlide() {
            //根据cultureShow来设置ul的transform-tranlateX值
            let X = -(this.cultureShow - 1) * 400;
            $(".container .content .main .cultures ul").css({
                "transform": "translateX(" + X + "px)",
            });
        },
        autoSlide() {
            let that = this;
            this.timer2 = setInterval(function () {//点击的时候清除再绑上
                that.cultureShow++;
                that.moveSlide();
                //让自动轮播到第二个第一张位置之后，恢复到第一张的位置
                if (that.cultureShow >= 6) {//这里如果设置成>=6应该比==6更保险吧
                    // 还有未知bug，有时候还是会往回滑
                    // 有时候不在页面，后台应该会继续+1导致没图片显示了
                    setTimeout(function () {
                        //1s后执行时要再判断一次是否还是等于6
                        //如果不等于6，说明有点击事件，已经移动过了，不能执行以下操作
                        //如果有悬浮事件，依旧执行该操作，不需要处理
                        //如果等于6，说明中间没有对轮播图进行点击等操作，继续执行
                        // 但是有个bug，离开页面时候/页面后台时候似乎cultureShow继续变化，但是css效果没有生效
                        // 会延迟到回到页面才生效，所以会导致往回滑动一下的bug，不过并无大碍
                        if (that.cultureShow >= 6) {
                            that.cultureShow = 1;
                            // 1s后，恢复第一张位置的时候先把过渡动画取消再回复
                            $(".container .content .main .cultures ul").css({
                                "transition": "all 0s",
                            });
                            that.moveSlide();
                            setTimeout(function () {//恢复到第一张位置后恢复过渡动画
                                $(".container .content .main .cultures ul").css({
                                    "transition": "all 1s",
                                });
                            }, 50);
                        }
                    }, 1000);
                }
            }, 3000);
        },
        // 轮播图部分结束


        // 航空谱系部分开始
        imgDrug() {
            const img = $(".Genealogy .show img");
            // img width = 5221.47 框1200宽 marginL最大左移4021.47
            let isDown = false;
            let startX;
            let marginL;
            let originL;
            let moveNum;

            img.on({
                mousedown: function (e) {
                  e.preventDefault();
                  isDown = true
                  moveNum = 0
                  startX = e.pageX
                  console.log(startX)
                  originL = parseInt(img.css('marginLeft'))
                  console.log('左' + originL)
                },
                mouseleave: function () {
                    isDown = false;
                },
                mouseup: function () {
                    isDown = false;
                },
                mousemove: function (e) {
                    console.log("移动");
                    if (!isDown) {
                        return;
                    }
                    moveNum++;
                    console.log(moveNum);
                    let moveL = e.pageX - startX//拖动的长度
                    marginL = originL + moveL * 3;
                    // 往左拖是负值左移，右正值右移
                    if (marginL > -85) {
                        marginL = -85;
                    }
                    if (marginL < -4020 + 91) {
                        marginL = -4020 + 91;
                    }
                    img.css("marginLeft", marginL);
                },
            })
        },
        // 航空谱系部分结束

        // 中间部分函数结束



        // 留言部分函数开始
        // 留言框浮现，点击纸飞机 事件触发
        msgShow() {
            // console.log("留言框浮现");
            $(".container .content .msg").css({
                "z-index": "200",
                "opacity": 1,
            });
            $(".msgCover").css({
                "display": "block",
            });
        },
        // msg的遮罩点击函数，点击留言框消失，遮罩消失，也就是选择不留言
        msgCancel() {
            $(".container .content .msg").css({
                "z-index": "-50",
                "opacity": 0,
            });
            $(".msgCover").css({
                "display": "none",
            });
        },
        // 发送留言，发送完成后调用msgcnacel()留言框隐藏
        msgSend() {
          let isSend = true
          let value = $('.msg .details textarea').val() //获取留言内容

          // console.log(value);
          //axios向服务器发送留言
          axios.post('http://192.168.137.1:8080/msg', { msg: value }).then((result) => {
            // console.log(result.data);
            if (result.data != '发送留言数据成功') {
              alert('请输入有效留言')
              isSend = false
            }
          })
          if (!isSend) return;

          // 放在后面清除留言，发送失败就不清除了
          $('.msg .details textarea').val('') //然后清空留言框，下次打开就是空白的了
          this.msgCancel() //发送完成后留言框隐藏
          this.planeFly() //飞机起飞
        },
        // 纸飞机起飞
        planeFly() {
            $(".plane .box .test").each(function () {
                let arr = ["ap", "bp", "cp", "dp"];
                let index = $(this).index();
                let value = "rotate" + arr[index] + " 1s ease-in-out 1s forwards";
                $(this).css({
                    "animation": value,
                });
            })
            $(".plane .box").css({
                "animation": "fly 2s ease-in-out 0s forwards",
            })
            // 起飞后延迟几s后恢复/回来 -- 起飞到消失是2s，延迟1s回来，所以是3s
            setTimeout(() => {
                $(".box").css({
                    "animation": "",
                });
                $(".plane .box .test").css({
                    "animation": "",
                });
            }, 3000);
        },
        // 纸飞机上绑定的事件
        planeOn() {
            let that = this;
            $(window).resize(function () {// 处理浏览器缩放事件
                let nowVW = $(window).width();//当前视口大小 // 写效果参照的视口宽度为1692
                let x = nowVW / 1692; // 当前视口和参照视口的缩放比例
                let scaleVal = "scale(" + x + ")";
                $(".plane").css("transform", scaleVal);
                // console.log('窗口被缩放了');
            });
            $(".plane .box .test").on({
                mousemove: function (event) {
                    let x = event.offsetX;
                    let y = event.offsetY;
                    if (y > x / 2 && y <= 75 && x >= -1) {//移动到蓝色区域触发
                        // console.log("进入区域");
                        $(".plane .box .test").css({
                            "cursor": "pointer",
                        });
                        $(".plane .box .test").on("click", () => {
                            that.msgShow();//留言框浮现
                        })
                    } else {//移出蓝色区域触发
                        $(".plane .box .test").css({
                            "cursor": "",
                        });
                        $(".plane .box .test").off("click");
                    }
                },
                mouseout: function (e) {//移出飞机的元素触发--从蓝色边缘移出的情况
                    $(".plane .box .test").css({
                        "cursor": "",
                    });
                    $(".plane .box .test").off("click");
                }
            })
        },
        // 留言部分函数结束
    },
});
