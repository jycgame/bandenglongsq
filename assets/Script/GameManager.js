var EnergySoulPool = require('EnergySoulPool');
var ScoreSoulPool = require('ScoreSoulPool');
var CoinEffectPool = require('CoinEffectPool');
var CoinAnimPool = require('CoinAnimPool');
var NodeStatus = require('NodeStatus');
var UserDataConnector = require('UserDataConnector');
var RankManager = require('RankManager');
var GameRes = require('GameRes');
var Main = require('Main');
var BigCoinScore = require('BigCoinScore');
var BuffControl = require('BuffControl');
var FinalRank = require('FinalRank');

var GameManager = cc.Class({
    extends: cc.Component,
    properties: {
        coinEffectIntervalMin: 2,
        coinEffectIntervalMax: 5,
        coinEffectNum: 3,
        coinEffectCountX: 6,
        coinEffectCountY: 6,

        speedFactor: 1,
        speed: 100,
        initialDir: new cc.Vec2(0, 1),
        dragonBodyGap: 100,
        //enermyAttackThrehold: 5,
        bigCoinThrehold: 5,

        bigCoinNumLabel: cc.Label,

        FinalRank: {
            default: null,
            type: FinalRank,
        },
        BuffControl: {
            default: null,
            type: BuffControl,
        },

        headNode: {
            default: null,
            type: cc.Node,
        },

        HUDNode:
        {
            default: null,
            type: cc.Node,
        },

        PlayerInfoNode: {
            default: null,
            type: cc.Node,
        },

        GameRes: {
            default: null,
            type: GameRes,
        },

        DataManagerNode:
        {
            default: null,
            type: cc.Node,
        },

        AudioManagerNode:
        {
            default: null,
            type: cc.Node,
        },
        EnermyAttackManagerNode:
        {
            default: null,
            type: cc.Node,
        },
        RankManager:
        {
            default: null,
            type: RankManager,
        },
        gridNode:
        {
            default: null,
            type: cc.Node,
        },

        smallCoin:
        {
            default: null,
            type: cc.Prefab,
        },

        bigCoinPrefab: {
            default: null,
            type: cc.Prefab,
        },

        trap:
        {
            default: null,
            type: cc.Prefab,
        },
        crayfish:
        {
            default: null,
            type: cc.Prefab,
        },
        crab:
        {
            default: null,
            type: cc.Prefab,
        },
        bun:
        {
            default: null,
            type: cc.Prefab,
        },
        //sysj:
        //{
        //    default: null,
        //    type: cc.Prefab,
        //},
        //jcwd:
        //{
        //    default: null,
        //    type: cc.Prefab,
        //},


        bgAudio1:
        {
            default: null,
            type: cc.AudioSource,
        },

        bgAudio2:
        {
            default: null,
            type: cc.AudioSource,
        },

        coinAudio1:
        {
            default: null,
            type: cc.AudioSource,
        },

        coinAudio2:
        {
            default: null,
            type: cc.AudioSource,
        },

        bunAudio1:
        {
            default: null,
            type: cc.AudioSource,
        },

        bunAudio2:
        {
            default: null,
            type: cc.AudioSource,
        },

        wordAudio:
        {
            default: null,
            type: cc.AudioSource,
        },

        phraseAudio:
        {
            default: null,
            type: cc.AudioSource,
        },

        crabAudio1:
        {
            default: null,
            type: cc.AudioSource,
        },

        crabAudio2:
        {
            default: null,
            type: cc.AudioSource,
        },

        crayfishAudio:
        {
            default: null,
            type: cc.AudioSource,
        },

        crayfishAudio:
        {
            default: null,
            type: cc.AudioSource,
        },

        crayfishAudio:
        {
            default: null,
            type: cc.AudioSource,
        },

        //jcwdUINode:
        //{
        //    default: null,
        //    type: cc.Node,
        //},

        //sysjUINode:
        //{
        //    default: null,
        //    type: cc.Node,
        //},

        //jcwdGray: {
        //    default: [],
        //    type: [cc.SpriteFrame]
        //},

        //jcwdColor: {
        //    default: [],
        //    type: [cc.SpriteFrame]
        //},

        //sysjGray: {
        //    default: [],
        //    type: [cc.SpriteFrame]
        //},

        //sysjColor: {
        //    default: [],
        //    type: [cc.SpriteFrame]
        //},

        cheerImg: {
            default: null,
            type: cc.SpriteFrame
        },

        newRecImg: {
            default: null,
            type: cc.SpriteFrame
        },

        dragonNode: {
            default: null,
            type: cc.Node,
        },

        GoldsNode: {
            default: null,
            type: cc.Node,
        },
        energySoulPrefab: {
            default: null,
            type: cc.Prefab,
        },

        scoreSoulPrefab: {
            default: null,
            type: cc.Prefab,
        },

        cameraNode: {
            default: null,
            type: cc.Node,
        },

        coinEffectPrefab: {
            default: null,
            type: cc.Prefab,
        },

        coinAnimPrefab: {
            default: null,
            type: cc.Prefab,
        },

        Main: {
            default: null,
            type: Main,
        },

        teleportGatePrefab: {
            default: null,
            type: cc.Prefab,
        },

        paibianNode: {
            default: null,
            type: cc.Node,
        },

        BigCoinScore: {
            default: null,
            type: BigCoinScore,
        }
    },

    invincible: null,
    invincibleSYSJ: null,
    scoreLabel: null,
    score: null,
    scoreFactor: null,
    highscore: null,
    highscoreLabel: null,
    levelLabel: null,
    level: null,
    DataManager: null,
    AudioManager: null,
    dragonHead: null,
    bunTimeout: null,
    crabTimeout: null,
    spawnNodeTimeoutList: null,
    crayfishTimeout: null,
    bgAudioTimeout: null,


    trapNum: null,
    specialItemNum: null,

    sysjIndex: null,
    jcwdIndex: null,

    NextSysjIndex: null,
    NextJcwdIndex: null,

    JCWDwords: null,
    SYSJwords: null,

    curBodyLength: null,
    newSpriteNode: null,
    speedUpScore: null,
    curSpeedUpDataIndex: null,
    enermyAttackScore: null,
    enermyAttackV2Score: null,
    gird: null,
    EnermyAttackManager: null,
    curBGM: null,
    enermyAttackV2ThreholdIndex: null,
    bRecoverCrabBuff: null,
    recoverCrabBuffTime: null,
    recoverCrabBuffFactor: null,
    gameStarted: null,
    onLoad: function () {
        this.FinalRank.init();
        cc.director.resume();

        if (!window.playAgain) {
            this.bgAudio1.play();
            this.curBGM = this.bgAudio1;
            this.bgAudioTimeout = setTimeout(function () {
                this.bgAudio1.stop();
                this.bgAudio2.play();
                this.curBGM = this.bgAudio2;
            }.bind(this), this.bgAudio1.getDuration() * 1000);
        }
        else {
            this.bgAudio2.play();
            this.curBGM = this.bgAudio2;
        }


        this.invincible = false;
        this.invincibleSYSJ = false;
        this.bRecoverCrabBuff = false;
        this.recoverCrabBuffTime = 0;
        this.recoverCrabBuffFactor = 0;
        this.socre = 0;
        this.level = 1;
        this.scoreFactor = 1;
        this.scoreLabel = this.PlayerInfoNode.children[1].getComponent(cc.Label);
        this.levelLabel = this.PlayerInfoNode.children[0].getComponent(cc.Label);
        this.highscoreLabel = this.PlayerInfoNode.children[2].getComponent(cc.Label);
        this.DataManager = this.DataManagerNode.getComponent("DataManager");
        this.AudioManager = this.AudioManagerNode.getComponent("AudioManager");
        this.dragonHead = this.headNode.getComponent("DragonHead")
        this.dragon = this.dragonNode.getComponent("Dragon");
        this.grid = this.gridNode.getComponent("Grid");
        this.EnermyAttackManager = this.EnermyAttackManagerNode.getComponent("EnermyAttackManager");
        this.bigCoinNumLabel.string = "0";
        this.bigCoinNum = 0;

        this.time = 0;
        this.trapNum = 0;
        this.specialItemNum = 0;

        this.sysjIndex = 3;
        this.jcwdIndex = 3;

        this.NextSysjIndex = 3;
        this.NextJcwdIndex = 3;

        this.JCWDwords = [];
        this.SYSJwords = [];

        this.spawnNodeTimeoutList = [];
        this.curBodyLength = 1;
        this.curSpeedUpDataIndex = 0;
        var sceneName = cc.director.getScene().name;

        //this.highscore = cc.sys.localStorage.getItem('highscore' + sceneName.split('_')[1]);
        //if (this.highscore)
        //    this.highscoreLabel.string = this.highscore;

        this.speedUpScore = 0;
        this.enermyAttackScore = 0;
        this.enermyAttackV2Score = 0;

        this.enermyAttackV2ThreholdIndex = 0;
        this.gameStarted = false;
        this.inputEnabled = false;

        this.initCoinPool();

        EnergySoulPool.init(this.energySoulPrefab);
        ScoreSoulPool.init(this.scoreSoulPrefab, this.HUDNode)

        CoinEffectPool.init(this.coinEffectPrefab, this.coinEffectNum);
        this.coinEffectInterval = this.coinEffectIntervalMin + Math.random() * (this.coinEffectIntervalMax - this.coinEffectIntervalMin);
        this.coinEffectTime = 0;

        UserDataConnector.init();
        if (!window.playAgain) {
            UserDataConnector.getUserId();
            UserDataConnector.getUserData(this.RankManager, this.RankManager.setTop5);
        }
        else
            this.Main.skip();

        CoinAnimPool.init(this.coinAnimPrefab, 20, this.paibianNode);
        this.teleportGateSpawned = false;
        this.bigCoinRoad = []
        for (var i = 3; i < 11; i++) {
            this.bigCoinRoad.push(this.grid.nodes[17][i]);
        }
        this.bigCoinSpawned = false;
        this.bigCoinTime = 0;
        this.score = 0;
        this.BigCoinScore.init();
    },

    addNum: function () {
        this.bigCoinNumLabel.string = ++this.bigCoinNum;
        if (this.bigCoinNum >= 13) {
            this.gameStarted = false;
            this.inputEnabled = false;

            this.curBGM.stop();
            this.speed = 0;
            this.bRecoverCrabBuff = false;
            this.PlayerInfoNode.active = false;
            this.clearAllTimeout();
            this.GameRes.node.active = true;
            this.GameRes.setup(this.newRecImg,this.level, this.score, this.time);
        }
    },

    destroyBigCoins: function () {
        for (var i = 0; i < this.bigCoinRoad.length; i++) {
            var itemNode = this.bigCoinRoad[i].itemNode;
            if (itemNode != null) {
                if (itemNode.getComponent("BigCoin") != null) {
                    this.spawnNode(itemNode.position, itemNode.parent);
                    itemNode.destroy();
                }
            }
        }
    },

    spawnBigCoin: function () {
        for (var i = 0; i < this.bigCoinRoad.length; i++) {
            var itemNode = this.bigCoinRoad[i].itemNode;
            if (itemNode != null) {
                if (itemNode.getComponent("SmallCoin") != null)
                    this.destroyCoin(itemNode);
                else
                    itemNode.destroy();
            }
            var bigCoinNode = cc.instantiate(this.bigCoinPrefab);
            var bigCoin = bigCoinNode.getComponent("BigCoin");
            bigCoin.GameManager = this;
            bigCoin.AudioManager = this.AudioManager;
            bigCoin.DataManager = this.DataManager;
            bigCoin.BigCoinScore = this.BigCoinScore;
            bigCoinNode.parent = this.GoldsNode;

            bigCoinNode.position = this.bigCoinRoad[i].node.position;
            this.bigCoinRoad[i].itemNode = bigCoinNode;
        }
        this.BigCoinScore.show();
        this.bigCoinSpawned = true;
    },

    resetDragon: function () {
        this.dragonNode.children[0].getComponent('DragonHead').reset();
        var posY = -1499;
        for (var i = 1; i < this.dragonNode.childrenCount; i++) {
            var bodyNode = this.dragonNode.children[i];
            var body = null;

            if (i == 1) {
                posY -= 100;
                body = bodyNode.getComponent("DragonBody");
            }

            else if (i == this.dragonNode.childrenCount - 1) {
                posY -= 100;
                body = bodyNode.getComponent("DragonTail");
            }
            else {
                posY -= 68;
                body = bodyNode.getComponent("DragonBody");
            }
            body.reset(new cc.Vec2(639, posY));
        }
    },

    initCoinPool: function () {
        this.coinPool = new cc.NodePool();
        this.coinPoolCount = 80;
        for (let i = 0; i < this.coinPoolCount; ++i) {
            let coin = cc.instantiate(this.smallCoin); // 创建节点
            this.coinPool.put(coin); // 通过 putInPool 接口放入对象池
        }
    },

    createCoin: function () {
        let coin = null;
        if (this.coinPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            coin = this.coinPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            coin = cc.instantiate(this.smallCoin);
        }
        return coin;
    },

    destroyCoin: function (coin) {
        if (this.coinPool.size() < this.coinPoolCount) {
            this.coinPool.put(coin);
        }
        else
            coin.destroy();
    },

    update: function (dt) {
        if (this.gameStarted) {
            this.time += dt;
            this.EnermyAttackManager.update1(dt);
            for (var i = 0; i < this.dragonNode.childrenCount; i++) {
                if (i == 0)
                    this.dragonNode.children[i].getComponent("DragonHead").update1(dt);
                else if (i == this.dragonNode.childrenCount - 1)
                    this.dragonNode.children[i].getComponent("DragonTail").update1(dt);
                else
                    this.dragonNode.children[i].getComponent("DragonBody").update1(dt);
            }

            if (this.bigCoinSpawned) {
                this.bigCoinTime += dt;
                if (this.bigCoinTime >= this.bigCoinThrehold) {
                    this.destroyBigCoins();
                    this.BigCoinScore.hide();
                    this.bigCoinTime = 0;
                    this.bigCoinSpawned = false;
                }
            }
        }

        if (this.bRecoverCrabBuff) {
            this.recoverCrabBuffTime += dt;
            var ratio = this.recoverCrabBuffTime / this.DataManager.crabBuffRecoverTime;
            if (ratio >= 1) {
                this.speedFactor = 1;
                this.bRecoverCrabBuff = false;
                this.recoverCrabBuffTime = 0;
            }
            else
                this.speedFactor = this.recoverCrabBuffFactor + ratio * (1 - this.recoverCrabBuffFactor);
        }

        this.coinEffectTime += dt;
        if (this.coinEffectTime >= this.coinEffectInterval) {
            this.coinEffect();
            this.coinEffectInterval = this.coinEffectIntervalMin + Math.random() * (this.coinEffectIntervalMax - this.coinEffectIntervalMin);
            this.coinEffectTime = 0;
        }
    },

    spawnTeleportGate: function () {
        var gridNode = this.grid.getNodeFromPosition(this.cameraNode.position);
        var gridNodesNearby = [];
        var xCount = 4;
        var yCount = 4;
        for (var i = gridNode.x - xCount / 2; i < gridNode.x + xCount; i++) {
            for (var j = gridNode.y - yCount / 2; j < gridNode.y + yCount; j++) {
                var node = this.grid.nodes[i][j];
                if (node != null && node.nodeStatus === NodeStatus.NORMAL) {
                    var dist = Math.abs(node.x - gridNode.x) + Math.abs(node.y - gridNode.y);
                    if (dist > 2)
                        gridNodesNearby.push(node);
                    //node.itemNode.color = cc.Color.RED;
                }
            }
        }

        var i = parseInt(Math.random() * (gridNodesNearby.length - 1));
        var node = gridNodesNearby[i];
        var teleportGateNode = cc.instantiate(this.teleportGatePrefab);
        if (node.itemNode != null)
            node.itemNode.destroy();
        node.itemNode = teleportGateNode;
        teleportGateNode.getComponent("TeleportGate").GameManager = this;
        teleportGateNode.position = node.node.position;

        teleportGateNode.parent = this.GoldsNode;
    },


    coinEffect: function () {
        var gridNode = this.grid.getNodeFromPosition(this.cameraNode.position);
        var gridNodesNearby = [];
        for (var i = gridNode.x - this.coinEffectCountX / 2; i < gridNode.x + this.coinEffectCountX; i++) {
            for (var j = gridNode.y - this.coinEffectCountY / 2; j < gridNode.y + this.coinEffectCountY; j++) {
                var node = this.grid.nodes[i][j];
                if (node != null
                    && node.nodeStatus === NodeStatus.NORMAL
                    && node.itemNode != null
                    && node.itemNode.getComponent("SmallCoin") != null) {
                    gridNodesNearby.push(node);
                    //node.itemNode.color = cc.Color.RED;
                }
            }
        }
        if (gridNodesNearby.length > 0) {
            for (var j = 0; j < this.coinEffectNum; j++) {
                var i = parseInt(Math.random() * (gridNodesNearby.length - 1));
                var effectNode = gridNodesNearby[i];
                if (effectNode) {
                    var coinEffectNode = CoinEffectPool.create();
                    coinEffectNode.parent = this.GoldsNode;
                    coinEffectNode.position = effectNode.itemNode.position;
                    coinEffectNode.getComponent("CoinEffect").init();
                    gridNodesNearby.remove(effectNode);
                }
            }
        }

        //var minX = this.cameraNode.position.x - 960;
        //var maxX = this.cameraNode.position.x + 960;
        //var minY = this.cameraNode.position.y - 540;
        //var maxY = this.cameraNode.position.y + 540;
        //cc.log(gridNode.x + "--" + gridNode.y);
    },

    backToMain: function () {
        window.firstTime = false;
        window.playAgain = true;
        cc.director.loadScene("Level_1");
    },

    backToMain1: function () {
        window.firstTime = false;
        window.playAgain = false;
        cc.director.loadScene("Level_1");
    },

    gameOver: function () {
        this.gameStarted = false;
        this.inputEnabled = false;
        if (this.EnermyAttackManager.enermyAttacking) {
            this.enermyAttacking = false;

            clearInterval(this.EnermyAttackManager.spInterval);
            clearTimeout(this.EnermyAttackManager.bonusTimeout);
            clearInterval(this.EnermyAttackManager.timeCountInterval);
        }


        UserDataConnector.updateLastRank(this.score, this, this.showRes, this.RankManager, this.RankManager.setTop5);

        this.curBGM.stop();
        this.speed = 0;
        this.bRecoverCrabBuff = false;
        this.PlayerInfoNode.active = false;
        this.clearAllTimeout();
        this.dragon.die();

        setTimeout(function () {
            //cc.director.pause();
            this.GameRes.node.active = true;
        }.bind(this), this.dragon.dieTime * 1000);
    },

    showRes: function (gm, dataRow) {
        var dataRow = dataRow.split(",");
        var rank = dataRow[5];

        //var img = null;
        //if (gm.score > gm.highscore) {
        //    //titleResText.text = "胜利";
        //    //var sceneName = cc.director.getScene().name;
        //    //cc.sys.localStorage.setItem('highscore' + sceneName.split('_')[1], this.score);
        //    //UserDataConnector.uploadHighScore();
        //    //this.highscoreResLabel.string = this.score;
        //    img = gm.newRecImg;
        //}
        //else {
        //    //this.highscoreResLabel.string = this.highscore;
        //    img = gm.cheerImg;
        //}
        gm.GameRes.setup(gm.cheerImg, gm.level, gm.score, gm.time);
        //gm.GameRes.setup(img, gm.level, gm.score, gm.time, rank, gm.EnermyAttackManager.crayfishNum, gm.EnermyAttackManager.crabNum, gm.EnermyAttackManager.ballNum)
    },

    restart: function () {
        cc.director.loadScene("Level_1");
    },

    updateScore: function (socreGet, enableScoreFactor) {
        if (enableScoreFactor)
            this.score += socreGet * this.scoreFactor;
        else
            this.score += socreGet;
        this.scoreLabel.string = this.score;
        this.checkLevelUp();


    },

    updateSpeedUpScore: function (socreGet) {
        this.speedUpScore += socreGet * this.scoreFactor;
        this.enermyAttackScore += socreGet * this.scoreFactor;
        this.enermyAttackV2Score += socreGet * this.scoreFactor;
        this.checkSpeedUp();
        this.checkBodyLength();

        //if (!this.teleportGateSpawned && this.enermyAttackV2Score >= this.DataManager.triggerBonusScoreList[this.enermyAttackV2ThreholdIndex]) {
        //    this.AudioManager.playTeleportGate();
        //    this.spawnTeleportGate();
        //    this.teleportGateSpawned = true;
        //}
    },

    startEnermyAttack: function () {
        //重置crabbuff,如果有
        if (this.crabTimeout)
            clearTimeout(this.crabTimeout);
        this.speedFactor = 1;
        this.bRecoverCrabBuff = false;
        this.recoverCrabBuffTime = 0;

        this.teleportGateSpawned = false;
        this.AudioManager.playBonusStart();
        this.EnermyAttackManager.startAttack();
        this.enermyAttackV2Score = 0;
        this.enermyAttackV2ThreholdIndex++;
        if (this.enermyAttackV2ThreholdIndex >= this.DataManager.triggerBonusScoreList.length)
            this.enermyAttackV2ThreholdIndex = this.DataManager.triggerBonusScoreList.length - 1;
    },

    checkLevelUp: function () {
        for (var i = this.level - 1; i < this.DataManager.levelScores.length - 1; i++) {
            var nextLevelScore = this.DataManager.levelScores[i + 1];
            if (this.score < nextLevelScore) {
                this.level = i + 1;
                this.levelLabel.string = this.level;
                break;
            }
        }
    },

    checkSpeedUp: function () {
        for (var i = this.curSpeedUpDataIndex; i < this.DataManager.speedUpData.length; i++) {
            var speedUpScore = parseFloat(this.DataManager.speedUpData[i][0]);
            var speedUpVal = parseFloat(this.DataManager.speedUpData[i][1]);
            if (this.speedUpScore >= speedUpScore) {
                this.speed += speedUpVal;
                this.curSpeedUpDataIndex++;
            }
            else
                break;
        }
    },

    checkBodyLength: function () {
        for (var i = this.curBodyLength - 1; i < this.DataManager.bodyLengthScores.length; i++) {
            if (this.speedUpScore >= this.DataManager.bodyLengthScores[i]) {
                this.AudioManager.cheerAudio.play();
                this.dragonHead.grow();
                this.curBodyLength++;
            }
            else
                break;
        }
    },
    spawnNode: function (pos, parent) {
        var gridNode = this.grid.getNodeFromPosition(pos);
        gridNode.itemNode = null;
        var spawnTime = (this.DataManager.maxSpawnTime - this.DataManager.minSpawnTime) * Math.random() + this.DataManager.minSpawnTime;
        var spawnNodeTimeout = setTimeout(function () {
            if (gridNode.itemNode == null) {
                var prefabAndName = this.getItemToSpawn();
                var newItem = null;
                if (prefabAndName[1] === "SmallCoin") {
                    newItem = this.createCoin();
                    parent = this.GoldsNode;
                }
                else {
                    newItem = cc.instantiate(prefabAndName[0]);

                }
                gridNode.itemNode = newItem;
                var itemComp = newItem.getComponent(prefabAndName[1]);
                itemComp.GameManagerNode = this.node;
                itemComp.DataManagerNode = this.DataManagerNode;
                if (prefabAndName[1] === "Trap")
                    itemComp.EnermyAttackManagerNode = this.EnermyAttackManagerNode;
                newItem.parent = parent;
                newItem.setPosition(pos);
                if (prefabAndName[1] === "SYSJ")
                    this.SYSJwords.push(newItem);
                if (prefabAndName[1] === "JCWD")
                    this.JCWDwords.push(newItem);
            }
        }.bind(this), spawnTime * 1000);
        this.spawnNodeTimeoutList.push(spawnNodeTimeout);
    },

    setBunBuff: function () {
        this.BuffControl.node.children[0].stopAllActions();
        this.BuffControl.node.children[0].opacity = 255;

        if (this.bunTimeout) {
            clearTimeout(this.bunTimeout)
            this.scoreFactor = 1;
        }

        this.scoreFactor = this.DataManager.bunBuffRate;
        this.BuffControl.showBunBuff();

        var self = this;
        var finished = cc.callFunc(function (target, self) {
            self.scoreFactor = 1;
            self.BuffControl.hideBunBuff();
        }, this, self);

        this.bunTimeout = setTimeout(function () {
            this.bunTimeout = null;

            var seq = cc.sequence(cc.repeat(
                cc.sequence(
                    cc.fadeOut(0.5),
                    cc.fadeIn(0.5),
                ), 3), finished);
            this.BuffControl.node.children[0].runAction(seq);
        }.bind(this), (this.DataManager.bunTime - 3) * 1000);
    },

    setCrabBuff: function () {
        this.BuffControl.node.children[1].stopAllActions();
        this.BuffControl.node.children[1].opacity = 255;
        var self = this;
        var finished = cc.callFunc(function (target, self) {
            this.bRecoverCrabBuff = true;
            this.BuffControl.hideCrabBuff();
        }, this, self);

        if (this.crabTimeout) {
            clearTimeout(this.crabTimeout);
            this.speedFactor = 1;
        }

        if (this.bRecoverCrabBuff)
            this.bRecoverCrabBuff = false;

        this.speedFactor = this.speedFactor * this.DataManager.crabBuffRate / 100;
        this.recoverCrabBuffTime = 0;
        this.recoverCrabBuffFactor = this.speedFactor;
        this.BuffControl.showCrabBuff();
        this.crabTimeout = setTimeout(function () {
            var seq = cc.sequence(cc.repeat(
                cc.sequence(
                    cc.fadeOut(0.5),
                    cc.fadeIn(0.5),
                ), 3), finished);
            this.BuffControl.node.children[1].runAction(seq);
            this.crabTimeout = null;
        }.bind(this), (this.DataManager.crabTime - 3) * 1000);
    },

    setCrayfishBuff: function () {
        this.BuffControl.node.children[2].stopAllActions();
        this.BuffControl.node.children[2].opacity = 255;
        var self = this;
        var finished = cc.callFunc(function (target, self) {
            this.invincible = false;
            this.BuffControl.hideCrayfishBuff();
        }, this, self);


        this.invincible = true;
        if (this.crayfishTime)
            clearTimeout(this.crayfishTime);
        this.BuffControl.showCrayfishBuff();
        this.crayfishTime = setTimeout(function () {

            var seq = cc.sequence(cc.repeat(
                cc.sequence(
                    cc.fadeOut(0.5),
                    cc.fadeIn(0.5),
                ), 3), finished);
            this.BuffControl.node.children[2].runAction(seq);
            this.crayfishTime = null;
        }.bind(this), (this.DataManager.crayfishTime - 3) * 1000);
    },

    clearAllTimeout: function () {
        clearTimeout(this.bunTimeout);
        clearTimeout(this.crabTimeout);
        clearTimeout(this.bgAudioTimeout);
        for (var i = 0; i < this.spawnNodeTimeoutList.length; i++) {
            clearTimeout(this.spawnNodeTimeoutList[i]);
        }
    },

    getProbabilityGroupIndex: function (probabilityGroup) {
        var random = Math.random();
        var propSum = 0;
        for (var i = 0; i < probabilityGroup.length; i++) {
            propSum += probabilityGroup[i];
            if (random < propSum) {
                return i;
            }
        }
        cc.error("getProbabilityGroupIndex failed!!");
        return -1;
    },

    getItemToSpawn: function () {
        if (this.specialItemNum >= this.DataManager.itemNumLimit)//小金币
        {
            return [this.smallCoin, "SmallCoin"];
        }
        else if (this.score >= this.DataManager.trapThrehold) {
            var groupIndex = this.getProbabilityGroupIndex(this.DataManager.probabilityGroup0);
            switch (groupIndex) {
                case 0:
                    return [this.smallCoin, "SmallCoin"];
                case 1: //group1
                    var groupIndex1 = this.getProbabilityGroupIndex(this.DataManager.probabilityGroup1);
                    switch (groupIndex1) {
                        case 0:
                            this.specialItemNum++;
                            return [this.crayfish, "Crayfish"];
                        case 1:
                            this.specialItemNum++;
                            return [this.crab, "Crab"];
                        case 2:
                            this.specialItemNum++;
                            return [this.bun, "Bun"];
                    }
                    break;
                case 2:// gourp2
                    var groupIndex2 = this.getProbabilityGroupIndex(this.DataManager.probabilityGroup2);
                    switch (groupIndex2) {
                        case 0:
                            this.specialItemNum++;
                            return [this.sysj, "SYSJ"];
                        case 1:
                            this.specialItemNum++;
                            return [this.jcwd, "JCWD"];
                    }
                    break;
                case 3:
                    if (this.trapNum < 10) {
                        this.trapNum++;
                        return [this.trap, "Trap"];
                    }
                    else
                        return [this.smallCoin, "SmallCoin"];
            }
        }
        else //group3
        {
            var groupIndex = this.getProbabilityGroupIndex(this.DataManager.probabilityGroup3);
            switch (groupIndex) {
                case 0:
                    return [this.smallCoin, "SmallCoin"];
                //case 1: 大闸蟹概率为0,不会出现
                //    break;
                case 2:
                    this.specialItemNum++;
                    return [this.bun, "Bun"];
                case 3:// gourp2
                    var groupIndex2 = this.getProbabilityGroupIndex(this.DataManager.probabilityGroup2);
                    switch (groupIndex2) {
                        case 0:
                            this.specialItemNum++;
                            return [this.sysj, "SYSJ"];
                        case 1:
                            this.specialItemNum++;
                            return [this.jcwd, "JCWD"];
                    }
                    break;
            }
        }
        cc.error("getItemToSpawn failed!!!");
        return null;
    },

    //setPhraseBuff: function (phraseType, wordIndex, node) {
    //    switch (phraseType) {
    //        case "JCWD":
    //            if (this.NextJcwdIndex == wordIndex - 1 || (this.NextJcwdIndex == 3 && wordIndex == 0)) {
    //                this.NextJcwdIndex = wordIndex;
    //                if (this.NextJcwdIndex == 3) {
    //                    this.updateScore(this.DataManager.JCWDValue, false);
    //                    for (var i = 0; i < 4; i++) {
    //                        this.jcwdUINode.children[i].getComponent(cc.Sprite).spriteFrame = this.jcwdGray[i];
    //                    }
    //                    this.phraseAudio.play();
    //                }
    //                else {
    //                    this.jcwdUINode.children[this.NextJcwdIndex].getComponent(cc.Sprite).spriteFrame = this.jcwdColor[this.NextJcwdIndex];
    //                    this.wordAudio.play();
    //                }

    //                this.JCWDwords.remove(node);
    //            }
    //            else {
    //                this.NextJcwdIndex = 3;
    //                this.jcwdIndex = 3;
    //                for (var i = 0; i < 4; i++) {
    //                    this.jcwdUINode.children[i].getComponent(cc.Sprite).spriteFrame = this.jcwdGray[i];
    //                }

    //                for (var i = 0; i < this.JCWDwords.length; i++) {
    //                    var word = this.JCWDwords[i];
    //                    if (word != node) {
    //                        this.spawnNode(word.position, word.parent);
    //                        this.specialItemNum--;
    //                        word.destroy();
    //                    }
    //                }
    //                this.JCWDwords = [];
    //                this.wordAudio.play();
    //            }
    //            break;
    //        case "SYSJ":
    //            if (this.NextSysjIndex == wordIndex - 1 || (this.NextSysjIndex == 3 && wordIndex == 0)) {
    //                this.NextSysjIndex = wordIndex;
    //                if (this.NextSysjIndex == 3) {
    //                    this.invincibleSYSJ = true;
    //                    for (var i = 0; i < 4; i++) {
    //                        this.sysjUINode.children[i].getComponent(cc.Sprite).spriteFrame = this.sysjGray[i];
    //                    }

    //                    this.phraseAudio.play();
    //                }
    //                else {
    //                    this.wordAudio.play();
    //                    this.sysjUINode.children[this.NextSysjIndex].getComponent(cc.Sprite).spriteFrame = this.sysjColor[this.NextSysjIndex];
    //                }

    //                this.SYSJwords.remove(node);
    //            }
    //            else {
    //                this.NextSysjIndex = 3;
    //                this.sysjIndex = 3;
    //                for (var i = 0; i < 4; i++) {
    //                    this.sysjUINode.children[i].getComponent(cc.Sprite).spriteFrame = this.sysjGray[i];
    //                }

    //                for (var i = 0; i < this.SYSJwords.length; i++) {
    //                    var word = this.SYSJwords[i];
    //                    if (word != node) {
    //                        this.spawnNode(word.position, word.parent);
    //                        this.specialItemNum--;
    //                        word.destroy();
    //                    }
    //                }
    //                this.SYSJwords = [];
    //                this.wordAudio.play();
    //            }
    //            break;
    //    }
    //},
});

Array.prototype.remove = function (b) {
    var a = this.indexOf(b);
    if (a >= 0) {
        this.splice(a, 1);
        return true;
    }
    return false;
};



