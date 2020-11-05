//index.js
//获取应用实例
import drawQrcode from '../../utils/weapp.qrcode.js'
import Toast from '/@vant/weapp/toast/toast';
import Dialog from '/@vant/weapp/dialog/dialog';
import styleConfigJson from '../../config/styleConfig'
import {
    domain,
    shortApi,
    shortApiResultPath,
    carouselImgs
} from '../../config/index'

Page({
    data: {
        carouselImgs,
        params: {
            recname: '',
            qqUrl: '',
            wechatUrl: '',
            aliUrl: '',
            img: ''
        },
        modelName: '',
        isEdit: false,
        isAnimationFinish: false,
        show: false,
        miniImgUrl: ''
    },
    onLoad: function () {
        this.setData({
            modelName: this.data.carouselImgs[0].name
        })
    },
    // 上传头像
    getUserInfo: function () {
        wx.getUserInfo({
            success: res => {
                this.setData({
                    ['params.img']: res.userInfo.avatarUrl
                })
            }
        })
    },
    // 取消使用头像
    cancelUploadAvatar() {
        this.setData({
            ['params.img']: ''
        })
    },
    // 获取样式名称
    bindgetModelName(e) {
        this.setData({
            modelName: e.detail
        })
    },
    // 生成二维码
    generate() {
        // 未上传提示
        if (!this.data.params.qqUrl && !this.data.params.wechatUrl && !this.data.params.aliUrl) {
            Toast('请至少上传一种收款码')
            return false
        }
        // 获取模板信息
        const model = this.data.carouselImgs.find(item => item.name === this.data.modelName)
        // 模板配置
        const config = styleConfigJson[model.name]

        // 原长网址
        let longurl = `${domain}/allqr.html?qqUrl=${this.urlEncode(this.data.params.qqUrl)}&wechatUrl=${this.urlEncode(this.data.params.wechatUrl)}&aliUrl=${this.urlEncode(this.data.params.aliUrl)}&img=${this.urlEncode(this.data.params.img)}&recname=${encodeURI(encodeURI(this.data.params.recname))}`

        Toast.loading({
            message: '生成中...',
            forbidClick: true,
        });

        // 长网址缩短
        wx.request({
            url: `${shortApi}${this.urlEncode(longurl)}`,
            success: (res) => {
                // 处理路径
                let shortUrl = null // 生成后的短网址
                shortApiResultPath.split('.').forEach(item => {
                    shortUrl = !shortUrl ? res.data[item] : shortUrl[item]
                })

                wx.getImageInfo({
                    src: model.url,
                    success: (img) => {
                        // 绘制二维码和背景图
                        drawQrcode({
                            width: config.qrWidth,
                            height: config.qrHeight,
                            canvasId: 'myQrcode',
                            ctx: wx.createCanvasContext('myQrcode'),
                            text: shortUrl,
                            // v1.0.0+版本支持在二维码上绘制图片
                            image: {
                                imageResource: img.path,
                                dx: 0,
                                dy: 0,
                                dWidth: config.imgWidth,
                                dHeight: config.imgHeight,
                                correctLevel: 2,
                            },
                            background: config.background,
                            foreground: config.foreground,
                            x: config.qrLeft,
                            y: config.qrTop,
                            callback: () => {
                                Toast.clear()
                                wx.canvasToTempFilePath({
                                    canvasId: 'myQrcode',
                                    destWidth: 900,
                                    destHeight: 1200,
                                    success: (res) => {
                                        this.setData({
                                            miniImgUrl: res.tempFilePath
                                        })
                                        setTimeout(() => {
                                            this.setData({
                                                show: true
                                            });
                                            Toast('生成成功，长按图片保存');
                                        }, 100)
                                    },
                                    fail(err) {
                                        console.log(err);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    // 上传二维码
    scanQrcode(e) {
        wx.scanCode({
            success: (res) => {
                const url = res.result
                let type = e.currentTarget.dataset.type
                switch (type) {
                    case 'qqUrl':
                        if (!url.includes('qianbao')) {
                            Toast('该图片非QQ收款码，请重新上传');
                            this.setData({
                                [`params.${type}`]: ''
                            })
                            return
                        }
                        break;
                    case 'wechatUrl':
                        if (!url.includes('wxp')) {
                            Toast('该图片非微信收款码，请重新上传');
                            this.setData({
                                [`params.${type}`]: ''
                            })
                            return
                        }
                        break;
                    case 'aliUrl':
                        if (!url.includes('ALIPAY') && !url.includes('alipay')) {
                            Toast('该图片非支付宝收款码，请重新上传');
                            this.setData({
                                [`params.${type}`]: ''
                            })
                            return
                        }
                        break;

                    default:
                        break;
                }
                this.setData({
                    [`params.${type}`]: res.result
                })
            },
        })
    },
    // 取消对应收款方式
    cancelType(e) {
        let type = e.currentTarget.dataset.type
        this.setData({
            [`params.${type}`]: ''
        })
    },
    // 设置收款名
    setEdit() {
        this.setData({
            isEdit: true
        })
        setTimeout(() => {
            this.setData({
                isAnimationFinish: true
            })
        }, 600)
    },
    // 取消编辑
    cancelEdit() {
        this.setData({
            isAnimationFinish: false,
            isEdit: false,
            ['params.recname']: ''
        })
    },
    // 失去焦点时
    canCancelEdit(e) {
        if (!e.detail.value) {
            // 收款名为空，关闭编辑状态
            this.cancelEdit()
        } else {
            // 不为空 赋值
            this.setData({
                ['params.recname']: e.detail.value
            })
        }
    },
    // url编码
    urlEncode(String) {
        return encodeURIComponent(String).replace(/'/g, "%27").replace(/"/g, "%22");
    },
    // 隐藏图片弹窗
    onClickHide() {
        this.setData({
            show: false
        });
    },
    // 保存图片
    handleSave() {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.miniImgUrl,
            success(res) {
                Toast('保存成功，点击屏幕任何区域关闭弹窗')
            },
            fail(err) {
                wx.getSetting({
                    success(res) {
                        if (!res.authSetting['scope.writePhotosAlbum']) {
                            Dialog.confirm({
                                    title: '提示',
                                    confirmButtonText: '打开',
                                    message: '保存失败，请打开保存到相册权限后再保存',
                                })
                                .then(() => {
                                    wx.openSetting({})
                                })
                                .catch(() => {

                                });
                        } else {
                            Toast('已取消保存')
                        }
                    }
                })

            }
        })
    }

})