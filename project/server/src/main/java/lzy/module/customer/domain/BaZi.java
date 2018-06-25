package lzy.module.customer.domain;

import lombok.Data;

import java.util.Arrays;
import java.util.List;

/**
 * User: longzhiyou
 * Date: 2016/11/28
 * Time: 10:10
 */

@Data
public class BaZi {

    //性别
    private String gender;
    /**
     * 四柱天干地支
     * [2017-06-09 add by longzhiyou]
     */
    private String nianGan;
    private String nianZhi;
    private String nianZhu;

    private String yueGan;
    private String yueZhi;
    private String yueZhu;

    private String riGan;
    private String riZhi;
    private String riZhu;

    private String shiGan;
    private String shiZhi;
    private String shiZhu;

    //大运干支
    private String yunGan="";
    private String yunZhi="";
    private String yunZhu="";

    //流年干支
    private String liunianGan="";
    private String liunianZhi="";
    private String liunianZhu="";

    //行年干支
    private String xingnianan="";
    private String xingnianZhi="";
    private String xingnianZhu="";

    //胎命干支
    private String taiGan="";
    private String taiZhi="";
    private String taiZhu="";

    //年月日时天干
    List<String> listMingGan;
    List<String> listMingZhi;
    List<String> listMingZhu;


    //批大运

    //批流年
    List<String> listMingYunSuiGan;
    /**
     * 命运岁相关
     * [2017-06-13 add by longzhiyou]
     */
    List<String> listMingYunSuiZhi;

    List<String> listMingYunSuiZhu;

    /**
     * 八字字符串,如果是10个则对应最后面是胎柱
     * [2018-06-25 add by longzhiyou]
     */
    public  BaZi(String strBaZi){

        strBaZi = strBaZi.replace(" ", "");//去掉所有空格，包括首尾、中间
        String[] split = strBaZi.split("");


        this.nianGan = split[0];
        this.nianZhi = split[1];
        this.yueGan = split[2];
        this.yueZhi =split[3];
        this.riGan = split[4];
        this.riZhi = split[5];
        this.shiGan = split[6];
        this.shiZhi = split[7];

        this.nianZhu = nianGan+nianZhi;
        this.yueZhu = yueGan+yueZhi;
        this.riZhu = riGan+riZhi;
        this.shiZhu = shiGan+shiZhi;

        this.listMingGan = Arrays.asList(nianGan, yueGan,riGan,shiGan);
        this.listMingZhi = Arrays.asList(nianZhi, yueZhi,riZhi,shiZhi);
        this.listMingZhu = Arrays.asList(nianZhu, yueZhu,riZhu,shiZhu);

        if (split.length>8){
           this.taiGan = split[8];
           this.taiZhi = split[9];
           this.taiZhu =  taiGan+taiZhi;
        }
    }


}
