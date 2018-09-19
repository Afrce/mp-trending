const { $Toast } = require('../../dist/base/index');
Page({

    data: {
        name: "",
        op: "",
        repoData: [],
        issuesData: [],
        spinShow: true,
        current: "code",
        wemark: {},
        page: 1,
        loadingMore: true,
    },
    getIssuses(){
        let name = this.data.name
        let op = this.data.op
        let url = "https://api.minororange.com/github/repos/" + name +"/"+ op +"/issues";
        let page = this.data.page
        let _this = this
        wx.request({
            url: url,
            method: 'GET',
            data: {page: page},
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (res)=>{
                if(res.data.length > 0){
                    if(page == 1){
                        _this.setData({
                            issuesData: res.data,
                            spinShow: false
                        })
                    }else{
                        newData = _this.data.issuesData.concat(res.data)
                        _this.setData({
                            issuesData: res.newData,
                            spinShow: false
                        })
                    }
                }else{
                    _this.setData({
                        spinShow: false,
                        loadingMore: false
                    })
                }

            },
            fail: ()=>{
                _this.setData({
                    spinShow: false
                })
                $Toast({
                    content: '未知错误发生！请稍后再试',
                    type: 'error'
                })
            },
            complete: function() {
              wx.hideNavigationBarLoading() //完成停止加载
              wx.stopPullDownRefresh() //停止下拉刷新
            }
        });
    },
    onReachBottom() {
        let _this = this
       if(_this.data.loadingMore){
           let page = _this.data.page + 1
           console.log(page)
           _this.setData({
               page: page,
               spinShow: true
           })
           _this.getIssuses()
       }
    },
    onPullDownRefresh: function () {
           let page = 1
           this.setData({
               page: page,
               spinShow: true
           })
           this.getIssuses()
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
    handleClick1(event){
        let url = event.currentTarget.dataset.url
        url = url.replace(/github.com/,"minororange.com/github/")
        wx.navigateTo({
            url: '/pages/issues/index?url=' + url
        })
    },
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: options.item
        })
        let name = options.item.split("/")
        console.log(name)
        let _this =this;
        _this.setData({
            name: name[0],
            op  : name[1]
        })
        let url = "https://api.minororange.com/github/repos/" + options.item;
        wx.request({
            url: url,
            method: 'GET',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (res)=>{
                _this.setData({
                    repoData: res.data,
                    spinShow: false,
                    item: options.item,
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
        let issues = "https://api.minororange.com/github/repos/" + options.item +"/issues";
        wx.request({
            url: issues,
            method: 'GET',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (res)=>{
                _this.setData({
                    issuesData: res.data,
                })
            },
            fail: ()=>{
                _this.setData({
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
