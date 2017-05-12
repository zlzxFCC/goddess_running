/* 配置文件 */
var Config = {
    isIOS: (/iPhone|iPad/i).test(navigator.userAgent),

    isAndroid: (/android/i).test(navigator.userAgent),

    isMobile: (/mobile/i).test(navigator.userAgent),

    W: 640,

    H: 960,

    score: 0,

    timer: 60,

    level: 0,

    winNum: 0

};

var _timer = parseInt(Date.now() + Math.random() * 100000000000);
window.shareData = {
    "imgUrl": "http://mj28501.static.17c.cn/html5/h5mini/goddess_running/assets/img/icon.jpg",
    "timeLineLink": "http://mj28501.static.17c.cn/html5/h5mini/goddess_running/index.php?timer=" + _timer,
    "tTitle": "奔跑吧女神",
    "tContent": "奔跑吧女神"
};
var rankData = ["胖妹子", "呆萌萝莉", "邻家小妹", "小家碧玉", "眉清目秀", "窈窕淑女", "沉鱼落雁", "闭月羞花", "倾国倾城", "绝代佳人", "全民女神"];
var textArr = ["恭喜通关！", "在你不懈努力下胖妞终于变身女神！", "策划：博雅刺客工作室", "开发：付翠翠 、 陈尚俗"];

