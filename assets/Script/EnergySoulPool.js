var EnergySoulPool = cc.Class({
    statics: {
        pool: null,
        count: 5,
        energySoulPrefab: null,

        init: function (energySoulPrefab) {
            this.energySoulPrefab = energySoulPrefab;
            this.pool = new cc.NodePool();
            for (let i = 0; i < this.count; ++i) {
                let energySoul = cc.instantiate(energySoulPrefab); // �����ڵ�
                this.pool.put(energySoul); // ͨ�� putInPool �ӿڷ�������
            }
        },

        create: function () {
            let energySoul = null;
            if (this.pool.size() > 0) { // ͨ�� size �ӿ��ж϶�������Ƿ��п��еĶ���
                energySoul = this.pool.get();
            } else { // ���û�п��ж���Ҳ���Ƕ�����б��ö��󲻹�ʱ�����Ǿ��� cc.instantiate ���´���
                energySoul = cc.instantiate(this.energySoulPrefab);
            }
            return energySoul;
        },

        destroy: function (energySoul) {
            if (this.pool.size() < this.count)
                this.pool.put(energySoul);
            else
                energySoul.destroy();
        },
    }
});


module.exports = EnergySoulPool;