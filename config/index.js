/**
 * allqr.html文件域名
 * 如果已经搭建了网页版，domain格式为 https://aa.bb.com
 * 那么allqr.html完整路径为 https://aa.bb.com/allqr.html
 * 如果没有搭建网页版，需要上传`其他`文件夹下的allqr.html和qrcode.min.js文件至网站根目录
 * 然后将domain改为自己的域名
 */
const domain = 'https://qr.no0a.cn'

// 短网址接口
const shortApi = 'https://url.no0a.cn/api.php?url='

/**
 * 短网址接口返回的短网址
 * 路径之间用.隔开
 * 例如短网址返回的格式为
 * {
 *  status: 200,
 *  data: {
 *     longurl: '原长网址',
 *     shorturl: '生成后的短网址'
 *  }
 * }
 * 那么路径为 data.shorturl
 */
const shortApiResultPath = 'data.shorturl'

// 模板名和模板图片地址
const carouselImgs = [
    {
        name: 'baobei',
        type: 'normal',
        // url: "https://img.alicdn.com/imgextra/i3/2027555802/O1CN01ABc7nR1sjMWbLWQRm_!!2027555802.png"
        url: "https://imgs.bwmelon.com/qrbgs/baobei.png"
    },
    {
        name: 'dongxue',
        type: 'normal',
        // url: "https://img.alicdn.com/imgextra/i2/2027555802/O1CN0178X3hU1sjMWfmkoh5_!!2027555802.png"
        url: "https://imgs.bwmelon.com/qrbgs/dongxue.png"
    },
    {
        name: 'gongzhu',
        type: 'normal',
        // url: "https://img.alicdn.com/imgextra/i4/2027555802/O1CN01LDfMYs1sjMWhTHmPR_!!2027555802.png"
        url: "https://imgs.bwmelon.com/qrbgs/gongzhu.png"
    },
    {
        name: 'huanyingdashang',
        type: 'normal',
        // url: "https://img.alicdn.com/imgextra/i4/2027555802/O1CN01Yuipi71sjMWhTI32u_!!2027555802.png"
        url: "https://imgs.bwmelon.com/qrbgs/huanyingdashang.png"
    },
    {
        name: 'kanuobudingmao',
        type: 'normal',
        // url: "https://img.alicdn.com/imgextra/i4/2027555802/O1CN01bFGxSs1sjMWcWW1uR_!!2027555802.png"
        url: "https://imgs.bwmelon.com/qrbgs/kanuobudingmao.png"
    },
    {
        name: 'maomi',
        type: 'normal',
        // url: "https://img.alicdn.com/imgextra/i4/2027555802/O1CN017OCNEy1sjMWfe9Z3U_!!2027555802.png"
        url: "https://imgs.bwmelon.com/qrbgs/maomi.png"
    },
    {
        name: 'niannianyouyu',
        type: 'normal',
        // url: "https://img.alicdn.com/imgextra/i1/2027555802/O1CN01T0g4kQ1sjMWf7HUZP_!!2027555802.png"
        url: "https://imgs.bwmelon.com/qrbgs/niannianyouyu.png"
    },
    {
        name: 'pikaqiu',
        type: 'normal',
        // url: "https://img.alicdn.com/imgextra/i3/2027555802/O1CN01ETL8eZ1sjMWf7GHlX_!!2027555802.png"
        url: "https://imgs.bwmelon.com/qrbgs/pikaqiu.png"
    },
    {
        name: 'toushi',
        type: 'normal',
        // url: "https://img.alicdn.com/imgextra/i4/2027555802/O1CN01mO4EYP1sjMWeSZtzX_!!2027555802.png"
        url: "https://imgs.bwmelon.com/qrbgs/toushi.png"
    },
    {
        name: 'yinlian',
        type: 'normal',
        // url: "https://img.alicdn.com/imgextra/i4/2027555802/O1CN01DU5ECy1sjMWe205L5_!!2027555802.png"
        url: "https://imgs.bwmelon.com/qrbgs/yinlian.png"
    },
    {
        name: 'yitiji',
        type: 'normal',
        // url: "https://img.alicdn.com/imgextra/i4/2027555802/O1CN01B4y11v1sjMWeSGuWy_!!2027555802.png"
        url: "https://imgs.bwmelon.com/qrbgs/yitiji.png"
    }
]

const artCarouseImgs = [
    {
        name: 'longmao',
        type: 'art',
        url: "https://imgs.bwmelon.com/qrbgs/longmao.png"
    },
    {
        name: 'xiaohuangren',
        type: 'art',
        url: "https://imgs.bwmelon.com/qrbgs/xiaohuangren.png",
        ad: true
    },
    {
        name: 'qitao',
        type: 'art',
        url: "https://imgs.bwmelon.com/qrbgs/qitao.png",
        ad: true
    },
    {
        name: 'qiuzanzhu',
        type: 'art',
        url: "https://imgs.bwmelon.com/qrbgs/qiuzanzhu.png"
    },
    {
        name: 'pinkgirl',
        type: 'art',
        url: "https://imgs.bwmelon.com/qrbgs/pinkgirl.png"
    },
]

export {
    domain, 
    shortApi,
    shortApiResultPath,
    carouselImgs,
    artCarouseImgs
}