var resConfig = {
    startFunc: setup,
    wayLineSet: [0.016, 0.028, 0.052, 0.094, 0.170, 0.309, 0.562, 1],
    img: {
        path: "assets/img/",
        manifest: [{
            src: "girl1.png",
            id: "girl1"
        }, {
            src: "girl2.png",
            id: "girl2"
        }, {
            src: "girl3.png",
            id: "girl3"
        }, {
            src: "finish.png",
            id: "finish"
        }, {
            src: "lock.png",
            id: "lock"
        }, {
            src: "intent_bg.png",
            id: "intent_bg"
        }, {
            src: "num_goal.png",
            id: "num_goal"
        }, {
            src: "num_level.png",
            id: "num_level"
        }, {
            src: "backBtn.png",
            id: "backBtn"
        }, {
            src: "sureBtn.png",
            id: "sureBtn"
        }, {
            src: "run_over.png",
            id: "run_over"
        }, {
            src: "cost.png",
            id: "cost"
        }, {
            src: "unlock_bg.png",
            id: "unlock_bg"
        }, {
            src: "dollar.png",
            id: "dollar"
        }, {
            src: "subtract.png",
            id: "subtract"
        }, {
            src: "star.png",
            id: "star"
        }, {
            src: "key_up.png",
            id: "key_up"
        }, {
            src: "key_down.png",
            id: "key_down"
        }, {
            src: "key_left.png",
            id: "key_left"
        }, {
            src: "key_right.png",
            id: "key_right"
        }, {
            src: "up.png",
            id: "up"
        }, {
            src: "down.png",
            id: "down"
        }, {
            src: "left.png",
            id: "left"
        }, {
            src: "right.png",
            id: "right"
        }, {
            src: "okBtn.png",
            id: "okBtn"
        }, {
            src: "ok.png",
            id: "ok"
        }, {
            src: "no.png",
            id: "no"
        }, {
            src: "story1.png",
            id: "story1"
        }, {
            src: "story2.png",
            id: "story2"
        }, {
            src: "scuess_bg.png",
            id: "scuess_bg"
        }, {
            src: "pause_bg.png",
            id: "pause_bg"
        }, {
            src: "lose_bg.png",
            id: "lose_bg"
        }, {
            src: "continueBtn.png",
            id: "continueBtn"
        }, {
            src: "replayBtn.png",
            id: "replayBtn"
        }, {
            src: "levelBtn.png",
            id: "levelBtn"
        }, {
            src: "nextBtn.png",
            id: "nextBtn"
        }, {
            src: "shareBtn.png",
            id: "shareBtn"
        }, {
            src: "moreBtn.png",
            id: "moreBtn"
        }, {
            src: "goddess.png",
            id: "goddess"
        }, {
            src: "map.png",
            id: "map"
        }, {
            src: "1.png",
            id: "map1"
        }, {
            src: "2.png",
            id: "map2"
        }, {
            src: "3.png",
            id: "map3"
        }, {
            src: "4.png",
            id: "map4"
        }, {
            src: "5.png",
            id: "map5"
        }, {
            src: "6.png",
            id: "map6"
        }, {
            src: "7.png",
            id: "map7"
        }, {
            src: "8.png",
            id: "map8"
        }, {
            src: "9.png",
            id: "map9"
        }, {
            src: "10.png",
            id: "map10"
        }, {
            src: "11.png",
            id: "map11"
        }, {
            src: "pause.png",
            id: "pauseBtn"
        }, {
            src: "continue.png",
            id: "continuesBtn"
        }, {
            src: "bg_start.png",
            id: "bgStart"
        }, {
            src: "boyaa.png",
            id: "boyaa"
        }, {
            src: "play.png",
            id: "play"
        }, {
            src: "girl.png",
            id: "girl"
        }, { //进度条
            src: "weight.png",
            id: "weight"
        }, {
            src: "weightBar.png",
            id: "weightBar"
        }, {
            src: "text_weight.png",
            id: "text_weight"
        }, {
            src: "distance.png",
            id: "distance"
        }, {
            src: "distanceBar.png",
            id: "distanceBar"
        }, {
            src: "text_distance.png",
            id: "text_distance"
        }, {
            src: "progress1.png",
            id: "progress1"
        }, {
            src: "progress2.png",
            id: "progress2"
        }, {
            src: "number.png",
            id: "number"
        }, { //场景1
            src: "bg.png",
            id: "town"
        }, {
            src: "house1.png",
            id: "house1"
        }, {
            src: "house2.png",
            id: "house2"
        }, {
            src: "house3.png",
            id: "house3"
        }, {
            src: "grass1.png",
            id: "grass1"
        }, {
            src: "grass2.png",
            id: "grass2"
        }, {
            src: "grass3.png",
            id: "grass3"
        }, {
            src: "tree1.png",
            id: "tree1"
        }, {
            src: "tree2.png",
            id: "tree2"
        }, {
            src: "tree3.png",
            id: "tree3"
        }, {
            src: "pole.png",
            id: "pole"
        }, { //场景2
            src: "bg2.png",
            id: "grassland"
        }, {
            src: "l_fungus1.png",
            id: "l_fungus1"
        }, {
            src: "l_fungus2.png",
            id: "l_fungus2"
        }, {
            src: "l_tree1.png",
            id: "l_tree1"
        }, {
            src: "l_tree2.png",
            id: "l_tree2"
        }, {
            src: "l_tree3.png",
            id: "l_tree3"
        }, {
            src: "lr_pole2.png",
            id: "lr_pole2"
        }, {
            src: "lr_tree.png",
            id: "lr_tree"
        }, {
            src: "lr_tree2.png",
            id: "lr_tree2"
        }, {
            src: "r_fungus1.png",
            id: "r_fungus1"
        }, {
            src: "r_fungus2.png",
            id: "r_fungus2"
        }, {
            src: "r_tree2.png",
            id: "r_tree2"
        }, {
            src: "r_tree3.png",
            id: "r_tree3"
        }, {
            src: "root2.png",
            id: "root2"
        }, {
            src: "root1.png",
            id: "root1"
        }, {
            src: "tree_root1.png",
            id: "tree_root1"
        }, {
            src: "tree_root2.png",
            id: "tree_root2"
        }, {
            src: "line1.png",
            id: "line1"
        }, { //场景3
            src: "bg3.png",
            id: "beach"
        }, {
            src: "l_coconut1.png",
            id: "l_coconut1"
        }, {
            src: "l_coconut2.png",
            id: "l_coconut2"
        }, {
            src: "l_coconut3.png",
            id: "l_coconut3"
        }, {
            src: "l_shell.png",
            id: "l_shell"
        }, {
            src: "r_shell.png",
            id: "r_shell"
        }, {
            src: "l_spade1.png",
            id: "l_spade1"
        }, {
            src: "l_spade2.png",
            id: "l_spade2"
        }, {
            src: "l_umbrella1.png",
            id: "l_umbrella1"
        }, {
            src: "l_umbrella2.png",
            id: "l_umbrella2"
        }, {
            src: "l_umbrella3.png",
            id: "l_umbrella3"
        }, {
            src: "l_umbrella4.png",
            id: "l_umbrella4"
        }, {
            src: "r_boat1.png",
            id: "r_boat1"
        }, {
            src: "r_boat2.png",
            id: "r_boat2"
        }, {
            src: "r_boat3.png",
            id: "r_boat3"
        }, {
            src: "r_flag1.png",
            id: "r_flag1"
        }, {
            src: "r_flag2.png",
            id: "r_flag2"
        }, {
            src: "r_ring1.png",
            id: "r_ring1"
        }, {
            src: "r_ring2.png",
            id: "r_ring2"
        }, {
            src: "food1.png",
            id: "food1",
        }, {
            src: "food2.png",
            id: "food2",
        }, {
            src: "food3.png",
            id: "food3",
        }, {
            src: "food4.png",
            id: "food4",
        }, {
            src: "food5.png",
            id: "food5",
        }, {
            src: "food6.png",
            id: "food6",
        }, {
            src: "food7.png",
            id: "food7",
        }, {
            src: "food8.png",
            id: "food8",
        }, {
            src: "food9.png",
            id: "food9",
        }, {
            src: "food10.png",
            id: "food10",
        },{
            src:"end_banners.png",
            id:"endBanners"
        }, {
            src: "table.png",
            id: "table",
        }, {
            src: "awesome.png",
            id: "awesome",
        }, {
            src: "cool.png",
            id: "cool",
        }, {
            src: "excellent.png",
            id: "excellent",
        }, {
            src: "go.png",
            id: "go",
        }, {
            src: "good.png",
            id: "good",
        }, {
            src: "nice.png",
            id: "nice",
        }, {
            src: "ready.png",
            id: "ready",
        }, {
            src: "story_bg.png",
            id: "story_bg",
        }, {
            src: "story_blink.png",
            id: "story_blink",
        }, {
            src: "story_gd.png",
            id: "story_gd",
        }, {
            src: "story_heart1.png",
            id: "story_heart1",
        }, {
            src: "story_heart2.png",
            id: "story_heart2",
        }, {
            src: "story_light.png",
            id: "story_light",
        }, {
            src: "story_star.png",
            id: "story_star",
        }, {
            src: "eat.png",
            id: "eat",
        }, {
            src: "arrows_mobile.png",
            id: "arrows_mobile",
        }, {
            src: "arrows_pc.png",
            id: "arrows_pc",
        }, {
            src: "dialog.png",
            id: "dialog",
        }, {
            src: "hand.png",
            id: "hand",
        }]
    },
    audio: {
        path: "assets/audio/",
        manifest: [{
            src: "eat.wav",
            id: "eat"
        }]
    },
    //关卡数据，maxWeight关卡初始体重(g)，minWeight关卡目标体重(g)，distance路程(m), speed人物动画速度
    gameData: {
        level1: {
            map: "town",
            maxWeight: 100000,
            minWeight: 96000,
            distance: 2400,
            speed: 1.6
        },
        level2: {
            map: "town",
            maxWeight: 97000,
            minWeight: 92000,
            distance: 3000,
            speed: 2
        },
        level3: {
            map: "town",
            maxWeight: 92000,
            minWeight: 87000,
            distance: 3000,
            speed: 2.5
        },
        level4: {
            map: "town",
            maxWeight: 87000,
            minWeight: 80000,
            distance: 4000,
            speed: 3
        },
        level5: {
            map: "grassland",
            maxWeight: 80000,
            minWeight: 76000,
            distance: 2500,
            speed: 1.6
        },
        level6: {
            map: "grassland",
            maxWeight: 76000,
            minWeight: 71000,
            distance: 3000,
            speed: 2
        },
        level7: {
            map: "grassland",
            maxWeight: 71000,
            minWeight: 66000,
            distance: 3000,
            speed: 2.5
        },
        level8: {
            map: "grassland",
            maxWeight: 66000,
            minWeight: 60000,
            distance: 3500,
            speed: 3
        },
        level9: {
            map: "beach",
            maxWeight: 60000,
            minWeight: 55000,
            distance: 3000,
            speed: 2
        },
        level10: {
            map: "beach",
            maxWeight: 55000,
            minWeight: 45000,
            distance: 5500,
            speed: 3
        },
        level11: {
            map: "beach",
            maxWeight: 70000,
            minWeight: 43000,
            distance: 15000,
            speed: 3
        }
    },
    sceneryMap: {
        town: {
            //道路两边
            sideMap: [{
                imgName: "grass1",
                direction: "left",
                width: 67,
                height: 40,
                x: 250,
                y: 400
            }, {
                imgName: "house3",
                direction: "left",
                width: 184,
                height: 160,
                x: 220,
                y: 220
            }, {
                imgName: "pole",
                direction: "left",
                width: 24,
                height: 61,
                x: 290,
                y: 200
            }, {
                imgName: "tree2",
                direction: "left",
                width: 67,
                height: 81,
                x: 230,
                y: 100
            }, {
                imgName: "house2",
                direction: "left",
                width: 133,
                height: 117,
                x: 200,
                y: 30
            }, {
                imgName: "pole",
                direction: "left",
                width: 24,
                height: 61,
                x: 290,
                y: 30
            }, {
                imgName: "grass3",
                direction: "left",
                width: 86,
                height: 48,
                x: 140,
                y: 10
            }, {
                imgName: "tree3",
                direction: "left",
                width: 140,
                height: 170,
                x: 240,
                y: 8
            }, {
                imgName: "grass3",
                direction: "right",
                width: 86,
                height: 48,
                x: 180,
                y: 500
            }, {
                imgName: "pole",
                direction: "right",
                width: 24,
                height: 61,
                x: 270,
                y: 450
            }, {
                imgName: "house2",
                direction: "right",
                width: 133,
                height: 117,
                x: 150,
                y: 200
            }, {
                imgName: "tree2",
                direction: "right",
                width: 67,
                height: 81,
                x: 230,
                y: 200
            }, {
                imgName: "grass1",
                direction: "right",
                width: 67,
                height: 40,
                x: 280,
                y: 60
            }, {
                imgName: "pole",
                direction: "right",
                width: 24,
                height: 61,
                x: 270,
                y: 62
            }, {
                imgName: "house3",
                direction: "right",
                width: 184,
                height: 160,
                x: 220,
                y: 30
            }, {
                imgName: "tree3",
                direction: "right",
                width: 140,
                height: 170,
                x: 180,
                y: 12
            }, {
                imgName: "tree3",
                direction: "right",
                width: 140,
                height: 170,
                x: 240,
                y: 1
            }],
            wayLine: {
                imgName: "line1",
                width: 45,
                height: 101
            }
        },
        grassland: {
            //场景2：道路两边
            sideMap: [{
                imgName: "root2",
                direction: "left",
                width: 77,
                height: 42,
                x: 160,
                y: 420
            }, {
                imgName: "l_tree1",
                direction: "left",
                width: 85,
                height: 114,
                x: 260,
                y: 300
            }, {
                imgName: "l_fungus1",
                direction: "left",
                width: 27,
                height: 23,
                x: 290,
                y: 350
            }, {
                imgName: "lr_pole2",
                direction: "left",
                width: 35,
                height: 62,
                x: 300,
                y: 200
            }, {
                imgName: "tree_root2",
                direction: "left",
                width: 75,
                height: 53,
                x: 250,
                y: 170
            }, {
                imgName: "l_tree3",
                direction: "left",
                width: 153,
                height: 204,
                x: 200,
                y: 100
            }, {
                imgName: "l_fungus2",
                direction: "left",
                width: 66,
                height: 52,
                x: 280,
                y: 70
            }, {
                imgName: "l_tree1",
                direction: "left",
                width: 85,
                height: 114,
                x: 260,
                y: 50
            }, {
                imgName: "lr_pole2",
                direction: "left",
                width: 35,
                height: 62,
                x: 300,
                y: 30
            }, {
                imgName: "l_tree2",
                direction: "left",
                width: 127,
                height: 170,
                x: 230,
                y: 20
            }, {
                imgName: "l_tree2",
                direction: "left",
                width: 127,
                height: 170,
                x: 210,
                y: 8
            }, {
                imgName: "r_tree1",
                direction: "right",
                width: 44,
                height: 59,
                x: 200,
                y: 400
            }, {
                imgName: "lr_pole2",
                direction: "right",
                width: 35,
                height: 62,
                x: 290,
                y: 450
            }, {
                imgName: "r_fungus1",
                direction: "right",
                width: 27,
                height: 23,
                x: 280,
                y: 300
            }, {
                imgName: "r_tree3",
                direction: "right",
                width: 108,
                height: 145,
                x: 230,
                y: 460
            }, {
                imgName: "r_tree1",
                direction: "right",
                width: 44,
                height: 59,
                x: 200,
                y: 360
            }, {
                imgName: "r_tree3",
                direction: "right",
                width: 108,
                height: 145,
                x: 230,
                y: 260
            }, {
                imgName: "r_tree1",
                direction: "right",
                width: 44,
                height: 59,
                x: 200,
                y: 160
            }, {
                imgName: "r_tree3",
                direction: "right",
                width: 108,
                height: 145,
                x: 200,
                y: 100
            }, {
                imgName: "r_tree1",
                direction: "right",
                width: 44,
                height: 59,
                x: 200,
                y: 80
            }, {
                imgName: "lr_pole2",
                direction: "right",
                width: 35,
                height: 62,
                x: 290,
                y: 62
            }, {
                imgName: "r_tree2",
                direction: "right",
                width: 184,
                height: 160,
                x: 220,
                y: 30
            }, {
                imgName: "r_fungus2",
                direction: "right",
                width: 49,
                height: 40,
                x: 280,
                y: 20
            }, {
                imgName: "r_tree2",
                direction: "right",
                width: 184,
                height: 160,
                x: 200,
                y: 10
            }, {
                imgName: "root2",
                direction: "right",
                width: 77,
                height: 42,
                x: 280,
                y: 1
            }],
            wayLine: {
                imgName: "tree_root2",
                width: 75,
                height: 53
            }
        },
        beach: {
            //场景3：道路两边
            sideMap: [{
                imgName: "l_coconut3",
                direction: "left",
                width: 86,
                height: 110,
                x: 20,
                y: 300
            }, {
                imgName: "l_coconut2",
                direction: "left",
                width: 37,
                height: 49,
                x: 50,
                y: 200
            }, {
                imgName: "l_coconut1",
                direction: "left",
                width: 23,
                height: 29,
                x: 100,
                y: 100
            }, {
                imgName: "l_umbrella4",
                direction: "left",
                width: 204,
                height: 223,
                x: 250,
                y: 400
            }, {
                imgName: "l_umbrella3",
                direction: "left",
                width: 152,
                height: 170,
                x: 250,
                y: 220
            }, {
                imgName: "l_spade2",
                direction: "left",
                width: 36,
                height: 45,
                x: 290,
                y: 200
            }, {
                imgName: "l_umbrella2",
                direction: "left",
                width: 101,
                height: 110,
                x: 230,
                y: 100
            }, {
                imgName: "l_umbrella1",
                direction: "left",
                width: 54,
                height: 52,
                x: 230,
                y: 80
            }, {
                imgName: "l_spade1",
                direction: "left",
                width: 23,
                height: 27,
                x: 290,
                y: 60
            }, {
                imgName: "l_umbrella3",
                direction: "left",
                width: 152,
                height: 170,
                x: 250,
                y: 50
            }, {
                imgName: "l_umbrella2",
                direction: "left",
                width: 101,
                height: 110,
                x: 230,
                y: 30
            }, {
                imgName: "l_umbrella2",
                direction: "left",
                width: 101,
                height: 110,
                x: 230,
                y: 10
            }, {
                imgName: "r_ring2",
                direction: "right",
                width: 62,
                height: 37,
                x: 180,
                y: 500
            }, {
                imgName: "r_flag2",
                direction: "right",
                width: 24,
                height: 27,
                x: 270,
                y: 450
            }, {
                imgName: "r_boat3",
                direction: "right",
                width: 145,
                height: 150,
                x: 150,
                y: 200
            }, {
                imgName: "r_boat2",
                direction: "right",
                width: 75,
                height: 75,
                x: 230,
                y: 200
            }, {
                imgName: "r_ring1",
                direction: "right",
                width: 37,
                height: 22,
                x: 280,
                y: 60
            }, {
                imgName: "r_flag1",
                direction: "right",
                width: 14,
                height: 14,
                x: 270,
                y: 62
            }, {
                imgName: "r_boat1",
                direction: "right",
                width: 30,
                height: 33,
                x: 220,
                y: 30
            }, {
                imgName: "r_boat3",
                direction: "right",
                width: 145,
                height: 150,
                x: 180,
                y: 12
            }, {
                imgName: "r_boat3",
                direction: "right",
                width: 145,
                height: 150,
                x: 240,
                y: 1
            }],
            wayLine: {
                imgName: "l_shell",
                width: 45,
                height: 101
            }
        }
    },
    //障碍物种类 calorie:卡路里 motion:回避动作(0:必须绕开，1:可跳过, 2:可卧倒穿过)
    foodKind: {
        food1: {
            calorie: 100,
            img: "food1",
            width: 171,
            height: 164,
            motion: 1
        },
        food2: {
            calorie: 100,
            img: "food2",
            width: 290,
            height: 94,
            motion: 1
        },
        food3: {
            calorie: 100,
            img: "food3",
            width: 290,
            height: 142,
            motion: 1
        },
        food4: {
            calorie: 100,
            img: "food4",
            width: 290,
            height: 123,
            motion: 1
        },
        food5: {
            calorie: 150,
            img: "food5",
            width: 290,
            height: 137,
            motion: 1
        },
        food6: {
            calorie: 150,
            img: "food6",
            width: 290,
            height: 141,
            motion: 1
        },
        food7: {
            calorie: 160,
            img: "food7",
            width: 290,
            height: 145,
            motion: 2
        },
        food8: {
            calorie: 160,
            img: "food8",
            width: 290,
            height: 113,
            motion: 2
        },
        food9: {
            calorie: 160,
            img: "food9",
            width: 290,
            height: 249,
            motion: 0
        },
        food10: {
            calorie: 160,
            img: "food10",
            width: 290,
            height: 234,
            motion: 0
        },
    },
    //关卡障碍物[离下一个障碍物的距离，障碍物组合id]
    levelMap: {
        level1: [
            [100, 8],
            [30, 0],
            [70, -1], //左右移动引导
            [30, 6],
            [70, -2], //跳跃引导
            [30, 17],
            [70, -3], //卧下引导
            [50, 0],
            [70, -4], //获胜条件引导
            [80, 17],
            [85, 19],
            [80, 10],
            [85, 11],
            [85, 12],
            [85, 6],
            [85, 15],
            [85, 1],
            [85, 7],
            [85, 27],
            [85, 22],
            [85, 17],
            [85, 29],
            [85, 28],
            [85, 21],
            [80, 36],
            [0, 0],
        ],
        level2: [
            [90, 1],
            [100, 19],
            [90, 31],
            [90, 42],
            [100, 19],
            [80, 24],
            [50, 1],
            [40, 2],
            [50, 1],
            [100, 3],
            [110, 27],
            [100, 18],
            [100, 45],
            [100, 40],
            [100, 23],
            [100, 18],
            [50, 3],
            [70, 27],
            [80, 28],
            [70, 29],
            [50, 42],
            [80, 46],
            [70, 29],
            [70, 36],
            [60, 21],
            [50, 18],
            [100, 6],
            [50, 3],
            [100, 7],
            [50, 21],
            [100, 31],
            [50, 23],
            [80, 33],
            [100, 22],
            [70, 29],
            [0, 0],
        ],
        level3: [
            [70, 0],
            [60, 10],

            [50, 1],
            [40, 12],
            [40, 2],
            [40, 10],
            [40, 2],
            [40, 12],
            [120, 3],

            [80, 17],
            [80, 19],
            [90, 20],
            [80, 32],
            [80, 3],
            [60, 27],
            [50, 11],
            [80, 42],
            [50, 0],

            [40, 10],
            [40, 12],
            [40, 10],
            [50, 12],
            [50, 0],
            [40, 12],
            [40, 11],
            [40, 10],
            [40, 12],
            [40, 11],
            [90, 10],

            [80, 20],
            [110, 29],
            [90, 25],
            [80, 9],
            [80, 1],

            [50, 0],
            [40, 10],
            [40, 0],
            [40, 12],
            [40, 0],
            [40, 10],
            [40, 0],
            [40, 12],
            [40, 0],
            [40, 10],
            [70, 0],
            [100, 7],

            [90, 27],
            [0, 0],
        ],
        level4: [
            [70, 25],
            [80, 10],
            [70, 12],
            [80, 43],
            [70, 44],
            [55, 0],
            [50, 1],
            [45, 2],
            [40, 3],
            [45, 4],
            [50, 5],
            [45, 4],
            [40, 3],
            [45, 2],
            [50, 1],
            [100, 0],

            [60, 18],
            [60, 17],
            [60, 19],
            [60, 0],
            [60, 42],
            [60, 32],
            [60, 47],
            [60, 42],
            [60, 43],
            [60, 45],
            [60, 44],
            [60, 42],
            [100, 47],

            [60, 0],
            [60, 18],
            [55, 1],
            [60, 17],
            [50, 2],
            [60, 19],
            [45, 3],
            [60, 0],
            [50, 4],
            [60, 42],
            [55, 5],
            [60, 32],
            [50, 4],
            [60, 47],
            [45, 3],
            [60, 42],
            [50, 2],
            [60, 43],
            [55, 1],
            [60, 45],
            [50, 0],
            [60, 44],
            [55, 1],
            [60, 42],
            [55, 2],
            [100, 47],

            [60, 27],
            [60, 47],
            [60, 45],
            [60, 42],
            [50, 32],
            [50, 10],
            [50, 12],
            [50, 0],
            [0, 0],
        ],
        level5: [
            [60, 8],
            [60, 20],
            [60, 9],
            [60, 20],
            [60, 19],
            [60, 17],
            [60, 20],
            [80, 0],
            [55, 11],
            [55, 45],
            [55, 18],
            [55, 8],
            [55, 36],
            [55, 18],
            [55, 17],
            [55, 20],
            [55, 0],
            [55, 19],
            [55, 20],
            [55, 17],
            [55, 0],
            [50, 1],
            [90, 2],
            [55, 45],
            [55, 18],
            [55, 17],
            [55, 19],
            [55, 0],
            [55, 17],
            [50, 19],
            [50, 17],
            [50, 19],
            [50, 17],
            [50, 18],
            [80, 42],
            [80, 36],
            [70, 27],
            [70, 19],
            [70, 0],
            [0, 0],
        ],
        level6: [
            [60, 0],
            [60, 27],
            [60, 22],
            [60, 23],
            [60, 22],
            [60, 21],
            [60, 22],
            [60, 23],
            [60, 22],
            [60, 32],
            [60, 41],
            [60, 42],
            [80, 27],

            [50, 10],
            [50, 12],
            [50, 10],
            [50, 12],
            [50, 0],

            [55, 27],
            [55, 0],
            [55, 22],
            [50, 1],
            [55, 23],
            [45, 2],
            [55, 22],
            [40, 3],
            [55, 21],
            [45, 4],
            [55, 22],
            [50, 5],
            [55, 23],
            [45, 4],
            [55, 22],
            [40, 3],
            [55, 32],
            [45, 2],
            [55, 41],
            [50, 1],
            [55, 42],
            [80, 27],

            [60, 0],
            [60, 36],
            [50, 10],
            [60, 32],
            [50, 10],
            [60, 33],
            [50, 12],
            [90, 32],

            [50, 1],
            [40, 6],
            [0, 0],
        ],
        level7: [
            [65, 0],
            [65, 6],
            [65, 36],
            [65, 32],
            [65, 33],
            [65, 32],
            [65, 36],
            [65, 32],
            [65, 33],
            [65, 32],
            [50, 10],
            [50, 12],
            [50, 10],
            [50, 12],
            [100, 0],

            [60, 36],
            [55, 0],
            [60, 32],
            [50, 1],
            [60, 33],
            [50, 2],
            [60, 32],
            [50, 3],
            [60, 31],
            [50, 4],
            [60, 32],
            [50, 5],
            [60, 33],
            [50, 4],
            [60, 32],
            [50, 2],
            [60, 31],
            [50, 1],
            [60, 32],
            [55, 0],
            [55, 8],

            [60, 22],
            [50, 10],
            [60, 32],
            [50, 12],
            [60, 23],
            [50, 10],
            [60, 32],
            [50, 12],
            [60, 21],
            [50, 10],
            [60, 32],
            [60, 0],
            [0, 0],
        ],
        level8: [
            [45, 1],
            [40, 2],
            [35, 3],
            [40, 4],
            [80, 5],

            [50, 20],
            [45, 7],
            [40, 0],
            [45, 6],
            [50, 1],
            [45, 7],
            [40, 2],
            [45, 6],
            [50, 3],
            [45, 7],
            [40, 4],
            [45, 6],
            [50, 5],

            [65, 22],
            [65, 31],
            [65, 25],
            [65, 33],
            [65, 0],
            [65, 32],
            [65, 21],
            [65, 35],

            [60, 22],
            [60, 33],
            [60, 17],
            [60, 19],
            [60, 32],
            [60, 21],
            [60, 19],
            [60, 17],
            [55, 22],
            [55, 17],
            [55, 19],
            [55, 17],
            [50, 19],
            [50, 17],
            [45, 19],
            [45, 17],
            [80, 19],

            [55, 22],
            [55, 33],
            [55, 23],
            [55, 32],
            [55, 21],
            [50, 31],
            [50, 22],
            [50, 33],
            [50, 23],
            [50, 32],
            [50, 21],
            [70, 31],

            [50, 1],
            [45, 2],
            [40, 0],
            [50, 6],
            [40, 3],
            [60, 7],
            [0, 0],
        ],
        level9: [
            [50, 8],
            [50, 20],
            [50, 0],
            [60, 33],
            [50, 17],
            [50, 22],
            [60, 6],
            [50, 21],
            [50, 19],
            [60, 32],
            [40, 0],
            [40, 0],
            [50, 0],

            [40, 23],
            [60, 23],
            [50, 17],
            [40, 22],
            [50, 22],
            [60, 6],
            [40, 21],
            [50, 21],
            [50, 19],
            [40, 22],
            [60, 22],

            [50, 8],
            [45, 23],
            [45, 42],
            [50, 0],
            [45, 21],
            [45, 42],

            [50, 0],
            [45, 23],
            [45, 42],
            [50, 0],
            [45, 21],
            [45, 42],

            [45, 47],
            [45, 27],
            [45, 23],
            [45, 10],
            [45, 12],
            [45, 21],
            [45, 12],
            [45, 10],
            [45, 23],
            [45, 10],
            [45, 12],
            [45, 21],
            [45, 12],
            [45, 10],
            [55, 23],
            [55, 21],
            [55, 23],
            [55, 21],
            [55, 22],
            [55, 27],
            [55, 22],
            [0, 0],

        ],
        level10: [
            [20, 8],
            [20, 0],
            [50, 11],
            [20, 8],
            [20, 0],
            [50, 11],
            [20, 8],
            [20, 0],
            [50, 11],

            [55, 22],
            [55, 27],
            [55, 22],

            [65, 23],
            [65, 21],
            [65, 23],
            [65, 21],
            [65, 23],
            [65, 21],

            [55, 22],
            [55, 27],
            [55, 22],

            [55, 0],
            [50, 1],
            [45, 2],
            [40, 3],
            [45, 4],
            [50, 5],
            [45, 4],
            [40, 3],
            [40, 2],
            [40, 1],
            [100, 0],

            [55, 42],
            [55, 32],
            [65, 23],
            [65, 21],
            [55, 23],
            [55, 47],
            [55, 42],
            [55, 22],
            [55, 27],
            [65, 22],
            [65, 33],
            [65, 31],
            [65, 33],
            [60, 31],
            [55, 35],

            [50, 23],
            [30, 10],
            [30, 10],
            [30, 0],
            [40, 10],
            [50, 21],
            [30, 12],
            [30, 2],
            [30, 12],
            [30, 12],
            [60, 27],

            [50, 19],
            [30, 17],
            [20, 0],
            [20, 11],
            [30, 0],
            [50, 17],
            [30, 19],
            [20, 0],
            [20, 11],
            [30, 0],
            [50, 19],
            [30, 17],
            [20, 0],
            [20, 11],
            [30, 0],
            [60, 17],
            [60, 23],
            [50, 21],
            [30, 19],
            [20, 0],
            [20, 11],
            [30, 0],
            [60, 19],
            [60, 21],
            [50, 23],
            [30, 17],
            [20, 0],
            [20, 11],
            [30, 0],
            [60, 17],
            [60, 23],
            [50, 21],
            [30, 19],
            [20, 0],
            [20, 11],
            [60, 0],


            [30, 22],
            [25, 11],
            [25, 0],
            [25, 12],
            [25, 0],
            [25, 11],
            [25, 0],
            [25, 10],
            [25, 0],
            [25, 11],
            [25, 0],
            [25, 12],
            [25, 0],
            [25, 11],
            [25, 0],
            [25, 10],
            [25, 0],
            [25, 11],
            [25, 0],
            [25, 12],
            [25, 0],
            [25, 11],
            [25, 0],
            [25, 10],
            [25, 0],
            [25, 11],
            [25, 0],
            [25, 12],
            [25, 0],
            [25, 11],
            [25, 0],
            [25, 10],
            [25, 0],
            [60, 11],

            [30, 22],
            [60, 42],
            [30, 22],
            [60, 42],
            [0, 0],
        ],
        level11: [21, 50],
    },
    //障碍物组合
    foodGroup: [
        [1, 1, 1], // 0
        [2, 2, 2], // 1
        [3, 3, 3], // 2
        [4, 4, 4], // 3
        [5, 5, 5], // 4
        [6, 6, 6], // 5
        [7, 7, 7], // 6
        [8, 8, 8], // 7
        [0, 9, 0], // 8
        [0, 10, 0], //9

        [0, 1, 1], //10
        [2, 0, 2], //11
        [3, 3, 0], //12
        [0, 7, 7], //13
        [7, 0, 7], //14
        [8, 0, 8], //15
        [8, 8, 0], //16
        [0, 9, 9], //17
        [9, 0, 9], //18
        [9, 9, 0], //19
        [9, 0, 9], // 20

        //绕+跳
        [1, 9, 9], //21
        [9, 2, 9], //22
        [9, 9, 3], //23
        [4, 10, 10], //24
        [10, 5, 10], //25
        [10, 10, 6], //26
        [1, 9, 1], //27
        [9, 3, 3], //28
        [2, 10, 2], //29
        [4, 4, 10], //30

        //绕+卧
        [7, 9, 9], //31
        [9, 7, 9], //32
        [9, 9, 7], //33
        [8, 9, 9], //34
        [9, 8, 9], //35
        [8, 10, 8], //36
        [7, 7, 10], //37
        [10, 8, 8], //38
        [9, 7, 7], //39
        [10, 7, 10], //40

        //跳+卧
        [7, 1, 1], //41
        [2, 7, 2], //42
        [3, 3, 7], //43
        [8, 4, 4], //44
        [5, 8, 5], //45
        [6, 6, 8], //46
        [7, 1, 7], //47
        [7, 7, 2], //48
        [8, 3, 8], //49
        [4, 8, 8], //50
    ]
};

function setup() {
    createjs.DisplayObject.prototype.onTap = function(cb) {
        this.on("mousedown", function(event) {
            event.stopPropagation();
            cb(event);
        });
    };
    Run.init();
}