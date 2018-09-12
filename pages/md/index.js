var Base64 = require('../../utils/base64.min.js').Base64
var WxParse = require('../../wxParse/wxParse.js');
Page({

    data: {
        article: "",
    },

    onLoad: function(options) {
        let _this = this
        let url = options.url
        wx.request({
            url: url,
            method: 'GET',
            data: {},
            header: 'application/x-www-form-urlencoded',
            success: (data)=>{
                let md = Base64.decode(data.data.content)
                console.log(md)
                WxParse.wxParse('article', 'md', md, _this, 5);
            },
            fail: ()=>{}
        });
    },

});