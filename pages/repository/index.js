const { $Toast } = require('../../dist/base/index');
Page({

    data: {
        item: "",
        repoData: [],
        spinShow: true,
        current: "code",
        wemark: {},
    },
    methods: {
    },
    handleChange({detail }){
        this.setData({
            current : detail.key
       })
    },
    handleClick(){
        let _this = this
        wx.navigateTo({
            url: '/pages/code/index?project=' + _this.data.item + "&url="
          })
    },
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: options.item 
        })
        this.setData({
            item: options.item,
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
            fail: ()=>{
                _this.setData({
                    spinShow: false
                })
                $Toast({
                    content: '未知错误发生！请稍后再试',
                    type: 'error'
                })
            }
        });        
    },
    onReady: function(){
	}
});