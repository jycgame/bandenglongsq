var UserDataConnector = require('UserDataConnector');
var Guide = require('Guide');
var PlayerInfo = require('PlayerInfo');
cc.Class({
    extends: cc.Component,

    properties: {
        GameManagerNode: {
            default: null,
            type: cc.Node,
        },
        BigCoinProgressNode: {
            default: null,
            type: cc.Node,
        },
        Guide: {
            default: null,
            type: Guide,
        },
      

        //jcwdNode: {
        //    default: null,
        //    type: cc.Node,
        //},

        //sysjNode:
        //{
        //    default: null,
        //    type: cc.Node,
        //},
    },

    // use this for initialization
    skip: function () {
        //cc.director.resume();
        this.loadGameScene();
    },

    loadGameScene: function ()
    {
        this.BigCoinProgressNode.active = true;
        //this.jcwdNode.active = true;
        //this.sysjNode.active = true;
        var gm = this.GameManagerNode.getComponent("GameManager");
        var self = this;
        UserDataConnector.getHighScore(function (highscore) {
            if (!window.firstTime)
            {
                gm.speed = 400;
                gm.gameStarted = true;
                gm.inputEnabled = true;
                gm.highscore = highscore;
                gm.highscoreLabel.string = highscore;
                //TDAPP.onEvent("click start");
            }
            else 
            {
                self.Guide.show();
            }
        });

        this.node.active = false;
    },

    startGame: function () {
        var gm = this.GameManagerNode.getComponent("GameManager");
        gm.speed = 400;
        gm.gameStarted = true;
        gm.inputEnabled = true;
        this.Guide.hide();
        //TDAPP.onEvent("click start");
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    // },

    hide: function () {
        this.node.active = false;
    },
});
