Component({
    data: {
        "projectName": "",
        "dayArr": ["今日热门","本周热门","月度热门"],
        "language": ["全部语言","PHP","Vue","JS","C++","C#","JAVA","Python"],
        "dataArr": [["今日热门","本周热门","月度热门"],["全部语言","PHP","Vue","JS","C++","C#","JAVA","Python"]],
        "multiIndex": [0,0],
        "Trending": [],
        "TrendingShow": "show",
        spinShow: false,
        page: 1,
        RepositoriesShow: "hide",
        Repositories: [],
        canLoad: true,
        allLoad: false
    },
    methods: {
        wxSearchInput(e){
            let value = e.detail.value
            this.setData({
                projectName: value
            })
        },
        search(e){
            let _this = this
            let project = this.data.projectName
            _this.setData({
                spinShow: true,
                TrendingShow: false,
                page: 1,
            })
            let url = "http://api.sahulula.club/searchRepository";
            wx.request({
                url: url,
                method: 'POST',
                data: {
                    "projectName": project,
                    "page": 1
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: (res)=>{
                    console.log(res.data)
                    if(res.data.status){
                        if(res.data.data.items.length == 0){
                            _this.setData({
                                canLoad: false,
                                allLoad: true
                            })
                        }
                        _this.setData({
                            TrendingShow: "hide",
                            RepositoriesShow: "show",
                            Repositories: res.data.data.items,
                            spinShow: false
                        })  
                    }else{
                    }
                    
                },
            });
            
        },
        bindMultiPickerChange(e){
            this.setData({
                multiIndex: e.detail.value
            })
            this.getTending()
        },
        getTending(){
            let _this = this;
            _this.setData({
                spinShow: true
            })
            wx.request({
                url: 'http://api.sahulula.club/getTrending', //仅为示例，并非真实的接口地址
                method: "POST",
                data: {
                   day: _this.data.multiIndex[0],
                   lan: _this.data.multiIndex[1]
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: function(res) {
                    _this.setData({                        
                        Trending: res.data.data,
                        TrendingShow: "show",
                        RepositoriesShow: "hide",
                        spinShow: false
                    })
                }
              })
        },
        loadingMore(){
            if(!this.canLoad){
                return false
            }
            let _this = this
            let project = this.data.projectName;
            _this.setData({
                spinShow: true
            })
            let page = _this.data.page + 1;
            let url = "http://api.sahulula.club/searchRepository";
            wx.request({
                url: url,
                method: 'POST',
                data: {
                    "projectName": project,
                    "page": page
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: (res)=>{
                    if(res.data.status){
                        if(res.data.data.items.length == 0){
                            _this.setData({
                                canLoad: false,
                                allLoad: true
                            })
                        }                    
                    let Repositories = _this.data.Repositories.concat(res.data.data.items)
                    console.log(Repositories)
                        _this.setData({
                            TrendingShow: "hide",
                            RepositoriesShow: "show",
                            Repositories: Repositories,
                            spinShow: false,
                            page: page
                        })  
                    }else{
                    }
                    
                },
            });
        }
    },
    attached: function() {
        this.getTending()
    }
    
})