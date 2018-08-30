Page({

    data: {
        item: "",
        repoData: [],
        spinShow: true,
    },

    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: options.item 
        })
        this.setData({
            item: options.item
        })
        let _this =this;
        let url = "https://api.github.com/repos/" + options.item;
        wx.request({
            url: url,
            method: 'GET',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (res)=>{
                _this.setData({
                    repoData: res.data,
                    spinShow: false
                })
            },
            fail: ()=>{}
        });

    },
});