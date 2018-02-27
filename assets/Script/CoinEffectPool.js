var CoinEffectPool = cc.Class({
    statics: {
        pool: null,
        count: 5,
        coinEffectPrefab: null,

        init: function (coinEffectPrefab,count) {
            this.coinEffectPrefab = coinEffectPrefab;
            this.count = count;
            this.pool = new cc.NodePool();
            for (let i = 0; i < this.count; ++i) {
                let coinEffect = cc.instantiate(coinEffectPrefab); // �����ڵ�
                this.pool.put(coinEffect); // ͨ�� putInPool �ӿڷ�������
            }
        },

        create: function () {
            let coinEffect = null;
            if (this.pool.size() > 0) { // ͨ�� size �ӿ��ж϶�������Ƿ��п��еĶ���
                coinEffect = this.pool.get();
            } else { // ���û�п��ж���Ҳ���Ƕ�����б��ö��󲻹�ʱ�����Ǿ��� cc.instantiate ���´���
                coinEffect = cc.instantiate(this.coinEffectPrefab);
            }
            return coinEffect;
        },

        destroy: function (coinEffect) {
            if (this.pool.size() < this.count)
                this.pool.put(coinEffect);
            else
                coinEffect.destroy();
        },
    }
});

module.exports = CoinEffectPool;