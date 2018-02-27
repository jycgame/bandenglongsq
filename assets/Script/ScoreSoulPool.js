var ScoreSoulPool = cc.Class({
    statics: {
        pool: null,
        count: 10,
        scoreSoulPrefab: null,
        parent: null,

        init: function (scoreSoulPrefab,parent) {
            this.scoreSoulPrefab = scoreSoulPrefab;
            this.parent = parent;
            this.pool = new cc.NodePool();
            for (let i = 0; i < this.count; ++i) {
                let scoreSoul = cc.instantiate(scoreSoulPrefab); // �����ڵ�
                this.pool.put(scoreSoul); // ͨ�� putInPool �ӿڷ�������
            }
        },

        create: function () {
            let scoreSoul = null;
            if (this.pool.size() > 0) { // ͨ�� size �ӿ��ж϶�������Ƿ��п��еĶ���
                scoreSoul = this.pool.get();
            } else { // ���û�п��ж���Ҳ���Ƕ�����б��ö��󲻹�ʱ�����Ǿ��� cc.instantiate ���´���
                scoreSoul = cc.instantiate(this.scoreSoulPrefab);
            }
            scoreSoul.parent = this.parent;
            return scoreSoul;
        },

        destroy: function (scoreSoul) {
            if (this.pool.size() < this.count)
                this.pool.put(scoreSoul);
            else
                scoreSoul.destroy();
        },
    }
});

module.exports = ScoreSoulPool;