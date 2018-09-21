Page({

    data: {
        user:[],
        rposPage: 1,
        starsPage: 1,
        followerPage: 1,
        followsPage: 1,
        current: "repos",
        rposData: [],
        followData: [],
        followerData: [],
        starData: [],
        reposloadingMore: true,
        FloadingMore: true,
        FerloadingMore: true,
        starloadingMore: true,
        loading: false
    },

    onLoad: function(options) {
        let _this = this
        let user = options.user
        wx.setNavigationBarTitle({
            title: user
        });
        wx.request({
            url: "https://api.minororange.com/github/users/"+user,
            method: 'GET',
            data: {},
            header: 'application/x-www-form-urlencoded',
            success: (data)=>{
                console.log(data.data)
                _this.setData({
                    user: data.data
                })
            },
            fail: ()=>{}
        });
        wx.request({
            url: "https://api.minororange.com/github/users/"+user+"/repos",
            method: 'GET',
            data: {},
            header: 'application/x-www-form-urlencoded',
            success: (data)=>{
                _this.setData({
                    rposData: data.data
                })
            },
            fail: ()=>{}
        });
        wx.request({
            url: "https://api.minororange.com/github/users/"+user+"/following",
            method: 'GET',
            data: {},
            header: 'application/x-www-form-urlencoded',
            success: (data)=>{
                _this.setData({
                    followData: data.data
                })
            },
            fail: ()=>{}
        });
        wx.request({
            url: "https://api.minororange.com/github/users/"+user+"/followers",
            method: 'GET',
            data: {},
            header: 'application/x-www-form-urlencoded',
            success: (data)=>{
                _this.setData({
                    followerData: data.data
                })
            },
            fail: ()=>{}
        });
        wx.request({
            url: "https://api.minororange.com/github/users/"+user+"/starred",
            method: 'GET',
            data: {},
            header: 'application/x-www-form-urlencoded',
            success: (data)=>{
                _this.setData({
                    starData: data.data
                })
            },
            fail: ()=>{}
        });
    },
    handleChange({detail }){
        this.setData({
            current : detail.key
        })
    },
    onReachBottom(){
        let _this = this
        let current = _this.data.current
        switch(current){
            case "repos":
                _this.reposLoding()
                break;
            case "following":
                _this.followingLoding()
                break;
            case "followers":
                _this.followersLoding()
                break;
            case "starred":
                _this.starredLoding()
                break;
        }
    },
    onPullDownRefresh: function () {           
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
    },
    reposLoding(){
        if(this.data.reposloadingMore){
            let page = this.data.rposPage + 1;
            let user = this.data.user.login;
            let url = "https://api.minororange.com/github/users/"+user+"/repos?page="+page;
            let _this = this
            _this.setData({
                rposPage: page,
                loading: true
            })
            wx.request({
                url: url,
                method: 'GET',
                data: {},
                header: 'application/x-www-form-urlencoded',
                success: (data)=>{
                    let oldData = _this.data.rposData
                    if(data.data.length > 0){
                        _this.setData({
                            rposData: oldData.concat(data.data),
                            loading: false
                        })
                    }else{
                        _this.setData({
                            loading: false,
                            reposloadingMore: false
                        })
                    }
                    
                },
                fail: ()=>{}
            });
        }else{
            return false;
        }        
    },
    followingLoding(){
        if(this.data.FloadingMore){
            let page = this.data.followsPage + 1;
            let user = this.data.user.login;
            let url = "https://api.minororange.com/github/users/"+user+"/following?page="+page;
            let _this = this
            _this.setData({
                followsPage: page,
                loading: true
            })
            wx.request({
                url: url,
                method: 'GET',
                data: {},
                header: 'application/x-www-form-urlencoded',
                success: (data)=>{
                    let oldData = _this.data.followData
                    if(data.data.length > 0){
                        _this.setData({
                            followData: oldData.concat(data.data),
                            loading: false
                        })
                    }else{
                        _this.setData({
                            loading: false,
                            FloadingMore: false
                        })
                    }
                    
                },
                fail: ()=>{}
            });
        }else{
            return false;
        }        
    },
    followersLoding(){
        if(this.data.FerloadingMore){
            let page = this.data.followerPage + 1;
            let user = this.data.user.login;
            let url = "https://api.minororange.com/github/users/"+user+"/followers?page="+page;
            let _this = this
            _this.setData({
                followerPage: page,
                loading: true
            })
            wx.request({
                url: url,
                method: 'GET',
                data: {},
                header: 'application/x-www-form-urlencoded',
                success: (data)=>{
                    let oldData = _this.data.followerData
                    if(data.data.length > 0){
                        _this.setData({
                            followerData: oldData.concat(data.data),
                            loading: false
                        })
                    }else{
                        _this.setData({
                            loading: false,
                            FerloadingMore: false
                        })
                    }
                    
                },
                fail: ()=>{}
            });
        }else{
            return false;
        }        
    },
    starredLoding(){
        if(this.data.starloadingMore){
            let page = this.data.starsPage + 1;
            let user = this.data.user.login;
            let url = "https://api.minororange.com/github/users/"+user+"/starred?page="+page;
            let _this = this
            _this.setData({
                starsPage: page,
                loading: true
            })
            wx.request({
                url: url,
                method: 'GET',
                data: {},
                header: 'application/x-www-form-urlencoded',
                success: (data)=>{
                    let oldData = _this.data.starData
                    if(data.data.length > 0){
                        let newData = oldData.concat(data.data);
                        console.log(newData);
                        _this.setData({
                            starData: newData,
                            loading: false
                        })
                    }else{
                        _this.setData({
                            loading: false,
                            starloadingMore: false
                        })
                    }
                    
                },
                fail: ()=>{}
            });
        }else{
            return false;
        }        
    },
    goToUser(event){
        let name = event.currentTarget.dataset.name
        wx.navigateTo({
            url: '/pages/user/index?user=' + name
        })
    }
});