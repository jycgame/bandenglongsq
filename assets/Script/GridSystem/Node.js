var NodeStatus = require('NodeStatus');

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    x: null,
    y: null,
    gCost: null,//�����ľ���
    hCost: null, //���յ�ľ���
    parent1: null,
    nodeStatus: null,
    itemNode:null,
    // use this for initialization
    onLoad: function () {
        this.gCost = 0;
        this.hCost = 0;
        //this.nodeStatus = NodeStatus.NORMAL;
    },

    //onCollisionEnter: function (other, self) {
    //    this.nodeStatus = NodeStatus.OCCUPIED;
    //    this.node.color = new cc.Color(255, 0, 0);
    //    this.node.getComponent(cc.BoxCollider).destroy();
    //},

    fCost: function ()
    {
        return this.gCost + this.hCost;
    },
});
