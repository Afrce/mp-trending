const { $Toast } = require('../../dist/base/index');
var Base64 = require('../../utils/base64.min.js').Base64
var WxParse = require('../../wxParse/wxParse.js');
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

    },
    onLoad: function(options) {
        let c = "IyBnaXRidWJfdHJlbmRpbmcKUEhQ6I635Y+WdHJlbmRpbmfkuIrnmoTpobnn\nm64K\n";
        let md = Base64.decode(c);
        wx.setNavigationBarTitle({
            title: options.item 
        })
        this.setData({
            item: options.item,
            md: md
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
        WxParse.wxParse('article', 'md', md, _this, 5);
    },
    onReady: function(){
	}
});