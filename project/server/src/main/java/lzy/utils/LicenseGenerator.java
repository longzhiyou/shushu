package lzy.utils;

import com.xiaoleilu.hutool.crypto.SecureUtil;
import com.xiaoleilu.hutool.crypto.asymmetric.KeyType;
import com.xiaoleilu.hutool.crypto.asymmetric.RSA;

import java.io.IOException;
import java.util.HashSet;
import java.util.Properties;
import java.util.Scanner;
import java.util.Set;

/**
 * 序列号生成类
 * Created by bukeyan on 2017/4/4.
 */
public class LicenseGenerator {

    public static final String publicKeyBase64 = "";
    /**
     * 获取系统cpu序列号
     * wmic cpu get ProcessorId 命令获取
     * @return 序列号
     */
    public static String getCPUSerial() {
        String serial = "";
        try {
            long start = System.currentTimeMillis();
            Process process = Runtime.getRuntime().exec(
                    new String[]{"wmic", "cpu", "get", "ProcessorId"});
            process.getOutputStream().close();
            Scanner sc = new Scanner(process.getInputStream());
            String property = sc.next();
            serial = sc.next();

        } catch (IOException e) {
            e.printStackTrace();
        }
//        增加一层
        return SecureUtil.sha1(serial);
//        return serial;
    }

    private static String getMachineCode() {
        Set<String> result = new HashSet<>();
//        String mac = getMac();
//        System.out.println("mac:" + getMac());
//        result.add(mac);
        Properties props = System.getProperties();
        String javaVersion = props.getProperty("java.version");
        result.add(javaVersion);
        // System.out.println("Java的运行环境版本：    " + javaVersion);
        String javaVMVersion = props.getProperty("java.vm.version");
        result.add(javaVMVersion);
        // System.out.println("Java的虚拟机实现版本：    " +
        // props.getProperty("java.vm.version"));
        String osVersion = props.getProperty("os.version");
        result.add(osVersion);
        // System.out.println("操作系统的版本：    " + props.getProperty("os.version"));

//        String code = new Md5PasswordEncoder().encodePassword(
//                result.toString(), SALT);
//        return getSplitString(code, "-", 4);

        return "";

    }

//    public static String getLicense(){
//       return SecureUtil.sha1(getCPUSerial());
//    }

    public static  boolean matches(String license) {

        /**
         *  用rsa的公钥进行解密
         * [2017-05-08 add by longzhiyou]
         */
        //客户端用公钥解密
        RSA rsaPublic = new RSA(null,publicKeyBase64);

        String decryptStr = rsaPublic.decryptStr(license, KeyType.PublicKey);
        boolean equals = getCPUSerial().equals(license);
        return equals;
    }

}
