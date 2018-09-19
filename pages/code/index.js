const { $Toast } = require('../../dist/base/index');
Page({

    data: {
        project: "",
        item: []
    },
    getProjectList(project){
        let _this = this
        let url = "https://api.minororange.com/github/repos/"+project+"/contents"
        wx.request({
            url: url,
            method: 'GET',
            data: {},
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (data)=>{
                _this.setData({
                    item: data.data
                })
                console.log(data.data)
            },
            fail: (data)=>{
                console.log(data)
            }
        });
    },
    getFile(url){
        let _this = this
        wx.request({
            url: url,
            method: 'GET',
            data: {},
            header: 'application/x-www-form-urlencoded',
            success: (data)=>{
                _this.setData({
                    item: data.data
                })
            },
            fail: (data)=>{
                console.log(data)
            }
        });
    },
    onLoad: function(options) {
        let project = options.project
        let url = options.url
        this.setData({
            project: project
        })
        wx.setNavigationBarTitle({
            title: options.project ,
        });
        if(url != ""){
            this.getFile(url)
        }else{
            this.getProjectList(project)
        }
    },
    handleClick(event){
        let url = event.currentTarget.dataset.url
        let type = event.currentTarget.dataset.type
        let project = this.data.project
        if(type == "dir"){
            wx.redirectTo({
                url: "/pages/code/index?project=" +project + "&url="+url
            });
        }else{
            wx.redirectTo({
                url: "/pages/md/index?project=" +project + "&url="+url
            });
        }
    }
});
