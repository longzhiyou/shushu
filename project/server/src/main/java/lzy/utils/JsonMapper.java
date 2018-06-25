/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package lzy.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

/**
 * 简单封装Jackson，实现JSON String<->Java Object的Mapper. 封装不同的输出风格,
 * 此为单例模式.
 */
@Component
public class JsonMapper {

	private static final BigDecimal BIGDECIMAL_ZERO = new BigDecimal("0");

	private final long serialVersionUID = 1L;
	private final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
	private final Logger logger = LoggerFactory.getLogger(JsonMapper.class);
	private final ObjectMapper mapper  = new ObjectMapper();

	public JsonMapper() {

		mapper.setTimeZone(TimeZone.getDefault());// getTimeZone("GMT+8:00")

		// 设置默认日期格式
		mapper.setDateFormat(new SimpleDateFormat(DEFAULT_DATE_FORMAT));
	}



	/**
	 * json字符串转换到java bean
	 *
	 * @param jsonStr
	 *            json字符串
	 * @param beanClass
	 *            元素类型 用法: TEvaluateScoring scro = json2JavaBean(jsonStr,
	 *            TEvaluateScoring.class);
	 */
	public  <T> T json2JavaBean(String jsonStr, Class<T> beanClass) {

		if (null == jsonStr || jsonStr.isEmpty()) {
			return null;
		}
		try {
			mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
			return mapper.readValue(jsonStr, beanClass);

		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}

	}

	/**
	 * json字符串转换到java的集合
	 *
	 * @param jsonStr
	 *            json字符串
	 * @param collectionClass
	 *            泛型的Collection
	 * @param elementClasses
	 *            元素类型 用法: Map<String,String> map =
	 *            BspUtil.json2JavaCollection(str2
	 *            ,Map.class,String.class,String.class);
	 *            List<AgedPeopleEvaluate> list = json2JavaCollection(jsonStr,
	 *            List.class, AgedPeopleEvaluate.class); List<Integer> listBadl
	 *            = json2JavaCollection(jsonStrBadl, List.class, Integer.class);
	 */
	public  <T> T json2JavaCollection(String jsonStr,Class<?> collectionClass, Class<?>... elementClasses) {

		if (null == jsonStr || jsonStr.isEmpty()) {
			return null;
		}
		try {
			JavaType javaType = mapper.getTypeFactory().constructParametricType(collectionClass,
					elementClasses);
			return mapper.readValue(jsonStr, javaType);

		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}

	}

	public  String javaBean2Json(Object value) {

		try {
			return mapper.writeValueAsString(value);

		} catch (JsonProcessingException e) {
			return null;
		}

	}








}
