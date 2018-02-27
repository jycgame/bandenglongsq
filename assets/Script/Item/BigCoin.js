var ScoreSoulPool = require('ScoreSoulPool');
var AudioManager = require('AudioManager');
var GameManager = require('GameManager');
cc.Class({
    extends: cc.Component,
    properties: {
        GameManager: GameManager,
        AudioManager:AudioManager,
    },
    //onLoad: function () {

    //},

    onCollisionEnter: function (other, self) {
        if (other.node.name === "Head") {
            this.AudioManager.playBigCoin();
            this.node.destroy();
            this.GameManager.spawnNode(self.node.position, self.node.parent);
            this.GameManager.updateScore(100, false);
            this.GameManager.addNum();

            var scoreSoulNode = ScoreSoulPool.create();
            scoreSoulNode.position = this.GameManager.headNode.position.sub(this.GameManager.cameraNode.position);
            var scoreSoul = scoreSoulNode.getComponent("ScoreSoul");

            scoreSoul.target = new cc.Vec2(-838, 420);
            scoreSoul.dir = scoreSoul.target.sub(scoreSoulNode.position).normalize();
            scoreSoul.GameManager = this.GameManager;
            scoreSoul.BigCoinScore = this.BigCoinScore;
            //let targetPos = self.node.parent.convertToWorldSpaceAR(self.node.position);
            //targetPos = scoreSoulNode.parent.convertToNodeSpaceAR(targetPos);
            //scoreSoulNode.position = new cc.Vec2(0,0);
            //if (scoreSoul.dir.y <= 0)
            //    scoreSoulNode.rotation = scoreSoul.dir.angle(cc.Vec2.RIGHT) * 180 / Math.PI;
            //else
            //    scoreSoulNode.rotation = -scoreSoul.dir.angle(cc.Vec2.RIGHT) * 180 / Math.PI;

        }
    },
});
