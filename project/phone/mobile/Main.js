﻿﻿/**
 *
 * Created by longzhiyou on 11/03/16.
 */
var MobilePublic = MobilePublic || {};
MobilePublic.Domains = ["47.105.164.246"];


 MobilePublic.Url = "http://localhost:88/mobile/";
 MobilePublic.Api = "http://47.105.164.246/api/";

//默认是远程获取
MobilePublic.getServerUrl = function (shortUrl,isLocal) {


    // if (isLocal) {
    //     //本地获取
    //     return shortUrl;
    // }
    //从远程获取
    return MobilePublic.Url + shortUrl;

};

MobilePublic.getServerApi = function (shortUri) {

    return MobilePublic.Api + shortUri;
};
// 删除掉Loading画面
var loading_div = document.getElementById('windowLoadingDiv');
angular.element(loading_div).remove();

// 远程CSS设置
document.write("<link href='"+MobilePublic.getServerUrl("assets/css/style.css")+"' rel='stylesheet'>");
document.write("<link href='"+MobilePublic.getServerUrl("assets/css/widget.css")+"' rel='stylesheet'>");

document.write("<script src='"+MobilePublic.getServerUrl("app/common/Public.js")+"'></script>");
document.write("<script src='"+MobilePublic.getServerUrl("app/App.js")+"'></script>");
document.write("<script src='"+MobilePublic.getServerUrl("app/Setting.js")+"'></script>");
document.write("<script src='"+MobilePublic.getServerUrl("app/AppConfig.js")+"'></script>");
document.write("<script src='"+MobilePublic.getServerUrl("app/AppRun.js")+"'></script>");
document.write("<script src='"+MobilePublic.getServerUrl("app/common/LocalService.js")+"'></script>");
document.write("<script src='"+MobilePublic.getServerUrl("app/common/AuthService.js")+"'></script>");
document.write("<script src='"+MobilePublic.getServerUrl("app/common/Permission.js")+"'></script>");
document.write("<script src='"+MobilePublic.getServerUrl("app/common/BaseDataService.js")+"'></script>");
document.write("<script src='"+MobilePublic.getServerUrl("app/directive/scrollHeight.js")+"'></script>");
document.write("<script src='"+MobilePublic.getServerUrl("app/common/CommonFuncService.js")+"'></script>");
