package lzy.sys.auth.controller;


import lzy.common.CommonDefine;
import lzy.sys.auth.domain.LoginUser;
import lzy.sys.auth.domain.RegisterUser;
import lzy.sys.auth.domain.SoftSerial;
import lzy.sys.auth.domain.UserInfo;
import lzy.sys.auth.service.AuthService;
import lzy.sys.security.jwt.JwtTokenUtil;
import lzy.utils.LicenseGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * 以后扩展相关功能
 * 1)在使用Spring Security框架过程中，经常会有这样的需求，即在登录验证时，附带增加额外的数据，如验证码、用户类型等。下面将介绍如何实现。
 * http://www.cnblogs.com/phoenix-smile/p/5666686.html
 * 2)加上 @PreAuthorize("hasRole('USER')") ，标明这个资源只能被拥有 USER 角色的用户访问：
 * [2017-03-20 add by longzhiyou]
 */


@RestController
@RequestMapping(value = CommonDefine.BASE_URI+"/auth")
public class AuthController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AuthService authService;



    @RequestMapping(method= RequestMethod.POST,consumes = "application/json",value = "/login")
    public UserInfo jsonLogin(@RequestBody LoginUser user) {

//        Device device= DeviceUtils.getCurrentDevice(request);

        // Perform the security
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );

        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Reload password post-security so we can generate token
//        final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        // Perform the security
        final String token = jwtTokenUtil.generateToken(userDetails);

        // Return the token
        // return ResponseEntity.ok(new JwtAuthenticationResponse(token));

        UserInfo userInfo = (UserInfo)userDetails;
        userInfo.setToken(token);

        return userInfo;



    }

    @RequestMapping(method= RequestMethod.POST,consumes = "application/json",value = "/register")
    public UserInfo jsonRegister(@Valid @RequestBody RegisterUser user) {

        UserInfo userInfo = authService.addUser(user);
        final String token = jwtTokenUtil.generateTokenByUsername(user.getUsername());
        userInfo.setToken(token);
        return userInfo;

    }

    @RequestMapping(method= RequestMethod.GET,value = "/serial")
    public SoftSerial serial() {

        SoftSerial softSerial = new SoftSerial();
        softSerial.setSerial(LicenseGenerator.getCPUSerial());

        return softSerial;

    }



}
